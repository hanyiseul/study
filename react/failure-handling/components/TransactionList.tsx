// Server State
import { useQuery } from '@tanstack/react-query';

async function fetchTransactions() { // 서버에서 거래 목록을 받아오는
  const res = await fetch('/api/transactions');

  if (!res.ok) {
    throw new Error('실패');
  }

  return res.json();
}

function TransactionList() {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
    staleTime: 5000
  });

  if (isLoading) return <div>로딩 중</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      {isFetching && <div>갱신 중</div>}

      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.name} - {item.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;