# 📖 7장 클래스  ✏️

<br>

## 🔎 01 클래스와 인스턴스의 개념 이해 

<br>

- 하위 개념은 상위 개념을 포함하면서 더 구체적인 개념이 추가된다. 
- 클래스는 하위로 갈수록 상위 클래스의 속성을 상속하면서 더 구체적인 요건이 추가 또는 변경된다. 
- 하위 클래스가 아무리 구체화되더라도 이들은 결국 추상적인 개념일 뿐이다. 
- 어떤 클래스의 속성을 지니는 실존하는 개체를 일컬어 인스턴스라고 한다. 
- 인스턴스는 '어떤 조건에 부합하는 구체적인 예시'가 된다. 
- 여기서의 조건이 곧 클래스를 의미한다고 보면, 어떤 클래스에 속한 개체는 그 클래스의 조건을 모두 만족하므로 그 클래스의 구체적인 예시, 즉 인스턴스가 될 것이다. 

<br>
- 현실세계에서는 개체들이 이미 존재하는 상태에서 이들을 구분짓기 위해 클래스를 도입한다.
- 하나의 개체가 같은 레벨에 있는 서로 다른 여러 클래스의 인스턴스일 수 있다. 

<br>

- 프로그래밍 언어상에서는 접근 방식이 정반대이다. 
- 사용자가 직접 여러 가지 클래스를 정의해야 하며, 클래스를 바탕으로 인스턴스를 만들 때 비로소 어떤 개체가 클래스의 속성을 지니게 된다. 
- 한 인스턴스는 하나의 클래스만을 바탕으로 만들어진다.
- 어떤 인스턴스가 다양한 클래스에 속할 수는 있지만 이 클래스들은 모두 인스턴스 입장에서는 **'직계존속'**이다.
- 다중상속을 지원하는 언어이든 그렇지 않은 언어이든 결국 인스턴스를 생성할 때 호출할 수 있는 클래스는 오직 하나뿐일 수밖에 없기 때문이다. 

- 클래스가 먼저 정의돼야만 그로부터 공통적인 요소를 지니는 개체들을 생성할 수 있다. 


<br>

## 🔎 02 자바스크립트의 클래스

<br>

- 생성자 함수 Array를 new 연산자와 함께 호출하면 인스턴스가 생성된다.
- Array를 일종의 클래스라고 하면, Array의 prototype 객체 내부 요소들이 인스턴스에 '상속'된다고 볼 수 있다. 
- 상속이 아닌 프로토타입 체이닝에 의한 참조지만 결과적으로는 동일하게 동작하므로 이렇게 이해해도 무방하다. 
- Array 내부 프로퍼티들 중 prototype 프로퍼티를 제외한 나머지는 인스턴스에 상속되지 않는다. 

<br>

- 인스턴스에 상속되는지(인스턴스가 참조하는지) 여부에 따라 스태틱 멤버와 인스턴스 멤버로 나뉜다.
- 다른 언어의 클래스 구성요소에 대한 정의를 차용한 것으로서 클래스 입장에서 사용 대상에 따라 구분한 것이다. 
- 클래스 기반 언어와 달리 자바스크립트에서는 인스턴스에서도 직접 메서드를 정의할 수 있기 때문에 '인스턴스 메서드'라는 명칭은 프로토타입에 정의한 메서드를 지칭하는 것인지 인스턴스에 정의한 메서드를 지칭하는 것인지에 대해 도리어 혼란을 야기한다. 
- 자바스크립트의 특징을 살려 프로토타입 메서드라고 부르는 편이 더 좋을 것이다. 

<br>

```js
var Rectangle = function (width, height) {
  this.width = width;
  this.height = height;
};
Rectangle.prototype.getArea = function () {
  return this.width * this.height;
};
Rectangle.isRectangle = function (instance) {
  return instance instanceof Rectangle && instance.width > 0 && instance.height > 0;
};

var rect1 = new Rectangle(3, 4)
console.log(rect1.getArea());     // 12 (O)
console.log(rect1.isRectangle(rect1));    // Error (X)
console.log(Rectangle.isRectangle(rect1));  //true
```

- 인스턴스에서 직접 호출할 수 있는 메서드가 바로 프로토타입 메서드이다. 
- 인스턴스에서 직접 접근할 수 없는 메서드를 스태틱 메서드라고 한다. 
- 스태틱 메서드는 생성자 함수를 this로 해야만 호출할 수 있다. 
- 일반적인 사용 방식, 즉 구체적인 인스턴스가 사용할 메서드를 정의한 '틀'의 역할을 담당하는 목적을 가질 때의 클래스는 추상적인 개념이지만, 클래스 자체를 this로 해서 직접 접근해야만 하는 스태틱 메서드를 호출할 때의 클래스는 그 자체가 하나의 개체로서 취급된다. 


<br>

## 🔎 03 클래스 상속

<br>

### 🎈 3-1 기본 구현

- 프로토타입 체인을 활용해 클래스 상속을 구현하고 최대한 전통적인 객체지향 언어에서의 클래스와 비슷한 형태로까지 발전시켜 보는 것을 목표로 한다. 

