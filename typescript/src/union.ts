// 하나의 값이 여러 타입 중 하나를 가질 수 있도록 정의
let orderId: string | number;

orderId = 1001;
console.log(orderId);

orderId = 'A-1002';
console.log(orderId);