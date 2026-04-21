// 정적으로 생성되지만 시간이 지나면 다시 생성
import Link from 'next/link';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { makeTimePayload } from '../lib/time';

export const getStaticProps: GetStaticProps<{ // 정적 생성에 사용
  payload: {
    label: string;
    epoch: number;
    iso: string;
  };
}> = async () => {
  const payload = makeTimePayload('ISR');
  console.log('[ISR] getStaticProps executed:', payload.iso);

  return {
    props: {
      payload,
    },
    revalidate: 10, // revalidate 추가
  };
};

export default function ISRPage({
  payload,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log('[Browser][ISR] page hydrated');

  return (
    <main style={{ padding: '40px', fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>
      <h1>ISR 페이지</h1>
      <p>생성 전략: 정적 생성 후 재검증</p>
      <p>생성 시각: {payload.iso}</p>
      <p>타임스탬프: {payload.epoch}</p>
      <p>재검증 주기: 10초</p>
      <Link href="/">메인으로 이동</Link>
    </main>
  );
}