import { useEffect } from 'react';
import useDashboardStore from '../store/dashboardStore';

function DashboardPanel() {
  const stats = useDashboardStore(function (state) {
    return state.stats;
  });

  const loading = useDashboardStore(function (state) {
    return state.loading;
  });

  const error = useDashboardStore(function (state) {
    return state.error;
  });

  const lastUpdated = useDashboardStore(function (state) {
    return state.lastUpdated;
  });

  const fetchDashboardData = useDashboardStore(function (state) {
    return state.fetchDashboardData;
  });

  const increaseSales = useDashboardStore(function (state) {
    return state.increaseSales;
  });

  const summaryText = useDashboardStore(function (state) {
    return state.getSummaryText();
  });

  useEffect(function () {
    fetchDashboardData();
  }, [fetchDashboardData]);

  return (
    <section className="card">
      <h2>대시보드 상태관리 + API 흐름</h2>

      {loading && <p>데이터를 불러오는 중입니다.</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <>
          <p>총 매출: {stats.sales.toLocaleString()}원</p>
          <p>총 사용자: {stats.users.toLocaleString()}명</p>
          <p>총 주문: {stats.orders.toLocaleString()}건</p>
          <p>요약: {summaryText}</p>
          <p>마지막 갱신: {lastUpdated}</p>

          <div className="button-row">
            <button onClick={fetchDashboardData}>다시 조회</button>
            <button onClick={increaseSales}>매출 +10만원</button>
          </div>
        </>
      )}
    </section>
  );
}

export default DashboardPanel;