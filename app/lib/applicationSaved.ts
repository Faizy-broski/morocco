import type { Traveller } from "@prisma/client";

const d = (v: Date | null) => (v ? v.toISOString().slice(0, 10) : "");

/** Draft data the wizard needs to pre-fill a traveller (never includes file paths). */
export function toSavedTravellers(travellers: Traveller[]) {
  return travellers.map((t) => ({
    position: t.position,
    values: {
      nationality: t.nationality,
      countryOfResidence: t.countryOfResidence,
      dateOfBirth: d(t.dateOfBirth),
      documentType: t.documentType,
      purposeOfTrip: t.purposeOfTrip,
      hasOtherVisa: t.hasOtherVisa ? "yes" : "no",
      familyName: t.familyName,
      firstName: t.firstName,
      placeOfBirth: t.placeOfBirth,
      phone: t.phone,
      email: t.email,
      occupation: t.occupation,
      passportNumber: t.passportNumber,
      issuedBy: t.issuedBy,
      dateOfIssue: d(t.dateOfIssue),
      expiryDate: d(t.expiryDate),
      additionalVisaType: t.additionalVisaType ?? "",
      additionalVisaFrom: d(t.additionalVisaFrom),
      additionalVisaUntil: d(t.additionalVisaUntil),
      additionalVisaEntries: t.additionalVisaEntries ?? "",
      additionalVisaNumber: t.additionalVisaNumber ?? "",
      arrivalDate: d(t.arrivalDate),
      departureDate: d(t.departureDate),
      ukShareCode: t.ukShareCode ?? "",
    } as Record<string, string>,
    hasFiles: {
      photo: true,
      passport: true,
      additionalVisa: Boolean(t.additionalVisaPath),
      eVisa: Boolean(t.eVisaPath),
    },
  }));
}

export type SavedTraveller = ReturnType<typeof toSavedTravellers>[number];
