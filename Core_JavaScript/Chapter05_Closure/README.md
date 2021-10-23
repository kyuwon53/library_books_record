# 📖 5장 클로저  ✏️

<br>

## 🔎 01 클로저의 의미 및 원리 이해

- **클로저(Closure)** 는 여러 함수형 프로그래밍 언어에서 등장하는 특성이다.
  - 클로저를 한 문장으로 요약해서 설명한 부분
    > - 자신을 내포하는 함수의 컨텍스트에 접근할 수 있는 함수 (자바스크립트 핵심가이드)
    > - 함수가 특정 스코프에 접근할 수 있도록 의도적으로 그 스코프에서 정의하는 것 (러닝 자바스크립트)
    > - 함수를 선언할 때 만들어지는 유효범위가 사라진 후에도 호출할 수 있는 함수 (자바스크립트 닌자 비급)
    > - 이미 생명 주기상 끝난 외부 함수의 변수를 참조하는 변수 (인사이드 자바스크립트)
    > - 자유변수가 있는 함수와 자유변수를 알 수 있는 환경의 결합 (Head First Javascript Programming)
    > - 로컬 변수를 참조하고 있는 함수 내의 함수 (자바스크립트 마스터북)
    > - 자신이 생성될 때의 스코프에서 알 수 있었던 변수들 중 언젠가 자신이 실행될 때 사용할 변수들만을 기억하여 유지시키는 함수 (
    함수형 자바스크립트 프로그래밍)

<br>

- 어떤 컨텍스트 A에서 선언한 내부함수 B의 실행 컨텍스트가 활성화된 시점에는 B의 `outerEnvironmentReference`가 참조하는 대상인 A의 `LexicalEnvironment`에도 접근이 가능하다
- 내부함수에서 외부 변수를 참조하지 않는 경우라면 **combination**이라고 할 수 없다. 내부함수에서 외부 변수를 참조하는 경우에 한해서만 **combination**, 즉 '선언될 당시의 `LexicalEnvironment`와의 상호관계'가 의미가 있다.
- **어떤 함수에서 선언한 변수를 참조하는 내부함수에서만 발생하는 현상**

```js
var outer = function (){
  var a = 1;
  var inner = function () {
    console.log(++a);
  };
  inner();
};
outer();
// 2
// undefined 
```
- inner 함수 내부에서는 a를 선언하지 않았기 때문에 `environmentRecord`에서 값을 찾지 못하므로 `outerEnvironmentReference`에 지정된 상위 컨텍스트인 `outer`의 `LexicalEnvironment`에 접근해서 다시 a를 찾는다. 
- `outer` 함수의 실행 컨텍스트가 종료되면 `LexicalEnvironment`에 저장된 식별자들(a, inner)에 대한 참조를 지운다.
- 각 주소에 저장돼 있던 값들은 자신을 참조하는 변수가 하나도 없게 되므로 가비지 컬렉터의 수집 대상이 될 것이다. 

<br>

```js
var outer = function () {
  var a = 1;
  var inner = function () {
    return ++a;
  };
  return inner();
};
var outer2 = outer();
console.log(outer2);  
// 2 
// undefined 
```
- inner 함수를 실행한 결과를 리턴하고 있으므로 결과적으로 outer 함수의 실행 컨텍스트가 종료된 시점에는 a 변수를 참조하는 대상이 없어진다.

<br>

```js
var outer = function () {
  var a = 1;
  var inner = function () {
    return ++a;
  };
  return inner;   // 함수 자체를 반환
};
var outer2 = outer();
console.log(outer2());  // 2
console.log(outer2());  // 3
```
- outer 함수의 실행 컨텍스트가 종료될 때 outer2 변수는 outer의 실행 결과인 inner 함수를 참조하게 된다.
- inner 함수의 실행 컨텍스트의 `environmentRecord`에는 수집할 정보가 없다. `outerEnvironmentReference`에는 inner 함수가 선언된 위치의 `LexicalEnvironment`가 참조복사된다.
- inner 함수는 outer 함수 내부에서 선언됐으므로, outer 함수의 `LexicalEnvironment`가 담길 것이다.
- 이제 스코프 체이닝에 따라 outer에서 선언한 변수 a에 접근해서 1만큼 증가시킨 후 그 값이 2를 반환하고, inner 함수의 실행 컨텍스트가 종료된다.

