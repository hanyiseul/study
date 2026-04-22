// 요청 시마다 서버가 실행되어 현재 시각을 다시 생성
import Link from 'next/link';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { makeTimePayload } from '../lib/time';

// getStaticProps : Next.js가 정의한 특별한 함수 규칙
export const getServerSideProps: GetServerSideProps<{ // 요청시 실행
  payload: {
    label: string;
    epoch: number;
    iso: string;
  };
}> = async () => {
  const payload = makeTimePayload('SSR');
  console.log('[SSR] getServerSideProps executed:', payload.iso);

  return {
    props: {
      payload,
    },
  };
};

export default function SSRPage({
  payload,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log('[Browser][SSR] page hydrated');

  return (
    <main style={{ padding: '40px', fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>
      <h1>SSR 페이지</h1>
      <p>생성 전략: 요청 시 서버 생성</p>
      <p>생성 시각: {payload.iso}</p>
      <p>타임스탬프: {payload.epoch}</p>
      <Link href="/">메인으로 이동</Link>
    </main>
  );
}