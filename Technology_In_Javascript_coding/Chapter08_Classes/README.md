# 📖 8장 클래스로 인터페이스를 간결하게 유지하라  ✏️
- 자바스크립트의 클래스가 다른 언어와 비슷한 개념을 사용하는 동시에 어떠한 차이점이 있는가
- 클래스를 만들고 확장
- 클래스 문법과 자바스크립트 프로토타입이 조합된 자바스크립트 클래스의 내부
- 게터(getter), 세터(setter), 제너레이터(generator)를 이용해서 복잡한 부분을 감추는 방법
- 클래스에서 `this` 키워드로 인해 겪는 일반적인 문제와 해결 기법 

클래스는 코드를 정돈할 때, 객체의 새로운 인스턴스를 생성할 때, 지역 속성을 저장할 때 도움이 된다. 

<br>

***
<br><br>

## TIP 37 : 읽기 쉬운 클래스를 만들어라 🔍
👉 자바스크립트에서 확장 가능한 클래스를 생성하는 법

- 자바스크립트는 여전히 프로토타입 기바느이 언어
- 클래스를 선언할 때는 `class` 키워드를 사용한다. 
- 새로운 인스턴스를 생성할 때는 `new` 키워드를 사용한다. 
```js
class Coupon {
}

const coupon = new Coupon();
```
- 클래스의 인스턴스를 생성할 때는 가장 먼저 생성자 함수를 실행한다. 
  - 생성자 함수에서는 여러 속성을 정의할 수 있다. 

- 생성자 메서드  `constructor()`라고 이름을 붙인다. 
  - `constructor()`를 클래스에 추가할 때는 함수를 작성하는 문법과 비슷하지만 `function` 키워드 없이 작성한다. 
  - 생성자는 함수이므로 자유롭게 인수를 전달할 수 있다. 
  - 생성자의 역할 중 하나는 `this` 문맥을 생성하는 것이다. 
  - 생성자의 내부에서 객체에 키-값 쌍을 추가하는 것처럼 `this`에 할당하는 방법으로 클래스에 속성을 추가할 수 있다. 
  - 생성자에 인수를 전달할 수 있기 때문에 새로운 인스턴스를 생성할 때 속성을 동적으로 설정할 수도 있다. 

```js
class Coupon {
  constructor(price, expiration){
    this.price = price;
    this.expiration = expiration || '2주';
  }
}

const coupon = new Coupon(5);
coupon.price;
// 5
coupon['expiration'];
// '2주'
```
- 생성자와 동일한 문법으로 클래스에 메서드를 추가할 수 있다. 
- 메서드는 화살표 함수가 아닌 보통 함수로 작성한다.
- 클래스에 화살표 함수를 사용하면 보통 함수와 다르게 동작한다.
- 클래스 메서드를 클래스의 인스턴스에서 호출한다면 `this` 문맥에 완전하게 접근할 수 있다.
  - 대부분의 경우 예측한대로 작동한다.

```js
class Coupon {
  constructor(price, expiration){
    this.price = price;
    this.expiration = expiration || '2주';
  }
  getPriceText() {
    return `$ ${this.price}`;
  }
  getExpirationMessage(){
    return ` 이 쿠폰은 ${this.expiration} 후에 만료됩니다. `;
  }
}
const coupon = new Coupon(5);
coupon.getPriceText();
// '$ 5'
coupon.getExpirationMessage();
// '이 쿠폰은 2주 뒤에 만료됩니다.'
```
- `this` 문맥을 연결해주는 생성자 함수를 이용해서 새로운 객체를 생성할 수 있다. 
- 메서드를 호출하고 속성에도 접근할 수 있다. 
- 이 모든 것이 직관적인 인터페이스를 이용한다.

<br>

***
<br><br>

## TIP 38 : 상속으로 메서드를 공유하라 🔍
👉 클래스를 확장하고 부모 클래스의 메서드를 호출하는 방법 

- 초기 버전의 자바스크립트에서 클래스 상속을 구현하는 것은 복잡한 과정이 필요
  1. 객체의 속성을 순회
  2. 개별 속성이 객체 프로토타입이 아닌 해당 객체에만 존재하는 속성인지 확인
  3. 메서드를 추가하기 전에 부모로부터 새로운 객체에 프로토타입을 복사

- 클래스를 사용하면 상속이 간단해진다. 
- 상속을 사용할 때는 주의가 필요하다 

