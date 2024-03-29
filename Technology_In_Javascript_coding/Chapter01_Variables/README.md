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

<br>

***
<br><br>

## TIP 2 : let과 const로 유효 범위 충돌을 줄여라 🔍
👉 값이 변경되는 경우 가장 좋은 선택은 `let`

- 변수를 다룰 때는 재할당을 피하는 것이 낫다
- 변수를 반드시 재할당해야하는 경우라면 `let`을 사용한다. 
- `let`은 재할당할 수 있다는 점에서 `var`와 유사하다. 
- `var`는 어휘적 유효 범위를 따르는 반면, `let`은 블록 유효 범위를 따른다. 
  - 블록 유효 범위 변수는 if 블록이나 for 반복문 같은 블록의 내부에만 존재한다. 
  - 블록 밖에서는 블록 유효 범위 변수에 접근할 수 없다. 
  - 즉, 변수를 선언한 중괄호를 벗어나면 변수가 존재하지 않는다 . 

```js
  function getLowestPrice(item){
  var count = item.inventory;
  var price = item.price;
  if (item.salePrice){
    var count = item.saleInventory;
    if (count > 0){
      price = item.salePrice;
    }
  }
  if (count){
    return price;
  }

  return 0;
}
```

- 변수를 같은 이름의 변수에 재할당한 것이 문제
- `let` 은 블록 유효 범위를 따르므로 블록 내부에 선언한 변수는 블록 외부에 존재하지 않는다. 
```js
function getLowestPrice(item){
  let count = item.inventory;
  let price = item.price;
  if (item.salePrice){
    let count = item.saleInventory;
    if (count > 0){
      price = item.salePrice;
    }
  }
  if (count){
    return price;
  }

  return 0;
}
```
- 변수 count를 선언하기 위해 `if 블록` 안에서 `let`을 사용했기 때문에 함수를 시작할 때 선언한 변수 `count`와 충돌하지 않는다. 
- `const`도 블록 유효 범위를 따른다. 
- 변수의 값이 변경되는 경우도 있으므로 계속해서 `let`을 사용할 수도 있겠지만, 아예 다른 이름을 쓰는 편이 더 확실하다. 

```js
function getLowestPrice(item){
  const count = item.inventory;
  let price = item.price;
  if (item.salePrice){
    const saleCount = item.saleInventory;
    if (saleCount > 0){
      price = item.salePrice;
    }
  }
  if (count){
    return price;
  }

  return 0;
}
```

- `let`과 `const`는 새로운 보호 방법을 가지고 있다. 
- `let`과 `const`는 같은 이름의 변수를 다시 선언할 수 없다. 
- `var`를 사용하는 경우에는 같은 유효 범위에서 같은 이름의 변수를 다시 선언할 수도 있다. 

```js
function getLowestPriceDeclareation(item){
  const count = item.inventory;
  let price = item.price;
  if (!count){
    return 0;
  }
  // ...
  let price = item.saleInventory ? item.salePrice : item.wholesalePrice;
  return price;
}
```

<br>

***
<br><br>

## TIP 3 : 블록 유효 범위 변수로 정보를 격리하라 🔍
👉 `for`문 또는 다른 반복문에서 `let`을 사용해 유효 범위 충돌을 방지하는 방법

- 블록 유효 범위 변수 선언을 이용하면 변수는 블록 내에서만 접근 할 수 있다. 
  - `if` 블록 내부에 변수를 선언하면 중괄호 밖에서는 접근할 수 없다 
  - `for`문 내부에 선언한 변수도 `for`문의 중괄호 밖에서는 접근할 수 없다. 
  - 반대로 함수 외부에 선언한 변수는 블록 내부에서 접근할 수 있다. 
  - 함수의 최상위에서 블록 유효 범위 변수를 선언한 경우에는 함수 내부의 `if`문이나 `for`문에서 접근 할 수 있다. 

  <br>

  - 어휘적 유효 범위를 따르는 변수를 선언한 경우에는 함수 내부 어디서든 접근할 수 있다 
    - 이 경우 `if` 블록 내부에서 생성한 변수를 함수 내부의 다른 곳에서 접근 할 수 있다. 
    - `호이스팅`이라는 컴파일 과정 덕분에 변수가 선언되기도 전에 접근할 수 있다. 
