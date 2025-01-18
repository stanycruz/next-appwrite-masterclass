import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { privateRoutes, publicRoutes } from './constants';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  try {
    // get the route path
    const path = request.nextUrl.pathname;
    const isPublicRoute = publicRoutes.includes(path);
    const isPrivateRoute = privateRoutes.includes(path);

    const token = request.cookies.get('token')?.value;

    // scenario 1: if the user is logged in and trying to access public route, then redirect to dashboard
    if (token && isPublicRoute) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    // scenario 2: if the user is not logged in and trying to access private route, then redirect to login page
    if (!token && isPrivateRoute) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.log(error);
  }
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
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
