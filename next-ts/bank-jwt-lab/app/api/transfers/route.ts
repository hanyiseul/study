import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { getSessionUser } from '@/lib/session';
import { ensureActiveStatus, toAmount } from '@/lib/bank';

export async function POST(req: NextRequest) {
  const connection = await pool.getConnection();

  try {
    const user = await getSessionUser();

    if (!user) {
      return NextResponse.json(
        { message: '인증이 필요합니다.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { fromAccountId, toAccountId, amount } = body;

    const transferAmount = toAmount(amount);

    if (!fromAccountId || !toAccountId) {
      return NextResponse.json(
        { message: '계좌 정보가 누락되었습니다.' },
        { status: 400 }
      );
    }

    if (Number(fromAccountId) === Number(toAccountId)) {
      return NextResponse.json(
        { message: '동일 계좌로 이체할 수 없습니다.' },
        { status: 400 }
      );
    }

    await connection.beginTransaction();

    const [fromRows]: any = await connection.query(
      `
      SELECT id, user_id, balance, status
      FROM accounts
      WHERE id = ?
      FOR UPDATE
      `,
      [fromAccountId]
    );

    const [toRows]: any = await connection.query(
      `
      SELECT id, user_id, balance, status
      FROM accounts
      WHERE id = ?
      FOR UPDATE
      `,
      [toAccountId]
    );

    if (fromRows.length === 0 || toRows.length === 0) {
      await connection.rollback();

      return NextResponse.json(
        { message: '계좌를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    const fromAccount = fromRows[0];
    const toAccount = toRows[0];

    if (Number(fromAccount.user_id) !== Number(user.userId)) {
      await connection.rollback();

      return NextResponse.json(
        { message: '본인 계좌에서만 출금할 수 있습니다.' },
        { status: 403 }
      );
    }

    ensureActiveStatus(fromAccount.status);
    ensureActiveStatus(toAccount.status);

    if (Number(fromAccount.balance) < transferAmount) {
      await connection.rollback();

      return NextResponse.json(
        { message: '잔액이 부족합니다.' },
        { status: 400 }
      );
    }

    const newFromBalance = Number(fromAccount.balance) - transferAmount;
    const newToBalance = Number(toAccount.balance) + transferAmount;

    await connection.query(
      `
      UPDATE accounts
      SET balance = ?
      WHERE id = ?
      `,
      [newFromBalance, fromAccountId]
    );

    await connection.query(
      `
      UPDATE accounts
      SET balance = ?
      WHERE id = ?
      `,
      [newToBalance, toAccountId]
    );

    const [transferResult]: any = await connection.query(
      `
      INSERT INTO transfers (from_account_id, to_account_id, amount, status)
      VALUES (?, ?, ?, 'success')
      `,
      [fromAccountId, toAccountId, transferAmount]
    );

    const transferId = transferResult.insertId;

    await connection.query(
      `
      INSERT INTO account_transactions
      (account_id, transfer_id, type, amount, balance_after)
      VALUES (?, ?, 'withdraw', ?, ?)
      `,
      [fromAccountId, transferId, transferAmount, newFromBalance]
    );

    await connection.query(
      `
      INSERT INTO account_transactions
      (account_id, transfer_id, type, amount, balance_after)
      VALUES (?, ?, 'deposit', ?, ?)
      `,
      [toAccountId, transferId, transferAmount, newToBalance]
    );

    await connection.query(
      `
      INSERT INTO audit_logs (user_id, action_type, target_id, message)
      VALUES (?, 'transfer', ?, ?)
      `,
      [
        user.userId,
        transferId,
        `${fromAccountId}번 계좌에서 ${toAccountId}번 계좌로 ${transferAmount}원 이체`
      ]
    );

    await connection.commit();

    return NextResponse.json({
      message: '이체가 완료되었습니다.',
      transferId
    });
  } catch (error: any) {
    await connection.rollback();

    return NextResponse.json(
      {
        message:
          error?.message || '이체 처리 중 오류가 발생했습니다.'
      },
      { status: 500 }
    );
  } finally {
    connection.release();
  }
}