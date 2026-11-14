import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/session";
import { prisma } from "@/app/lib/prisma";
import { readUpload } from "@/app/lib/uploads";

type Ctx = { params: Promise<{ travellerId: string; kind: string }> };

const TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  pdf: "application/pdf",
};

/** Admin-only download of an uploaded passport scan or photo. */
export async function GET(request: Request, { params }: Ctx) {
  const session = await decrypt((await cookies()).get("session")?.value);
  if (!session?.admin) return new NextResponse("Unauthorized", { status: 401 });

  const { travellerId, kind } = await params;
  if (!["passport", "photo", "evisa", "additional"].includes(kind)) return new NextResponse("Not found", { status: 404 });

  const traveller = await prisma.traveller.findUnique({ where: { id: travellerId } });
  if (!traveller) return new NextResponse("Not found", { status: 404 });

  try {
    const rel = kind === "passport" ? traveller.passportPath : kind === "photo" ? traveller.photoPath : kind === "additional" ? traveller.additionalVisaPath : traveller.eVisaPath;
    if (!rel) return new NextResponse("Not found", { status: 404 });
    const { data, ext } = await readUpload(rel);
    const download = new URL(request.url).searchParams.get("download") === "1";
    const label = { passport: "passport", photo: "photo", additional: "additional-visa", evisa: "uk-e-visa" }[kind];
    const safe = (x: string) => x.replace(/[^A-Za-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const filename = `${safe(traveller.familyName)}-${safe(traveller.firstName)}-${label}.${ext}`;
    return new NextResponse(new Uint8Array(data), {
      headers: {
        "Content-Type": TYPES[ext] ?? "application/octet-stream",
        "Content-Disposition": `${download ? "attachment" : "inline"}; filename="${filename}"`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new NextResponse("File missing", { status: 404 });
  }
}
