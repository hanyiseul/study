export type InventoryRow = {
  id: number;
  productInitial: string;
  productName: string;
  category: string;
  status: string;
  location: string;
  storagePeriod: string;
  inboundDate: string;
  outboundDueDate: string;
  expectedAmount: string;
};

export type SummaryCard = {
  title: string;
  value: string;
  subText?: string;
  icon: string;
};

export type CreateInventoryItemInput = {
  productInitial: string;
  productName: string;
  category: string;
  status: string;
  location: string;
  storagePeriod: string;
  inboundDate: string;
  outboundDueDate: string;
  expectedAmount: number | string;
};

export async function fetchInventoryRows(): Promise<InventoryRow[]> {
  const response = await fetch('/api/inventory');

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || '재고 목록 조회 실패');
  }

  return await response.json();
}

export async function createInventoryItem(
  itemData: CreateInventoryItemInput
) {
  const response = await fetch('/api/inventory', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || '재고 등록 실패');
  }

  return await response.json();
}

export async function fetchSummaryCards(): Promise<{ main: SummaryCard[] }> {
  const response = await fetch('/api/summary-cards');

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || '요약 카드 조회 실패');
  }

  return await response.json();
}