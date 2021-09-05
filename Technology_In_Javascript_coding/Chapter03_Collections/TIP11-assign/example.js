// Object.assign() 열거할 수 있는 하나 이상의 속성들을 목표 객체로 복사

const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget);
// expected output: Object { a: 1, b: 4, c: 5 }

// 수정된 목표 객체를 반환
