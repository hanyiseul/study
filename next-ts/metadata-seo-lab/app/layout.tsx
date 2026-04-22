import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://example.com'),
  title: {
    default: 'SEO Lab',
    template: '%s | SEO Lab'
  },
  description: 'Next.js Metadata API 실습 사이트',
  keywords: ['Next.js', 'Metadata API', 'SEO', 'Open Graph', 'robots', 'sitemap'],
  authors: [{ name: 'SEO Lab Team' }],
  creator: 'SEO Lab Team',
  publisher: 'SEO Lab Team',
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: 'SEO Lab',
    description: 'Next.js Metadata API 실습 사이트',
    url: '/',
    siteName: 'SEO Lab',
    locale: 'ko_KR',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO Lab',
    description: 'Next.js Metadata API 실습 사이트'
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
            <h1>SEO Lab</h1>
            <p>Next.js Metadata API 실습</p>
          </header>
          <main className="main">{children}</main>
        </div>
      </body>
    </html>
  );
}