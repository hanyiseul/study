import { NextRequest } from 'next/server';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '@/lib/db';
import { getSessionUser } from '@/lib/session';
import { badRequest, forbidden, ok, unauthorized } from '@/lib/responses';
import { writeAdminAuditLog } from '@/lib/adminAudit';

type CloseRequestRow = RowDataPacket & {
  id: number;
  account_id: number;
  user_id: number;
  request_status: 'pending' | 'approved' | 'rejected';
  account_status: 'active' | 'closed';
  balance: string;
};

type ProcessCloseRequestBody = {
  action: 'approve' | 'reject';
  adminMemo?: string;
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
  const requestId = Number(id);

  if (!requestId) {
    return badRequest('해지 요청 ID가 올바르지 않습니다.');
  }

  const body = (await request.json()) as ProcessCloseRequestBody;

  if (body.action !== 'approve' && body.action !== 'reject') {
    return badRequest('처리 방식은 approve 또는 reject만 가능합니다.');
  }

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const [requestRows] = await connection.query<CloseRequestRow[]>(
      `
      SELECT
        r.id,
        r.account_id,
        r.user_id,
        r.status AS request_status,
        a.status AS account_status,
        a.balance
      FROM account_close_requests r
      JOIN accounts a ON r.account_id = a.id
      WHERE r.id = ?
      FOR UPDATE
      `,
      [requestId]
    );

    const closeRequest = requestRows[0];

    if (!closeRequest) {
      await connection.rollback();
      return badRequest('해지 요청을 찾을 수 없습니다.');
    }

    if (closeRequest.request_status !== 'pending') {
      await connection.rollback();
      return badRequest('이미 처리된 해지 요청입니다.');
    }

    if (body.action === 'approve') {
      if (closeRequest.account_status !== 'active') {
        await connection.rollback();
        return badRequest('활성 계좌만 해지 승인할 수 있습니다.');
      }

      if (Number(closeRequest.balance) !== 0) {
        await connection.rollback();
        return badRequest('잔액이 0원인 계좌만 해지 승인할 수 있습니다.');
      }

      await connection.query<ResultSetHeader>(
        `
        UPDATE accounts
        SET status = 'closed'
        WHERE id = ?
        `,
        [closeRequest.account_id]
      );

      await connection.query<ResultSetHeader>(
        `
        UPDATE account_close_requests
        SET
          status = 'approved',
          admin_memo = ?,
          processed_at = NOW(),
          processed_by = ?
        WHERE id = ?
        `,
        [body.adminMemo || null, admin.userId, requestId]
      );

      await writeAdminAuditLog({
        adminUserId: admin.userId,
        action: 'ACCOUNT_CLOSE_REQUEST_APPROVE',
        targetType: 'ACCOUNT_CLOSE_REQUEST',
        targetId: requestId,
        description: '관리자가 계좌 해지 요청을 승인했습니다.',
        beforeData: {
          requestStatus: 'pending',
          accountStatus: closeRequest.account_status,
          balance: Number(closeRequest.balance)
        },
        afterData: {
          requestStatus: 'approved',
          accountStatus: 'closed'
        },
        request
      });

      await connection.commit();

      return ok({
        message: '계좌 해지 요청이 승인되었습니다.'
      });
    }

    await connection.query<ResultSetHeader>(
      `
      UPDATE account_close_requests
      SET
        status = 'rejected',
        admin_memo = ?,
        processed_at = NOW(),
        processed_by = ?
      WHERE id = ?
      `,
      [body.adminMemo || null, admin.userId, requestId]
    );

    await writeAdminAuditLog({
      adminUserId: admin.userId,
      action: 'ACCOUNT_CLOSE_REQUEST_REJECT',
      targetType: 'ACCOUNT_CLOSE_REQUEST',
      targetId: requestId,
      description: '관리자가 계좌 해지 요청을 거절했습니다.',
      beforeData: {
        requestStatus: 'pending',
        accountStatus: closeRequest.account_status,
        balance: Number(closeRequest.balance)
      },
      afterData: {
        requestStatus: 'rejected'
      },
      request
    });

    await connection.commit();

    return ok({
      message: '계좌 해지 요청이 거절되었습니다.'
    });
  } catch {
    await connection.rollback();

    return badRequest('계좌 해지 요청 처리 중 오류가 발생했습니다.');
  } finally {
    connection.release();
  }
}