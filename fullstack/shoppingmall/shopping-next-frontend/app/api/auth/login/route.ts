import { springBaseUrl } from '@/lib/api';
import { cookies } from 'next/headers';
export async function POST(req: Request){
 const res=await fetch(`${springBaseUrl()}/api/auth/login`,{method:'POST',headers:{'Content-Type':'application/json'},body:await req.text(),cache:'no-store'});
 const body=await res.json();
 if(res.ok && body?.data?.token){ cookies().set('token',body.data.token,{httpOnly:true,path:'/',sameSite:'lax',maxAge:60*60*8}); delete body.data.token; }
 return Response.json(body,{status:res.status});
}
