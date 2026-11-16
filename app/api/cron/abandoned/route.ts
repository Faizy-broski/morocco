import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import type { Enquiry, Traveller } from "@prisma/client";
import { sendAbandonedDigest, sendPaymentReminder } from "@/app/lib/email";

const ABANDON_AFTER_MS = 60 * 60 * 1000;

/** Hourly sweep (VPS cron). Marks stale unpaid applications as abandoned, alerts admin once, reminds customer once. */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cutoff = new Date(Date.now() - ABANDON_AFTER_MS);
  const stale = await prisma.enquiry.findMany({
    where: {
      paymentStatus: "unpaid",
      reminderSentAt: null,
      OR: [{ createdAt: { lt: cutoff } }, { abandonedAt: { not: null } }],
      // Don't chase people who are still actively filling the form in.
      updatedAt: { lt: cutoff },
    },
    include: { travellerDetails: { orderBy: { position: "asc" } } },
    take: 100,
  });

  const now = new Date();
  const items: { enquiry: Enquiry; travellers: Traveller[] }[] = [];
  for (const e of stale) {
    const updated = await prisma.enquiry.update({
      where: { id: e.id },
      data: {
        abandonedAt: e.abandonedAt ?? now,
        abandonReason: e.abandonReason ?? (e.detailsCompletedAt ? "Reached payment, did not pay" : "Did not finish application"),
        reminderSentAt: now,
      },
    });
    items.push({ enquiry: updated, travellers: e.travellerDetails });
    // Customer reminder (only if they gave a usable email).
    await sendPaymentReminder(updated, e.travellerDetails).catch((err) => console.error("Reminder failed", err));
  }
  await sendAbandonedDigest(items).catch((err) => console.error("Digest failed", err));

  return NextResponse.json({ processed: items.length });
}
