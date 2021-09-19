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

<br>

***
<br><br>

## TIP 29 : 해체 할당으로 객체 속성에 접근하라 🔍

매개변수는 항상 순서를 지켜야 한다. 매개변수를 건너뛰고 싶은 경우에는 매개변수 기본값이 별 소용이 없다. 

```js
const landscape = {
  title: 'Landscape',
  photographer: 'Nathan',
  equipment: 'Canon',
  format: 'digital',
  src: '/landscape-nm.jpg',
  location: [32.7122222, -103.1405556],
};
```
- 필요한 정보가 있을 때는 객체에서 점 표기법으로 정보를 가져온다. 
- 넘겨받은 정보를 변수에 할당해 사용하는 방법 
- 과도한 정보를 다루는 유일한 방법은 다른 곳에서 사용할 키-값 쌍은 제거하고 남은 값을 유지하는 것


- **해체 할당의 작동 원리**
  1. 객체에 있는 키와 같은 이름의 변수를 생성
  2. 객체에 있는 키에 연결된 값을 생성한 변수의 값으로 할당 

```js
const landscape = {
  photographer: 'Nathan',
};
const {photographer} = landscape;

photographer;
// Nathan
```
- `const` 변수 선언 
- 변수의 이름은 객체에 있는 키와 반드시 일치해야 한다. 
- 중괄호는 변수에 할당되는 값이 객체에 있다는 것을 나타냄 
- 키가 존재하지 않으면 값이 `undefined`가 되지만, 해체 할당을 하면서 동시에 **기본값을 설정**할수도 있다. 

```js
const landscape = {};
const {photographer = 'Anonymous', title } = landscape;

photographer;
// Anonymous
// 기본값 O

title;
// undefined
// 기본값 X
```
- 세 개의 마침표와 변수 이름을 작성하면, 이 새로운 변수에 어떠한 추가 정보라도 담을 수 있다. 
  - 정보를 수집하기 위해 마침표 세 개를 사용하는 경우는 **나머지 매개변수(rest parameter)**라 한다.
- 변수 이름은 키 이름과 일치할 필요 없다. 
- 변수에 할당되는 값은 객체에 남아있는 키-값 쌍을 모은 객체이다. 

```js
const landscape = {
  photographer: 'Nathan',
  equipment: 'Canon',
  format: 'digital',
};

const {
  photographer,
  ...additional
} = landscape;

additional;
// {equipment: 'Canon', format: 'digital'}
```
- 사진 객체를 복사한 후 photographer 키를 삭제한 것 

```js
const landscape = {
  src: '/landscape-nm.jpg',
};
const { src: url } = landscape;

src;
// ReferenceError: src is not defined
// 참조 오류: src가 정의되지 않았습니다. 

url;
// '/landscape-nm.jpg'
```
- 해체 할당으로 처리 
  - 콜론에 키 이름을 먼저 쓰고 그 값을 할당할 변수 이름을 입력    

- 배열에 해체할당
  - 배열에는 키가 없기 때문에 변수 이름을 마음대로 정할 수 있지만, 대신 배열에 담긴 순서대로 할당해야 한다.

- 해체 할당은 배열에 값이 쌍으로 담겨 있어서 담긴 값의 순서가 정보의 일부인 경우에도 매우 유용한 방법이다. 

```js
const landscape = {
  location: [32.7122222, -103.1405556],
};
const { location: [latitude, longitude] } = landscape;

latitude;
// 32.7122222

longitude;
// -103.1405556
```

