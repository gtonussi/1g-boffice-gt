import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  console.log("Middleware is running...");
  const token = req.cookies.get("token")?.value;

  //Note from developer: This would be a good place to validate the token.
  const isAutorized = !!token;

  if (!isAutorized) {
    console.log("Unauthorized access attempt detected.");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
