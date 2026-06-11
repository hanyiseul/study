"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
export default function HeaderClient(){
 const [me,setMe]=useState<any>(null);
 useEffect(()=>{fetch('/api/auth/me').then(r=>r.ok?r.json():null).then(b=>setMe(b?.data||null)).catch(()=>{});},[]);
 async function logout(){await fetch('/api/auth/logout',{method:'POST'}); location.href='/';}
 return <header className="header"><Link href="/"><b>Shopping Fullstack</b></Link><nav className="nav"><Link className="secondary" href="/products">상품</Link><Link className="secondary" href="/notices">공지</Link>{me?.role==='USER'&&<><Link href="/cart">장바구니</Link><Link href="/orders">주문내역</Link></>}{me?.role==='SELLER'&&<><Link href="/seller/dashboard">판매자</Link><Link href="/seller/products">상품관리</Link><Link href="/seller/orders">주문관리</Link></>}{me?.role==='ADMIN'&&<><Link href="/admin/dashboard">관리자</Link><Link href="/admin/users">회원</Link><Link href="/admin/sellers">판매자승인</Link><Link href="/admin/products">상품관리</Link><Link href="/admin/orders">주문관리</Link><Link href="/admin/notices">공지관리</Link></>}{me?<button onClick={logout}>로그아웃</button>:<><Link href="/login">로그인</Link><Link href="/signup">회원가입</Link></>}</nav></header>
}
