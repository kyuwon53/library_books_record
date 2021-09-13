# 📖 5장 반복문을 단순하게 만들어라  ✏️

- 화살표 함수를 사용하는 방법
  - 단순한 반복문을 한 줄로 줄일 수 있다. 
- 배열 메서드로 반복문을 단순하게 만드는 방법
- 특별한 반복문에서 무엇을 기대할 수 있는지 알아보자
- 각 컬렉션에서 동일한 정보를 가져오는 map() 메서드
- 한가지 기능만 잘 수행하는 특화된 배열 메서드 
- 가장 유연하면서 무엇이든 처리할 수 있는 reduce() 메서드
- for...of, for...in 문 

<br>

***
<br><br>

## TIP 20 : 화살표 함수로 반복문을 단순하게 만들어라🔍
 - 화살표 함수를 이용해 관련 없는 정보를 제거하는 방법

 - 콜백 함수는 다른 함수의 매개변수로 전달된다. 
 - 화살표 함수는 필요하지 않은 정보를 최대한 걷어낸다.
  - function 키워드
  - 인수를 감싸는 괄호
  - return 키워드
  - 중괄호 

- 기명 함수란 이름이 함수의 일부로 선언되어 있다는 것을 의미      

  ```js
  function capitalize(name){
  return name[0].toUpperCase() + name.slice(1);
}
    ```
- 익명 함수 : 변수에 할당한다     

  ```js
    const capitalize = name => {
    return name[0].toUpperCase() + name.slice(1);
    }
    ```
- 익명 함수를 변수에 할당하는 방식을 화살표 함수로 바꾸는 경우 
  ```js
    const capitalize = name => {
    return name[0].toUpperCase() + name.slice(1);
  };
    ```

- 자바스크립트에서는 함수를 다른 함수에 인수로 전달 
  - 함수는 그저 다른 형태의 데이터일 뿐
  - 콜백 함수는 원래 함수의 끝에서 실행하는 함수를 만ㄹ함 
  - `함수를 주입한다`

  
<br>

***
<br><br>

## TIP 21 : 배열 메서드로 반복문을 짧게 작성하라🔍
- 배열 메서드를 이용해 긴 반복문을 한 줄로 줄이는 방법 
- 간결함, 가독성, 예측 가능성을 갖춘 코드를 작성하는 것 

- 배열 메서드는 불필요한 데이터를 배제한, 간결하고 예측 가능한 코드를 만드는 훌륭한 방법
- 배열 메서드는 한 번에 한 가지 기능만 한다. 
- 배열 메서드는 반환되는 배열의 길이나 형태를 변경할 수 있다. 
  - 길이를 변경할 것인지, 형태를 변경할 것인지 결정하면 된다. (모두 변경가능)


### 배열 메서드 

- `map()`
  - 동작: 형태를 바꿀 수 있지만 길이는 유지된다. 
  - 예시: 전체 팀원의 이름을 가져온다. 
  - 결과: ['melinda', 'katie', 'madhavi', 'justion', 'chris']

