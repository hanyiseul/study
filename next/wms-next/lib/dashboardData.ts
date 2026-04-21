export type MenuItem = {
  label: string;
  icon: string;
  type: 'main' | 'sub';
};

export type MenuGroup = {
  title: string;
  items: MenuItem[];
};

export type SummaryCardItem = {
  title: string;
  value: string;
  subText?: string;
  icon: string;
};

export const MENU_GROUPS: MenuGroup[] = [
  {
    title: 'HOME',
    items: [
      { label: '메인페이지', icon: '□', type: 'main' },
    ],
  },
  {
    title: '입고 및 계약',
    items: [
      { label: '계약 현황', icon: '◻', type: 'sub' },
      { label: '입고 현황', icon: '◻', type: 'sub' },
    ],
  },
  {
    title: '출고',
    items: [
      { label: '출고 현황', icon: '○', type: 'sub' },
    ],
  },
  {
    title: '재고',
    items: [
      { label: '재고 현황', icon: '○', type: 'sub' },
    ],
  },
  {
    title: '창고관리',
    items: [
      { label: '기자재 관리', icon: '○', type: 'sub' },
    ],
  },
  {
    title: '시스템',
    items: [
      { label: '공지사항', icon: '•', type: 'sub' },
      { label: '문의사항', icon: '•', type: 'sub' },
      { label: '사원관리', icon: '•', type: 'sub' },
    ],
  },
];

export const SUMMARY_CARD_MAP: Record<string, SummaryCardItem[]> = {
  메인페이지: [
    { title: '견적내역', value: '0', icon: '□' },
    { title: '입고내역', value: '0', subText: '입고예정 0 / 입고완료 0', icon: '≡' },
    { title: '출고내역', value: '0', subText: '출고예정 0 / 출고완료 0', icon: '◎' },
    { title: '정산내역', value: '0', icon: '◉' },
  ],
};