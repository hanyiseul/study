import { proxy } from '@/lib/api';
export async function POST(req: Request){ return proxy('/api/auth/signup',{method:'POST',body:await req.text()}); }
