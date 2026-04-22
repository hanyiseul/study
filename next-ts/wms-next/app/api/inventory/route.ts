import { NextRequest, NextResponse } from 'next/server';
import pool from '../../../lib/db';

type DbRow = {
  id: number;
  product_initial: string;
  product_name: string;
  category: string;
  status: string;
  location: string;
  storage_period: string;
  inbound_date: string;
  outbound_due_date: string;
  expected_amount: number;
};

function mapInventoryRow(row: DbRow) {
  return {
    id: row.id,
    productInitial: row.product_initial,
    productName: row.product_name,
    category: row.category,
    status: row.status,
    location: row.location,
    storagePeriod: row.storage_period,
    inboundDate: row.inbound_date,
    outboundDueDate: row.outbound_due_date,
    expectedAmount: Number(row.expected_amount).toLocaleString('ko-KR') + '원',
  };
}

export async function GET() {
  try {
    const [rows] = await pool.query(
      `
      SELECT *
      FROM inventory_items
      ORDER BY id DESC
      `
    );

    await new Promise(function (resolve) {
      setTimeout(resolve, 1500);
    });

    return NextResponse.json((rows as DbRow[]).map(mapInventoryRow));
  } catch (error) {
    return NextResponse.json(
      { message: '재고 목록 조회 실패' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      productInitial,
      productName,
      category,
      status,
      location,
      storagePeriod,
      inboundDate,
      outboundDueDate,
      expectedAmount,
    } = body;

    if (
      !productInitial ||
      !productName ||
      !category ||
      !status ||
      !location ||
      !storagePeriod ||
      !inboundDate ||
      !outboundDueDate ||
      !expectedAmount
    ) {
      return NextResponse.json(
        { message: '모든 항목을 입력해야 합니다.' },
        { status: 400 }
      );
    }

    if (Number(expectedAmount) >= 10000000) {
      return NextResponse.json(
        { message: '금액이 너무 커서 등록 실패' },
        { status: 500 }
      );
    }

    await pool.query(
      `
      INSERT INTO inventory_items
      (
        product_initial,
        product_name,
        category,
        status,
        location,
        storage_period,
        inbound_date,
        outbound_due_date,
        expected_amount
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        productInitial,
        productName,
        category,
        status,
        location,
        storagePeriod,
        inboundDate,
        outboundDueDate,
        Number(expectedAmount),
      ]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { message: '재고 등록 실패' },
      { status: 500 }
    );
  }
}