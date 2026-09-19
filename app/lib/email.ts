import "server-only";
import { Resend } from "resend";
import type { Enquiry } from "@prisma/client";

export async function sendEnquiryNotification(enquiry: Enquiry) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set — skipping enquiry notification email");
    return;
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Morocco Visa Service <onboarding@resend.dev>",
      to: process.env.ADMIN_NOTIFICATION_EMAIL!,
      subject: `New enquiry: ${enquiry.fullName} (${enquiry.visaType})`,
      html: `
        <p><strong>Name:</strong> ${enquiry.fullName}</p>
        <p><strong>Email:</strong> ${enquiry.email}</p>
        <p><strong>Visa Type:</strong> ${enquiry.visaType}</p>
        <p><strong>Travel Date:</strong> ${enquiry.travelDate.toLocaleString()}</p>
        <p><strong>Travellers:</strong> ${enquiry.travellers}</p>
        <p><strong>Source:</strong> ${enquiry.source}</p>
      `,
    });
  } catch (err) {
    console.error("Failed to send enquiry notification email", err);
  }
}
