import { cookies } from 'next/headers';
export async function POST(){ cookies().delete('token'); return Response.json({success:true,message:'로그아웃 완료'}); }
