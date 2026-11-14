import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { toSavedTravellers } from "@/app/lib/applicationSaved";

type Ctx = { params: Promise<{ token: string }> };

/** Lets the form restore a half-finished application (e.g. after coming back from Stripe). */
export async function GET(_request: Request, { params }: Ctx) {
  const { token } = await params;
  const enquiry = await prisma.enquiry.findUnique({
    where: { accessToken: token },
    include: { travellerDetails: { orderBy: { position: "asc" } } },
  });
  if (!enquiry || enquiry.paymentStatus !== "unpaid") {
    return NextResponse.json({ error: "Not available" }, { status: 404 });
  }
  return NextResponse.json({
    enquiry: { email: enquiry.email, processing: enquiry.processing, travellers: enquiry.travellers },
    saved: toSavedTravellers(enquiry.travellerDetails),
  });
}
