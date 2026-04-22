import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl items-center px-6">
      <section className="grid w-full gap-10 rounded-3xl bg-white p-10 shadow-sm md:grid-cols-2">
        <div className="flex flex-col justify-center">
          <p className="mb-3 text-sm font-semibold text-blue-600">
            BANK PLATFORM LAB
          </p>
          <h1 className="mb-4 text-4xl font-bold leading-tight">
            JWT 인증과 금융 트랜잭션을 함께 구현하는 Next.js 은행 플랫폼
          </h1>
          <p className="text-slate-600">
            로그인, 계좌 조회, 거래 내역, 이체 처리, MariaDB 연동까지 하나의
            프로젝트 안에서 통합적으로 구성한다.
          </p>
          <div className="mt-8 flex gap-4">
            <Link
              href="/login"
              className="rounded-xl bg-blue-600 px-5 py-3 text-white"
            >
              로그인
            </Link>
            <Link
              href="/signup"
              className="rounded-xl border border-slate-300 px-5 py-3 text-slate-700"
            >
              회원가입
            </Link>
          </div>
        </div>

        <div className="rounded-3xl bg-slate-900 p-8 text-white">
          <h2 className="mb-6 text-2xl font-semibold">구현 범위</h2>
          <div className="space-y-3 text-slate-200">
            <p>JWT 기반 로그인 인증</p>
            <p>HttpOnly 쿠키 처리</p>
            <p>MariaDB 계좌 데이터 관리</p>
            <p>트랜잭션 기반 이체 처리</p>
            <p>Tailwind 대시보드 UI</p>
          </div>
        </div>
      </section>
    </main>
  );
}