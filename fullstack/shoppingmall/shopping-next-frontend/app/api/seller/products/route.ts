import { proxy } from '@/lib/api';
export async function GET(){ return proxy('/api/seller/products',{method:'GET'},true); }
export async function POST(req:Request){ return proxy('/api/seller/products',{method:'POST',body:await req.text()},true); }
