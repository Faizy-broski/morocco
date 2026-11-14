import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { travellerSchema, TRAVELLER_FIELDS } from "@/app/lib/applicationFields";
import { saveUpload, deleteUpload, UploadError } from "@/app/lib/uploads";
import { rateLimit } from "@/app/lib/rateLimit";
import { visaTypeFor } from "@/app/lib/constants";

type Ctx = { params: Promise<{ token: string; position: string }> };

const fileOf = (form: FormData, name: string) => {
  const f = form.get(name);
  return f instanceof File && f.size > 0 ? f : null;
};

/** Save one traveller's full application. Re-saving replaces the previous entry. */
export async function PUT(request: Request, { params }: Ctx) {
  if (!rateLimit(request, "traveller-save", 60)) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }
  const { token, position: positionParam } = await params;
  const position = Number(positionParam);

  const enquiry = await prisma.enquiry.findUnique({ where: { accessToken: token } });
  if (!enquiry) return NextResponse.json({ error: "Application not found" }, { status: 404 });
  if (enquiry.paymentStatus !== "unpaid") {
    return NextResponse.json({ error: "This application has already been paid and can no longer be edited." }, { status: 409 });
  }
  if (!Number.isInteger(position) || position < 1 || position > enquiry.travellers) {
    return NextResponse.json({ error: "Invalid traveller number" }, { status: 400 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const raw: Record<string, FormDataEntryValue | null> = {};
  for (const field of TRAVELLER_FIELDS) raw[field] = form.get(field);
  const parsed = travellerSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }
  const v = parsed.data;

  const existing = await prisma.traveller.findUnique({ where: { enquiryId_position: { enquiryId: enquiry.id, position } } });
  const photo = fileOf(form, "photo");
  const passport = fileOf(form, "passport");
  const additionalVisa = fileOf(form, "additionalVisa");
  const eVisa = fileOf(form, "eVisa");

  const fileErrors: Record<string, string[]> = {};
  if (!photo && !existing) fileErrors.photo = ["Required"];
  if (!passport && !existing) fileErrors.passport = ["Required"];
  if (v.hasOtherVisa === "yes" && !additionalVisa && !existing?.additionalVisaPath) fileErrors.additionalVisa = ["Required"];
  if (Object.keys(fileErrors).length) {
    return NextResponse.json({ error: "Please upload the required documents.", details: fileErrors }, { status: 400 });
  }

  const newPaths: string[] = [];
  try {
    const store = async (kind: string, file: File | null, current: string | null | undefined, imagesOnly = false) => {
      if (!file) return current ?? null;
      const p = await saveUpload(enquiry.id, position, kind, file, { imagesOnly });
      newPaths.push(p);
      return p;
    };
    const photoPath = (await store("photo", photo, existing?.photoPath, true))!;
    const passportPath = (await store("passport", passport, existing?.passportPath))!;
    const additionalVisaPath =
      v.hasOtherVisa === "yes" ? await store("additional", additionalVisa, existing?.additionalVisaPath) : null;
    const eVisaPath = await store("evisa", eVisa, existing?.eVisaPath);

    const hasOther = v.hasOtherVisa === "yes";
    const data = {
      nationality: v.nationality,
      countryOfResidence: v.countryOfResidence,
      dateOfBirth: v.dateOfBirth,
      documentType: v.documentType,
      purposeOfTrip: v.purposeOfTrip,
      hasOtherVisa: hasOther,
      conditionsAcceptedAt: new Date(),
      familyName: v.familyName,
      firstName: v.firstName,
      placeOfBirth: v.placeOfBirth,
      phone: v.phone,
      email: v.email,
      occupation: v.occupation,
      passportNumber: v.passportNumber,
      issuedBy: v.issuedBy,
      dateOfIssue: v.dateOfIssue,
      expiryDate: v.expiryDate,
      additionalVisaType: hasOther ? (v.additionalVisaType ?? null) : null,
      additionalVisaFrom: hasOther ? (v.additionalVisaFrom ?? null) : null,
      additionalVisaUntil: hasOther ? (v.additionalVisaUntil ?? null) : null,
      additionalVisaEntries: hasOther ? (v.additionalVisaEntries ?? null) : null,
      additionalVisaNumber: hasOther ? (v.additionalVisaNumber ?? null) : null,
      arrivalDate: v.arrivalDate,
      departureDate: v.departureDate,
      ukShareCode: v.ukShareCode || null,
      photoPath,
      passportPath,
      additionalVisaPath,
      eVisaPath,
    };
    await prisma.traveller.upsert({
      where: { enquiryId_position: { enquiryId: enquiry.id, position } },
      create: { enquiryId: enquiry.id, position, ...data },
      update: data,
    });

    // Traveller 1 is the main applicant: name, visa type and travel date are derived, never asked twice.
    if (position === 1) {
      await prisma.enquiry.update({
        where: { id: enquiry.id },
        data: {
          fullName: `${v.firstName} ${v.familyName}`.trim(),
          visaType: visaTypeFor(v.purposeOfTrip),
          travelDate: v.arrivalDate,
        },
      });
    }

    // Replaced / no-longer-needed files are removed only after the record is safely stored.
    if (existing) {
      if (photo) await deleteUpload(existing.photoPath);
      if (passport) await deleteUpload(existing.passportPath);
      if (existing.additionalVisaPath && existing.additionalVisaPath !== additionalVisaPath) await deleteUpload(existing.additionalVisaPath);
      if (eVisa) await deleteUpload(existing.eVisaPath);
    }

    if (enquiry.detailsCompletedAt) {
      await prisma.enquiry.update({ where: { id: enquiry.id }, data: { detailsCompletedAt: null } });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    for (const p of newPaths) await deleteUpload(p);
    if (err instanceof UploadError) {
      const kind = err.message.includes("photo") ? "photo" : "passport";
      return NextResponse.json({ error: err.message, details: { [kind]: [err.message] } }, { status: 400 });
    }
    console.error("Failed to save traveller", err);
    return NextResponse.json({ error: "Could not save these details. Please try again." }, { status: 500 });
  }
}
