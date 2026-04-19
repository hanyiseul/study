// 계좌 요약 데이터 조회 함수
export async function fetchAccount() { 
  const res = await fetch('/api/account');

  if (!res.ok) {
    throw new Error('계좌 조회 실패');
  }

  return res.json();
}

// 거래 내역 목록 조회 함수
// 리액ㅌ 쿼리의 useQuery가 이 함수 호출
export async function fetchTransactions() {
  const res = await fetch('/api/transactions');

  if (!res.ok) {
    throw new Error('거래 내역 조회 실패');
  }

  return res.json();
}

// 거래 데이터를 서버에 등록하는 함수
export async function createTransaction(data) {
  const res = await fetch('/api/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || '거래 등록 실패');
  }

  return res.json();
}