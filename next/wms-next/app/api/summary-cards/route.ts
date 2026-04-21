import { NextResponse } from 'next/server';
import pool from '../../../lib/db';
import { RowDataPacket } from 'mysql2';

type SummaryRow = RowDataPacket & {
  totalCount: number | null;
  inboundPlanned: number | null;
  inboundDone: number | null;
  outboundPlanned: number | null;
  outboundDone: number | null;
  totalAmount: number | null;
};

export async function GET() {
  try {
    const [rows] = await pool.query<SummaryRow[]>(
      `
      SELECT
        COUNT(*) AS totalCount,
        SUM(CASE WHEN status = '입고예정' THEN 1 ELSE 0 END) AS inboundPlanned,
        SUM(CASE WHEN status = '입고완료' THEN 1 ELSE 0 END) AS inboundDone,
        SUM(CASE WHEN status = '출고예정' THEN 1 ELSE 0 END) AS outboundPlanned,
        SUM(CASE WHEN status = '출고완료' THEN 1 ELSE 0 END) AS outboundDone,
        SUM(expected_amount) AS totalAmount
      FROM inventory_items
      `
    );

    const row = rows[0];

    return NextResponse.json({
      main: [
        {
          title: '견적내역',
          value: String(row.totalCount || 0),
          icon: '□',
        },
        {
          title: '입고내역',
          value: String((row.inboundPlanned || 0) + (row.inboundDone || 0)),
          subText: `입고예정 ${row.inboundPlanned || 0} / 입고완료 ${row.inboundDone || 0}`,
          icon: '≡',
        },
        {
          title: '출고내역',
          value: String((row.outboundPlanned || 0) + (row.outboundDone || 0)),
          subText: `출고예정 ${row.outboundPlanned || 0} / 출고완료 ${row.outboundDone || 0}`,
          icon: '◎',
        },
        {
          title: '정산내역',
          value: Number(row.totalAmount || 0).toLocaleString('ko-KR'),
          icon: '◉',
        },
      ],
    });
  } catch (error) {
    return NextResponse.json(
      { message: '카드 요약 조회 실패' },
      { status: 500 }
    );
  }
}