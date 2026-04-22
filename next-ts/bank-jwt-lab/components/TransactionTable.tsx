type Transaction = {
  id: number;
  transfer_id: number;
  type: 'withdraw' | 'deposit';
  amount: number | string;
  balance_after: number | string;
  created_at: string;
};

type TransactionTableProps = {
  transactions: Transaction[];
};

export default function TransactionTable({
  transactions
}: TransactionTableProps) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-bold text-slate-900">
        최근 거래 내역
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-200 text-left">
              <th className="px-3 py-3 text-sm font-semibold text-slate-600">
                ID
              </th>
              <th className="px-3 py-3 text-sm font-semibold text-slate-600">
                구분
              </th>
              <th className="px-3 py-3 text-sm font-semibold text-slate-600">
                금액
              </th>
              <th className="px-3 py-3 text-sm font-semibold text-slate-600">
                처리 후 잔액
              </th>
              <th className="px-3 py-3 text-sm font-semibold text-slate-600">
                일시
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-3 py-8 text-center text-sm text-slate-500"
                >
                  거래 내역이 없습니다.
                </td>
              </tr>
            ) : (
              transactions.map((row) => (
                <tr key={row.id} className="border-b border-slate-100">
                  <td className="px-3 py-3 text-sm text-slate-700">
                    {row.id}
                  </td>
                  <td className="px-3 py-3 text-sm">
                    <span
                      className={
                        row.type === 'withdraw'
                          ? 'rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700'
                          : 'rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700'
                      }
                    >
                      {row.type}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-sm text-slate-700">
                    {Number(row.amount).toLocaleString('ko-KR')}원
                  </td>
                  <td className="px-3 py-3 text-sm text-slate-700">
                    {Number(row.balance_after).toLocaleString('ko-KR')}원
                  </td>
                  <td className="px-3 py-3 text-sm text-slate-500">
                    {row.created_at}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}