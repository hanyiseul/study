import type { Metadata } from 'next';
import Link from 'next/link';
// 정적페이지
export const metadata: Metadata = { // metadata 객체로 선언
  title: '온라인 금융 서비스',
  description: '계좌 조회, 이체, 거래 내역 확인을 지원하는 금융 서비스',
  openGraph: { // 제목,설명,url,타입 등을 설정
    title: '온라인 금융 서비스',
    description: '계좌 조회, 이체, 거래 내역 확인을 지원하는 금융 서비스',
    url: '/',
    siteName: 'My Finance Service',
    type: 'website'
  }
};

export default function HomePage() {
  return (
    <>
      <section className="card">
        <span className="badge">메인 페이지</span>
        <h2>온라인 금융 서비스</h2>
        <p>
          이 페이지는 정적 metadata 객체를 사용해 Open Graph를 설정한 메인
          페이지다.
        </p>
        <p className="muted">
          공유 시 루트 세그먼트의 opengraph-image가 함께 사용된다.
        </p>
      </section>

      <section className="card">
        <h2>이동 경로</h2>
        <div className="link-list">
          <Link className="link-item" href="/about">
            회사 소개 페이지로 이동
          </Link>
          <Link className="link-item" href="/products/1">
            상품 1 상세 페이지로 이동
          </Link>
          <Link className="link-item" href="/products/2">
            상품 2 상세 페이지로 이동
          </Link>
          <Link className="link-item" href="/products/3">
            상품 3 상세 페이지로 이동
          </Link>
        </div>
      </section>
    </>
  );
}