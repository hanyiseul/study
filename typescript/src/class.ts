class Person { // 클래스 구조에도 강한 타입 검사 적용
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  introduce(): string {
    return `이름은 ${this.name}이고 나이는 ${this.age}세입니다.`;
  }
}

const person1 = new Person('정우성', 30);
console.log(person1.introduce());