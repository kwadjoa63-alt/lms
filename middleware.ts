import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  try {
    // Skip middleware for static files and API routes
    if (request.nextUrl.pathname.startsWith('/_next/') ||
        request.nextUrl.pathname.startsWith('/api/') ||
        request.nextUrl.pathname.startsWith('/favicon.ico') ||
        request.nextUrl.pathname.startsWith('/public/')) {
      return NextResponse.next();
    }
    
    // Check if we have required environment variables
    const hasAuthSecret = !!process.env.AUTH_SECRET;
    const hasDatabaseUrl = !!process.env.DATABASE_URL;
    
    if (!hasAuthSecret || !hasDatabaseUrl) {
      console.warn('Missing required environment variables for middleware');
      // Still allow requests to pass through
      return NextResponse.next();
    }
    
    // For now, allow all requests to pass through
    // This prevents middleware errors during deployment
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    // Always return next() to prevent blocking requests
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - sign-in and sign-up pages (to avoid redirect loops)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public|sign-in|sign-up).*)',
  ],
};
 
