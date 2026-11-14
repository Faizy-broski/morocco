import { z } from "zod";
import { PROCESSING_OPTIONS } from "@/app/lib/constants";

export const enquirySchema = z.object({
  email: z.email().trim(),
  processing: z.enum(PROCESSING_OPTIONS.map((o) => o.value) as [string, ...string[]]),
  travellers: z.coerce.number().int().min(1).max(20),
  source: z.enum(["homepage", "contact"]),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
