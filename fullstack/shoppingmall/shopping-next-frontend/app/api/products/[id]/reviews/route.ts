import { proxy } from '@/lib/api';
export async function GET(_:Request,{params}:{params:{id:string}}){ return proxy(`/api/products/${params.id}/reviews`,{method:'GET'}); }
