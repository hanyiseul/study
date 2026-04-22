import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '메인',
  description: 'Metadata API 전체 구조를 실습하는 메인 페이지',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: '메인',
    description: 'Metadata API 전체 구조를 실습하는 메인 페이지',
    url: '/',
    siteName: 'SEO Lab',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: '메인',
    description: 'Metadata API 전체 구조를 실습하는 메인 페이지'
  }
};

export default function HomePage() {
  return (
    <>
      <section className="card">
        <span className="badge">메인 페이지</span>
        <h2>Metadata API 실습 메인</h2>
        <p>이 페이지는 정적 metadata 객체를 사용하는 예제다.</p>
        <p className="muted">
          루트의 opengraph-image.png, twitter-image.png가 공통 대표 이미지로 적용된다.
        </p>
      </section>

      <section className="card">
        <h2>이동 경로</h2>
        <div className="link-list">
          <Link className="link-item" href="/about">
            소개 페이지로 이동
          </Link>
          <Link className="link-item" href="/posts/1">
            게시글 1 상세 페이지로 이동
          </Link>
          <Link className="link-item" href="/posts/2">
            게시글 2 상세 페이지로 이동
          </Link>
          <Link className="link-item" href="/posts/3">
            게시글 3 상세 페이지로 이동
          </Link>
        </div>
      </section>
    </>
  );
}