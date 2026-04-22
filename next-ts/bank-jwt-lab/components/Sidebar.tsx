export default function Sidebar() {
  return (
    <aside className="rounded-3xl bg-slate-900 p-5 text-white">
      <p className="mb-4 text-sm font-semibold text-blue-300">메뉴</p>

      <nav className="space-y-2">
        <div className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold">
          대시보드
        </div>
        <div className="rounded-2xl px-4 py-3 text-sm text-slate-300">
          내 계좌
        </div>
        <div className="rounded-2xl px-4 py-3 text-sm text-slate-300">
          계좌 이체
        </div>
        <div className="rounded-2xl px-4 py-3 text-sm text-slate-300">
          거래 내역
        </div>
        <div className="rounded-2xl px-4 py-3 text-sm text-slate-300">
          관리자 메뉴
        </div>
      </nav>
    </aside>
  );
}