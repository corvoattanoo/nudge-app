import next from "next";
import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log("Middleware hit: ", request.nextUrl.pathname);
  const token = request.cookies.get("token");

  if(!token){
    return NextResponse.redirect(new URL("/login", request.url))
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/events/:path*",
    "/groups/:path*",
    "/plans/:path*",
  ],
};