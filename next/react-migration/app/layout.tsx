import './globals.css';


export const metadata = { // 페이지나 레이아웃의 head 내용을 자동으로 관리해주는 설정 객체
  title: 'Smart Wms',
  description: 'WMS Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}