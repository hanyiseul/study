import Link from 'next/link';
async function getProducts(){const res=await fetch('http://localhost:3100/api/products',{cache:'no-store'}).catch(()=>null); if(!res) return []; const body=await res.json(); return body.data||[];}
export default async function Products(){const products=await getProducts();return <div><h1>상품 목록</h1><div className="grid">{products.map((p:any)=><div className="card" key={p.id}><h3>{p.name}</h3><p className="muted">{p.sellerName} · {p.category}</p><p>{p.price?.toLocaleString()}원</p><Link className="btn" href={`/products/${p.id}`}>상세보기</Link></div>)}</div></div>}
