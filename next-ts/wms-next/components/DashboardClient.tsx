'use client';

import Sidebar from './Sidebar';
import Topbar from './Topbar';
import HeroBanner from './HeroBanner';
import SummaryCard from './SummaryCard';
import InventoryTable from './InventoryTable';
import InventoryCreateForm from './InventoryCreateForm';
import AppErrorBoundary from '../error/AppErrorBoundary';
import { useDashboardState } from '../hooks/useDashboardState';

export default function DashboardClient() {
  const {
    menuGroups,
    selectedMenu,
    setSelectedMenu,
    searchKeyword,
    setSearchKeyword,
    summaryCards,
    filteredInventoryRows,
    inventoryQuery,
    createItemMutation,
  } = useDashboardState();

  return (
    <AppErrorBoundary>
      <div className="dashboard-layout">
        <Sidebar
          menuGroups={menuGroups}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />

        <div className="dashboard-main">
          <Topbar
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
          />

          <div className="dashboard-content">
            <HeroBanner title={selectedMenu} />

            <div className="status-panel">
              {inventoryQuery.isLoading && (
                <p className="status-text">
                  재고 목록을 최초 조회하는 중입니다.
                </p>
              )}

              {!inventoryQuery.isLoading && inventoryQuery.isFetching && (
                <p className="status-text">
                  캐시된 데이터를 먼저 보여주고 최신 데이터를 다시 확인하는 중입니다.
                </p>
              )}

              {createItemMutation.isPending && (
                <p className="status-text">
                  재고 등록 요청을 처리하는 중입니다.
                </p>
              )}

              {createItemMutation.isError && (
                <p className="status-text error-text">
                  {createItemMutation.error.message}
                </p>
              )}

              {createItemMutation.isSuccess && (
                <p className="status-text success-text">
                  재고 등록이 완료되었고 서버 기준으로 다시 조회했습니다.
                </p>
              )}
            </div>

            <section className="summary-grid">
              {summaryCards.map(function (card) {
                return (
                  <SummaryCard
                    key={card.title}
                    title={card.title}
                    value={card.value}
                    subText={card.subText}
                    icon={card.icon}
                  />
                );
              })}
            </section>

            <InventoryCreateForm mutation={createItemMutation} />

            <InventoryTable rows={filteredInventoryRows} />
          </div>
        </div>
      </div>
    </AppErrorBoundary>
  );
}