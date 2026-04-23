// 핵심 인증 유틸 파일
import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';

export type JwtPayload = {
  userId: number;
  email: string;
  role: 'user' | 'admin';
};

const secretKey = new TextEncoder().encode(
  process.env.JWT_SECRET || 'replace_this_with_a_long_random_secret'
);

// 회원가입 시 사용
export async function hashPassword(password: string) {
  // 사용자가 입력한 평문 비밀번호를 바로 db에 저장하면 안되므로 해시로 바꿈
  return bcrypt.hash(password, 10);
}

// 로그인 시 사용
export async function comparePassword(
  password: string,
  passwordHash: string
) {
  // 사용자가 입력한 평문 비밀번호와 db에 저장된 해시 값을 비교
  return bcrypt.compare(password, passwordHash);
}

// 로그인 성공 시 jwt 발급
export async function signToken(payload: JwtPayload) {
  // patload 에 jwt 정보를 담아 서명 (userid, email, role, 비밀키, 만료시간)
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secretKey);
}

// 요청 쿠키의 jwt를 검증
// 로그인과 보호 API, Middleware 모두에서 공통으로 사용
export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, secretKey);

  return { // 검증에 성공하면 사용자 정보를 반환
    userId: Number(payload.userId),
    email: String(payload.email),
    role: payload.role as 'user' | 'admin'
  };
}