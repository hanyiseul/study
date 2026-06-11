"use client";
import RoleGuard from '@/components/RoleGuard';import {useEffect,useState} from 'react';
function Inner(){const [data,setData]=useState<any>({});async function load(){const b=await fetch('/api/admin/dashboard').then(r=>r.json());setData(b.data||{});}useEffect(()=>{load()},[]);async function act(url:string){await fetch(url,{method:'PUT'});load()}function buttons(x:any){return null}return <div className="card"><h1>관리자 대시보드</h1><pre>{JSON.stringify(data,null,2)}</pre></div>}
export default function Page(){return <RoleGuard role="ADMIN"><Inner/></RoleGuard>}
