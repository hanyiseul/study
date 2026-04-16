export async function fetchTransfers() {
  const response = await fetch('/api/transfers');

  if (!response.ok) {
    throw new Error('거래 목록 조회 실패');
  }

  return await response.json();
}

export async function createTransfer(transferData) {
  const response = await fetch('/api/transfers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(transferData)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || '거래 등록 실패');
  }

  return await response.json();
}