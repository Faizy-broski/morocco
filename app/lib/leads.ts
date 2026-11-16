import "server-only";
import { prisma } from "@/app/lib/prisma";
import { sendFailureAlert } from "@/app/lib/email";

const ALERT_THROTTLE_MS = 30 * 60 * 1000;

/**
 * Remember why an application is stuck and alert the admin (at most once per 30 minutes per application).
 * Never throws: failure reporting must not break the request that is already failing.
 */
export async function recordFailure(where: { token?: string; id?: string }, reason: string, detail?: string) {
  try {
    const enquiry = await prisma.enquiry.findUnique({
      where: where.token ? { accessToken: where.token } : { id: where.id! },
      include: { travellerDetails: { orderBy: { position: "asc" } } },
    });
    if (!enquiry || enquiry.paymentStatus !== "unpaid") return;

    const now = new Date();
    const text = detail ? `${reason}: ${detail}`.slice(0, 500) : reason;
    const shouldAlert = !enquiry.failureAlertAt || now.getTime() - enquiry.failureAlertAt.getTime() > ALERT_THROTTLE_MS;

    const updated = await prisma.enquiry.update({
      where: { id: enquiry.id },
      data: {
        lastError: text,
        lastErrorAt: now,
        abandonedAt: enquiry.abandonedAt ?? now,
        abandonReason: enquiry.abandonReason ?? "Technical problem",
        ...(shouldAlert ? { failureAlertAt: now } : {}),
      },
    });
    if (shouldAlert) await sendFailureAlert(updated, enquiry.travellerDetails, text);
  } catch (err) {
    console.error("recordFailure failed", err);
  }
}
