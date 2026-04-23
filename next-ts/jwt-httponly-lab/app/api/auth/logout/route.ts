// 로그아웃 처리
import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json(
    {
      message: '로그아웃 완료'
    },
    { status: 200 }
  );

  const cookieName = process.env.TOKEN_COOKIE_NAME || 'token';

  // 브라우저가 더이상 JWT를 보내지 않음
  response.cookies.set(cookieName, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 0 // 토큰 쿠키 즉시 만료
  });
  // 서버는 이를 인증 정보 없음으로 판단
  return response;
}