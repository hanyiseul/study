import { NextResponse } from 'next/server';
import { getSessionUser } from '@/lib/session';

export async function GET() {
  const user = await getSessionUser();

  if (!user) {
    return NextResponse.json(
      { message: '인증 정보가 없습니다.' },
      { status: 401 }
    );
  }

  return NextResponse.json({ user });
}