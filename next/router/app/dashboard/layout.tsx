export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2>대시보드 공통 영역</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        <aside style={{ width: '200px', borderRight: '1px solid #ddd' }}>
          <p>사이드 메뉴</p>
          <p>사용자 관리</p>
          <p>상품 관리</p>
        </aside>

        <div style={{ flex: 1 }}>
          {children}
        </div>
      </div>
    </section>
  );
}