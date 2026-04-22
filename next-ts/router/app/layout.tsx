export default function RootLayout({ // 모든 하위 페이지를 감싸는 공통 구조
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <header style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
          Next.js App Router 실습
        </header>

        <main style={{ padding: '20px' }}>
          {children}
        </main>

        <footer style={{ padding: '20px', borderTop: '1px solid #ccc' }}>
          실습용 공통 푸터
        </footer>
      </body>
    </html>
  );
}