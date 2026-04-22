export type Product = {
  id: string;
  name: string;
  summary: string;
  description: string;
  interestRate: string;
};

export const products: Product[] = [
  {
    id: '1',
    name: '정기예금 플러스',
    summary: '안정적인 금리 혜택을 제공하는 대표 예금 상품',
    description:
      '예치 기간 동안 안정적으로 금리를 제공하는 상품이다. 목돈을 안전하게 운용하려는 사용자에게 적합하다.',
    interestRate: '연 3.4%'
  },
  {
    id: '2',
    name: '청년 적금 스타트',
    summary: '사회초년생을 위한 적금 상품',
    description:
      '매월 일정 금액을 납입하며 자산 형성을 시작할 수 있는 상품이다. 청년층의 저축 습관 형성에 초점을 맞춘다.',
    interestRate: '연 4.1%'
  },
  {
    id: '3',
    name: '직장인 자유입출금',
    summary: '급여 이체와 생활 자금 관리를 위한 입출금 상품',
    description:
      '자유로운 입출금이 가능하며 급여 이체와 생활비 관리를 함께 고려한 상품이다.',
    interestRate: '연 1.8%'
  }
];

export function getProductById(id: string) {
  return products.find((product) => product.id === id);
}