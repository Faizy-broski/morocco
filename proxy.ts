import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/session";

const loginPath = "/admin/login";

export default async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtected = path.startsWith("/admin") && path !== loginPath;

  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (isProtected && !session?.admin) {
    return NextResponse.redirect(new URL(loginPath, req.nextUrl));
  }

  if (path === loginPath && session?.admin) {
    return NextResponse.redirect(new URL("/admin", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.(?:png|webp|jpg|jpeg|svg|ico)$).*)"],
};