<br>

- **inner 함수의 실행 시점에는 outer 함수는 이미 실행이 종료된 상태인데 outer 함수의 `LexicalEnvironment`에 어떻게 접근할 수 있는 걸까?**

- 이는 가비지 컬렉터의 동작 방식 때문이다. 가비지 컬렉터는 어떤 값을 참조하는 변수가 하나라도 있다면 그 값은 수집 대상에 포함시키지 않는다.
- outer 함수는 실행 종료 시점에 inner 함수를 반환한다. 외부함수인 outer의 실행이 종료되더라도 내부 함수인 inner 함수는 언젠가 outer2를 실행함으로써 호출될 가능성이 열린 것이다. 
- 함수의 실행 컨텍스트가 종료된 후에도 `LexicalEnvironment`가 가비지 컬렉터의 수집 대상에서 제외되는 경우는 지역변수를 참조하는 내부함수가 외부로 전달된 경우가 유일하다.
- "어떤 함수에서 선언한 변수를 참조하는 내부함수에서만 발생하는 현상" = "외부 함수의 LexicalEnvironment가 가비지 컬렉팅되지 않는 현상"

<br>

- **클로저란 어떤 함수 A에서 선언한 변수 a를 참조하는 내부함수 B를 외부로 전달하는 경우 A의 실행 컨텍스트가 종료된 이후에도 변수 a가 사라지지 않는 현상**

  > - 함수를 선언할 때 만들어지는 유효범위가 사라진 후에도 호출할 수 있는 함수 (자바스크립트 닌자 비급)
  > - 이미 생명 주기가 끝나 외부 함수의 변수를 참조하는 함수 (인사이드 자바스크립트
  > - 자신이 생성될 때의 스코프에서 알 수 있었던 변수들 중 언젠가 자신이 실행될 때 사용할 변수들만을 기억하여 유지시키는 함수 (함수형 자바스크립트 프로그래밍)
- **'외부로 전달'**이 곧 `return`만을 의미하는 것은 아니다. 

<br>

```js
// (1) setInterval/setTimeout
(function () {
  var a = 0;
  var intervalId = null;
  var inner = function () {
    if (++a >= 10) {
      clearInterval(intervalId);
    }
    console.log(a);
  };
  intervalId = setInterval(inner, 1000);
})();
```
- (1)은 별도의 외부객체인 `window`의 메서드(setTimeout 또는 setInterval)에 전달할 **콜백 함수 내부에서 지역변수를 참조**한다.

```js
// (2) eventListener
(function () {
  var count = 0;
  var button = document.createElement('button');
  button.innerText = 'click';
  button.addEventListener('click', function () {
    console.log(++count, 'times clicked');
  });
  document.body.appendChild(button);
})();
```
- (2)는 별도의 외부객체인 `DOM`의 메서드(addEventListener)에 등록할 **handler 함수 내부에서 지역변수를 참조**한다.

<br>

- 두 상황 모두 지역변수를 참조하는 내부함수를 외부에 전달했기 때문에 **클로저**이다.


<br>

## 🔎 02 클로저와 메모리 관리

<br>

- 클로저는 객체지향과 함수형 모두를 아우르는 매우 중요한 개념이다. 
- 메모리 소모는 클로저의 본질적인 특성일 뿐이다. 
  - **메모리 누수**라는 표현은 개발자의 의도와 달리 어떤 값의 참조 카운트가 0이 되지 않아 `GC(Garbage Collector)`의 수거 대상이 되지 않는 경우
- 클로저는 어떤 필요에 의해 의도적으로 함수의 지역변수를 메모리를 소모하도록 함으로써 발생한다.
- 필요성이 사라진 시점에는 더는 메모리를 소모하지 않게 해주면 된다.
- 참조 카운트를 0으로 만드는 방법? 
  - 식별자에 참조형이 아닌 기본형 데이터(보통 null이나 undefined)를 할당하면 된다.

```js
// (1) return에 의한 클로저의 메모리 해제
var outer = (function () {
  var a = 1;
  var inner = function () {
    return ++a;
  };
  return inner;
})();
console.log(outer());
console.log(outer());
outer = null;     // outer 식별자의 inner 함수 참조를 끊음
```
```js
// (2) setInterval에 의한 클로저의 메모리 해제
(function () {
  var a = 0;
  var intervalId = null;
  var inner = function () {
    if( ++a >= 10){
      clearInterval(intervalId);
      inner = null;
    }
    console.log(a);
  };
  intervalId = setInterval(inner, 1000);
})();
```
```js
// (3) eventListener에 의한 클로저의 메모리 해제
(function () {
  var count = 0;
  var button = document.createElement('button');
  button.innerText = 'click';

  var clickHandler = function () {
    console.log(++count, 'times clicked');
    if(count >= 10) {
      button.removeEventListener('click', clickHandler);
      clickHandler = null ;     // clickHandler 식별자의 함수 참조를 끊음
    }
  };
  button.addEventListener('click', clickHandler);
  document.body.appendChild(button);
})();
```

<br>

## 🔎 03 클로저 활용 사례

<br>

### 🎈 3-1 콜백 함수 내부에서 외부 데이터를 사용하고자 할 때 

- 대표적인 콜백 함수 중 하나인 이벤트 리스너에 관한 예시 
```js
var fruits = ['apple', 'banana', 'peach'];
var $ul = document.createElement('ul');     // (공통 코드)

fruits.forEach(function (fruit) {           // (A)
  var $li = document.createElement('li');
  $li.innerText = fruit;
  $li.addEventListener('click', function () { // (B)
    alert('your choice is ' + fruit);
  });
  $ul.appendChild($li);
});
document.body.appendChild($ul);
```
- `fruits` 변수를 순회하며 `li`를 생성하고, 각 `li`를 클릭하면 해당 리스너에 기억된 콜백 함수를 실행하게 했다.
- `forEach` 메서드에 넘겨준 익명의 콜백 함수(A)는 그 내부에서 외부 변수를 사용하지 않고 있으므로 클로저가 없다.
- `addEventListener`에 넘겨준 콜백 함수(B)에는 `fruit`이라는 외부 변수를 참조하고 있으므로 클로저가 있다. 
- (A)는 `fruits`의 개수만큼 실행되며, 그때마다 새로운 실행 컨텍스트가 활성화될 것이다. 
- A의 실행 종료 여부와 무관하게 클릭 이벤트에 의해 각 컨텍스트의 (B)가 실행될 때는 (B)의 `outerEnvironmentReference`가 (A)의 `LexicalEnvironment`를 참조하게 된다.
- 따라서 최소한 (B) 함수가 참조할 예정인 변수 `fruit`에 대해서는 (A)가 종료된 후에도 GC 대상에서 제외되어 계속 참조 가능하다

```js
...
var alertFruit = function (fruit) {
  alert('your choice is ' + fruit);
};
fruits.forEach(function (fruit) {
  var $li = document.createElement('li');
  $li.innerText = fruit;
  $li.addEventListener('click', alertFruit);
  $ul.appendChild($li);
});
document.body.appendChild($ul);
alertFruit(fruits[1]);
```
- 공통 함수로 쓰고자 콜백 함수를 외부로 꺼내어 `alertFruit`라는 변수에 담았다.
- `alertFruit`을 직접 실행할 수 있다.
- 콜백 함수의 인자에 대한 제어권을 `addEventListener`가 가진 상태이며, `addEventListener`는 콜백 함수를 호출할 때 첫 번째 인자에 '이벤트 객체'를 주입하기 때문이다. 

<br>

```js
...
fruits.forEach(function (fruit) {
  var $li = document.createElement('li');
  $li.innerText = fruit;
  $li.addEventListener('click', alertFruit.bind(null, fruit));
  $ul.appendChild($li);
});
...
```
- 이벤트 객체가 인자로 넘어오는 순서가 바뀌는 점 및 함수 내부에서의 `this`가 원래의 그것과 달라지는 점은 감안해야 한다.
- 변경사항이 발생하지 않게끔 하면서 이슈를 해결하기 위해서는 `bind` 메서드가 아닌 고차함수(함수를 인자로 받거나 함수를 리턴)를 활용하는 방식으로 풀어내야한다. 

```js
...
var alertFruitBuilder = function (fruit) {
  return function () {
    alert('your choice is ' + fruit);
  };
};
fruits.forEach(function (fruit) {
  var $li = document.createElement('li');
  $li.innerText = fruit;
  $li.addEventListener('click', alertFruitBuilder(fruit));
  $ul.appendChild($li);
});
...
```
- `alertFruit` 함수 대신 `alertFruitBuilder`라는 이름의 함수를 작성했다. 이 함수 내부에서는 다시 익명함수를 반환하는데, 이 익명함수가 바로 기존의 `alertFruit`함수 이다. 
- `alertFruitBuilder` 함수를 실행하면서 `fruit` 값을 인자로 전달
- 이 함수의 실행 결과가 다시 함수가 되며, 이렇게 반환된 함수를 리스너에 콜백 함수로써 전달할 것이다. 
- 함수의 실행 컨텍스트가 열리면서 `alertFruitBuilder`의 인자로 넘어온 `fruit`를 `outerEnvironmentReference`에 의해 참조할 수 있다. 
- 즉 `alertFruitBuilder`의 실행 결과로 반환된 함수에는 클로저가 존재한다. 

<br>

- 콜백 함수 내부에서 외부변수를 참조하기 위한 방법 세 가지
1. 콜백 함수를 내부함수로 선언해서 외부변수를 직접 참조하는 방법으로 클로저를 사용한 방법
2. `bind` 활용 
  - `bind` 메서드로 값을 직접 넘겨준 덕분에 클로저는 발생하지 않게 된 반면 여러 가지 제약사항이 따른다.
3. 콜백 함수를 고차함수로 바꿔서 클로저를 적극적으로 활용한 방안

<br>

### 🎈 3-2 접근 권한 제어(정보 은닉)

<br>

- **정보 은닉**은 어떤 모듈의 내부 로직에 대해 외부로의 노출을 최소화해서 모듈간의 결합도를 낮추고 유연성을 높이고자 하는 현대 프로그래밍 언어의 중요한 개념
- 클로저를 이용하면 함수 차원에서 `public`한 값과 `private`한 값을 구분하는 것이 가능

```js
var outer = function () {
  var a = 1;
  var inner = function () {
    return ++a;
  };
  return inner;
};
var outer2 = outer();
console.log(outer2());
console.log(outer2());
```
- outer 함수를 종료할 때 inner 함수를 반환함으로써 outer 함수의 지역변수인 a의 값을 외부에서도 읽을 수 있게 됐다.
- 클로저를 활용하면 외부 스코프에서 함수 내부의 변수들 중 선택적으로 일부의 변수에 대한 접근 권한을 부여할 수 있다. **return을 활용**
- outer 함수는 외부(전역 스코프)로부터 철저하게 격리된 닫힌 공간이다.
- 외부에서는 외부 공간에 노출돼 있는 outer라는 변수를 통해 outer 함수를 실행할 수는 있지만, outer 함수 내부에는 어떠한 개입도 할 수 없다. 
- **외부에서는 오직 outer 함수가 return한 정보에만 접근할 수 있다. return 값이 외부에 정보를 제공하는 유일한 수단**이다. 
- 외부에 제공하고자 하는 정보들을 모아서 return하고, 내부에서만 사용할 정보들은 return하지 않는 것으로 접근 권한 제어가 가능한다. 


