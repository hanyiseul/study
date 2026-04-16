import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MENU_GROUPS, SUMMARY_CARD_MAP } from '../data/dashboardData';
import {
  createInventoryItem,
  fetchInventoryRows,
  fetchSummaryCards
} from '../api/inventoryApi';

function normalizeText(value) {
  return String(value).toLowerCase().trim();
}

export function useDashboardState() {
  const queryClient = useQueryClient();

  const [selectedMenu, setSelectedMenu] = useState('메인페이지');
  const [searchKeyword, setSearchKeyword] = useState('');

  const inventoryQuery = useQuery({
    queryKey: ['inventory'],
    queryFn: fetchInventoryRows,
    staleTime: 10000
  });

  const summaryQuery = useQuery({
    queryKey: ['summaryCards'],
    queryFn: fetchSummaryCards,
    staleTime: 10000
  });

  const mutation = useMutation({
    mutationFn: createInventoryItem,

    onMutate: async function (newItem) {
      await queryClient.cancelQueries({ queryKey: ['inventory'] });

      const previousInventory = queryClient.getQueryData(['inventory']);

      queryClient.setQueryData(['inventory'], function (old) {
        return [
          {
            id: Date.now(),
            ...newItem,
            expectedAmount:
              Number(newItem.expectedAmount).toLocaleString('ko-KR') + '원'
          },
          ...(old || [])
        ];
      });

      return { previousInventory };
    },

    onError: function (error, newItem, context) {
      if (context?.previousInventory) {
        queryClient.setQueryData(['inventory'], context.previousInventory);
      }
    },

    onSettled: function () {
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
      queryClient.invalidateQueries({ queryKey: ['summaryCards'] });
    }
  });

  const summaryCards = useMemo(function () {
    if (selectedMenu !== '메인페이지') {
      return SUMMARY_CARD_MAP[selectedMenu] || SUMMARY_CARD_MAP['메인페이지'];
    }

    return summaryQuery.data?.main || SUMMARY_CARD_MAP['메인페이지'];
  }, [selectedMenu, summaryQuery.data]);

  const filteredInventoryRows = useMemo(function () {
    const rows = inventoryQuery.data || [];
    const keyword = normalizeText(searchKeyword);

    if (!keyword) {
      return rows;
    }

    return rows.filter(function (row) {
      return [
        row.productName,
        row.category,
        row.status,
        row.location,
        row.storagePeriod,
        row.inboundDate,
        row.outboundDueDate,
        row.expectedAmount
      ].some(function (field) {
        return normalizeText(field).includes(keyword);
      });
    });
  }, [inventoryQuery.data, searchKeyword]);

  return {
    menuGroups: MENU_GROUPS,
    selectedMenu,
    setSelectedMenu,
    searchKeyword,
    setSearchKeyword,
    summaryCards,
    filteredInventoryRows,
    inventoryQuery,
    summaryQuery,
    createItemMutation: mutation
  };
}