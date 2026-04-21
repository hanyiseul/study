// 하나의 함수 구조를 여러 타입에 안저하게 적용 가능
function getFirstItem<T>(items: T[]): T | undefined { 
  return items[0];
}

const firstNumber = getFirstItem<number>([10, 20, 30]);
const firstString = getFirstItem<string>(['a', 'b', 'c']);

console.log(firstNumber);
console.log(firstString);