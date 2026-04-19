function TransactionList({ transactions, isLoading, isFetching, error }) {
  if (isLoading) return <div>거래 목록 로딩 중</div>; // 최초 로딩 상태
  if (error) return <div>{error.message}</div>;

  return (
    <div>
      {/* 기존 데이터가 있는 상태에서 다시 서버와 동기화 중일 때 표시 */}
      {isFetching && <div>최신 데이터 갱신 중</div>}

      <ul>
        {transactions.map((item) => (
          <li key={item.id}>
            {item.sender_name} - {item.amount} - {item.created_at}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;