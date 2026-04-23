// 상태 코드별 응답
// 상태 코드와 메시지의 의도를 코드에서 바로 읽을 수 있게 함
/**
 * 응답 형식 통일
 * 상태 코드 의미 명확화
 * api코드 간결화
 */
import { NextResponse } from 'next/server';

export function badRequest(message: string) {
  return NextResponse.json({ message }, { status: 400 });
}

export function unauthorized(message = '인증이 필요합니다.') {
  return NextResponse.json({ message }, { status: 401 });
}

export function forbidden(message = '권한이 없습니다.') {
  return NextResponse.json({ message }, { status: 403 });
}

export function ok(data: unknown) {
  return NextResponse.json(data, { status: 200 });
}

export function created(data: unknown) {
  return NextResponse.json(data, { status: 201 });
}