```js
var Grade = function () {
  var args = Array.prototype.slice.call(arguments);
  for(var i = 0; i < args.length; i++) {
    this[i] = args[i];
  }
  this.length = args.length;
};
Grade.prototype = [];
var g = new Grade(100, 80);
```
- 자바스크립트에서 클래스 상속을 구현했다는 것은 결국 프로토타입 체이닝을 잘 연결한 것으로 이해하면 된다. 

```js
...
g.push(90);
console.log(g);   // Grade { 0: 100, 1: 80, 2: 90, length: 3}

delete g.length;
g.push(70);
console.log(g);   // Grade { 0: 70, 1: 80, 2: 90, length: 1 }
```
- 내장객체인 배열 인스턴스의 length 프로퍼티는 configurable 속성이 false라서 삭제가 불가능하지만, Grade 클래스의 인스턴스는 배열 메서드를 상속하지만 기본적으로는 일반 객체의 성질을 그대로 지니므로 삭제가 가능해서 문제가 된다. 
- push를 했을 때 0번째 인덱스에 70이 들어가고 length가 다시 1이 될 수 있었던 이유는 `Grade.prototype`이 빈 배열을 가리키도 있기 때문이다. 
- push 명령에 의해 자바스크립트 엔진이 `g.length`를 읽고자 하는데 `g.length`가 없으니까 프로토타입 체이닝을 타고 `g.__prototype__.length`를 읽어온 것이다. 
- 빈 배열의 length가 0이므로 여기에 값을 할당하고 length는 1만큼 증가시키라는 명령이 문제 없이 동작할 수 있었던 것이다. 

##### 요소가 있는 배열을 prototype에 매칭한 경우
```js
...
Grade.prototype = ['a', 'b', 'c', 'd'];
var g = new Grade(100, 80);

g.puch(90);
console.log(g);     // Grade { 0: 100, 1: 80, 2: 90, length: 3}

delete g.length;
g.push(70);
console.log(g);     // Grade { 0: 100, 1: 80, 2: 90, _4: 70, length: 5}
```
- prototype에 length가 4인 배열을 할당해보았다. 
- g.length가 없으니깐 `g.__proto__.length`를 찾고, 값이 4이므로 인덱스 4에 70을 넣고, 다시 `g.length`에 5를 부여하는 순서로 동작한 것이다. 
- 클래스에 있는 값이 인스턴스의 동작에 영향을 줘서는 안 되겠다. 이런 영향을 줄 수 있다는 사실 자체가 이미 클래스의 추상성을 해치는 것이다. 
- 인스턴스와의 관계에서는 구체적인 데이터를 지니지 않고 오직 인스턴스가 사용할 메서드만을 지니는 추상적인 '틀'로서만 작용하게끔 작성하지 않는다면 언젠가 어딘가에서 예기치 않은 오류가 발생할 가능성을 안고 가야 하는 것이다. 

<br>

##### Ractangle.Square 클래스
```js
var Rectangle = function (width, height) {
  this.width = width;
  this.height = height;
};
Rectangle.prototype.getArea = function () {
  return this.width * this.height;
};
var rect = new Rectangle(3, 4);
console.log(rect.getArea());        // 12

var Square = function (width) {
  this.width = width;
};
Square.prototype.getArea = function () {
  return this.width * this.width;
};
var sq = new Square(5);
console.log(sq.getArea());          // 25
```
- `width`라는 프로퍼티가 공통이고, `getArea`는 내용이 다르지만 비슷하다. 

<br>

##### Square 클래스 변형
```js
...
var Square = function (width) {
  this.width = width;
  this.height = width;
};
Square.prototype.getArea = function () {
  return this.width * this.height;
};
...
```

- `Square`를 `Rectangle`의 하위 클래스로 삼을 수 있다.
- `getArea`라는 메서드를 동일한 동작을 하므로 상위 클래스에서만 정의하고, 하위 클래스에서는 해당 메서드를 상속하면서 `height` 대신 `width`를 넣어주면 된다. 

##### Rectangle을 상속하는 Square 클래스
```js
...
var Square = function (width) {
  Rectangle.call(this, width, width);
};
Square.prototype = new Rectangle();
```
- `Square`의 생성자 함수 내부에서 `Rectangle`의 생성자 함수를 함수로써 호출했다. 
- 인자 `height` 자리에 `width`를 전달했다. 
- 메서드를 상속하기 위해 `Square`의 프로토타입 객체에 `Rectangle`의 인스턴스를 부여했다. 

```js
console.dir(sq);
```
- sq의 구조를 출력
- `sq.constuructor`로 접근하면 프로토타입 체이닝을 따라 `sq.__proto__.__proto__`, 즉 `Rectangle.prototype`에서 찾게 되며, 이는 `Rectangle`을 가리키고 있기 때문이다. 

```js
var rect2 = new sq.constructor(2, 3);
console.log(rect2);                   // Rectangle { width: 2, height: 3}
```

- 하위 클래스로 삼을 생성자 함수의 `prototype`에 상위 클래스의 인스턴스를 부여하는 것만으로도 기본적인 메서드 상속은 가능하지만 다양한 문제가 발생할 여지가 있어 구조적으로 안정성이 떨어진다. 

