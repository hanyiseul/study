import { proxy } from '@/lib/api';
export async function GET(){ return proxy('/api/cart',{method:'GET'},true); }
