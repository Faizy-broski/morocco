"use server";

import { revalidatePath } from "next/cache";
import { verifySession } from "@/app/lib/dal";
import { prisma } from "@/app/lib/prisma";
import { deleteEnquiryUploads } from "@/app/lib/uploads";
import { sendPaymentReminder } from "@/app/lib/email";

export async function updateEnquiryStatus(id: string, status: "new" | "contacted" | "closed") {
  await verifySession();
  await prisma.enquiry.update({ where: { id }, data: { status } });
  revalidatePath("/admin");
}

export async function deleteEnquiry(id: string) {
  await verifySession();
  await prisma.enquiry.delete({ where: { id } });
  await deleteEnquiryUploads(id);
  revalidatePath("/admin");
}

/** Admin-triggered: emails the customer their private link to finish and pay. Never automatic. */
export async function sendReminder(id: string): Promise<{ ok: true } | { ok: false; error: string }> {
  await verifySession();
  const enquiry = await prisma.enquiry.findUnique({ where: { id }, include: { travellerDetails: { orderBy: { position: "asc" } } } });
  if (!enquiry) return { ok: false, error: "Application not found." };
  if (enquiry.paymentStatus !== "unpaid") return { ok: false, error: "This application is already paid." };
  try {
    await sendPaymentReminder(enquiry, enquiry.travellerDetails);
  } catch (err) {
    console.error("Manual reminder failed", err);
    return { ok: false, error: "Email could not be sent. Check the SMTP settings." };
  }
  await prisma.enquiry.update({ where: { id }, data: { reminderSentAt: new Date() } });
  revalidatePath("/admin");
  return { ok: true };
}
