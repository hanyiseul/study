import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getSessionUser } from '@/lib/session';

export async function GET(req: NextRequest) {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json(
      { message: '인증이 필요합니다.' },
      { status: 401 }
    );
  }

  const accountId = req.nextUrl.searchParams.get('accountId');

  if (!accountId) {
    return NextResponse.json(
      { message: 'accountId가 필요합니다.' },
      { status: 400 }
    );
  }

  const [owned]: any = await pool.query(
    `
    SELECT id
    FROM accounts
    WHERE id = ? AND user_id = ?
    `,
    [accountId, user.userId]
  );

  if (owned.length === 0) {
    return NextResponse.json(
      { message: '접근 권한이 없는 계좌입니다.' },
      { status: 403 }
    );
  }

  const [rows] = await pool.query(
    `
    SELECT id, transfer_id, type, amount, balance_after, created_at
    FROM account_transactions
    WHERE account_id = ?
    ORDER BY id DESC
    `,
    [accountId]
  );

  return NextResponse.json({ transactions: rows });
}