# 📖 7장 유연한 함수를 만들어라  ✏️
- 테스트 가능한 코드를 작성하는 방법
- 화살표 함수로 매개변수에 대한 모든 개념을 한줄짜리 함수에 적용
- 함수를 반환하는 함수인 고차 함수 
- 명확하고 재사용 가능한 함수를 만들기 위해 정보를 잠그는 두 가지 기법
- 함수, 커링, 고차 함수 
- 문맥 문제를 화살표 함수로 해결
- 변수에 접근할 수 없을 때는 `클로저`를 사용


<br>

***
<br><br>

## TIP 32 : 테스트하기 쉬운 함수를 작성하라 🔍

- 테스트를 작성하면 코드를 쉽게 리팩토링할 수 있고, 오래된 코드를 쉽게 이해할 수 있다.
- 기존 코드에 테스트를 적용하려고 하기 때문에 테스트를 작성하는 것이 어렵다고 생각한다.
  - 기존 코드는 외부 의존성에 강하게 결합되어 있는 테스트하기 어려운 코드이다. 
- 코드에 테스트를 작성하려 하지 말고, 테스트할 수 있는 코드를 작성하는 것에 집중해야 한다. 
***
#### 테스트 프레임워크 
- [재스민(Jasmine)](https://jasmine.github.io)
- [모카(Mocha)](https://mochajs.org)
- [제스트(Jest)](https://facebook.github.io/jest/)

<br>

***

- 불러온 함수를 직접 사용할 때는 테스트하려는 함수가 불러온 함수와 밀접하게 결합되는 문제가 있다.
- 테스트를 실행할 때 테스트가 오부 API에도 접근해야하며, 그 결과 테스트는 네트워크 접근, 응답 시간 등에 의존하게 된다. 
- 이 문제를 피하려면 모의 객체를 생성해서 함수를 가로채고 명시적인 반환값을 설정하게 만들어야 한다.    
<br>
***
- 스텁을 만들 때 불러온 코드는 건너뛰기 때문에 실제 코드를 실행하지 않고 출력될 값만 선언한다
- 스텁을 사용할 때의 장점은 어떤 종류든 외부 의존성을 걱정할 필요가 없다
- 단점은 단언문을 작성할 때마다 반환값을 반복해서 설정해야 한다

- 테스트 꾸러미가 종료되면 원래의 메서드를 사용하도록 코드를 복구해야 한다. 
- 테스트 코드에 스파이, 모의 객체, 스텁과 같은 여러 가지 외부 헬퍼를 사용하고 있다면, 코드가 복잡하고 강하게 결합되어 있다는 증거이다. 

- 밀접하게 결합된 코드를 수정하는 것은 외부 함수를 인수로 전달하도록 바꾸기만 하면 된다. 
- `의존성`을 인수로 전달하는 것을 `의존성 주입`이라고 한다. 


#### 스텁
- 외부 코드를 덮어 써서 명시적인 결과를 반환하게 만듬
- 함수의 내부 논리를 모두 제거하고 결과만 선언하기 때문

#### 모의 객체
- 원본 객체를 대체한 후, 원본 객체가 수신할 메시지와 호출할 메서드를 바탕으로 단언문을 작성

##### 스텁과 모의 객체 차이점 
- 모의 객체를 사용할 때는 코드를 호출하기 전에 기댓값을 설정한다는 점

#### 스파이
- 모의 객체와 비슷하지만, 코드를 실행한 후에 스파이가 어떻게 호출되었는지 확인

```js
function formatPrice(user, { price, location }, getTaxInformation){
  const rate = getTaxInformation(location);
  const taxes = rate ? `추가 세금 $${price * rate}` : '추가 세금';
  return `${user}님의 합계 금액: $${price} 및 ${taxes}`;
}
export { formatPrice };
```
- 코드의 결합을 제거하려면 `getTaxInformation()`을 인수로 전달하는 것만으로 충분하다.
- 의존성 주입을 사용하기 때문에 스텁이 필요없다. 
- 테스트를 작성할 때 불러오기를 생략할 필요가 없으며, 그 대신에 필요한 값을 반환하는 간단한 함수를 전달하면 된다. 

```js
import expect from 'expect';

import { formatPrice } from './test';

describe('가격 표시', () => {
  it('세금 정보가 없으면 세금 추가를 안내해야 한다', () => {
    const item = { price: 20, location: 'Oklahoma' };
    const user = 'Aaron Cometbus';
    const message = formatPrice(user, item, () => null);
    expect(message).toEqual('Aron Cometbus님의 합계 금액: $30 및 추가 세금');
  });

  it('세금 정보가 있으면 세금 금액을 알려줘야 한다', () => {
    const item = { price: 30, location: 'Oklahoma' };
    const user = 'Aaron Cometbus';
    const message = formatPrice(user, item, () => 0.1 );
    expect(message).toEqual('Aron Cometbus님의 합계 금액: $30 및 추가 세금 $3');
  });
});
```
- 코드에는 몇 가지 부수 효과와 입출력이 있을 수 있다.
  - 이러한 부분을 최대한 적게 사용하는 것이 테스트 가능한 코드를 작성하는 묘수이다. 
  - 예를 들어 모든 비동기 호출을 서비스로 옮길 수 있다.
  - 함수에서 사용해야 할 때 옮겨뒀던 서비스를 주입해 테스트하는 것이 비동기 응답을 모의 객체로 처리하는 것보다 쉽다. 
  

<br>

***
<br><br>

## TIP 33 : 화살표 함수로 복잡도를 낮춰라 🔍

### 해체 할당
```js
const name = {
  first: 'Lemmy',
  last: 'kilmister',
};

function getName({ first, last }){
  return `${first} ${last}`;
}
```
위 코드를 화살표 함수로 바꾸는 것은 매개변수와 템플릿 리터럴을 제외한 모든 것을 제거하고, `=>` 화살표를 추가하면 끝이다. 

```js
const getName = { first, last } => `${first} ${last}`;

// Error: Uncaught SyntaxError: Malformed arrow function parameter list
// 오류: 처리되지 않은 문법 오류: 잘못된 화살표 함수 매개변수 목록 
```
- 해체 할당, 나머지 매개변수, 매개변수 기본값 등을 사용하는 특별한 매개변수의 경우에는 괄호를 포함해야 한다. 

- 특별한 매개변수를 사용할 때는 보통의 함수와 마찬가지로 매개변수를 괄호로 감싸자.

```js
const comic = {
  first: 'Peter',
  last: 'Bagge',
  city: 'Seattle',
  state: 'Washington',
};

const getName = ({ first, last }) => `${first} ${last}`;
getName(comic);
// Peter Bagge
```
- 객체를 반환하는 경우에는 객체를 괄호로 감싸야 한다.
```js
const getFullName = ({ first, last }) => ({ fullName: `${first} ${last}`});
getFullName(comic);
// { fullName: 'Peter Bagge' }
```
- 괄호를 사용해서 값을 반환할 때는 코드를 여러 줄에 걸쳐 작성할 수 있다. 
- return 문을 생략하는 동시에 반환값을 여러 줄로 작성할 수 있다. 
- 화살표 함수는 다른 함수를 반환하는 함수인 고차 함수를 만드는 데 좋다. 
- 고차 함수는 그저 다른 함수를 반환하는 함수일 뿐이다. 

```js
const getNameAndLocation = ({first, last, city, state }) => ({
  fullName: `${first} ${last}`,
  location: `${city}, ${state}`,
});
getNameAndLocation(comic);
// {
//   fullName: 'Peter Bagge',
//   location: 'Seattle, Washington'
// }
```
```js
const discounter = discount => {
  return price => {
    return price * (1 - discount);
  };
};
const tenPercentOff = discounter(0.1);
tenPercentOff(100);
// 90
```
- 고차 함수의 반환값은 다른 함수이므로, 화살표 함수의 기능을 활용해서 return을 직접 작성하지 않고 중괄호 없이 함수를 반환할 수 있다. 

```js
const discounter = discount => price => price * (1 - discount);

const tenPercentOff = discounter(0.1);
tenPercentOff(100);
// 90
```
- 고차 함수는 매개변수를 가두는 데 사용할 수 있을 뿐만 아니라, 배열 메서드와 나머지 매개변수에도 도움을 줄 수 있다. 
- 다른 매개변수로 호출하기 전에 고차 함수에서 반환된 함수를 먼저 변수에 할당해 호출
- 첫 번째 매개변수 바로 뒤에 괄호를 연결해서 두 번째 매개변수를 전달하면, 첫 번째 함수에 이어 바로 다른 함수를 호출할 수 있다. 

```js
discounter(0.1)(100);
// 90
```

<br>

***
<br><br>

## TIP 34 : 부분 적용 함수로 단일 책임 매개변수를 관리하라 🔍

- 고차 함수는 매개변수를 가두는 방법을 통해 특별한 값을 제공하므로, 나중에 원래의 인수에 접근할 수 있게 해두고 함수 실행을 마칠 수 있다. 
- 매개변수를 분리해 함수의 의도를 명확하게 유지할 수 있다. 
- 고차 함수는 다른 함수를 반환하는 함수이다. 
- 함수 실행이 완전히 끝날때까지 최소한 구 단계에 걸친 매개변수가 존재한다. 
- 부분 적용 함수를 사용할 경우, 일부 매개변수를 전달하면 해당 매개변수를 잠그는 함수가 반환되어 여기에 더 많은 매개변수를 사용할 수 있다. 
- 부분 적용 함수를 이용하면 한 번에 전달해야 할 함수 인수의 수(항수(arity))가 줄어드는 대신 인수를 더 전달해야 하는 다른 함수를 반환한다. 
- 서로 독립적인 여러 매개변수 집합을 둘 수 있다. 

```js
function mergeProgramInformation(building, manager, event){
  const { hours, address } = building;
  const { name, phone } = manager;
  const defaults = {
    hours,
    address,
    contact: name,
    phone,
  };

  return { ...defaults, ...event};
};

const programInfo = mergeProgramInformation(building, manager, program);
const exhibitInfo = mergeProgramInformation(building, manager, exhibit);
```
- 함수를 호출할 때마다 전달하는 첫 번째 매개변수는 동일하다 
- 고차 함수를 이용해서 단일 책임 매개변수를 만들면 인수를 재사용할 수 있다. 
- 첫 번째 매개변수 집합은 기초 데이터를 수집한다. 
- 두 번째 매개변수 집합은 기초 데이터를 덮어 쓰는 사용자 지정 정보이다. 

```js
function mergeProgramInformation(building, manager){
  const { hours, address } = building;
  const { name, phone } = manager;
  const defaults = {
    hours,
    address,
    contact: name,
    phone,
  };

  return program => {
    return {...defaults, ...program };
  };
}

const programInfo = mergeProgramInformation(building, manager)(program);
// {
//   name: 'Presenting Research',
//   room: '415',
//   hours: '3-6',
//   address: 'Jayhawk Blvd',
//   phone: '555-555-5555',
// }
const exhibitInfo = mergeProgramInformation(building, manager)(exhibit);
// {
//   name: 'Emerging Scholarship',
//   contact: 'Dyan',  
//   hours : '8 a.m. - 8 p.m.',
//   address: 'Jayhawk Blvd',
//   phone: '555-555-5555',
// }
```
- 고차 함수는 완전히 완료되기 전에 여러 번 호출되어야 하는 함수이다. 
- 한번에 함수의 두 부분을 모두 호출하려면 괄호에 이어 괄호를 작성하면 된다. 
  - 외부 함수가 호출된 후 바로 내부 함수가 호출된다. 
- 매개변수에 단일 책임을 부여하기는 했지만 반복까지 제거되지는 않는다. 
- 부분 적용과 고차 함수를 사용해 매개변수에 단일 책임을 부여하는 데는 **나머지 매개변수를 재사용 할 수 있기 때문에** 한다. 
- 인수 집합에서 나머지 매개변수는 한 번만 사용할 수 있다. 

```js
 const birds = getBirds('kansas', 'wisconsin', 'new mexico');
 // ['meadowlark', 'robin', 'roadrunner']

 const zip = (...left) => (...right) => {
  return left.map((item, i) => [item, right[i]]);
 };
 zip('kansas', 'wisconsin', 'new mexico')(...birds);
//  [
//    ['kansas', 'meadowlark'],
//    ['wisconsin', 'robin'],
//    ['new mexico', 'roadrunner']
//  ]
```
- 원본과 결괏값을 배열 쌍으로 연결해야 한다. 
- 두 개의 배열을 쌍으로 결합하는 것은 매우 일반적인 작업이고 `zip함수`하고 부른다. 
- 여러 매개변수를 사용할 수 있는 `zip 함수`를 작성하려면 원본 배열을 넘겨받는 고차 함수가 필요하고, 결괏값 배열을 넘겨받아서 결합하는 함수를 반환하게 만들어야 한다. 
  - 위 예제에서는 원본 배열을 넘겨받는 고차 함수 : `...left`
  - 결괏값 배열을 넘겨받아서 결함합는 함수 : `...right`
- 인터페이스를 간결하게 유지해야 할 때 매우 유용하다. 
- 부분 적용 함수는 큰 노력 없이 매개변수를 결합할 수 있는 방법이다. 


<br>

***
<br><br>

## TIP 35 : 커링과 배열 메서드를 조합한 부분 적용 함수를 사용하라 🔍
👉 함수의 부분 적용을 통해 변수를 저장해두는 방법

- 고차 함수를 사용하면 값을 한 번 저장한 후 나중에 사용할 수 있는 새로운 함수를 만들어서 반복을 피할 수 있다. 
- 고차 함수에서 반환된 함수는 바로 다시 호출할 필요가 없다. 
- 고차 함수를 한 번 호출하면 계속해서 사용할 수 있는 새로운 함수가 반환되기 때문
  - 인수를 하드 코딩해둔 함수를 작성하는 것과 같다.
```js
const setStrongHallProgram = mergeProgramInformation(building, manager);
const programInfo = setStrongHallProgram(program);
const exhibitInfo = setStrongHallProgram(exhibit);
```
- 고차 함수의 부분적용을 활용

```js
const setStrongHallProgram = program => {
  const defaults = {
    hours: '8 a.m. - 8 p.m.',
    address: 'Jayhawk Blvd',
    name: 'Augusto',
    phone: '555-555-5555'
  }
  return {...defaults, ...program}
}

const programs = setStrongHallProgram(program);

const exhibit = setStrongHallProgram(exhibit);
```
- 정보를 하드 코딩
- 두 차례에 걸쳐 인수를 받는 고차 함수가 하드 코딩된 정보보다 유연하다 
- 고차 함수를 이용하면 매개변수를 별도로 분리할 수 있따. 
- 그렇지만 함수를 완전히 분리하기 전에 함수에 필요한 인수의 수를 줄일 수 있도록 인수를 분리하는 것이 훨씬 더 중요
- 한 번에 인수를 하나만 받는 함수를 `커링(currying)`이라고 하며, 이는 하나의 인수만 전달하는 메서드를 다룰 때 매우 유용하다. 

- 부분 적용 함수는 매개변수를 여러 번 받을 수 있따. 
- 부분 적용 함수와 커링 함수 모두 원래보다 필요한 인수의 수가 적은 함수를 반환해 인수 수를 줄인다. 
- 함수에는 함수가 받을 수 있는 전체 인수의 수가 있으며 항수라고 부른다. 
- 부분 적용 함수는 원래의 함수보다 항수가 적은 함수를 반환한다. 
- 커링 함수는 여러 개의 인수를 받는 함수에서 정확히 인수 하나만 받는 일련의 함수를 반환할 때 사용 

```js
function getDogNames(dogs, filter){
  const [key, value] = filter;
  return dogs
    .filter(dog => dog[key] === value)
    .map(dog => dog['이름']);
}

getDogNames(dogs, ['색상', '검정색']);
// ['맥스', '도니']
```
- 강아지 배열을 첫 번째 매개변수로 전달하고, 배열 메서드 `filter()`와 `map()`을 조합해 최종 결과 집합을 얻는다. 

1. 필터 함수에 제약이 있다. 
  - `===`을 사용할 때만 작동한다. 
2. 모든 배열 메서드와 마찬가지로 `map()`은 검사하는 항목만 인수로 받을 수 있기 때문에 유효 범위 내의 다른 변수들을 가져올 방법이 필요하다. 
  - `map()`은 다른 함수 내부의 함수이므로 이를 감싸고 있는 함수의 변수에 접근할 수 있다.
  - 즉, 매개변수를 이용해서 외부 함수에 필요한 변수를 전달할 방법이 필요하다.


```js
function getDogNames(dogs, filterFunc){
  return dogs
    .filter(filterFunc)
    .map(dog => dog['이름'])
}

getDogNames(dogs, dog => dog['무게'] < 20);
// ['맥스']
```
- 비교 함수를 하드 코딩하지 않고 필터 함수에 콜백 함수로 전달 
- 변수를 사용할 때 직접 코딩해서 넣거나 유효 범위의 충돌이 없는지 확인하는 절차를 거치고 있다.
- 부분 적용 함수를 변수에 할당해서 다른 함수에 데이터로 전달하는 방법으로 나머지 인수를 제공할 수 있다.

```js
const weightCheck = weight => dog => dog['무게'] < weight;

getDogNames(dogs, weightCheck(20));
// ['맥스']

getDogNames(dogs, weightCheck(50));
// ['맥스', '섀도']
```
- 커링 함수를 사용하면 여러 지점에서 다양한 매개변수를 전달할 수 있다. 
- 함수를 데이터로 전달할 수 있다.
- 반드시 두 개의 함수와 두 개의 인수 집합으로 제한할 필요가 없다. 

```js
const identity = field => value => dog => dog[field] === value;
const colorCheck = identity('색상');
const stateCheck = identity('지역');

getDogNames(dogs, colorCheck('갈색'));
// ['섀도']
getDogNames(dogs, stateCheck('캔자스'));
// ['섀도']
```
- 부분 적용 함수를 변수에 할당할 수 있고, 이 변수를 데이터로 전달할 수 도 있다. 
- 모든 조건을 충족하는 데이터를 찾아야 한다면, 검사에 사용할 여러 개의 비교 함수를 전달하고 배열 메서드인 `every()`를 사용할 수 있다.
  - `every()` 메서드는 모든 값이 `true`를 반환할 때 `true`를 반환합니다.
- 최소한 하나의 조건을 충족하는 데이터를 찾는 경우에는 `every()` 대신 다른 배열 메서드 `some()`을 사용한다. 
  - `some()` 메서드는 실행 결과 중 하나라도 true를 반환하면 true를 반환한다. 

- 커링은 인수가 하나만 있어야 하는 함수를 작성할 때 훌륭한 도구이다.


<br>

***
<br><br>

## TIP 36 : 화살표 함수로 문맥 혼동을 피하라 🔍
👉 화살표 함수를 이용해 문맥 오류를 피하는 방법

- 함수의 유효 범위는 간단히 말하면 함수가 접근할 수 있는 변수
- 문맥은 함수 또는 클래스에서 this 키워드가 참조하는 것이기도 하다
- 유효 범위는 함수와 연관되어 있고, 문맥은 객체와 연관되어 있다.
```js
const validator = {
  message: '는 유효하지 않습니다.',
  setInvalidMessage(field){
    return `${field}${this.message}`;
  },
};

validator.setInvalidMessage('도시');
// 도시는 유효하지 않습니다. 
```
- `setInvalidMessage()` 메서드는 `this.message`로 `message` 속성을 참조한다. 
  - `setInvalidMessage()` 메서드가 호출될 때 함수에서 `this` 바인딩을 생성하면서 해당 함수가 담긴 객체도 문맥에 포함시킨다. 

```js
const validator = {
  message: '는 유효하지 않습니다.',
  setInvalidMessage(...fields){
    return fields.map(function (field){
      return `${field}${this.message}`;
    });
  },
};
```
- 함수를 호출하면 `TypeError` 또는 `undefined`를 받는다

```js
validatorProblem.setInvalidMessages(field);
// TypeError: Cannot read property 'message of undefined
// 타입 오류: undefined의 속성 'message'를 읽을 수 없습니다.
```
- 함수를 호출할 때마다 호출되는 위치를 바탕으로 `this` 바인딩을 만든다. 
- `map()` 메서드에 콜백 함수로 전달한 경우에는 `map()` 메서드의 문맥에서 호출되므로
이 경우에는 `this` 바인딩이 `validator` 객체가 아니다. 이때의 문맥은 `전역 객체`가 된다.
- 콜백 함수로 전달되면 `message` 속성에 접근할 수 없게 된다. 

```js
const validator = {
  message: '는 유효하지 않습니다.',
  setInvalidMessages(...fields){
    return fields.map(field => {
      return `${field}${this.message}`;
    });
  },
};

validator.setInvalidMessages('도시');
// ['도시는 유효하지 않습니다.']
```

- 화살표 함수는 함수를 호출할 때 `this` 바인딩을 새로 만들지 않는다. 
```js
const validator = {
  message: '는 유효하지 않습니다.',
  setInvalidMessage: field => `${field}${this.message}`,
};

validatorMethod.setInvalidMessages(field);
// TypeError: Cannot read property 'message' of undefined
// 타입 오류: undefined의 속성 'message'를 읽을 수 없습니다.
```
- 현재 객체에 대해 새로운 `this` 문맥 바인딩을 만들지 않는다. 
  - 새로운 문맥을 만들지 않았기 때문에 전역 객체에 바인딩된 것이다. 


- 화살표 함수는 이미 문맥이 있고 다른 함수 내부에서 이 함수를 사용하려고 할 때 유용하다.
  - 그렇지만 새로운 `this` 바인딩을 설정할 필요가 있을 때는 문제가 된다. 
