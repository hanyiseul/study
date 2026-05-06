import { NextRequest } from 'next/server';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '@/lib/db';
import { getSessionUser } from '@/lib/session';
import { badRequest, forbidden, ok, unauthorized } from '@/lib/responses';
import { writeAdminAuditLog } from '@/lib/adminAudit';

type UpdateAccountStatusBody = {
  status: 'active' | 'closed';
};

type AccountRow = RowDataPacket & {
  id: number;
  status: 'active' | 'closed';
};

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const admin = await getSessionUser();

  if (!admin) {
    return unauthorized();
  }

  if (admin.role !== 'admin') {
    return forbidden();
  }

  const { id } = await context.params;
  const accountId = Number(id);

  if (!accountId) {
    return badRequest('계좌 ID가 올바르지 않습니다.');
  }

  const body = (await request.json()) as UpdateAccountStatusBody;

  if (body.status !== 'active' && body.status !== 'closed') {
    return badRequest('계좌 상태 값이 올바르지 않습니다.');
  }

  const [accountRows] = await pool.query<AccountRow[]>(
    `
    SELECT id, status
    FROM accounts
    WHERE id = ?
    `,
    [accountId]
  );

  const account = accountRows[0];

  if (!account) {
    return badRequest('계좌를 찾을 수 없습니다.');
  }

  await pool.query<ResultSetHeader>(
    `
    UPDATE accounts
    SET status = ?
    WHERE id = ?
    `,
    [body.status, accountId]
  );

  await writeAdminAuditLog({
    adminUserId: admin.userId,
    action: 'ACCOUNT_STATUS_UPDATE',
    targetType: 'ACCOUNT',
    targetId: accountId,
    description: `관리자가 계좌 상태를 ${account.status}에서 ${body.status}로 변경했습니다.`,
    beforeData: {
      status: account.status
    },
    afterData: {
      status: body.status
    },
    request
  });

  return ok({
    message: '계좌 상태가 변경되었습니다.'
  });
}