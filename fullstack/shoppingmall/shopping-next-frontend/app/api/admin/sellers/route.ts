import { proxy } from '@/lib/api';
export async function GET(){ return proxy('/api/admin/sellers',{method:'GET'},true); }
