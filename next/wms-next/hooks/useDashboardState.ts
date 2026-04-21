'use client';

import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MENU_GROUPS, SUMMARY_CARD_MAP } from '../lib/dashboardData';
import {
  createInventoryItem,
  fetchInventoryRows,
  fetchSummaryCards,
  type CreateInventoryItemInput,
  type InventoryRow,
  type SummaryCard,
} from '../lib/inventoryApi';
import useUiStore from '../store/uiStore';

function normalizeText(value: unknown) {
  return String(value).toLowerCase().trim();
}

export function useDashboardState() {
  const queryClient = useQueryClient();
  const { theme, userProfile, toggleTheme } = useUiStore();

  const [selectedMenu, setSelectedMenu] = useState('메인페이지');
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(function () {
    document.title = selectedMenu + ' | Smart Wms';
  }, [selectedMenu]);

  useEffect(function () {
    function handleResize() {
      console.log('현재 화면 너비:', window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return function () {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const inventoryQuery = useQuery<InventoryRow[], Error>({
    queryKey: ['inventory'],
    queryFn: fetchInventoryRows,
    staleTime: 10000,
  });

  const summaryQuery = useQuery<{ main: SummaryCard[] }, Error>({
    queryKey: ['summaryCards'],
    queryFn: fetchSummaryCards,
    staleTime: 10000,
  });

  const createItemMutation = useMutation<
    any,
    Error,
    CreateInventoryItemInput,
    { previousInventory?: InventoryRow[] }
  >({
    mutationFn: createInventoryItem,

    onMutate: async function (newItem) {
      await queryClient.cancelQueries({ queryKey: ['inventory'] });

      const previousInventory =
        queryClient.getQueryData<InventoryRow[]>(['inventory']);

      queryClient.setQueryData<InventoryRow[]>(
        ['inventory'],
        function (old = []) {
          return [
            {
              id: Date.now(),
              productInitial: newItem.productInitial,
              productName: newItem.productName,
              category: newItem.category,
              status: newItem.status,
              location: newItem.location,
              storagePeriod: newItem.storagePeriod,
              inboundDate: newItem.inboundDate,
              outboundDueDate: newItem.outboundDueDate,
              expectedAmount:
                Number(newItem.expectedAmount).toLocaleString('ko-KR') + '원',
            },
            ...old,
          ];
        }
      );

      return { previousInventory };
    },

    onError: function (_error, _newItem, context) {
      if (context?.previousInventory) {
        queryClient.setQueryData(['inventory'], context.previousInventory);
      }
    },

    onSettled: function () {
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
      queryClient.invalidateQueries({ queryKey: ['summaryCards'] });
    },
  });

  const summaryCards = useMemo(function (): SummaryCard[] {
    if (selectedMenu !== '메인페이지') {
      return (
        SUMMARY_CARD_MAP[selectedMenu] ||
        SUMMARY_CARD_MAP['메인페이지']
      );
    }

    return (
      summaryQuery.data?.main ||
      SUMMARY_CARD_MAP['메인페이지']
    );
  }, [selectedMenu, summaryQuery.data]);

  const filteredInventoryRows = useMemo(function (): InventoryRow[] {
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
        row.expectedAmount,
      ].some(function (field) {
        return normalizeText(field).includes(keyword);
      });
    });
  }, [inventoryQuery.data, searchKeyword]);

  if (inventoryQuery.error || summaryQuery.error) {
    throw new Error(
      '네트워크 연결에 문제가 발생했습니다. 잠시 후 다시 시도해 주십시오.'
    );
  }

  return {
    theme,
    userProfile,
    toggleTheme,
    menuGroups: MENU_GROUPS,
    selectedMenu,
    setSelectedMenu,
    searchKeyword,
    setSearchKeyword,
    summaryCards,
    filteredInventoryRows,
    inventoryQuery,
    summaryQuery,
    createItemMutation,
  };
}