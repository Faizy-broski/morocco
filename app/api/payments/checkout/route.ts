import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { AlreadyPaidError, DetailsIncompleteError, createCheckoutUrl } from "@/app/lib/payments";
import { rateLimit } from "@/app/lib/rateLimit";

/** Start (or resume) payment for an existing enquiry, e.g. after cancelling or a failed first attempt. */
export async function POST(request: Request) {
  if (!rateLimit(request, "checkout", 10)) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  let code: string | undefined;
  try {
    const body = await request.json();
    code = typeof body?.trackingCode === "string" ? body.trackingCode.trim().toUpperCase() : undefined;
  } catch {
    // fall through to 400
  }
  if (!code) return NextResponse.json({ error: "Missing tracking code" }, { status: 400 });

  const enquiry = await prisma.enquiry.findUnique({ where: { trackingCode: code } });
  if (!enquiry) return NextResponse.json({ error: "No enquiry found for that tracking code" }, { status: 404 });

  try {
    const url = await createCheckoutUrl(enquiry);
    return NextResponse.json({ url });
  } catch (err) {
    if (err instanceof DetailsIncompleteError) {
      return NextResponse.json(
        { error: "Please complete your application details first.", needsDetails: true },
        { status: 409 }
      );
    }
    if (err instanceof AlreadyPaidError) {
      return NextResponse.json({ error: "This enquiry has already been paid." }, { status: 409 });
    }
    console.error("Checkout creation failed", err);
    return NextResponse.json({ error: "Could not start payment. Please try again." }, { status: 502 });
  }
}
