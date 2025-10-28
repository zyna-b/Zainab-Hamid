import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { fingerprintFromHeaders, validateSessionTokenOnEdge } from '@/lib/auth-middleware';

const ADMIN_SESSION_COOKIE_NAME = 'zh_admin_session';

function buildRedirectUrl(request: NextRequest, pathname: string) {
  const url = request.nextUrl.clone();
  url.pathname = pathname;
  const target = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  if (pathname === '/admin/login' && target !== '/admin/login') {
    url.searchParams.set('redirect', target);
  } else {
    url.searchParams.delete('redirect');
  }
  return url;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE_NAME)?.value;
  const fingerprint = await fingerprintFromHeaders(request.headers);

  if (pathname.startsWith('/admin/login')) {
    if (!token) {
      return NextResponse.next();
    }
    const session = await validateSessionTokenOnEdge(token, fingerprint);
    if (session) {
      return NextResponse.redirect(buildRedirectUrl(request, '/admin'));
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(buildRedirectUrl(request, '/admin/login'));
  }

  const session = await validateSessionTokenOnEdge(token, fingerprint);
  if (!session) {
    return NextResponse.redirect(buildRedirectUrl(request, '/admin/login'));
  }

  return NextResponse.next();
}

// Force Edge Runtime for middleware
export const runtime = 'edge';

export const config = {
  matcher: ['/admin/:path*'],
};
