'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type Account = {
  id: number;
  account_number: string;
  account_name: string;
};

type TransferFormProps = {
  accounts: Account[];
};

export default function TransferForm({
  accounts
}: TransferFormProps) {
  const router = useRouter();

  const [form, setForm] = useState({
    fromAccountId: accounts[0]?.id ? String(accounts[0].id) : '',
    toAccountId: '',
    amount: ''
  });

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/transfers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fromAccountId: Number(form.fromAccountId),
          toAccountId: Number(form.toAccountId),
          amount: Number(form.amount)
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || '이체 처리에 실패했습니다.');
        setLoading(false);
        return;
      }

      setMessage('이체가 완료되었습니다.');
      setForm({
        ...form,
        amount: ''
      });

      router.refresh();
    } catch {
      setMessage('이체 요청 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-slate-900">
        계좌 이체
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            출금 계좌
          </label>
          <select
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
            value={form.fromAccountId}
            onChange={(e) =>
              setForm({ ...form, fromAccountId: e.target.value })
            }
          >
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.account_name} ({account.account_number})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            입금 계좌 ID
          </label>
          <input
            type="number"
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
            value={form.toAccountId}
            onChange={(e) =>
              setForm({ ...form, toAccountId: e.target.value })
            }
            placeholder="예: 3"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            이체 금액
          </label>
          <input
            type="number"
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
            value={form.amount}
            onChange={(e) =>
              setForm({ ...form, amount: e.target.value })
            }
            placeholder="예: 50000"
          />
        </div>

        {message ? (
          <p className="text-sm text-slate-700">{message}</p>
        ) : null}

        <button
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white disabled:opacity-60"
        >
          {loading ? '처리 중...' : '이체 실행'}
        </button>
      </form>
    </section>
  );
}