```js
function addClick(items){
  for (var i = 0; i < items.length; i++){
    items[i].onClick = function (){
      return i;
    };
  }
  return items;
}
const example = [{}, {}];
const clickSet = addClick(example);
clickSet[0].onClick();
```
- 유효 범위의 문제
- `var`로 할당한 변수는 함수 유효 범위를 따른다. (어휘적 유효 범위를 의미)
- 즉, 함수 내에서 마지막으로 할당한 값을 참조한다. 
```js
function addClick(items){
  for (var i = 0; i < items.length; i++){
    items[i].onClick = (function (i){
      return function () {
        return i;
      };
    }(i));
  }
  return items;
}
const example = [{}, {}];
const clickSet = addClick(example);
clickSet[0].onClick();
```
- 전통적인 해결 방법은 클로저( 다른 함수가 사용할 수 있도록 함수 내부에서 변수를 생성하는 것), 고차 함수(다른 함수를 반환하는 함수), 즉시 실행 함수가 조합되어 있다. 

```js
function addClick(items){
  for (let i = 0; i < items.length; i++){
    items[i].onClick = function (){
        return i;
    };
  }
  return items;
}
const example = [{}, {}];
const clickSet = addClick(example);
clickSet[0].onClick();
```
- `var` 대신 `let`을 사용한 것뿐이다. 
- `let`은 블록 유효 범위를 따르므로, 블록 내에서 선언한 변수는 해당 블록에서만 유효하다. 
- `let`을 이용하면 `for` 문이 반복될 때마다 값을 잠근다. 
- `var`를 사용하려 한 곳에 항상 `let`을 사용하는 것이 좋다. 

<br>

***
<br><br>

## TIP 4 : 템플릿 리터럴로 변수를 읽을 수 있는 문자열로 변환하라 🔍
👉 변수를 연결하지 않고 새로운 문자열로 만드는 방법 

- 자바스크립트에서 문자열을 연결하는 것은 특히나 골치 아픈 일인데, 변수에 할당한 문자열과 따옴표로 감싼 문자열을 연결해야 하는 경우에는 더욱더 그렇다. 
- 템플릿 리터럴을 사용하면 복잡도를 줄일 수 있다. 
- 템플릿 리터럴은 자바스크립트 표현식을 사용해서 문자열을 연결하고 새로운 문자열을 생성하는 간단한 문법이다. 

1. 템플릿 리터럴은 따옴표 또는 쌍따옴표 대신 **백틱(`)**을 사용한다. 
2. 변수에 할당한 문자열처럼 단순 문자열이 아니라면 특별한 지정자로 감싸야 한다. 
  - `${stuff}`처럼 `$` 기호와 중괄호로 변수나 다른 자바스크립트 코드를 감싸는 것이다. 

- 템플릿 리터럴은 문자열과 변수를 연결할 때 가장 자주 사용한다. 
```js
function greet(name){
  return `Hi, ${name}`;
}
greet('Leo');
// 'Hi, Leo';
```

- 자바스크립트 동작을 수행할 수도 있다. 
```js
function yell(name){
  return `HI, ${name.toUpperCase()}!`;
}
greet('Pankaj');
// 'HI, PANKAJ!';
```

```js
function leapYearConverter(age){
  return `윤년에 태어났다면 ${Math.floor(age / 4)} 살이야.`;
}
leapYearConverter(34);
// "윤년에 태어났다면 8살이야
```
- 수학 계산과 연결해 더욱 복잡한 계산을 수행할 수도 있다. 
- 중괄호 안에서 어떤 작업이든 수행할 수 있지만, 문자열이나 정수를 반환하는 작업이 적절하다.
- 가급적이면 중괄호 내부에서 많은 것을 하지 않는 것이 좋다. 
- 코드가 필요 이상으로 어수선해지기 때문
- 대규모 데이터 변환이 필요한 경우에는 템플릿 리터럴 외부에서 처리하고 결괏값을 변수에 할당해 사용한다. 

- 문자열 연결 코드를 템플릿 리터럴 한 줄로 정리할 수 있다. 
```js
function generateLink(image, width){
  return `https://${getProvider()}/${image}?width=${parseInt(width,10)}`;
}
```


