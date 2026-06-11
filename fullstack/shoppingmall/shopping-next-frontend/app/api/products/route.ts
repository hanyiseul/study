import { proxy } from '@/lib/api';
export async function GET(req: Request){ const url=new URL(req.url); return proxy('/api/products'+url.search,{method:'GET'}); }
