import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { prisma } from "@/app/lib/prisma";
import { getStripe } from "@/app/lib/stripe";
import { markPaidFromSession } from "@/app/lib/payments";

export async function POST(request: Request) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");
  if (!secret || !signature) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 400 });
  }

  // The signature is computed over the raw body, so read it as text before any parsing.
  const rawBody = await request.text();
  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(rawBody, signature, secret);
  } catch (err) {
    console.error("Stripe webhook signature verification failed", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
        // payment_status is "unpaid" for delayed methods on `completed`; it only marks paid when truly paid.
        await markPaidFromSession(event.data.object as Stripe.Checkout.Session);
        break;

      case "charge.refunded": {
        const charge = event.data.object as Stripe.Charge;
        const paymentIntentId = typeof charge.payment_intent === "string" ? charge.payment_intent : charge.payment_intent?.id;
        if (paymentIntentId && charge.refunded) {
          await prisma.enquiry.updateMany({
            where: { stripePaymentIntentId: paymentIntentId, paymentStatus: "paid" },
            data: { paymentStatus: "refunded" },
          });
        }
        break;
      }

      default:
        break;
    }
  } catch (err) {
    // 500 makes Stripe retry; handlers are idempotent so retries are safe.
    console.error("Stripe webhook handler failed", event.type, event.id, err);
    return NextResponse.json({ error: "Handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
