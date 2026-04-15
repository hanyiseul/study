export async function fetchUsers() {
  const response = await fetch('/api/users');

  if (!response.ok) {
    throw new Error('사용자 목록 조회 실패');
  }

  return await response.json();
}