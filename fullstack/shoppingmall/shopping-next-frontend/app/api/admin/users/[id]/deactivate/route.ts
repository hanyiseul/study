import { proxy } from '@/lib/api';
export async function PUT(_:Request,{params}:{params:{id:string}}){ return proxy(`/api/admin/users/${params.id}/deactivate`,{method:'PUT'},true); }
