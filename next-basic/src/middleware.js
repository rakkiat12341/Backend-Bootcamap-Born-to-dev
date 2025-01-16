import { NextResponse } from "next/server";

export function middleware(req) {
  console.log(req.url);
  return NextResponse.next();
}
