import { proxy } from '@/lib/api';
export async function GET(){ return proxy('/api/auth/me',{method:'GET'},true); }
