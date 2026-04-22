import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import pool from '@/lib/db';

export async function POST(req: NextRequest) {
  try {
    
    console.log('DB_HOST:', process.env.DB_HOST);
    console.log('DB_USER:', process.env.DB_USER);
    
    const body = await req.json();
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: '필수값이 누락되었습니다.' },
        { status: 400 }
      );
    }

    const [exists]: any = await pool.query(
      `
      SELECT id
      FROM users
      WHERE email = ?
      `,
      [email]
    );

    if (exists.length > 0) {
      return NextResponse.json(
        { message: '이미 사용 중인 이메일입니다.' },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [result]: any = await pool.query(
      `
      INSERT INTO users (name, email, password_hash, role)
      VALUES (?, ?, ?, ?)
      `,
      [name, email, passwordHash, role || 'user']
    );

    await pool.query(
      `
      INSERT INTO accounts (user_id, account_number, account_name, balance, status)
      VALUES (?, ?, ?, 0, 'active')
      `,
      [
        result.insertId,
        `100-NEW-${String(result.insertId).padStart(6, '0')}`,
        `${name} 기본계좌`
      ]
    );

    return NextResponse.json({
      message: '회원가입이 완료되었습니다.'
    });
  } catch {
    return NextResponse.json(
      { message: '회원가입 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
