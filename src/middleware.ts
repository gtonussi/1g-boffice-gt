import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  console.log("Token from cookies:", token);

  //Note from developer: This would be a good place to validate the token.
  const isAutorized = token && token.length > 0;

  if (!isAutorized) {
    console.log("Unauthorized access attempt detected.");
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!login|register|_next|favicon.ico).*)"],
};
