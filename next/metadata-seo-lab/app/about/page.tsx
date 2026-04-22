import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '사이트 소개',
  description: 'SEO Lab의 목적과 실습 구성을 소개하는 페이지',
  alternates: {
    canonical: '/about'
  },
  openGraph: {
    title: '사이트 소개',
    description: 'SEO Lab의 목적과 실습 구성을 소개하는 페이지',
    url: '/about',
    siteName: 'SEO Lab',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: '사이트 소개',
    description: 'SEO Lab의 목적과 실습 구성을 소개하는 페이지'
  }
};

export default function AboutPage() {
  return (
    <section className="card">
      <span className="badge">소개 페이지</span>
      <h2>사이트 소개</h2>
      <p>이 페이지는 메인 페이지와 다른 제목, 설명, canonical URL을 사용한다.</p>
      <p className="muted">
        about 세그먼트 안의 실제 대표 이미지 파일이 우선 적용된다.
      </p>
    </section>
  );
}