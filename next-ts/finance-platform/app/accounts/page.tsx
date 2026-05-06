'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useAccounts } from '@/hooks/useAccounts';

type Account = {
  id: number;
  account_number: string;
  account_name: string;
  balance: string;
  status: 'active' | 'closed';
};

export default function AccountsPage() {
  const {
    accountsQuery,
    createMutation,
    deleteMutation
  } = useAccounts();

  const [form, setForm] = useState({
    accountNumber: '',
    accountName: '',
    balance: 0
  });

  const [aliasInputs, setAliasInputs] = useState<Record<number, string>>({});
  const [message, setMessage] = useState('');

  if (accountsQuery.isLoading) {
    return <main className="page">계좌 목록을 불러오는 중입니다.</main>;
  }

  if (accountsQuery.isError) {
    return <main className="page">계좌 목록 조회 중 오류가 발생했습니다.</main>;
  }

  const accounts: Account[] = accountsQuery.data?.accounts || [];

  async function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!form.accountNumber || !form.accountName) {
      alert('계좌번호와 계좌명을 입력하세요.');
      return;
    }

    await createMutation.mutateAsync(form);

    setForm({
      accountNumber: '',
      accountName: '',
      balance: 0
    });

    setMessage('계좌가 등록되었습니다.');
  }

  async function handleUpdateAlias(accountId: number) {
    const accountName = aliasInputs[accountId];

    if (!accountName || accountName.trim().length < 2) {
      alert('계좌명은 2자 이상 입력해야 합니다.');
      return;
    }

    const response = await fetch(`/api/accounts/${accountId}/alias`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        accountName
      })
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message || '계좌 별칭 변경에 실패했습니다.');
      return;
    }

    setMessage(data.message);

    setAliasInputs({
      ...aliasInputs,
      [accountId]: ''
    });

    await accountsQuery.refetch();
  }

  async function handleCloseRequest(accountId: number) {
    const reason = prompt('계좌 해지 사유를 입력하세요.');

    if (reason === null) {
      return;
    }

    const response = await fetch(`/api/accounts/${accountId}/close-request`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        reason
      })
    });

    const data = await response.json();

    if (!response.ok) {
      setMessage(data.message || '계좌 해지 요청에 실패했습니다.');
      return;
    }

    setMessage(data.message);

    await accountsQuery.refetch();
  }

  async function handleDelete(accountId: number) {
    const confirmed = confirm(
      '정말 계좌를 삭제하시겠습니까? 교육용 기능입니다. 금융 서비스 흐름에서는 해지 요청을 사용하는 것이 더 적절합니다.'
    );

    if (!confirmed) {
      return;
    }

    await deleteMutation.mutateAsync(accountId);

    setMessage('계좌가 삭제되었습니다.');

    await accountsQuery.refetch();
  }

  return (
    <main className="page">
      <section className="card">
        <h1>계좌 관리</h1>
        <p>계좌를 등록하고, 계좌 별칭 변경 및 해지 요청을 처리합니다.</p>

        <form className="formGrid" onSubmit={handleCreate}>
          <input
            placeholder="계좌번호"
            value={form.accountNumber}
            onChange={function (event) {
              setForm({
                ...form,
                accountNumber: event.target.value
              });
            }}
          />

          <input
            placeholder="계좌명"
            value={form.accountName}
            onChange={function (event) {
              setForm({
                ...form,
                accountName: event.target.value
              });
            }}
          />

          <input
            type="number"
            placeholder="초기 잔액"
            value={form.balance}
            onChange={function (event) {
              setForm({
                ...form,
                balance: Number(event.target.value)
              });
            }}
          />

          <button type="submit" disabled={createMutation.isPending}>
            {createMutation.isPending ? '등록 중' : '계좌 등록'}
          </button>
        </form>

        {message && <p>{message}</p>}

        <div className="buttonGroup">
          <Link href="/dashboard">대시보드</Link>
          <Link href="/transactions">거래 내역</Link>
          <Link href="/account-transfer">계좌이체</Link>
        </div>
      </section>

      <section className="card">
        <h2>내 계좌 목록</h2>

        <table>
          <thead>
            <tr>
              <th>계좌 ID</th>
              <th>계좌번호</th>
              <th>계좌명</th>
              <th>잔액</th>
              <th>상태</th>
              <th>별칭 변경</th>
              <th>관리</th>
            </tr>
          </thead>

          <tbody>
            {accounts.map(function (account) {
              return (
                <tr key={account.id}>
                  <td>{account.id}</td>
                  <td>{account.account_number}</td>
                  <td>{account.account_name}</td>
                  <td>{Number(account.balance).toLocaleString()}원</td>
                  <td>{account.status}</td>

                  <td>
                    <div className="inlineForm">
                      <input
                        placeholder="새 계좌명"
                        value={aliasInputs[account.id] || ''}
                        onChange={function (event) {
                          setAliasInputs({
                            ...aliasInputs,
                            [account.id]: event.target.value
                          });
                        }}
                      />

                      <button
                        type="button"
                        onClick={function () {
                          handleUpdateAlias(account.id);
                        }}
                        disabled={account.status !== 'active'}
                      >
                        별칭 변경
                      </button>
                    </div>
                  </td>

                  <td>
                    <div className="inlineForm">
                      <Link href={`/accounts/${account.id}`}>
                        상세
                      </Link>

                      <button
                        type="button"
                        onClick={function () {
                          handleCloseRequest(account.id);
                        }}
                        disabled={account.status !== 'active'}
                      >
                        해지 요청
                      </button>

                      <button
                        type="button"
                        onClick={function () {
                          handleDelete(account.id);
                        }}
                        disabled={deleteMutation.isPending}
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {accounts.length === 0 && (
              <tr>
                <td colSpan={7}>등록된 계좌가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}