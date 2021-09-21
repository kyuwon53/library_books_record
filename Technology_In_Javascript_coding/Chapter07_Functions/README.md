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

