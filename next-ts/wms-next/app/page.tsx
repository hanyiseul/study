import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Smart Wms</h1>
      <p>Next.js 기반 WMS 대시보드 실습</p>
      <Link href="/dashboard">대시보드로 이동</Link>
    </main>
  );
}