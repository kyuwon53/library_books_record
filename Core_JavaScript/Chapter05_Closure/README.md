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




