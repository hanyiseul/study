// JWT 생성과 검증을 공통 함수로 분리
import { SignJWT, jwtVerify } from 'jose';

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);

export async function createToken(payload: {
  userId: number;
  email: string;
  role: string;
}) {
  return await new SignJWT(payload) // jose에서 제공하는 JWT 생성 코드
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('2h')
    .sign(secretKey);
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, secretKey);
  return payload;
}