'use client';

import { useRouter } from 'next/navigation';

type HeaderProps = {
  userName: string;
  userRole: string;
};

export default function Header({
  userName,
  userRole
}: HeaderProps) {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', {
      method: 'POST'
    });

    router.push('/login');
    router.refresh();
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <p className="text-xs font-semibold tracking-[0.2em] text-blue-600">
            BANK PLATFORM
          </p>
          <h1 className="text-xl font-bold text-slate-900">
            JWT Banking Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-900">
              {userName}
            </p>
            <p className="text-xs text-slate-500">{userRole}</p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700"
          >
            로그아웃
          </button>
        </div>
      </div>
    </header>
  );
}