- `sort()`
  - 동작: 형태나 길이는 변경되지 않고 순서만 바꾼다.
  - 예시: 팀원 이름을 알파벳순으로 정렬
  - 결과: [{name: 'chris', position: 'developer'},{name: 'justin', position: '...}]

- `filter()`
  - 동작: 길이를 변경하지만 형태는 바꾸지 않는다. 
  - 예시: 개발자만 선택 
  - 결과: [{name: 'madhavi', position: 'developer'},{name: 'chris', position: 'developer'}]

- `find()`
  - 동작: 배열을 반환하지 않습니다. 한 개의 데이터가 반환되고 형태는 바뀌지 않습니다. 
  - 예시: 팀의 관리자를 찾습니다. 
  - 결과: {name: 'justin', position: 'manager'}

- `forEach()`
  - 동작: 형태를 이용하지만 아무것도 반환하지 않습니다. 
  - 예시: 모든 팀원에게 상여를 지급합니다. 
  - 결과: Melinda가 상여를 받았습니다! Katie가 상여를 받았습니다! ... (그렇지만 변환값은 없다.)

- `reduce()`
  - 동작: 길이와 형태를 바꾸는 것을 비롯해 무엇이든 처리할 수 있다. 
  - 예시: 개발자와 개발자가 아닌 모든 팀원의 수를 계산합니다. 
  - 결과: {developers: 2, non-developers: 3}

    
<br>

***
<br><br>

## TIP 22 : map() 메서드로 비슷한 길이의 배열을 생성하라 🔍

- `map()` 메서드를 이용해 배열에 들어있는 정보의 부분집합을 생성하는 방법
- `map()` 메서드는 배열에 메서드의 콜백에서 반환하는 정보가 담김  
  - 다른 배열 메서드에 비해 반환값을 알기 쉽다. 
- 맵 함수는 배열에 있는 한 가지 속성을 반환하거나 배열에 있는 값을 가져와서 다른 형식의 값을 반환 

- `map()` 메서드를 사용하면 새로운 값을 담을 배열을 준비할 필요가 없다. 
  - 배열 메서드의 일부로 포함되어 있기 때문
- `push()` 메서드로 정보를 옮길 필요도 없다. 
  - `map()` 메서드는 맵 함수의 실행 결과를 반환될 배열에 추가하기 때문

- 원본 배열의 각 항목을 인수로 받아 새롭게 생성될 배열에 담길 값을 반환하는 함수를 만드는 것뿐

```js

function getInstrument(member){
  return member.instrument;
}

for (let i =0; i < band.length; i++){
  instruments.push(getInstrument(band[i]));
}

// for문 대신 배열 메서드
const instruments = band.map(getInstrument);

// ['guitar', 'guitar', 'bass', 'drums']
```
- 예측 가능하면서도 단순 

```js
// 기명 함수를 화살표 함수를 사용해 익명 함수로 바꾸기 
const instrument = band.map(member => member.instrument);

```
- 인수를 하나만 받기 때문에 괄호를 사용할 필요가 없다. 
- 또한, 함수 몸체는 한 줄에 불과하므로 중괄호나 return 문을 사용할 필요도 없다. 
- map()은 단순하지만 유연하다
- map() 메서드는 원본 배열과 같은 길이의 배열을 생성하는 경우라면 모든 곳에 사용할 수 있다.
    
<br>

***
<br><br>

## TIP 23 : filter()와 find()로 데이터의 부분집합을 생성하라 🔍
- `map()`: 원본 배열에서 필요한 정보만 꺼내 새로운 배열을 생성하는 방법
- `filter()`: 데이터 형태는 유지하면서 전체 항목의 일부만 필요한 경우 
  - 배열에 있는 정보를 변경하지 않는다. 

```js
const team = [
  'Michelle B',
  'Dave L',
  'Dave C',
  'Courtney B',
  'Davina M',
];

'Dave'.match(/Dav/);
//['Dav', index:0, input: 'Dave']
'Michelle'.match(/Dav/);
// null

```
- `match()`: 문자열이 정규 표현식과 일치하면 일치한 항목에 대한 정보를 배열로 반환하고, 일치하지 않으면 null을 반환한다. 

- `filter()` 메서드에 전달하는 함수는 반드시 참 값을 반환해야 한다. 참 값을 반환하면 그 값은 유지된다. 
- `filter()` 메서드는 항상 배열을 반환하며 조건에 일치하는 값이 없는 경우에도 배열을 반환 
- `find()` 메서드는 참 또는 거짓 값을 반환하는 함수를 인수로 받고, 배열의 항목에 전달한 함수로 평가해 참 값을 반환하는 첫 번째 항목만 반환 
- 참 값을 반환하는 항목이 없다면 `undefined`를 반환 
- `find()` 메서드를 사용하는 경우
  - 찾으려는 항목이 하나인 것을 알고 있는 경우
  - 특정 항목의 첫 번째 인스턴스가 필요한 경우 
  - 반복문에서 `break` 문을 사용하는 경우 

```js
// for문을 사용한 '기념 도서관'에서 근무하는 사서 찾기
let memorialInstructor;

for(let i = 0; i < instructors.length; i++){
  if (instructors[i].libraries.includes('기념 도서관')){
    memorialInstructor = instructors[i];
    break;
  }
}

// find() 메서드를 사용한 '기념 도서관'에서 근무하는 사서 찾기
const librarian = instructors.find(instructors => {
  return instructors.libraries.includes('기념 도서관');
});

```
**장점**
- 단순한 표현식
- 예측 가능한 `const`로 변수 선언

**단점**
- 반환값을 확신할 수 없다. 
  - 조건에 맞는 항목이 없을 때, `filter()` 메서드를 사용하면 빈 배열이 반환, `find()` 메서드를 사용하면 `undefined`가 반환됨
    - 단락 평가를 이용하면 기본값을 추가해서 일치하는 항목이 없을 때 사용 가능   
<br>

      ```js
        const image = [{
          path: './me.jpg',
          profile: false
       }];

       const profile = images.find(image => image.profile) || {path: './default.jpg'};

        ```
      - 단점: 하드 코딩을 해야한다. 

    
<br>

***
<br><br>

## TIP 24 : forEach()로 동일한 동작을 적용하라 🔍

- `forEach()`는 예측 가능하면서도 다른 배열 메서드와 같이 작동해 함께 연결할 수 있다.
- 배열의 각 항목을 인수로 하는 함수를 넘겨주나 아무런 동작도 하지 않는다. 
- `forEach()` 에서 처리하는 동작은 모두 함수 외부에 영향을 준다. 
  - 함수의 유효 범위 밖에 있는 무언가를 변경하는 것을 부수 효과하고 한다. 
- `forEach()` 메서드는 부수 효과 없이는 아무 소용이 없다. 

```js
const names = ['walter', 'white'];
const capitalized = names.forEach(name => name.toUpperCase());

capitalized;
// undefined
```

- 배열을 둬서 변경한 결과를 담을 수 있지만 배열을 직접 조작하는 것은 좋지 않다. 
- **반드시 부수 효과가 필요한 경우에 `forEach()`를 사용해야 한다.**
```js
sailingClub.forEach(member => sendEmail(member));
```
- `forEach()`를 사용하는 가장 큰 이유는 체이닝 과정에서 다른 배열 메서드와 결합할 수 있기 때문
- 매개 변수에 배열 메서드의 결괏값을 저장할 필요 없이 동일한 배열에서 여러 작업을 처리할 수 있다. 
