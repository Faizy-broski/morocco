import { z } from "zod";
import { VISA_TYPES } from "@/app/lib/constants";

export const enquirySchema = z.object({
  fullName: z.string().trim().min(1).max(200),
  email: z.email().trim(),
  visaType: z.enum(VISA_TYPES),
  travelDate: z.coerce.date(),
  travellers: z.coerce.number().int().min(1).max(20),
  source: z.enum(["homepage", "contact"]),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
