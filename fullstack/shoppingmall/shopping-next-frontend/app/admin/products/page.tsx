"use client";
import RoleGuard from '@/components/RoleGuard';import {useEffect,useState} from 'react';
function Inner(){const [data,setData]=useState<any>([]);async function load(){const b=await fetch('/api/admin/products').then(r=>r.json());setData(b.data||[]);}useEffect(()=>{load()},[]);async function act(url:string){await fetch(url,{method:'PUT'});load()}function buttons(x:any){return <button onClick={()=>act(`/api/admin/products/${x.id}/block`)}>차단</button>}return <div className="card"><h1>상품 관리</h1><table className='table'><tbody>{data.map((x:any)=><tr key={x.id||x.sellerId}><td><pre>{JSON.stringify(x,null,2)}</pre></td><td>{buttons(x)}</td></tr>)}</tbody></table></div>}
export default function Page(){return <RoleGuard role="ADMIN"><Inner/></RoleGuard>}
