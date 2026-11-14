import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { enquirySchema } from "@/app/lib/validation";
import { amountPenceFor } from "@/app/lib/constants";
import { getStripe } from "@/app/lib/stripe";
import { deleteUpload } from "@/app/lib/uploads";
import { toSavedTravellers } from "@/app/lib/applicationSaved";
import { rateLimit } from "@/app/lib/rateLimit";

type Ctx = { params: Promise<{ token: string }> };

const updateSchema = enquirySchema.omit({ source: true });

/** Let the customer go back and correct the enquiry (name, visa, date, speed, travellers) before paying. */
export async function PATCH(request: Request, { params }: Ctx) {
  if (!rateLimit(request, "enquiry-edit", 30)) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }
  const { token } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid enquiry data", details: parsed.error.flatten() }, { status: 400 });
  }

  const enquiry = await prisma.enquiry.findUnique({ where: { accessToken: token }, include: { travellerDetails: true } });
  if (!enquiry) return NextResponse.json({ error: "Application not found" }, { status: 404 });
  if (enquiry.paymentStatus !== "unpaid") {
    return NextResponse.json({ error: "This application has already been paid and can no longer be edited." }, { status: 409 });
  }

  const amountPence = amountPenceFor(parsed.data.processing, parsed.data.travellers);

  // Any open Stripe session carries the old amount, so retire it; a fresh one is made at payment time.
  if (enquiry.stripeSessionId) {
    try {
      await getStripe().checkout.sessions.expire(enquiry.stripeSessionId);
    } catch {
      // already expired/completed — a completed one is reconciled by the webhook guard
    }
  }

  // If travellers were reduced, drop the extra saved travellers and their files.
  const extra = enquiry.travellerDetails.filter((t) => t.position > parsed.data.travellers);
  for (const t of extra) {
    await deleteUpload(t.photoPath);
    await deleteUpload(t.passportPath);
    await deleteUpload(t.additionalVisaPath);
    await deleteUpload(t.eVisaPath);
  }

  const updated = await prisma.$transaction(async (tx) => {
    if (extra.length) await tx.traveller.deleteMany({ where: { id: { in: extra.map((t) => t.id) } } });
    return tx.enquiry.update({
      where: { id: enquiry.id },
      data: { ...parsed.data, amountPence, stripeSessionId: null, detailsCompletedAt: null },
      include: { travellerDetails: { orderBy: { position: "asc" } } },
    });
  });

  return NextResponse.json({ success: true, saved: toSavedTravellers(updated.travellerDetails) });
}
