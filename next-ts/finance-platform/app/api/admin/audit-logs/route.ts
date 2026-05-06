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
  const action = searchParams.get('action') || '';
  const targetType = searchParams.get('targetType') || '';
  const keyword = searchParams.get('keyword') || '';
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';

  const safePage = page > 0 ? page : 1;
  const safeLimit = limit > 0 ? limit : 10;
  const offset = (safePage - 1) * safeLimit;

  const whereConditions: string[] = [];
  const whereValues: unknown[] = [];

  if (action) {
    whereConditions.push('l.action = ?');
    whereValues.push(action);
  }

  if (targetType) {
    whereConditions.push('l.target_type = ?');
    whereValues.push(targetType);
  }

  if (keyword) {
    whereConditions.push(
      `(
        u.name LIKE ?
        OR u.email LIKE ?
        OR l.action LIKE ?
        OR l.target_type LIKE ?
        OR l.description LIKE ?
        OR l.ip_address LIKE ?
      )`
    );

    whereValues.push(
      `%${keyword}%`,
      `%${keyword}%`,
      `%${keyword}%`,
      `%${keyword}%`,
      `%${keyword}%`,
      `%${keyword}%`
    );
  }

  if (startDate) {
    whereConditions.push('DATE(l.created_at) >= ?');
    whereValues.push(startDate);
  }

  if (endDate) {
    whereConditions.push('DATE(l.created_at) <= ?');
    whereValues.push(endDate);
  }

  const whereSql =
    whereConditions.length > 0
      ? `WHERE ${whereConditions.join(' AND ')}`
      : '';

  const [countRows] = await pool.query<CountRow[]>(
    `
    SELECT COUNT(*) AS totalCount
    FROM admin_audit_logs l
    LEFT JOIN users u ON l.admin_user_id = u.id
    ${whereSql}
    `,
    whereValues
  );

  const totalCount = Number(countRows[0]?.totalCount || 0);
  const totalPages = Math.ceil(totalCount / safeLimit);

  const [rows] = await pool.query(
    `
    SELECT
      l.id,
      l.admin_user_id,
      u.name AS admin_name,
      u.email AS admin_email,
      l.action,
      l.target_type,
      l.target_id,
      l.description,
      l.before_data,
      l.after_data,
      l.ip_address,
      l.user_agent,
      l.created_at
    FROM admin_audit_logs l
    LEFT JOIN users u ON l.admin_user_id = u.id
    ${whereSql}
    ORDER BY l.id DESC
    LIMIT ? OFFSET ?
    `,
    [...whereValues, safeLimit, offset]
  );

  return ok({
    logs: rows,
    pagination: {
      page: safePage,
      limit: safeLimit,
      totalCount,
      totalPages
    },
    filters: {
      action,
      targetType,
      keyword,
      startDate,
      endDate
    }
  });
}