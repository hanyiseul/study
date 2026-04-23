// 로그인 처리
/**
 * 파이프라인
 * 1. 입력값 검증
 * 2. 이메일로 사용자 조회
 * 3. 계정 존재 여부 확인
 * 4. 계정 활성 여부 확인
 * 5. bcrypt 비밀번호 비교
 * 6. jwt 생성
 * 7. jwt를 httpOnly 쿠키에 저장
 * 8. 로그인 성공 응답 반환
 */
import { NextResponse } from 'next/server';
import { RowDataPacket } from 'mysql2';
import pool from '@/lib/db';
import { comparePassword, signToken } from '@/lib/auth';
import { badRequest, unauthorized } from '@/lib/responses';
import { validateLoginInput } from '@/lib/validators';

type LoginUserRow = RowDataPacket & {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive';
};

export async function POST(request: Request) {
  const body = await request.json();
  const validationError = validateLoginInput(body); // 입력값 체크 검증

  if (validationError) { // 미입력시 해당 검증 에러 처리
    return badRequest(validationError);
  }

  const email = body.email.trim();
  const password = body.password.trim();

  const [users] = await pool.query<LoginUserRow[]>(
    `
    SELECT id, name, email, password_hash, role, status
    FROM users
    WHERE email = ?
    LIMIT 1
    `,
    [email]
  );

  if (users.length === 0) {
    return unauthorized('이메일 또는 비밀번호가 올바르지 않습니다.');
  }

  const user = users[0];

  // 비활성 계정 차단
  if (user.status !== 'active') {
    return unauthorized('비활성화된 계정입니다.');
  }

  const isMatched = await comparePassword(password, user.password_hash);

  if (!isMatched) {
    return unauthorized('이메일 또는 비밀번호가 올바르지 않습니다.');
  }

  const token = await signToken({
    userId: user.id,
    email: user.email,
    role: user.role
  });

  const response = NextResponse.json(
    {
      message: '로그인 성공'
    },
    { status: 200 }
  );

  const cookieName = process.env.TOKEN_COOKIE_NAME || 'token';

  // JWT 쿠키 저장
  response.cookies.set(cookieName, token, {
    httpOnly: true, // js에서 접근 불가
    secure: process.env.NODE_ENV === 'production', // 운영환경이면 https에서만 쿠키 전송 / 개발 환경이면 http에서도 허용
    sameSite: 'lax', // csrf 공격 방어 옵션 (대부분 요청 허용)
    path: '/', // 사이트 전체에서 쿠키 사용 가능
    maxAge: 60 * 60 // 쿠키 유지 시간
  });

  return response;
}