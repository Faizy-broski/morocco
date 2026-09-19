import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { enquirySchema } from "@/app/lib/validation";
import { sendEnquiryNotification } from "@/app/lib/email";
import { generateTrackingCode } from "@/app/lib/tracking";

const MAX_TRACKING_CODE_ATTEMPTS = 5;

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = enquirySchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid enquiry data", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  let enquiry;
  for (let attempt = 0; attempt < MAX_TRACKING_CODE_ATTEMPTS; attempt++) {
    try {
      enquiry = await prisma.enquiry.create({
        data: { ...parsed.data, trackingCode: generateTrackingCode() },
      });
      break;
    } catch (err) {
      const isUniqueViolation =
        typeof err === "object" && err !== null && "code" in err && err.code === "P2002";
      if (!isUniqueViolation || attempt === MAX_TRACKING_CODE_ATTEMPTS - 1) throw err;
    }
  }

  try {
    await sendEnquiryNotification(enquiry!);
  } catch (err) {
    console.error("Enquiry notification failed", err);
  }

  return NextResponse.json({ success: true, trackingCode: enquiry!.trackingCode });
}
