'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });

  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage('');

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message || '회원가입에 실패했습니다.');
      return;
    }

    router.push('/login');
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full rounded-3xl bg-white p-8 shadow-sm"
      >
        <h1 className="mb-6 text-3xl font-bold">회원가입</h1>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">이름</label>
          <input
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">이메일</label>
          <input
            type="email"
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
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
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">역할</label>
          <select
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
            value={form.role}
            onChange={(e) =>
              setForm({ ...form, role: e.target.value })
            }
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
        </div>

        {message ? (
          <p className="mb-4 text-sm text-red-600">{message}</p>
        ) : null}

        <button className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white">
          회원가입
        </button>
      </form>
    </main>
  );
}