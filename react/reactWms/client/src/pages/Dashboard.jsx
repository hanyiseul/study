import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import HeroBanner from '../components/HeroBanner';
import SummaryCard from '../components/SummaryCard';
import InventoryTable from '../components/InventoryTable';
import { useDashboardState } from '../hooks/useDashboardState';

function Dashboard() {
  const {
    menuGroups,
    selectedMenu,
    setSelectedMenu,
    searchKeyword,
    setSearchKeyword,
    summaryCards,
    filteredInventoryRows
  } = useDashboardState();

  return (
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

          <InventoryTable rows={filteredInventoryRows} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;