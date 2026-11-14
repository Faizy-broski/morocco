import { NextResponse, after } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { enquirySchema } from "@/app/lib/validation";
import { sendApplicationLink } from "@/app/lib/email";
import { generateTrackingCode } from "@/app/lib/tracking";
import { amountPenceFor } from "@/app/lib/constants";
import crypto from "crypto";
import { rateLimit } from "@/app/lib/rateLimit";

const MAX_TRACKING_CODE_ATTEMPTS = 5;

export async function POST(request: Request) {
  if (!rateLimit(request, "enquiries", 10)) {
    return NextResponse.json({ error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid enquiry data", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  // Price is always computed here from the server-side price list, never taken from the client.
  const amountPence = amountPenceFor(parsed.data.processing, parsed.data.travellers);

  let enquiry;
  for (let attempt = 0; attempt < MAX_TRACKING_CODE_ATTEMPTS; attempt++) {
    try {
      enquiry = await prisma.enquiry.create({
        data: {
          ...parsed.data,
          // Filled in from traveller 1's details when they are saved
          fullName: "Applicant",
          visaType: "Pending",
          travelDate: new Date(),
          amountPence,
          trackingCode: generateTrackingCode(),
          accessToken: crypto.randomBytes(24).toString("base64url"),
        },
      });
      break;
    } catch (err) {
      const isUniqueViolation =
        typeof err === "object" && err !== null && "code" in err && err.code === "P2002";
      if (!isUniqueViolation || attempt === MAX_TRACKING_CODE_ATTEMPTS - 1) {
        console.error("Failed to create enquiry", err);
        return NextResponse.json({ error: "Could not save your enquiry. Please try again." }, { status: 500 });
      }
    }
  }

  // Emails run after the response is sent, so the customer moves to the next step immediately.
  const saved = enquiry!;
  after(async () => {
    await sendApplicationLink(saved).catch((err) => console.error("Application link email failed", err));
  });

  // Next step: the customer supplies every traveller's details, then pays.
  return NextResponse.json({
    success: true,
    trackingCode: enquiry!.trackingCode,
    applyUrl: `/apply/${enquiry!.accessToken}`,
  });
}
