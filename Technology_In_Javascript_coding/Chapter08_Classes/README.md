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
