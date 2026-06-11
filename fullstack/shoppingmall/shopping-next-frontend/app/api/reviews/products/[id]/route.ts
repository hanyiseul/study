import { proxy } from '@/lib/api';
export async function POST(req:Request,{params}:{params:{id:string}}){ return proxy(`/api/reviews/products/${params.id}`,{method:'POST',body:await req.text()},true); }
