import { proxy } from '@/lib/api';
export async function GET(){ return proxy('/api/seller/orders',{method:'GET'},true); }
