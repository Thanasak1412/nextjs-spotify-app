// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/', '/playlist', '/library'];

export default function middleware(req: NextRequest) {
  const isProtectedRoute = protectedRoutes.find(
    (p) => p === req.nextUrl.pathname,
  );
  if (isProtectedRoute) {
    const token = req.cookies.get('TRAX_ACCESS_TOKEN');

    if (!token) {
      const url = req.nextUrl.clone();
      url.pathname = '/signin';
      return NextResponse.redirect(url);
    }
  }
}
