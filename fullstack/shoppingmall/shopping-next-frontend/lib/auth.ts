export async function getMe() {
  const res = await fetch('/api/auth/me', { cache: 'no-store' });
  if (!res.ok) return null;
  const body = await res.json();
  return body.data || null;
}
