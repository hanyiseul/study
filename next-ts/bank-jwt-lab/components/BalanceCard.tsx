type BalanceCardProps = {
  accountName: string;
  accountNumber: string;
  balance: number | string;
  status: string;
};

export default function BalanceCard({
  accountName,
  accountNumber,
  balance,
  status
}: BalanceCardProps) {
  const amount = Number(balance).toLocaleString('ko-KR');

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm">
      <p className="mb-2 text-sm font-medium text-slate-500">
        {accountName}
      </p>
      <h3 className="mb-3 text-lg font-bold text-slate-900">
        {accountNumber}
      </h3>

      <p className="mb-4 text-3xl font-bold text-slate-900">
        {amount}원
      </p>

      <span
        className={
          status === 'active'
            ? 'inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700'
            : 'inline-flex rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700'
        }
      >
        {status}
      </span>
    </div>
  );
}