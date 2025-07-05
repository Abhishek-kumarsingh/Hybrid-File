import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is for taking an interview
  const isInterviewTakePath = pathname.match(/^\/dashboard\/interviews\/(.+)\/take$/);

  // Check if the path is for interview API endpoints related to taking an interview
  const isInterviewTakeApi = pathname.match(/^\/api\/interviews\/(.+)\/(responses|questions)$/);

  // Check if it's the main interview API endpoint
  const isInterviewMainApi = pathname.match(/^\/api\/interviews\/(.+)$/);

  // Extract interview ID if it's a take path
  const takePathMatch = isInterviewTakePath ? pathname.match(/^\/dashboard\/interviews\/(.+)\/take$/) : null;
  const interviewId = takePathMatch ? takePathMatch[1] : null;

  // If it's an interview take path or related API, allow access without authentication
  if (isInterviewTakePath || isInterviewTakeApi ||
      (isInterviewMainApi && request.headers.get('referer')?.includes('/take'))) {
    return NextResponse.next();
  }

  // Check if the path is a protected route
  const isProtectedRoute =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/api/interviews');

  // Check if the path is an auth route
  const isAuthRoute =
    pathname.startsWith('/auth/login') ||
    pathname.startsWith('/auth/register');

  // Get the token
  const token = await getToken({ req: request });

  // If the route is protected and the user is not authenticated, redirect to login
  if (isProtectedRoute && !token) {
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(pathname));
    return NextResponse.redirect(url);
  }

  // If the user is authenticated and trying to access auth routes, redirect to dashboard
  if (isAuthRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/interviews/:path*',
    '/auth/login',
    '/auth/register',
  ],
};
