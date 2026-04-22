import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getSessionUser } from '@/lib/session';

export async function GET() {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json(
      { message: '인증이 필요합니다.' },
      { status: 401 }
    );
  }

  const [rows] = await pool.query(
    `
    SELECT id, account_number, account_name, balance, status, created_at
    FROM accounts
    WHERE user_id = ?
    ORDER BY id ASC
    `,
    [user.userId]
  );

  return NextResponse.json({ accounts: rows });
}