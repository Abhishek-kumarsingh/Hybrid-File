import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';
import { rateLimiter } from './lib/middleware/rateLimiter';
export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // Admin routes protection
    if (path.startsWith("/admin") && token?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }

    // Agent routes protection
    if (path.startsWith("/agent") && !["ADMIN", "AGENT"].includes(token?.role)) {
      return NextResponse.redirect(new URL("/auth/sign-in", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // Apply rate limiting to login requests
  if (pathname === '/api/auth/login' || pathname.startsWith('/api/auth/callback')) {
    const limiterResponse = await rateLimiter(req);
    if (!limiterResponse.success) {
      return new NextResponse(
        JSON.stringify({
          error: 'Too many login attempts, please try again later'
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': limiterResponse.retryAfter || '60'
          }
        }
      );
    }
  }

  // Protected API routes
  if (pathname.startsWith('/api') &&
    !pathname.startsWith('/api/auth') &&
    !pathname.startsWith('/api/properties/search') &&
    !pathname.startsWith('/api/properties/featured') &&
    !pathname.startsWith('/api/properties')) {

    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    // Check if the user is authenticated
    if (!session) {
      return new NextResponse(
        JSON.stringify({ error: 'Authentication required' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Role-based access for admin routes
    if (pathname.startsWith('/api/admin') && session.role !== 'ADMIN') {
      return new NextResponse(
        JSON.stringify({ error: 'Admin access required' }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Role-based access for agent routes
    if (pathname.startsWith('/api/agents/performance') &&
      session.role !== 'ADMIN' &&
      session.role !== 'AGENT') {
      return new NextResponse(
        JSON.stringify({ error: 'Agent or admin access required' }),
        {
          status: 403,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }
  }

  // Protected admin pages
  if (pathname.startsWith('/app/(admin)') || pathname === '/app/(admin)') {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!session || session.role !== 'ADMIN') {
      const url = new URL('/auth/sign-in', req.url);
      url.searchParams.set('callbackUrl', encodeURI(pathname));
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/dashboards/:path*",
    "/admin/:path*",
    "/agent/:path*",
    "/property/add/:path*",
    "/customers/add/:path*",
    "/messages/:path*",
    "/orders/:path*",
    '/api/:path*',
    '/app/(admin)/:path*',
    '/app/(admin)'
  ],
};