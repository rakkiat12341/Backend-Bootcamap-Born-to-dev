import { NextResponse } from "next/server";

export function middleware(req) {
  return NextResponse.redirect(new URL("/", req.url));
}

export const config = {
  matcher: "/admin/:path*",
};
