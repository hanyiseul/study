import { proxy } from '@/lib/api';
export async function GET(_:Request,{params}:{params:{id:string}}){ return proxy(`/api/seller/products/${params.id}`,{method:'GET'},true); }
export async function PUT(req:Request,{params}:{params:{id:string}}){ return proxy(`/api/seller/products/${params.id}`,{method:'PUT',body:await req.text()},true); }
export async function DELETE(_:Request,{params}:{params:{id:string}}){ return proxy(`/api/seller/products/${params.id}`,{method:'DELETE'},true); }
