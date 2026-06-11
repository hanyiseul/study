import { proxy } from '@/lib/api';
export async function PUT(_:Request,{params}:{params:{id:string}}){ return proxy(`/api/admin/products/${params.id}/block`,{method:'PUT'},true); }
