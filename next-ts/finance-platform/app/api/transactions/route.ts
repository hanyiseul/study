import { NextRequest } from 'next/server';
import { RowDataPacket } from 'mysql2';
import pool from '@/lib/db';
import { getSessionUser } from '@/lib/session';
import { ok, unauthorized } from '@/lib/responses';

export async function GET(request: NextRequest) {
  const user = await getSessionUser();

  if (!user) {
    return unauthorized();
  }

  const { searchParams } = new URL(request.url);

  const page = Number(searchParams.get('page') || 1);
  const limit = Number(searchParams.get('limit') || 10);
  const offset = (page - 1) * limit;

  // 전체 개수 조회
  const [[countRow]] = await pool.query<RowDataPacket[]>(
    `
    SELECT COUNT(*) as totalCount
    FROM account_transactions
    WHERE user_id = ?
    `,
    [user.userId]
  );

  const totalCount = countRow.totalCount;
  const totalPages = Math.ceil(totalCount / limit);

  // 실제 데이터 조회 (페이지네이션 적용)
  const [rows] = await pool.query<RowDataPacket[]>(
    `
    SELECT
      at.id,
      at.account_id,
      a.account_name,
      at.transaction_type,
      at.amount,
      at.memo,
      at.created_at
    FROM account_transactions at
    JOIN accounts a ON at.account_id = a.id
    WHERE at.user_id = ?
    ORDER BY at.id DESC
    LIMIT ? OFFSET ?
    `,
    [user.userId, limit, offset]
  );

  // 프론트에서 기대하는 구조로 반환
  return ok({
    transactions: rows,
    pagination: {
      page,
      limit,
      totalCount,
      totalPages
    }
  });
}