import { useEffect, useMemo, useState } from 'react';
import {
  INVENTORY_ROWS,
  MENU_GROUPS,
  SUMMARY_CARD_MAP
} from '../data/dashboardData';

function normalizeText(value) {
  return String(value).toLowerCase().trim();
}

export function useDashboardState() {
  const [selectedMenu, setSelectedMenu] = useState('메인페이지');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [inventoryRows, setInventoryRows] = useState([]);

  useEffect(function () {
    setInventoryRows(INVENTORY_ROWS);
  }, []);

  const summaryCards = useMemo(function () {
    return SUMMARY_CARD_MAP[selectedMenu] || SUMMARY_CARD_MAP['메인페이지'];
  }, [selectedMenu]);

  const filteredInventoryRows = useMemo(function () {
    const keyword = normalizeText(searchKeyword);

    if (!keyword) {
      return inventoryRows;
    }

    return inventoryRows.filter(function (row) {
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
  }, [inventoryRows, searchKeyword]);

  return {
    menuGroups: MENU_GROUPS,
    selectedMenu,
    setSelectedMenu,
    searchKeyword,
    setSearchKeyword,
    summaryCards,
    filteredInventoryRows
  };
}