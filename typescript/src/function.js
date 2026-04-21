"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// (a: number, b: number) 매개변수 타입 명시
// : number { 반환 타입 명시
function add(a, b) {
    return a + b;
}
function printUser(name) {
    console.log('사용자 이름:', name);
}
const result = add(10, 20);
console.log('합계:', result);
printUser('박서준');
/**
 * - 매개변수 타입 명시
 * - 반환 타입 명시
 * - 반환값이 없는 함수는 void 사용
 * => 함수는 입력과 출력의 구조를 분명하게 표현
 */ 
//# sourceMappingURL=function.js.map