```js
import Coupon from './extend';
class FlashCoupon extends Coupon{
}
const flash = new FlashCoupon(10);
flash.price;
// 10
flash.getPriceText();
// "$ 10"
```
- 새로운 속성이나 메서드를 추가할 것이 아니라면 상속에는 아무런 의미도 없다. 
- 새로운 생성자에서 부모 클래스의 생성자에 접근하려면 `super()`를 호출해야 한다. 
- `super()`는 부모 클래스의 생성자를 호출하기 때문에 부모 클래스의 생성자에 필요한 인수가 있다면 `super()`를 이용해서 넘겨준다.
- 새로운 속성을 추가하거나 부모 생성자가 설정한 속성을 덮어 쓸 수 있다. 

```js
import Coupon from './extend';
class FlashCoupon extends Coupon{
  constructor(price, expiration){
    super(price);
    this.expiration = expiration || '2시간';
  }
}
const flash = new FlashCoupon(10);
flash.price;
// 10
flash.getExpirationMessage();
// "이 쿠폰은 2시간 후에 만료됩니다"
```
- 부모 클래스에 있는 메서드를 사용하지만 `expiration` 속성은 자식 클래스에 있는 것을 사용한다. 
  - 익숙한 메시지에 새로운 유효 기간이 적용됨

- 메서드를 호출할 때마다 자바스크립트 엔진은 먼저 현재 클래스에 메서드가 있는지 확인
- 만약 메서드가 없다면 상속 연결의 상위로 올라가서 각 클래스나 프로토타입을 확인
- 즉, 클래스에 같은 이름의 메서드를 새로 작성하면 부모 클래스에서 상속한 메서드를 대체한다. 


- 부모 클래스에 추가하는 모든 메서드를 자식 클래스가 상속받는다.
  - 자식 클래스에서 필요하지 않은 메서드를 부모 클래스에 추가하면 자식 클래스가 비대해지기 쉽다.

```js
import Coupon from './extend';
class FlashCoupon extends Coupon {
  constructor(price, expiration){
    super(price);
    this.expiration = expiration || '2시간';
  }
  getExpirationMessage(){
    return `이 쿠폰은 깜짝 쿠폰이며 ${this.expiration} 후에 만료됩니다.`;
  }
  isRewardsEligible(user){
    return super.isRewardsEligible(user) && this.price > 20;
  }
  getRewards(user){
    if (this.isRewardsEligible(user)){
      this.price = this.price * 0.8 ;
    }
  }
}

export {FlashCoupon};
```
- 프로토타입 기반의 동작을 하기 때문에 레거시 코드와 클래스를 결합할 수 있는 이점이 있다. 


<br>

***
<br><br>

## TIP 39 : 클래스로 기존의 프로토타입을 확장하라 🔍
👉 기존의 프로토타입과 함께 클래스를 사용하는 방법 

- 자바스크립트의 클래스와 프로토타입이 다르지 않다 
- 클래스는 단지 보통의 자바스크립트를 작성하는 간결한 방법
- 자바스크립트에서는 새로운 인스턴스를 생성할 때 메서드를 복제하지 않는다. 
- 프로토타입에 대한 연결을 생성한다.
- 객체의 인스턴스에 있는 메서드를 호출하면 프로토타입에 있는 메서드를 호출한다.

<br>

- 자바스크립트에서 `class`라는 단어를 보더라도 그것이 새로운 기능이 아니라는 점을 알아야 한다.
- 클래스는 단지 프로토타입을 사용하기 위한 속기법일뿐
- 기존의 코드베이스와 클래스 문법을 통합할 수 있음을 의미 

<br>

- 자바스크립트에서 생성자 함수를 이용해 객체 인스턴스를 만들기 위해서는 간단히 함수를 작성하면 된다. 
- 함수를 생성자로 사용하려면 `코딩 컨벤션`으로 함수명을 **대문자**로 시작한다. 
- 함수 내부에서 `this` 키워드를 사용해 속성을 연결할 수 있다. 
- `new` 키워드를 이용해서 새로운 인스턴스를 생성할 때는 함수를 생성자로 사용하고 this 문맥을 바인딩한다. 
  - 메서드를 복제하지는 않는다.
- 생성자에서 `this`에 메서드를 추가할 수도 있지만, 프로토타입에 직접 추가하는 것이 훨씬 더 효율적이다.

<br>
- 프로토타입은 생성자 함수의 기반이 되는 객체이다. 
- 모든 객체 인스턴스는 프로토타입에서 속성을 가져온다. 
- 새로운 인스턴스도 프로토타입에 있는 메서드를 사용할 수 있다. 
- 프로토타입에 메서드를 추가하려면 `prototype` 속성에 메서드를 추가하면 된다. 
- 인스턴스의 프로토타입을 다루고 있기 때문에 새로운 인스턴스를 생성한 후에도 추가한 메서드에 접근할 수 있다. 

