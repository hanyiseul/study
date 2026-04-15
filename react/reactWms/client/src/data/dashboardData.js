export const MENU_GROUPS = [
  {
    title: 'HOME',
    items: [
      { label: '메인페이지', icon: '□', type: 'main' }
    ]
  },
  {
    title: '입고 및 계약',
    items: [
      { label: '계약 현황', icon: '◻', type: 'sub' },
      { label: '입고 현황', icon: '◻', type: 'sub' }
    ]
  },
  {
    title: '출고',
    items: [
      { label: '출고 현황', icon: '○', type: 'sub' }
    ]
  },
  {
    title: '재고',
    items: [
      { label: '재고 현황', icon: '○', type: 'sub' }
    ]
  },
  {
    title: '창고관리',
    items: [
      { label: '기자재 관리', icon: '○', type: 'sub' }
    ]
  },
  {
    title: '시스템',
    items: [
      { label: '공지사항', icon: '•', type: 'sub' },
      { label: '문의사항', icon: '•', type: 'sub' },
      { label: '사원관리', icon: '•', type: 'sub' }
    ]
  }
];

export const SUMMARY_CARD_MAP = {
  '메인페이지': [
    { title: '견적내역', value: '18', icon: '□' },
    { title: '입고내역', value: '24', subText: '입고예정 5 / 입고완료 19', icon: '≡' },
    { title: '출고내역', value: '12', subText: '출고예정 10 / 출고완료 2', icon: '◎' },
    { title: '정산내역', value: '53,205,000', icon: '◉' }
  ],
  '계약 현황': [
    { title: '계약대기', value: '6', icon: '□' },
    { title: '계약완료', value: '12', icon: '≡' },
    { title: '진행중 계약', value: '4', icon: '◎' },
    { title: '총 계약금액', value: '18,200,000', icon: '◉' }
  ],
  '입고 현황': [
    { title: '입고예정', value: '5', icon: '□' },
    { title: '입고완료', value: '19', icon: '≡' },
    { title: '보류건수', value: '2', icon: '◎' },
    { title: '입고비용', value: '12,840,000', icon: '◉' }
  ],
  '출고 현황': [
    { title: '출고예정', value: '10', icon: '□' },
    { title: '출고완료', value: '2', icon: '≡' },
    { title: '긴급출고', value: '1', icon: '◎' },
    { title: '출고비용', value: '7,420,000', icon: '◉' }
  ],
  '재고 현황': [
    { title: '총 재고수', value: '148', icon: '□' },
    { title: '냉장 재고', value: '35', icon: '≡' },
    { title: '일반 재고', value: '113', icon: '◎' },
    { title: '재고평가액', value: '71,550,000', icon: '◉' }
  ],
  '기자재 관리': [
    { title: '사용 가능', value: '42', icon: '□' },
    { title: '점검 필요', value: '6', icon: '≡' },
    { title: '수리 중', value: '2', icon: '◎' },
    { title: '총 자산가치', value: '24,000,000', icon: '◉' }
  ],
  '공지사항': [
    { title: '전체 공지', value: '14', icon: '□' },
    { title: '긴급 공지', value: '2', icon: '≡' },
    { title: '미확인 공지', value: '7', icon: '◎' },
    { title: '이번 주 등록', value: '3', icon: '◉' }
  ],
  '문의사항': [
    { title: '접수 문의', value: '9', icon: '□' },
    { title: '처리 완료', value: '16', icon: '≡' },
    { title: '처리 대기', value: '4', icon: '◎' },
    { title: '금일 신규', value: '2', icon: '◉' }
  ],
  '사원관리': [
    { title: '전체 사원', value: '28', icon: '□' },
    { title: '활성 계정', value: '26', icon: '≡' },
    { title: '승인 대기', value: '1', icon: '◎' },
    { title: '부서 수', value: '5', icon: '◉' }
  ]
};

export const INVENTORY_ROWS = [
  {
    id: 1,
    productInitial: 'D',
    productName: 'Dropbox Design System',
    category: '일반',
    status: '입고예정',
    location: '서울-B-10-45',
    storagePeriod: '40일',
    inboundDate: '2023-09-10',
    outboundDueDate: '2023-10-20',
    expectedAmount: '2,350,000원'
  },
  {
    id: 2,
    productInitial: 'S',
    productName: 'Slack Team UI Design',
    category: '냉장',
    status: '출고완료',
    location: '서울-B-10-45',
    storagePeriod: '47일',
    inboundDate: '2023-09-10',
    outboundDueDate: '2023-10-20',
    expectedAmount: '4,500,000원'
  },
  {
    id: 3,
    productInitial: 'N',
    productName: 'Notion Warehouse Guide',
    category: '일반',
    status: '입고완료',
    location: '부산-A-02-11',
    storagePeriod: '15일',
    inboundDate: '2023-10-01',
    outboundDueDate: '2023-10-25',
    expectedAmount: '1,280,000원'
  },
  {
    id: 4,
    productInitial: 'F',
    productName: 'Figma Asset Kit',
    category: '냉장',
    status: '출고예정',
    location: '인천-C-01-08',
    storagePeriod: '22일',
    inboundDate: '2023-10-02',
    outboundDueDate: '2023-10-28',
    expectedAmount: '3,100,000원'
  }
];