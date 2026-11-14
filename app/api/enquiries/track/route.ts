import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { reconcileEnquiry } from "@/app/lib/payments";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code")?.trim().toUpperCase();

  if (!code) {
    return NextResponse.json({ error: "Missing tracking code" }, { status: 400 });
  }

  const enquiry = await prisma.enquiry.findUnique({
    where: { trackingCode: code },
    select: {
      trackingCode: true,
      fullName: true,
      visaType: true,
      processing: true,
      travelDate: true,
      travellers: true,
      status: true,
      paymentStatus: true,
      amountPence: true,
      stripeSessionId: true,
      detailsCompletedAt: true,
      createdAt: true,
    },
  });

  if (!enquiry) {
    return NextResponse.json({ error: "No enquiry found for that tracking code" }, { status: 404 });
  }

  // If the webhook is late (customer just returned from Stripe), confirm with Stripe directly.
  if (enquiry.paymentStatus === "unpaid" && searchParams.get("paid") === "1") {
    await reconcileEnquiry(enquiry);
    const fresh = await prisma.enquiry.findUnique({ where: { trackingCode: code }, select: { paymentStatus: true } });
    if (fresh) enquiry.paymentStatus = fresh.paymentStatus;
  }

  const { stripeSessionId: _omit, ...safe } = enquiry;
  void _omit;
  return NextResponse.json({ enquiry: safe });
}