```js
function Coupon(price, expiration){
  this.price = price;
  this.expiration = expiration || '2주';
}
const coupon = new Coupon(5, '2개월');
coupon.price;
// 5

Coupon.prototype.getExpirationMessage = function (){
  return `이 쿠폰은 ${this.expiration} 후에 만료됩니다.`;
};
coupon.getExpirationMessage();
// 이 쿠폰은 2개월 후에 만료됩니다.
```
- class 키워드를 이용해서 객체를 생성할 때도 여전히 프로토타입을 생성하고 문맥을 바인딩한다. 
  - 단지 calss 키워드를 이용하면 더욱 직관적인 인터페이스를 사용할 수 있는 것뿐

- 프로토타입을 이용해서 생성한 레거시 코드에 새로운 코드를 추가할 때 클래스를 사용할 수도 있다.

<br>

***
<br><br>

## TIP 40 : get과 set으로 인터페이스를 단순하게 만들어라🔍
👉 get과 set을 이용해 단순한 인터페이스 뒤로 로직을 숨기는 방법

- 자바스크립트의 주요 문제점 중 하나는 비공개 속성을 기본적으로 지원하지 않는다는 점
  - 이제는 생겼다. private을 사용하려면 `#`을 붙이면 된다. 
- 클래스를 사용하는 쪽에서 메서드나 속성을 어떻게 사용할지 제어할 수 없습니다.
```js
class Coupon {
  constructor(price, expiration){
    this.price = price;
    this.expiration = expiration || '2주';
  }
  getPriceText(){
    return `$ ${this.price}`;
  }
  getExpirationMessage(){
    return `이 쿠폰은 ${this.expiration} 후에 만료됩니다.`;
  }
}
const coupon = new Coupon(5);
coupon.price = '$10';
coupon.getPriceText();
// '$ $10'
```
- `price`에 문자열을 설정하면 메시지가 정상적으로 노출되지 않는다. 
- 게터와 세터를 이용해서 로직을 추가하고 속성을 뒤로 숨기는 것
- 게터 또는 세터는 함수를 속성처럼 보이게 해서 복잡성을 숨기는 방법 
- 세터로 메서드를 리팩토링하는 것은 쉽다. 메서드 앞에 get 키워드를 추가하면 된다
- 함수 이름을 동작 대신 명사로 수정할 수도 있다. 
- 메서드나 함수는 동사로 시작하게, 속성은 명사로 한다. 

```js
class Coupon {
  constructor(price, expiration){
    this.price = price;
    this.expiration = expiration || '2주';
  }
  getPriceText(){
    return `$ ${this.price}`;
  }
  get expirationMessage(){
    return `이 쿠폰은 ${this.expiration} 후에 만료됩니다.`;
  }
}
```
- 간단한 변경을 처리한 뒤에는 점 표기법으로 메서드를 호출할 수 있다. (이 경우 괄호를 쓰지 않는다.)
- 메서드가 마치 속성처럼 작동한다.
- 세터는 게터처럼 작동한다. 
- 메서드를 속성처럼 보이게 해서 메서드를 숨겨준다. 
- 세터의 경우에는 인수를 하나만 받고, 정보를 노출하는 것이 아니라 속성을 변경한다. 
- 객체에 값을 설정하는 것처럼 등호를 사용해서 값을 전달한다. 
- 세터를 생성하려면 메서드 앞에 set 키워드를 추가한다
  - 메서드 내부에서는 속성값을 변경할 수 있다. 

```js
class Coupon {
  constructor(price, expiration){
    this.price = price;
    this.expiration = expiration || '2주';
  }

  set halfPrice(price){
    this.price = price / 2;
  }
}

const coupon = new Coupon(5);
coupon.price;
// 5
coupon.halfPrice = 20;
coupon.price;
// 10
coupon.halfPrice;
// undefined
```
- 세터에 대응되는 게터가 없으면 이상한 문제가 생길 수 있다. 
- 게터와 세터는 항상 짝을 맞춰서 만드는 것이 좋다. 

```js
class Coupon {
  constructor(price, expiration){
    this.price = price;
    this.expiration = expiration || 'Two Weeks';
  }
  get price(){
    return this.price;
  }

  set price(){
    this.price = `$ ${price}`;
  }
}
const coupon = new Coupon(5);
// RangeError: Maximum call stack size exceeded
// 범위 오류: 호출 스택의 최대치를 초과함
```
- 게터나 세터의 이름과 같은 이름을 가진 속성을 둘 수 없다. 
- 속성과 이름이 동일한 세터를 만들면 호출 스택이 무한히 쌓이게 된다.
- 해결책은 다른 속성을 게터와 세터 사이의 가교로 사용하는 것이다. 
- 이름 앞에 밑줄을 입력해 메서드나 속성이 비공개하는 점을 표시한다. 
- 중간 처리를 위한 속성을 설정한 후에는 게터와 세터를 밑줄 없이 같은 이름으로 두고 값에 접근하거나 수정할 수 있다. 


