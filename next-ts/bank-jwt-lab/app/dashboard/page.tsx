import { redirect } from 'next/navigation';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import BalanceCard from '@/components/BalanceCard';
import TransferForm from '@/components/TransferForm';
import TransactionTable from '@/components/TransactionTable';
import pool from '@/lib/db';
import { getSessionUser } from '@/lib/session';

export default async function DashboardPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect('/login');
  }

  const [accounts]: any = await pool.query(
    `
    SELECT id, account_number, account_name, balance, status, created_at
    FROM accounts
    WHERE user_id = ?
    ORDER BY id ASC
    `,
    [user.userId]
  );

  let transactions: any[] = [];

  if (accounts.length > 0) {
    const [rows]: any = await pool.query(
      `
      SELECT id, transfer_id, type, amount, balance_after, created_at
      FROM account_transactions
      WHERE account_id = ?
      ORDER BY id DESC
      LIMIT 10
      `,
      [accounts[0].id]
    );

    transactions = rows;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Header
        userName={user.email}
        userRole={user.role}
      />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-6 lg:grid-cols-[240px_1fr]">
        <Sidebar />

        <main className="space-y-6">
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {accounts.map((account: any) => (
              <BalanceCard
                key={account.id}
                accountName={account.account_name}
                accountNumber={account.account_number}
                balance={account.balance}
                status={account.status}
              />
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-[420px_1fr]">
            <TransferForm accounts={accounts} />
            <TransactionTable transactions={transactions} />
          </section>
        </main>
      </div>
    </div>
  );
}