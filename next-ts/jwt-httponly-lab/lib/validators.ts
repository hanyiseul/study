// 검증 로직 : 회원가입과 로그인 요청값을 검사하는 함수들을 모아둔 파일 (인증 처리와 분리)
/**
 * - 입력값 검증과 api 초반에 일관되게 처리하기 위해
 * - 잘못된 요청과 인증 실패를 구분하기 위해
 * - API 코드 가독성을 높이기 위해
 */
export function validateSignupInput(data: {
  name?: string;
  email?: string;
  password?: string;
}) {
  const name = data.name?.trim() || '';
  const email = data.email?.trim() || '';
  const password = data.password?.trim() || '';

  if (!name) {
    return '이름을 입력해야 합니다.';
  }

  if (!email) {
    return '이메일을 입력해야 합니다.';
  }

  if (!password) {
    return '비밀번호를 입력해야 합니다.';
  }

  if (password.length < 4) {
    return '비밀번호는 최소 4자 이상이어야 합니다.';
  }

  return null;
}

export function validateLoginInput(data: {
  email?: string;
  password?: string;
}) {
  const email = data.email?.trim() || '';
  const password = data.password?.trim() || '';

  if (!email) {
    return '이메일을 입력해야 합니다.';
  }

  if (!password) {
    return '비밀번호를 입력해야 합니다.';
  }

  return null;
}