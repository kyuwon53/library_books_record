# 📖 6장 매개변수와 return 문을 정리하라  ✏️

- 함수 인수를 변경하는 계획을 세우고, 간결하면서 유연성을 제공하는 매개변수를 생성하는 방법을 살펴보자
- 매개변수 기본값을 추가하는 방법
- 해체 할당을 사용해 객체에서 정보를 가져오는 방법
- 해체 할당과 함수 매개변수를 결합해 다양한 옵션을 사용
- 정보를 새로운 객체로 다시 결합하고 사용 가능한 번들에서 많은 정보를 공유하는 return 문을 작성
- 매개변수로 돌아가 인수의 수를 예상하기 어려운 경우에 함수를 만드는 방법을 살펴보자. 


<br>

***
<br><br>

## TIP 28 : 매개변수 기본값을 생성하라 🔍

- 매개변수가 채워져 있지 않을 때 매개변수 기본값으로 값을 설정하는 방법

```js
function convertWeight(weight){
  return weight / 2.2 ;
}

```
- 매개변수 추가

```js
function convertWeight(weight, ounces){
  const oz = ounces ? ounces / 16 : 0;
  const total = weight + oz;
  return total / 2.2 ;
}

```
- 자바스크립트에서는 함수에 모든 매개변수를 전달할 필요가 없다 .
  - 매개변수를 선택적으로 적용할 수 있기 때문 
  - 매개변수를 누락하면 값은 `undefined`가 된다. 

```js
function convertWeight(weight, ounces, roundTo){
  const oz =  ounces / 16 || 0;
  const total = weight + oz;
  const conversion = total / 2.2;
  const round = roundTo === undefined ? 2 : roundTo;
  return roundToDecimalPlace(conversion, round);
}

```
- 새로운 매개변수를 추가할 때마다 기본값을 설정하기 위해 삼항 연산자나 단락 평가를 추가 
  - 매개변수 기본값을 사용하면 변수 검증을 위한 코드를 최소화할 수 있다. 
  
- 매개변수 기본값은 매개변수에 값을 전달하지 않았을 때 미리 정해둔 값을 기본값으로 사용하는 것을 의미
  - 매개변수 기본값을 사용하려면 매개변수명 옆에 등호로 기본값을 정의 

```js
function convertWeight(weight, ounces, roundTo){
  const total = weight + (ounces / 16);
  const conversion = total / 2.2;
  return roundToDecimalPlace(conversion, roundTo);
}

```

- 매개변수 순서가 중요 
- 매개변수에 `undefined`를 전달하면 함수가 매개변수 기본값을 사용
- `null`을 전달하면 설정한 기본값이 사용되지 않는다. 
  - 기본값이 무엇이든 상관럾다면, 매개변수 기본값을 사용하면 좋다. 
