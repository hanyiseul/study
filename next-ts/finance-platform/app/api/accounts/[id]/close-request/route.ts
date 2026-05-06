import { NextRequest } from 'next/server';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '@/lib/db';
import { getSessionUser } from '@/lib/session';
import { badRequest, created, unauthorized } from '@/lib/responses';

type AccountRow = RowDataPacket & {
  id: number;
  balance: string;
  status: 'active' | 'closed';
};

type PendingRequestRow = RowDataPacket & {
  id: number;
};

type CloseRequestBody = {
  reason?: string;
};

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const user = await getSessionUser();

  if (!user) {
    return unauthorized();
  }

  const { id } = await context.params;
  const accountId = Number(id);

  if (!accountId) {
    return badRequest('계좌 ID가 올바르지 않습니다.');
  }

  const body = (await request.json()) as CloseRequestBody;

  const [accountRows] = await pool.query<AccountRow[]>(
    `
    SELECT id, balance, status
    FROM accounts
    WHERE id = ? AND user_id = ?
    `,
    [accountId, user.userId]
  );

  const account = accountRows[0];

  if (!account) {
    return badRequest('해지 요청 가능한 계좌가 없습니다.');
  }

  if (account.status !== 'active') {
    return badRequest('활성 계좌만 해지 요청할 수 있습니다.');
  }

  if (Number(account.balance) !== 0) {
    return badRequest('잔액이 0원인 계좌만 해지 요청할 수 있습니다.');
  }

  const [pendingRows] = await pool.query<PendingRequestRow[]>(
    `
    SELECT id
    FROM account_close_requests
    WHERE account_id = ?
      AND user_id = ?
      AND status = 'pending'
    `,
    [accountId, user.userId]
  );

  if (pendingRows.length > 0) {
    return badRequest('이미 처리 대기 중인 해지 요청이 있습니다.');
  }

  await pool.query<ResultSetHeader>(
    `
    INSERT INTO account_close_requests
      (account_id, user_id, reason, status)
    VALUES (?, ?, ?, 'pending')
    `,
    [accountId, user.userId, body.reason || null]
  );

  return created({
    message: '계좌 해지 요청이 등록되었습니다.'
  });
}