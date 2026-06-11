import Link from 'next/link';
async function load(){const res=await fetch('http://localhost:3100/api/notices',{cache:'no-store'}).catch(()=>null); if(!res)return []; const b=await res.json(); return b.data||[]}
export default async function Notices(){const items=await load();return <div className="card"><h1>공지사항</h1>{items.map((n:any)=><p key={n.id}><Link href={`/notices/${n.id}`}>{n.title}</Link> · {n.adminName}</p>)}</div>}
