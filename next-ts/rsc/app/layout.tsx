export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <header style={{ padding: '20px', borderBottom: '1px solid #ccc' }}>
          서버 컴포넌트 확인
        </header>

        <main style={{ padding: '20px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}