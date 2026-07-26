import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("jwt");
  const { pathname } = request.nextUrl;

  // User is logged in and tries to access login page
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // User is not logged in and tries to access protected pages
  if (
    !token &&
    (pathname === "/" || pathname.startsWith("/customers") || pathname.startsWith("/dashboard") || pathname.startsWith("/token"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/customers/:path*",
    "/dashboard/:path*",
    "/token/:path*"
  ],
};