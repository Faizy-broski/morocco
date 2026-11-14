import "server-only";
import type Stripe from "stripe";
import type { Enquiry } from "@prisma/client";
import { prisma } from "@/app/lib/prisma";
import { getStripe } from "@/app/lib/stripe";
import { PROCESSING_OPTIONS } from "@/app/lib/constants";
import { SITE_URL } from "@/app/lib/site";
import { sendPaymentConfirmation } from "@/app/lib/email";

export class AlreadyPaidError extends Error {}
export class DetailsIncompleteError extends Error {}

/** Create (or reuse a still-open) Checkout Session for an unpaid enquiry. Returns the hosted URL. */
export async function createCheckoutUrl(enquiry: Enquiry): Promise<string> {
  if (enquiry.paymentStatus !== "unpaid") throw new AlreadyPaidError("Enquiry is not awaiting payment");
  if (!enquiry.detailsCompletedAt) throw new DetailsIncompleteError("Application details are not complete");
  const stripe = getStripe();

  if (enquiry.stripeSessionId) {
    const existing = await stripe.checkout.sessions.retrieve(enquiry.stripeSessionId);
    if (existing.payment_status === "paid") {
      await markPaidFromSession(existing);
      throw new AlreadyPaidError("Enquiry is already paid");
    }
    if (existing.status === "open" && existing.url) return existing.url;
  }

  const option = PROCESSING_OPTIONS.find((p) => p.value === enquiry.processing);
  const code = encodeURIComponent(enquiry.trackingCode);
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: enquiry.email,
    client_reference_id: enquiry.id,
    line_items: [
      {
        quantity: enquiry.travellers,
        price_data: {
          currency: "gbp",
          unit_amount: enquiry.amountPence / enquiry.travellers,
          product_data: {
            name: `Morocco Visa – ${option?.name ?? enquiry.processing} (${option?.time ?? ""})`,
            description: `${enquiry.visaType} · Ref ${enquiry.trackingCode}`,
          },
        },
      },
    ],
    metadata: { enquiryId: enquiry.id, trackingCode: enquiry.trackingCode },
    payment_intent_data: {
      description: `Morocco visa ${enquiry.trackingCode}`,
      metadata: { enquiryId: enquiry.id, trackingCode: enquiry.trackingCode },
    },
    expires_at: Math.floor(Date.now() / 1000) + 60 * 60,
    success_url: `${SITE_URL}/track?code=${code}&paid=1`,
    cancel_url: `${SITE_URL}/track?code=${code}&cancelled=1`,
  });

  await prisma.enquiry.update({ where: { id: enquiry.id }, data: { stripeSessionId: session.id } });
  if (!session.url) throw new Error("Stripe returned no checkout URL");
  return session.url;
}

/** Idempotent: flips unpaid -> paid exactly once and sends receipts only on that transition. */
export async function markPaidFromSession(session: Stripe.Checkout.Session): Promise<boolean> {
  if (session.payment_status !== "paid") return false;
  const enquiryId = session.metadata?.enquiryId ?? session.client_reference_id;
  if (!enquiryId) {
    console.error("Paid session without enquiry reference", session.id);
    return false;
  }
  const enquiry = await prisma.enquiry.findUnique({ where: { id: enquiryId } });
  if (!enquiry) {
    console.error("Paid session for missing enquiry", session.id, enquiryId);
    return false;
  }
  if (session.amount_total !== enquiry.amountPence || session.currency !== "gbp") {
    console.error("Payment amount mismatch", session.id, session.amount_total, enquiry.amountPence);
    return false;
  }
  const paymentIntentId =
    typeof session.payment_intent === "string" ? session.payment_intent : (session.payment_intent?.id ?? null);

  const paidAt = new Date();
  const { count } = await prisma.enquiry.updateMany({
    where: { id: enquiry.id, paymentStatus: "unpaid" },
    data: { paymentStatus: "paid", paidAt, stripeSessionId: session.id, stripePaymentIntentId: paymentIntentId },
  });
  if (count === 1) {
    try {
      const travellers = await prisma.traveller.findMany({ where: { enquiryId: enquiry.id }, orderBy: { position: "asc" } });
      await sendPaymentConfirmation({ ...enquiry, paymentStatus: "paid", paidAt }, travellers);
    } catch (err) {
      console.error("Payment confirmation email failed", err);
    }
  }
  return count === 1;
}

/** Fallback when the webhook is late: ask Stripe directly about this enquiry's session. */
export async function reconcileEnquiry(enquiry: { paymentStatus: string; stripeSessionId: string | null }) {
  if (enquiry.paymentStatus !== "unpaid" || !enquiry.stripeSessionId) return;
  try {
    const session = await getStripe().checkout.sessions.retrieve(enquiry.stripeSessionId);
    await markPaidFromSession(session);
  } catch (err) {
    console.error("Stripe reconcile failed", err);
  }
}
