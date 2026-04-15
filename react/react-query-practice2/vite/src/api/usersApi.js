export async function fetchUsers() {
  const response = await fetch('/api/users');

  if (!response.ok) {
    throw new Error('조회 실패');
  }

  return await response.json();
}

export async function createUser(name) {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name })
  });

  if (!response.ok) {
    throw new Error('생성 실패');
  }

  return await response.json();
}