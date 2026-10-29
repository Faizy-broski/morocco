import "server-only";
import { Resend } from "resend";
import type { Enquiry } from "@prisma/client";

const BUSINESS_EMAIL = "info@moroccovisaservice.com";
const FROM = `Morocco Visa Service <${BUSINESS_EMAIL}>`;
const SITE_URL = "https://moroccovisaservice.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatTravelDate(date: Date) {
  return date.toLocaleString("en-GB", { dateStyle: "long", timeStyle: "short", timeZone: "UTC" }) + " (UTC)";
}

export async function sendEnquiryNotification(enquiry: Enquiry) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set — skipping enquiry emails");
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const name = escapeHtml(enquiry.fullName);
  const email = escapeHtml(enquiry.email);
  const visaType = escapeHtml(enquiry.visaType);
  const travelDate = escapeHtml(formatTravelDate(enquiry.travelDate));
  const code = escapeHtml(enquiry.trackingCode);
  const trackUrl = `${SITE_URL}/track?code=${encodeURIComponent(enquiry.trackingCode)}`;

  const results = await Promise.allSettled([
    resend.emails.send({
      from: FROM,
      to: process.env.ADMIN_NOTIFICATION_EMAIL || BUSINESS_EMAIL,
      replyTo: enquiry.email,
      subject: `New enquiry: ${enquiry.fullName} (${enquiry.visaType}) — ${enquiry.trackingCode}`,
      html: `
        <p><strong>Tracking Code:</strong> ${code}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Visa Type:</strong> ${visaType}</p>
        <p><strong>Travel Date:</strong> ${travelDate}</p>
        <p><strong>Travellers:</strong> ${enquiry.travellers}</p>
        <p><strong>Source:</strong> ${enquiry.source}</p>
      `,
    }),
    resend.emails.send({
      from: FROM,
      to: enquiry.email,
      replyTo: BUSINESS_EMAIL,
      subject: `We've received your enquiry — ${enquiry.trackingCode}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#1f2937;line-height:1.6">
          <h2 style="color:#A32D2F;margin-bottom:4px">Thank you, ${name}!</h2>
          <p>We've received your Morocco visa enquiry. One of our experts will get back to you shortly.</p>
          <div style="background:#f7f6f3;border-radius:12px;padding:16px 20px;margin:20px 0">
            <p style="margin:0;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:#6b7280">Your tracking code</p>
            <p style="margin:4px 0 0;font-size:22px;font-weight:bold;letter-spacing:2px">${code}</p>
          </div>
          <p><strong>Visa Type:</strong> ${visaType}<br>
             <strong>Travel Date:</strong> ${travelDate}<br>
             <strong>Travellers:</strong> ${enquiry.travellers}</p>
          <p><a href="${trackUrl}" style="display:inline-block;background:#A32D2F;color:#fff;text-decoration:none;padding:12px 24px;border-radius:999px;font-weight:bold">Track your enquiry</a></p>
          <p>Questions? Just reply to this email or write to <a href="mailto:${BUSINESS_EMAIL}">${BUSINESS_EMAIL}</a>.</p>
          <p style="color:#6b7280;font-size:13px">— Morocco Visa Service</p>
        </div>
      `,
    }),
  ]);

  for (const result of results) {
    if (result.status === "rejected") {
      console.error("Failed to send enquiry email", result.reason);
    } else if (result.value.error) {
      console.error("Resend rejected enquiry email", result.value.error);
    }
  }
}
