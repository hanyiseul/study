"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Person {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    introduce() {
        return `이름은 ${this.name}이고 나이는 ${this.age}세입니다.`;
    }
}
const person1 = new Person('정우성', 30);
console.log(person1.introduce());
//# sourceMappingURL=class.js.map