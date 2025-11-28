import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const cookie = req.cookies.get('firebaseAuthToken');
  const hasToken = !!cookie;

  // 🔥 未ログインで /admin 配下なら 404
  if (!hasToken && req.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.json({ message: 'Not Found' }, { status: 404 });
  }

  return NextResponse.next();
}

// 対象パス設定（これ重要！）
export const config = {
  matcher: ['/admin/:path*'],
};
