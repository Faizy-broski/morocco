import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code")?.trim().toUpperCase();

  if (!code) {
    return NextResponse.json({ error: "Missing tracking code" }, { status: 400 });
  }

  const enquiry = await prisma.enquiry.findUnique({
    where: { trackingCode: code },
    select: {
      trackingCode: true,
      fullName: true,
      visaType: true,
      travelDate: true,
      travellers: true,
      status: true,
      createdAt: true,
    },
  });

  if (!enquiry) {
    return NextResponse.json({ error: "No enquiry found for that tracking code" }, { status: 404 });
  }

  return NextResponse.json({ enquiry });
}
