// 현재 요청을 보낸 사용자가 누구인지 판별하는 공통 함수
// 이 구조를 사용하면 매 API마다 쿠키 읽기와 jwt 검증을 반복하지 않아도 됨

/**
 * 동작 순서
 * 1. 현재 요청의 쿠키를 읽음
 * 2. token 쿠키를 꺼냄
 * 3. 토큰이 없으면 null 반환
 * 4. 토큰이 있으면 verifyToken()으로 검증
 * 5. 성공하면 사용자 정보 반환
 * 6. 실패하면 null 반환
 */
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth';

export async function getSessionUser() {
  // 1. 현재 요청의 쿠키를 읽음
  const cookieStore = await cookies();
  const cookieName = process.env.TOKEN_COOKIE_NAME || 'token'; /// 환경 변수에 쿠키 이름이 있으면 쓰고 아니면 토큰 정보에서 씀
  const token = cookieStore.get(cookieName)?.value; // 2. 토큰 쿠키를 꺼냄

  if (!token) { // 3. 토큰이 없다면 
    return null; // null 반환
  }

  try {
    const user = await verifyToken(token);
    return user;  // 5. 성공하면 사용자 정보 반환
  } catch {
    return null; // 6. 실패하면 null 반환
  }
}