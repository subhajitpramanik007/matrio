import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./lib/getUser";

const AUTH_ROUTES = ["/auth/signin", "/auth/signup"];
const PROTECTED_ROUTES = ["/dashboard", "/profile"];

export default async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const isAuthRoute = AUTH_ROUTES.some((route) => route === pathname);
  const isProtectedRoute = PROTECTED_ROUTES.some((route) => route === pathname);

  const user = await getUser();

  if (user) {
    const isGuest = user.role === "GUEST";
    const isUser = user.role === "USER";

    if (isUser && (isAuthRoute || pathname === "/")) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (isGuest && isProtectedRoute) {
      return NextResponse.redirect(
        new URL(`/auth/signin?callback=${pathname}`, req.url),
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
