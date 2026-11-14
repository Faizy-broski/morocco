import { NextResponse, after } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { AlreadyPaidError, createCheckoutUrl } from "@/app/lib/payments";
import { rateLimit } from "@/app/lib/rateLimit";
import { sendApplicationSubmitted } from "@/app/lib/email";

type Ctx = { params: Promise<{ token: string }> };

/** Confirms every traveller is saved, then starts Stripe Checkout. */
export async function POST(request: Request, { params }: Ctx) {
  if (!rateLimit(request, "complete", 15)) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }
  const { token } = await params;

  const enquiry = await prisma.enquiry.findUnique({
    where: { accessToken: token },
    include: { travellerDetails: { orderBy: { position: "asc" } } },
  });
  if (!enquiry) return NextResponse.json({ error: "Application not found" }, { status: 404 });
  if (enquiry.paymentStatus !== "unpaid") {
    return NextResponse.json({ error: "This application has already been paid." }, { status: 409 });
  }

  const saved = new Set(enquiry.travellerDetails.map((t) => t.position));
  const missing: number[] = [];
  for (let i = 1; i <= enquiry.travellers; i++) if (!saved.has(i)) missing.push(i);
  if (missing.length) {
    return NextResponse.json({ error: `Details are missing for traveller ${missing.join(", ")}.`, missing }, { status: 400 });
  }

  const firstTime = !enquiry.detailsCompletedAt;
  const completed = firstTime
    ? await prisma.enquiry.update({ where: { id: enquiry.id }, data: { detailsCompletedAt: new Date() } })
    : enquiry;

  // Tell the admin once, after the response, that a full application is heading to payment.
  if (firstTime) {
    const travellers = enquiry.travellerDetails;
    after(async () => {
      await sendApplicationSubmitted(completed, travellers).catch((err) => console.error("Admin notification failed", err));
    });
  }

  try {
    const url = await createCheckoutUrl(completed);
    return NextResponse.json({ url });
  } catch (err) {
    if (err instanceof AlreadyPaidError) {
      return NextResponse.json({ error: "This application has already been paid." }, { status: 409 });
    }
    console.error("Checkout creation failed", err);
    return NextResponse.json(
      { error: "Your details are saved, but we couldn't open the payment page. Please try again." },
      { status: 502 }
    );
  }
}
