import { NextResponse } from "next/server";
import { recordFailure } from "@/app/lib/leads";
import { rateLimit } from "@/app/lib/rateLimit";

type Ctx = { params: Promise<{ token: string }> };

/** The form reports problems the server can't see (network drop, file rejected in the browser). */
export async function POST(request: Request, { params }: Ctx) {
  if (!rateLimit(request, "event", 20)) return NextResponse.json({ ok: true });
  const { token } = await params;
  let reason = "Browser problem";
  try {
    const body = await request.json();
    if (typeof body?.reason === "string") reason = body.reason.slice(0, 300);
  } catch {
    // keep default
  }
  await recordFailure({ token }, "Reported by browser", reason);
  return NextResponse.json({ ok: true });
}
