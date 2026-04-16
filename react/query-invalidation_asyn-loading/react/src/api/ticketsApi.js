export async function fetchTickets() {
  const response = await fetch('/api/tickets');

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || '문의 목록 조회 실패');
  }

  return await response.json();
}

export async function createTicket(ticketData) {
  const response = await fetch('/api/tickets', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(ticketData)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || '문의 등록 실패');
  }

  return await response.json();
}