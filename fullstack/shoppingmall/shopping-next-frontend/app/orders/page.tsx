"use client";
import { useEffect,useState } from 'react';import Link from 'next/link';
export default function Orders(){const [items,setItems]=useState<any[]>([]);useEffect(()=>{fetch('/api/orders').then(r=>r.json()).then(b=>setItems(b.data||[]))},[]);return <div className="card"><h1>주문 내역</h1>{items.map(o=><p key={o.id}><Link href={`/orders/${o.id}`}>{o.orderNumber}</Link> · {o.totalAmount}원 · {o.status}</p>)}</div>}
