import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/app/lib/prisma";
import { rateLimit } from "@/app/lib/rateLimit";
import { TRAVELLER_FIELDS } from "@/app/lib/applicationFields";
import { visaTypeFor } from "@/app/lib/constants";

type Ctx = { params: Promise<{ token: string }> };

const ALLOWED = new Set<string>([...TRAVELLER_FIELDS, "_dial", "_step", "conditionsAccepted"]);

/**
 * Autosave of a traveller's in-progress answers (no files), so the admin can see what a customer entered
 * even if they never finish, and the customer can resume later.
 */
export async function PUT(request: Request, { params }: Ctx) {
  if (!rateLimit(request, "draft", 120)) return NextResponse.json({ ok: true });
  const { token } = await params;

  let body: { position?: unknown; values?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
  const position = Number(body.position);
  if (!Number.isInteger(position) || position < 1 || position > 20 || typeof body.values !== "object" || !body.values) {
    return NextResponse.json({ error: "Invalid draft" }, { status: 400 });
  }

  const clean: Record<string, string> = {};
  for (const [k, val] of Object.entries(body.values as Record<string, unknown>)) {
    if (ALLOWED.has(k) && typeof val === "string") clean[k] = val.slice(0, 500);
  }
  // A phone number typed without its dial code is stored as-is next to _dial.
  const enquiry = await prisma.enquiry.findUnique({ where: { accessToken: token } });
  if (!enquiry) return NextResponse.json({ error: "Application not found" }, { status: 404 });
  if (enquiry.paymentStatus !== "unpaid") return NextResponse.json({ ok: true });
  if (position > enquiry.travellers) return NextResponse.json({ error: "Invalid traveller number" }, { status: 400 });

  const draft = ((enquiry.draft as Record<string, Record<string, string>> | null) ?? {}) as Record<string, Record<string, string>>;
  draft[String(position)] = { ...(draft[String(position)] ?? {}), ...clean };

  const data: Prisma.EnquiryUpdateInput = { draft };
  if (position === 1 && !enquiry.detailsCompletedAt) {
    const first = clean.firstName?.trim();
    const family = clean.familyName?.trim();
    if (first || family) data.fullName = `${first ?? ""} ${family ?? ""}`.trim();
    if (clean.purposeOfTrip) data.visaType = visaTypeFor(clean.purposeOfTrip);
    const arrival = clean.arrivalDate ? new Date(clean.arrivalDate) : null;
    if (arrival && !isNaN(arrival.getTime())) data.travelDate = arrival;
  }
  await prisma.enquiry.update({ where: { id: enquiry.id }, data });
  return NextResponse.json({ ok: true });
}
