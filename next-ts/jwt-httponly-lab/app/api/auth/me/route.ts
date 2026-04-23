// 현재 로그인한 사용자를 확인하는 가장 기본적인 보호 API
/**
 * 파이프라인
 * 1. getSessionUser() 호출
 * 2. 로그인 사용자가 없으면 401
 * 3. 있으면 사용자 정보 반환
 */
import { ok, unauthorized } from '@/lib/responses';
import { getSessionUser } from '@/lib/session';

export async function GET() {
  const user = await getSessionUser();

  if (!user) {
    return unauthorized('인증이 필요합니다.');
  }

  return ok({
    user
  });
}