<br>

### 🎈 3-2 클래스가 구체적인 데이터를 지니지 않게 하는 방법
- 클래스(prototype)가 구체적인 데이터를 지니지 않게 하는 방법
  - 가장 쉬운 방법은 일단 만들고 나서 프로퍼티들을 일일이 지우고 더는 새로운 프로퍼티를 추가할 수 없게 하는 것이다. 
  ```js
    delete Square.prototype.width;
    delete Square.prototype.height;
    Object.freeze(Square.prototype);
  ```

#### 클래스 상속 및 추상화 방법(1)- 인스턴스 생성 후 프로퍼티 제거
```js
var extendClass1 = function (SuperClass, SubClass, subMethods) {
  SubClass.prototype = new SuperClass();
  for (var prop in SubClass.prototype) {
    if (SubClass.prototype.hasOwnProperty(prop)) {
      delete SubClass.prototype[prop];
    }
  }
  if (subMethods) {
    for (var method in subMethods) {
      SubClass.prototype[method] = subMethods[method];
    }
  }
  Object.freeze(SubClass.prototype);
  return SubClass;
};

var Square = extendClass(Rectangle, function (width) {
  Rectangle.call(this, width, width);
});
```
- `extendClass` 함수는 `SuperClass`와 `SubClass`, `SubClass`에 추가할 메서드들이 정의된 객체를 받아서 `SubClass`의 `prototype` 내용을 정리하고 freeze하는 내용으로 구성돼있다. 

<br>

- `SubClass`의 `prototype`에 직접 `SuperClass`의 인스턴스를 할당하는 대신 아무런 프로퍼티를 생성하지 않는 빈 생성자 함수(Bridge)를 하나 더 만들어서 그 `prototype`이 `SuperClass`의 `prototype`을 바라보게끔 한 다음, `SubClass`의 `prototype`에는 `Bridge`의 인스턴스를 할당하게 하는 것이다. 

```js
var Rectangle = function (width, height) {
  this.width = width;
  this.height = height;
};
REctangle.prototype.getArea = function () {
  return this.width * this.height;
};
var Square = function (width) {
  Rectangle.call(this, width, width);
}
var Bridge - function () {};
Bridge.prototype = Rectangle.prototype;
Square.prototype = new Bridge();
Object.freeze(Square.prototype);
```
- `Bridge`라는 빈 함수를 만들고, `Bridge.prototype`이 `Rectangle.prototype`을 참조하게 한 다음, `Square.prototype`에 `new Bridge()`로 할당하면,`Rectangle` 자리에 `Bridge`가 대체하게 된다. 
- 인스턴스를 제외한 프로토타입 체인 경로상에는 더는 구체적인 데이터가 남아있지 않게 된다.

<br>

#### 클래스 상속 및 추상화 방법(2) - 빈 함수를 활용
```js
var extendClass2 = (function () {
  var Bridge = function () {};
  return function (SuperClass, SubClass, subMethods) {
    Bridge.prototype = SuperClass.prototype;
    SubClass.prototype = new Bridge();
    if(subMethods) {
      for ( var method in subMethods) {
        subClass.prototype[method] = subMethods[method];
      }
    }
    object.freeze(SubClass.prototype);
    return SubCalss;
  };
})();
```
- 즉시실행함수 내부에서 `Bridge`를 선언해서 이를 클로저로 활용함으로써 메모리에 불필요한 함수 선언을 줄였다. 
- `subMethods`에는 `SubClass`의 `prototype`에 담길 메서드들을 객체로 전달하게끔 했다. 
- `Object.create`를 이용한 방법
  - `SubClass`의 `prototype`의 `__proto__`가 `SuperClass`의 `prototype`을 바라보되, `SuperClass`의 인스턴스가 되지는 않으므로 앞서 소개한 두 방법보다 간단하면서 안전하다

<br>

#### 클래스 상속 및 추상화 방법(3) - Object.create 활용
```js
// (...생략)
Square.prototype = Object.create(Rectangle.prototype);
Object.freeze(Square.prototype);
// (...생략)
```
- `SubClass.prototype`의 `__proto__`가 `SuperClass.prototype`를 참조하고, `SubClass.prototype`에는 불필요한 인스턴스 프로퍼티가 남아있지 않으면 된다. 

<br>

### 🎈 3-3 constructor 복구하기

<br>

- 위 세 가지 방법 모두 기본적인 상속에는 성공했지만 `SubClass` 인스턴스의 `constructor`는 여전히 `SuperClass`를 가리키는 상태이다. 
- `SubClass` 인스턴스에는 `constructor`가 없고, `SubClass.prototype`에도 없는 상태이다. 
- 프로토타입 체인상에 가장 먼저 등장하는 `SuperClass.prototype`의 `constructor`에서 가리키는 대상, 즉 `SuperClass`가 출력될 뿐이다. 
- `SubClass.prototype.constructor`가 원래의 `SubClass`를 바라보도록 해주면 된다. 

<br>

#### 클래스 상속 및 추상화 방법 - 완성본(1) - 인스턴스 생성 후 프로퍼티 제거






