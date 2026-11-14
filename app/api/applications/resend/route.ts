import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { sendApplicationLink } from "@/app/lib/email";
import { rateLimit } from "@/app/lib/rateLimit";

/** Re-sends the secure application link. Always answers the same way so it can't be used to probe codes. */
export async function POST(request: Request) {
  if (!rateLimit(request, "resend", 5, 10 * 60_000)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }
  let code = "";
  let email = "";
  try {
    const body = await request.json();
    code = String(body?.trackingCode ?? "").trim().toUpperCase();
    email = String(body?.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (!code || !email) return NextResponse.json({ error: "Tracking code and email are required" }, { status: 400 });

  const enquiry = await prisma.enquiry.findUnique({ where: { trackingCode: code } });
  if (enquiry && enquiry.email.toLowerCase() === email && enquiry.paymentStatus === "unpaid") {
    try {
      await sendApplicationLink(enquiry);
    } catch (err) {
      console.error("Resend application link failed", err);
    }
  }
  return NextResponse.json({ success: true });
}
