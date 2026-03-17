import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth';

const protectedRoutes = ['/dashboard'];
const publicRoutes = ['/login', '/'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = req.cookies.get('session')?.value;
  const session = cookie ? await decrypt(cookie).catch(() => null) : null;

  if (isProtectedRoute) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.nextUrl));
    }

    // Role-based Access Control (RBAC)
    const role = session.role;

    // Admin only routes
    if (path.startsWith('/dashboard/users') && role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    }

    // Admin & Manager routes
    const managerRoutes = ['/dashboard/services', '/dashboard/inventory', '/dashboard/reports', '/dashboard/employees'];
    const isManagerRoute = managerRoutes.some(route => path.startsWith(route));
    if (isManagerRoute && role === 'CASHIER') {
      return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
    }
  }

  if (isPublicRoute && session && !path.startsWith('/dashboard') && path !== '/') {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
