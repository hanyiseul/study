import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  // 루트 레이아웃에 설정하면 하위 세그먼트의 URL 관련 메타데이터에서 상대 경로를 사용할 수 있음
  metadataBase: new URL('https://example.com'), 
  title: { // 기본값과 템플릿을 함께 줄 수 있음
    default: 'My Finance Service',
    template: '%s | My Finance Service'
  },
  description: '금융 서비스 예제 사이트',
  openGraph: {
    title: 'My Finance Service',
    description: '금융 서비스 예제 사이트',
    url: '/',
    siteName: 'My Finance Service',
    type: 'website',
    locale: 'ko_KR'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="layout">
          <header className="header">
            <h1>My Finance Service</h1>
            <p>Open Graph SEO 실습</p>
          </header>
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}