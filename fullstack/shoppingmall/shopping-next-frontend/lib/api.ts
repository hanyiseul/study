import { cookies } from 'next/headers';

export function springBaseUrl() { return process.env.SPRING_API_BASE_URL || 'http://localhost:3200'; }
export function authHeaders() { const token = cookies().get('token')?.value; return token ? { Authorization: `Bearer ${token}` } : {}; }
export async function proxy(path: string, init: RequestInit = {}, withAuth = false) {
  const headers: Record<string,string> = { 'Content-Type': 'application/json', ...(init.headers as any || {}) };
  if (withAuth) Object.assign(headers, authHeaders());
  const res = await fetch(`${springBaseUrl()}${path}`, { ...init, headers, cache: 'no-store' });
  const text = await res.text();
  return new Response(text, { status: res.status, headers: { 'Content-Type': res.headers.get('Content-Type') || 'application/json' } });
}
export async function jsonFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(path, { ...options, headers: { 'Content-Type': 'application/json', ...(options.headers || {}) }, cache: 'no-store' });
  return res.json();
}
