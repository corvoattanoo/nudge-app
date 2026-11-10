
import { NextRequest, NextResponse } from "next/server";


export function middleware(request: NextRequest) {
  console.log("Middleware hit: ", request.nextUrl.pathname);
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register");
  const isProtectedPage = pathname.startsWith('/events') || pathname.startsWith("/groups") ||
  pathname.startsWith("/plans");

  if (isProtectedPage && !token) {
    const loginUrl = new URL("/login", request.url);
    // save redirct url so after loging in return that url
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  
  return NextResponse.next();

}

export const config = {
  matcher: [
    "/events/:path*",
    "/groups/:path*",
    "/plans/:path*",
    "/login",
    "/register",
  ],
};