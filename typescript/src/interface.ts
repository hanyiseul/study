interface User { // 같은 구조의 객체를 여러번 사용할 때는 인터페이스가 적합
  id: number;
  name: string;
  email: string;
}

const user1: User = {
  id: 1,
  name: '최가분',
  email: 'gabkeun@test.com'
};

const user2: User = {
  id: 2,
  name: '김하늘',
  email: 'sky@test.com'
};

console.log(user1);
console.log(user2);