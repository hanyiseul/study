import './globals.css';

export const metadata = {
  title: 'Bank JWT Lab',
  description: 'Next.js JWT 은행 플랫폼 실습'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}