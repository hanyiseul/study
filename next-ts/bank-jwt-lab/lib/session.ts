// 쿠키에서 토큰을 꺼내고, 검증 후 사용자 정보를 반환하는 공통 유틸
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return null;
  }

  try {
    const payload = await verifyToken(token);

    return {
      userId: Number(payload.userId),
      email: String(payload.email),
      role: String(payload.role)
    };
  } catch {
    return null;
  }
}