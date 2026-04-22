import type { Metadata } from 'next';

// 레이아웃의 제목 템플릿이 적용되어 최종 제목으로 조합
export const metadata: Metadata = {
  title: '회사 소개',
  description: '회사 소개 및 주요 서비스 안내',
  openGraph: {
    title: '회사 소개',
    description: '회사 소개 및 주요 서비스 안내',
    url: '/about',
    siteName: 'My Finance Service',
    type: 'website'
  }
};

export default function AboutPage() {
  return (
    <section className="card">
      <span className="badge">소개 페이지</span>
      <h2>회사 소개</h2>
      <p>
        이 페이지는 메인 페이지와 다른 Open Graph 제목과 설명을 가지도록
        구성했다.
      </p>
      <p>
        또한 이 세그먼트 안에는 별도의 <code>opengraph-image.tsx</code>가
        있으므로 공유 이미지 역시 루트와 다르게 생성된다.
      </p>
    </section>
  );
}