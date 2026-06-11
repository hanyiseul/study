"use client";
import { useEffect, useState } from 'react';
export default function RoleGuard({role,children}:{role:string,children:React.ReactNode}){const [ok,setOk]=useState<boolean|null>(null);useEffect(()=>{fetch('/api/auth/me').then(r=>r.ok?r.json():null).then(b=>setOk(b?.data?.role===role)).catch(()=>setOk(false));},[role]);if(ok===null)return <div className="card">권한 확인 중...</div>;if(!ok)return <div className="card">접근 권한이 없습니다.</div>;return <>{children}</>}
