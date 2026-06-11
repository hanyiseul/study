import { proxy } from '@/lib/api';
export async function PUT(req:Request,{params}:{params:{id:string}}){ return proxy(`/api/admin/notices/${params.id}`,{method:'PUT',body:await req.text()},true); }