- 게터와 세터가 가져다주는 큰 이점은 복잡도를 숨길 수 있다는 점이다. 


<br>

***
<br><br>

## TIP 41 : 제너레이터로 이터러블 속성을 생성하라🔍
👉 제너레이터를 이용해 복잡한 데이터 구조를 이터러블로 변환하는 방법
- 이터러블은 데이터를 다룰 때 개별 데이터에 접근할 수 있도록 해서 좀 더 많은 유연성을 제공한다. 
- 객체는 직접적으로 순회할 수 없다. 
- 제너레이터라는 새롭고 특별한 함수를 이용하면 데이터를 한 번에 하나씩 반환할 수 있다. 
- 제너레이터란 제너레이터를 함수가 호출되었을 때 그 즉시 끝까지 실행하지 않고 중간에 빠져나갔다가 다시 돌아올 수 있는 함수 
- 제너레이터는 함수 몸체의 실행을 즉시 끝내지 않는 하나의 함수이다. 
- 다음 단계 전까지 기본적으로 일시 정지하는 중단점이 있는 함수이다. 

<br>

- 제너레이터를 생성하려면 `function` 키워드 뒤에 `별표(*)`를 추가한다. 
- 함수의 일부를 반환하는 `next()`라는 특별한 메서드에 접근할 수 있다. 
- 함수 몸체 안에서는 `yield` 키워드를 이용해 정보를 반환한다. 
- 함수를 실행할때는 `next()` 메서드를 이용해서 함수가 내보낸 정보를 가져올 수 있다.
- `next()`를 호출하면 두 개의 키 `value`와 `done`이 있는 객체를 가져온다. 
- `yield`로 선언한 항목이 `value`이다. 
- `done`은 남은 항목이 없다는 것을 알려준다. 

<br>
- 3부작 제너레이터를 사용하려면 먼저 함수를 호출하고 결과를 변수에 할당해야 한다. 
- 변수에 새로운 책이 필요할 때마다 `next()`를 호출한다. 
```js
function* getCairoTrilogy(){
  yield '궁전 샛길';
  yield '욕망의 궁전';
  yield '설탕 거리';
}

const trilogy = getCairoTrilogy();
trilogy.next();
// {value: '궁전 샛길', done: false}
trilogy.next();
// {value: '욕망의 궁전', done: false}
trilogy.next();
// {value: '설탕 거리', done: false}
trilogy.next();
// {value: undefined, done: true}
```
- 함수를 단계별로 조각조각 실행할 수 있다. 
- 정보가 매우 많고 일부만 접근해야 할 때 유용하다
- 정보의 일부만 꺼내고 다음 조각을 다른 곳에서 사용하기 위해 제너레이터를 전달해줄 수도 있다. 
- 고차 함수의 경우처럼 다른 곳에 사용할 수 있다. 

<br>

- 제너레이터가 함수를 이터러블로 바꿔준다. 
  - 데이터를 한 번에 하나씩 접근하기 때문에 쉽게 이터러블을 만들 수 있다. 
  - 제너레이터는 배열의 인덱스나 맵의 키를 다루는 것처럼 각 항목을 한 번에 하나씩 거쳐간다. 

```js
[...getCairoTrilogy()];
// ['궁전 샛길', '욕망의 궁전', '설탕 거리']

const readingList = {
  '깡패단의 방문': true,
  '맨해튼 비치': false,
};
for (const book of getCairoTrilogy()){
  readingList[book] = false;
}
readingList;
// {
//   '깡패단의 방문': true,
//   '맨해튼 비치': false,
//   '궁전 샛길': false,
//   '욕망의 궁전': false,
//   '설탕 거리': false
// }
```
- 제너레이터는 게터와 세터처럼 클래스에 단순한 인터페이스를 제공할 수 있다.

- 트리 데이터 구조는 검색하고 조회하는 데는 이점이 있지만, 정보를 평면화하기가 꽤 어렵다. 
- 제너레이터를 사용하면 배열에 담지 않고 데이터를 바로 반환할 수 있다. 
```js
class FamilyTree{
  constructor(){
    this.family = {
      name: 'Doris',
      child: {
        name: 'Martha',
        child: {
          name: 'Dyan',
          child:{
            name: 'Bea',
          },
        },
      },
    };
  }
  * [Symbol.iterator](){
    let node = this.family;
    while (node){
      family.push(node.name);
      node = node.child;
    } 
  }
}
const family = new FamilyTree();
[...family];
// ['Doris', 'Martha', 'Dyan', 'Bea' ];
```
- 제너레이터를 사용할 때의 이점은 다른 개발자들이 클래스의 세부 구현 내용을 알 필요가 없다는 것이다. 

