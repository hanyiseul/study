import RoleGuard from '@/components/RoleGuard';
export default function SellerDashboard(){return <RoleGuard role="SELLER"><div className="card"><h1>판매자 대시보드</h1><p>승인 후 상품 등록과 주문 배송관리가 가능합니다.</p></div></RoleGuard>}
