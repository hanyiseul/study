import { NextRequest } from 'next/server';
import { RowDataPacket } from 'mysql2';
import pool from '@/lib/db';
import { getSessionUser } from '@/lib/session';
import { forbidden, ok, unauthorized } from '@/lib/responses';

type CountRow = RowDataPacket & {
  totalCount: number;
};

export async function GET(request: NextRequest) {
  const admin = await getSessionUser();

  if (!admin) {
    return unauthorized();
  }

  if (admin.role !== 'admin') {
    return forbidden();
  }

  const searchParams = request.nextUrl.searchParams;

  const page = Number(searchParams.get('page') || 1);
  const limit = Number(searchParams.get('limit') || 10);
  const status = searchParams.get('status') || '';
  const keyword = searchParams.get('keyword') || '';

  const safePage = page > 0 ? page : 1;
  const safeLimit = limit > 0 ? limit : 10;
  const offset = (safePage - 1) * safeLimit;

  const whereConditions: string[] = [];
  const whereValues: unknown[] = [];

  if (
    status === 'pending' ||
    status === 'approved' ||
    status === 'rejected'
  ) {
    whereConditions.push('r.status = ?');
    whereValues.push(status);
  }

  if (keyword) {
    whereConditions.push(
      `(
        u.name LIKE ?
        OR u.email LIKE ?
        OR a.account_number LIKE ?
        OR a.account_name LIKE ?
        OR r.reason LIKE ?
      )`
    );

    whereValues.push(
      `%${keyword}%`,
      `%${keyword}%`,
      `%${keyword}%`,
      `%${keyword}%`,
      `%${keyword}%`
    );
  }

  const whereSql =
    whereConditions.length > 0
      ? `WHERE ${whereConditions.join(' AND ')}`
      : '';

  const [countRows] = await pool.query<CountRow[]>(
    `
    SELECT COUNT(*) AS totalCount
    FROM account_close_requests r
    JOIN users u ON r.user_id = u.id
    JOIN accounts a ON r.account_id = a.id
    ${whereSql}
    `,
    whereValues
  );

  const totalCount = Number(countRows[0]?.totalCount || 0);
  const totalPages = Math.ceil(totalCount / safeLimit);

  const [rows] = await pool.query(
    `
    SELECT
      r.id,
      r.account_id,
      r.user_id,
      u.name AS user_name,
      u.email AS user_email,
      a.account_number,
      a.account_name,
      a.balance,
      a.status AS account_status,
      r.reason,
      r.status,
      r.admin_memo,
      r.requested_at,
      r.processed_at,
      r.processed_by,
      admin_user.name AS processed_by_name
    FROM account_close_requests r
    JOIN users u ON r.user_id = u.id
    JOIN accounts a ON r.account_id = a.id
    LEFT JOIN users admin_user ON r.processed_by = admin_user.id
    ${whereSql}
    ORDER BY r.id DESC
    LIMIT ? OFFSET ?
    `,
    [...whereValues, safeLimit, offset]
  );

  return ok({
    requests: rows,
    pagination: {
      page: safePage,
      limit: safeLimit,
      totalCount,
      totalPages
    },
    filters: {
      status,
      keyword
    }
  });
}