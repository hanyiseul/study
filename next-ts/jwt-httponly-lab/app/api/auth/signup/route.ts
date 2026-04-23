// 새 사용자를 생성하는 api
/**
 * 파이프라인
 * 1. 요청 본문 읽기
 * 2. 입력값 검증
 * 3. 이메일 중복 확인
 * 4. 비밀번호 해시 생성
 * 5. db에 사용자 저장
 * 6. 201 created 반환
 */
import { RowDataPacket } from 'mysql2';
import pool from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { created, badRequest } from '@/lib/responses';
import { validateSignupInput } from '@/lib/validators';

type UserRow = RowDataPacket & {
  id: number;
};

export async function POST(request: Request) {
  const body = await request.json();
  const validationError = validateSignupInput(body);

  if (validationError) {
    return badRequest(validationError);
  }

  const name = body.name.trim();
  const email = body.email.trim();
  const password = body.password.trim();

  const [existingUsers] = await pool.query<UserRow[]>(
    `
    SELECT id
    FROM users
    WHERE email = ?
    LIMIT 1
    `,
    [email]
  );

  // 이메일 중복 검사
  if (existingUsers.length > 0) { // 이메일 중복 여부 확인
    return badRequest('이미 사용 중인 이메일입니다.');
  }

  // 비밀번호 해시 저장
  const passwordHash = await hashPassword(password);

  await pool.execute(
    `
    INSERT INTO users (name, email, password_hash, role, status)
    VALUES (?, ?, ?, 'user', 'active')
    `,
    [name, email, passwordHash]
  );

  return created({
    message: '회원가입이 완료되었습니다.'
  });
}