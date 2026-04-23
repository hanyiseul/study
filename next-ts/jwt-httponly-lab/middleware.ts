// 페이지 진입 전에 인증과 인가를 검사하는 Middleware
// Middleware의 역할 : 페이지 접근 차단 -> api 보안은 여전히 api route 내부에서 다시 검사
/**
 * 파이프라인
 * 1. 요청 쿠키에서 토큰 읽기
 * 2. 현재 경로가 보호 대상인지 판별
 * 3. 보호 경로인데 토큰이 없으면 리다이렉트
 * 4. 토큰이 있으면 JWT 검증
 * 5. 관리자 경로면 role 검사
 * 6. 모두 통과하면 페이지 진입 허용
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';

// const protectedPaths = ['로그인사용자', '관리자']
const protectedPaths = ['/practice/user', '/practice/admin'];
const adminPaths = ['/practice/admin'];

export async function middleware(request: NextRequest) {
  const cookieName = process.env.TOKEN_COOKIE_NAME || 'token';
  const token = request.cookies.get(cookieName)?.value;
  const { pathname } = request.nextUrl;

  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  const isAdminPath = adminPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtectedPath && !token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (token) {
    try {
      const user = await verifyToken(token);

      if (isAdminPath && user.role !== 'admin') {
        return NextResponse.redirect(new URL('/practice/user', request.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/practice/user/:path*', '/practice/admin/:path*']
};