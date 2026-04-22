'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage('');

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message || '로그인에 실패했습니다.');
      return;
    }

    router.push('/dashboard');
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-3xl bg-white p-8 shadow-sm"
      >
        <h1 className="mb-6 text-3xl font-bold">로그인</h1>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">이메일</label>
          <input
            type="email"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">비밀번호</label>
          <input
            type="password"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        {message ? (
          <p className="mb-4 text-sm text-red-600">{message}</p>
        ) : null}

        <button className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white">
          로그인
        </button>
      </form>
    </main>
  );
}