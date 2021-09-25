# 📖 1장 변수 할당으로 의도를 표현하라  ✏️
- `cosnt`는 변수를 재할당할 수 없는 방식
- `let`은 재할당이 가능하지만 블록 유효 범위가 적용되어 잠재적인 유효 범위 충돌이 발생하지 않도록 보호 
- 선언한 변수를 사용해 새로운 문자열을 생성할 수 있는 `템플릿 리터럴`의 사용법 

<br>

***
<br><br>

## TIP 1 : const로 변하지 않는 값을 표현하라 🔍
👉 const를 이용해 재할당을 피하고 의도를 다른 개발자에게 전달하는 방법

- `const`는 코드를 읽기 쉽게 만드는 제약 사항을 가지고 있다. 
- `const`는 블록의 문맥 내에서 재할당할 수 없는 변수 선언이다. 
- 즉, 한 번 선언하면 변경할 수 없다. 
- 그렇지만 값이 변경되지 않는 것, 즉 불변값이 되는 것을 아니다. 
- `const`에 배열을 할당하는 경우에도 배열의 항목은 바뀔 수 있다. 

<br>

- 값을 할당한다는 것은 단순히 정보를 선언하는 것이 아니다. 
- 무엇을 정보로 할지에 대한 신호를 보내는 것 
- 값을 할당하고 변경하지 않을 것이라는 점을 표시하면, 코드를 훑어볼 때 해당 변수를 신경 쓰지 않아도 된다고 알려줄 수 있다. 

```js
const taxRate = 0.1;
const total = 100 + (100 * taxRate);
// 100행의 코드를 건너뛰었습니다.
return `구매 금액은 ${total}입니다. `;

var taxRate = 0.1;
var total = 100 + (100 * taxRate);
// 100행의 코드를 건너뛰었습니다. 
return `구매 금액은 ${total}입니다.`;
```
- 첫 번째 코드가 훨씬 이해하기 쉽다. 
- 첫 번째 코드에서는 `구매 금액은 110입니다`가 반환된다는 것을 정확하게 알 수 있다. 
- `var`를 이용해서 할당한 경우에는 `total`이 어떤 값이 될지 알 수 없다. 

```js
const taxRate = 0.1;
const shipping = 5.00;
let total = 100 + (100 * taxRate) + shipping;
// 100행의 코드를 건너뛰었습니다.
return `구매 금액은 ${total}입니다. `;
```
- `total`이 어떤 값이 될지 확신할 수 없다. 

- `const`를 자주 사용하고 `let`은 드물게 사용하면 변경되는 부분을 예측할 수 있다. 
- `const`에 할당된 값이 불변값이 되지는 않는다
- 즉, 변수를 재할당할 수는 없지만, 값을 바꿀 수는 있다. 
```js
const discountable = [];
// 코드를 몇 행 건너뛰었습니다.
for (let i = 0; i < createImageBitmap.length; i++){
  if (cart[i].discountAvailable){
    discountable.push(cart[i])
  }
}
```
- 배열에 항목을 추가할 수 있다. 
```js
const discountable = cart.filter(item => item.discountAvailable);
```
- 조작(mutation)을 하지 않고 작성 
- 결과는 같지만 조작을 사용하지 않았다. 
- `const`를 기본으로 사용하자. 


