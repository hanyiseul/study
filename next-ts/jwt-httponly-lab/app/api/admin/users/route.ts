// 관리자 전용 API
/**
 * 파이프라인
 * 1. 현재 로그인 사용자 확인
 * 2. 로그인 하지 않았으면 401 반환
 * 3. 로그인은 했지만 관리자가 아니면 403 반환
 * 4. 관리자면 전체 사용자 목록 조회
 * 5. JSON 응답 반환
 */
import { RowDataPacket } from 'mysql2';
import pool from '@/lib/db';
import { forbidden, ok, unauthorized } from '@/lib/responses';
import { getSessionUser } from '@/lib/session';

type UserListRow = RowDataPacket & {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive';
  created_at: string;
};

export async function GET() {
  const user = await getSessionUser();

  if (!user) { // 로그인 자체가 안 된 상태
    return unauthorized('인증이 필요합니다.');
  }

  // 관리자 API는 로그인 여부 + role 값까지 검사해야함
  if (user.role !== 'admin') { // 로그인은 되었지만 관리자 권한이 없는 상태
    return forbidden('관리자 권한이 필요합니다.');
  }

  const [rows] = await pool.query<UserListRow[]>(
    `
    SELECT id, name, email, role, status, created_at
    FROM users
    ORDER BY id ASC
    `
  );

  return ok({
    users: rows
  });
}