// 빌드시 한번 생성된 결과 재사용
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
  const payload = makeTimePayload('SSG');
  console.log('[SSG] getStaticProps executed:', payload.iso);

  return {
    props: {
      payload,
    },
  };
};

export default function SSGPage({
  payload,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log('[Browser][SSG] page hydrated');

  return (
    <main style={{ padding: '40px', fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>
      <h1>SSG 페이지</h1>
      <p>생성 전략: 빌드 시 정적 생성</p>
      <p>생성 시각: {payload.iso}</p>
      <p>타임스탬프: {payload.epoch}</p>
      <Link href="/">메인으로 이동</Link>
    </main>
  );
}