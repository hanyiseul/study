import { useQuery } from '@tanstack/react-query';

async function fetchTransactions() { // 서버에서 거래 목록을 받아오는 비동기 함수
  const res = await fetch('/api/transactions'); // node 서버의 /api/transactions api호출

  if (!res.ok) { // 서버 응답이 실패인 경우
    throw new Error('실패'); // 오류 발생
  }

  return res.json(); // useQuery의 error 상태로 전달
}

function TransactionList() {
  // 리액트쿼리 핵심 코드
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['transactions'], // 캐시 이름
    queryFn: fetchTransactions, // 실체 서버 요청 함수
    staleTime: 5000 // 5초동안 데이터를 신선한 상태로 본다는 의미
  });

  if (isLoading) return <div>로딩 중</div>; // 처음 데이터가 전혀 없고 서버 요청 중일 때 true
  if (error) return <div>{error.message}</div>; // 조회 실패 시 오류 객체가 들어옴

  return (
    <div>
      {/* 이미 데이터가 있는 상태에서 서버와의 동기화 */}
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