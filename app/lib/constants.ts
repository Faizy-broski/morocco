export const VISA_TYPES = ["Tourist Visa", "Business Visa", "Event Visa", "Other Visa"] as const;

/** The visa type is derived from the traveller's purpose of trip. */
export const visaTypeFor = (purpose: string) => `${purpose} Visa`;

export const PROCESSING_OPTIONS = [
  {
    value: "standard",
    name: "Standard",
    price: 120,
    time: "3–5 working days",
  },
  {
    value: "urgent",
    name: "Urgent",
    price: 180,
    time: "Next working day",
  },
] as const;

export type ProcessingValue = (typeof PROCESSING_OPTIONS)[number]["value"];

export function processingLabel(value: string): string {
  const o = PROCESSING_OPTIONS.find((p) => p.value === value);
  return o ? `${o.name} – ${o.time} – £${o.price} per applicant` : value;
}

/** Server-side source of truth for what a customer owes, in pence. */
export function amountPenceFor(processing: string, travellers: number): number {
  const o = PROCESSING_OPTIONS.find((p) => p.value === processing);
  if (!o) throw new Error(`Unknown processing option: ${processing}`);
  return o.price * 100 * travellers;
}
