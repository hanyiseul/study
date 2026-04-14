import { create } from 'zustand';

const useDashboardStore = create(function (set, get) {
  return {
    stats: {
      sales: 0,
      users: 0,
      orders: 0
    },
    loading: false,
    error: '',
    lastUpdated: '',

    fetchDashboardData: async function () {
      set({
        loading: true,
        error: ''
      });

      try {
        await new Promise(function (resolve) {
          setTimeout(resolve, 1000);
        });

        const fakeResponse = {
          sales: 8500000,
          users: 1280,
          orders: 342
        };

        set({
          stats: fakeResponse,
          loading: false,
          lastUpdated: new Date().toLocaleString('ko-KR')
        });
      } catch (err) {
        set({
          loading: false,
          error: '대시보드 데이터를 불러오지 못했습니다.'
        });
      }
    },

    increaseSales: function () {
      const currentStats = get().stats;

      set({
        stats: {
          ...currentStats,
          sales: currentStats.sales + 100000
        },
        lastUpdated: new Date().toLocaleString('ko-KR')
      });
    },

    getSummaryText: function () {
      const stats = get().stats;

      return (
        '총 매출 ' +
        stats.sales.toLocaleString() +
        '원, 사용자 ' +
        stats.users.toLocaleString() +
        '명, 주문 ' +
        stats.orders.toLocaleString() +
        '건'
      );
    }
  };
});

export default useDashboardStore;