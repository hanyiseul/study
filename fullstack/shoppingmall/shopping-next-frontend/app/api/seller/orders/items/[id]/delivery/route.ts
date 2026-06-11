import { proxy } from '@/lib/api';
export async function PUT(req:Request,{params}:{params:{id:string}}){ return proxy(`/api/seller/orders/items/${params.id}/delivery`,{method:'PUT',body:await req.text()},true); }
