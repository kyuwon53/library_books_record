# 📖 4장 조건문을 깔끔하게 작성하라 ✏️

어수선한 조건문을 청소  

- 자바스크립트의 참과 거짓 
- if/else 조건문을 한 줄로 정리하는 삼항 연산자
-  단락 평가를 이용해 조건문을 최대한 축약함으로써 변수에 할당하는 방법

<br>

***
<br><br>

## TIP 17 :거짓 값이 있는 조건문을 축약하라🔍
- 불 자료형 (boolean type) 이라 부르는 원시값 true, false
- 참(truthy) 또는 거짓(falsy) 값이라고 부르는 값 

#### 동등과 일치의 차이
- `==` (동등) : 내용은 같지만 자료형이 서로 다른 값을 비교할 때 
    - ```js
      1 == '1' // true
       ```

- `===` (일치) : 동일한 값 또는 엄격히 일치하는 값이란 두 값이 서로 동일할 뿐만 아니라 자료형도 같은 것을 의미 
    - ```js
        1 === '1' // false
        1 === 1   // ture
      ```

- 객체와 배열의 인스턴스인 경우에는 동일한지 확인할 때 참조를 기준으로 한다. 

- 빈 문자열은 `false`와 동등하다. 하지만 일치 하지는 않는다 .

```js
'' == false   // true
if(''){
  return '난 false가 아니야!'
} else{
  return '내가 false라니... :( !'
}
// 내가 false라니... :( !

```
- 0, null, 빈 문자열('',""), NaN(숫자가 아님), false 는 `거짓` 값이다. 
- 배열과 객체의 경우 빈 배열 또는 빈 객체라도 항상 참 값이다. 
- 거짓과 참 값이 중요한 이유는 긴 표현식을 축약할 수 있기 때문

- 조건문을 통해 검증을 할때 배열과 객체의 경우 빈 배열 또는 빈 객체라도 항상 참 값이기 때문에 `undefined`를 반환해도 조건문을 통과하게 된다. 

- 문제해결 
  1. 데이터를 조작하지 않는다. 함수를 수정
  2. 엄격한 일치 (`===`)를 사용해서 검증 

  ```js
    function checkAuthorization(){
      if(employee.equipmentTraining !== True){
        return '기계를 작동할 권한이 없습니다.';
      }
      return `반갑습니다, ${employee.name} 님`;
    }
    checkAuthorization(employee);
    // '기계를 작동할 권한이 없습니다.'
  ```


<br>

***
<br><br>

## TIP 18 : 삼항 연산자로 빠르게 데이터를 확인하라🔍
  
- 삼항 연산자를 이용해 재할당을 줄일 수 있다. 
- 삼항 연산자를 사용하면 단순해지고 예측 가능해진다. 

```js
if (title === '과장'){
  const permissions = ['근로시간', '수당'];
} else {
  const permissions = ['근로시간'];
}
permissions;
// ReferenceError : permissions is not defined

let permissions;
if (title == '과장'){
  permissions = ['근로시간','수당'];
} else{
  permissions = ['근로시간'];
}


const permissions = title === '과장' ? ['근로시간', '수당'] : ['근로시간'];
```

- 훨씬 깔끔하고 예측 가능한 값이 되었다. 
- 삼항 연산자를 여러 개 연결해서 사용하는 것은 피하라.
  - 가독성이 떨어지고 단순함도 떨어진다. 
  - 확인을 위한 코드를 완전히 블록 외부로 분리해서 독립적인 함수로 이동시키는 것이 좋다. 

> 삼항 연산자는 코드를 단순화할 수 있어서 사용할 만한 가치가 있는 경우에만 쓰고, 삼항 연산자로 인해 지나치게 코드가 모호해진다면 일반적인 if 문으로 돌아가는 것이 바람직하다. 

```js
const permission = title === '부장' || title === '과장' ? title === '과장' ?
    ['근로시간', '초과근무승인' , '수당'] : ['근로시간', '초과근무승인'] : ['근로시간'];
// 위의 코드는 삼항 연산자가 여러 번 쓰여서 가독성이 떨어진다. 

// if 문으로 분리하니 더 깔끔하다.
function getTimePermissions({ title }){
  if (title === '과장'){
    return ['근로시간', '초과근무승인','수당'];
  }
  if (title === '부장'){
    return ['근로시간', '초과근무승인'];
  }
  return ['근로시간'];
}

const permission = getTimePermissions({ title: '사원'});
// ['근로시간']

```


<br>

***
<br><br>

## TIP 19 : 단락 평가를 이용해 효율성을 극대화하라🔍

- 단락 평가를 이용해 조건문을 가장 짧은 표현식으로 줄이는 방법
- 단락 평가의 목적 : 가장 타당한 정보를 먼저 위치시켜서 정보 확인을 건너뜀 

- 데이터가 항상 유효하다는 것은 **필요한 데이터**와 **확인하는 데이터**에 차이가 없음을 의미한다. 
  - 만약 데이터가 참이라면 데이터를 그대로 사용한다.

- OR 연산자로 검사한 값 중 하나가 true를 반환하면, 실제로는 true 대신 검사를 통과한 참 값이 반환 
- `boolean` 값을 확인하고, 확인한 값을 곧바로 할당할 수 있다. 

```js
const name = 'joe' || 'I have no name';
name;

// 'joe'
```
- 조건문과  `&&` 연사자를 조합하면 `TypeError`를 피할 수 있다 .
  - `&&` 연산자로 작성한 논리 문자열은 거짓 값이 발생하는 즉시 중지된다. 

  - 객체에 없는 속성은 그저 `undefined`이다. 
  - 삼항 연사자와 단락 평가를 조합할 때는 주의 해야한다. 코드가 이상해질 수 있다. 
  - 코드를 더 명료하게 만드는 조건문이 필요하다.
  - 코드가 길어지면 (조건을 세 가지 이상 확인하는 경우) 독립적인 함수를 만드는 편이 낫다. 

  - 항상 코드를 통한 의사소통과 가독성이 중요한 목표이다. 
