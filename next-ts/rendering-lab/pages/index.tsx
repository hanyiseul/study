import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ padding: '40px', fontFamily: 'Arial, sans-serif', lineHeight: 1.6 }}>
      <h1>SSR vs SSG vs ISR 실습</h1>
      <p>각 페이지를 열고 새로고침, Network, Console, Performance 결과를 비교한다.</p>

      <ul>
        <li>
          <Link href="/ssr">SSR 페이지</Link>
        </li>
        <li>
          <Link href="/ssg">SSG 페이지</Link>
        </li>
        <li>
          <Link href="/isr">ISR 페이지</Link>
        </li>
      </ul>
    </main>
  );
}