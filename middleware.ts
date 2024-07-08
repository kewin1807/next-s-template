import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(request) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
    const isIndexpage = request.nextUrl.pathname === "/";
    const isAuthRoute = authRoutes.some((route) => request.nextUrl.pathname.startsWith(route));
    const isGuestRoute = guestRoutes.some((route) => request.nextUrl.pathname.startsWith(route));
    if (!token && (isAuthRoute || isIndexpage)) {
      const redirectUrl = new URL("/login", request.url);
      return NextResponse.redirect(redirectUrl);
    }

    if (token) {
      if (isIndexpage || isGuestRoute) {
        return NextResponse.redirect(new URL("/scrape", request.url));
      }
    }
  },
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

const authRoutes = ["/scrape"];
const guestRoutes = ["/login", "/register"];