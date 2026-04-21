type Product = {
  id: number;
  name: string;
  price: number;
};

const product1: Product = { // 반복되는 타입 구조에 이름을 붙일 수 있음
  id: 1,
  name: '노트북',
  price: 1500000
};

console.log(product1);