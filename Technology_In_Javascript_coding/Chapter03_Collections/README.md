# 📖 3장 특수한 컬렉션을 이용해 코드 명료성을 극대화하라 ✏️

컬렉션으로 데이터에 쉽게 접근하고, 데이터를 쉽게 사용하는 방법 설명. 

- 서로 다른 컬렉션 유형
- 컬렉션이 제공하는 유연성 및 단순함
- 컬렉션을 다룰 때 혼란스러워지거나 버그를 일으키는 코드가 발생할 수 있는 방법 

- 키-값 컬렉션으로 사용하는 객체
- 변경되지 않는 데이터를 다룰 때 객체를 사용하는 것이 적절한 경우

- 컬렉션 ( Map, Set )

<br>

***
<br><br>

## TIP 10 : 객체를 이용해 정적인 키-값을 탐색하라 🔍

- 배열은 정말 유연하기 때문에 어떤 형태의 정보다로 담을 수 있지만, 필요 이상으로 복잡하게 만들기도 한다. 
- 객체는 변화가 없고 구조화된 키-값 데이터를 다루는 경우에 유용하다.
- 자주 갱신되거나 실행되기 전에는 알 수 없는 동적인 정보를 다루기에는 적합하지 않다. 

```js
// 배열을 사용한 색상 표현
const colors = ['#d10202', '#19d836', '#0e33d8'];
// 개발자가 볼 때 무슨 색인지 파악할 수 없음 

// 키-값 데이터
const colors = {
  red: '#d10202',
  green: '#19d836',
  blue: '#0e33d8'
}
// 색상을 바로 알 수 있다.
// 적색을 사용하고 싶을 때  ` colors.red ` 라고 직접 참조하면 됨.
```
- 중괄호에 키-값을 작성하는 것을 `객체 리터럴` 이라고 한다. 
- 객체는 단순하기 때문에 정적인 정보를 다루기에 훌륭
- 객체는 정보의 경로를 알고 있을 때 적절한 방법

- 계속해서 갱신, 반복, 대체, 정렬해야 할 정보에는 `맵(Map)`을 사용하는 것이 낫다.    

- 정적인 객체도 프로그래밍적으로 정의할 수 있다.
  - 정보를 수집하고 전달해 다른 함수에서 사용하는 것. 
    - 조작 X , 갱신 X => 정적인 정보

```js
function getBill(item){
  return {
    name: item.name,
    due: twoWeekFromNow(),
    total: calculateTotal(item.price),
  };
}
const bill = getBill({
  name: '객실 청소',
  price: 30
});

function displayBill(bill){
  return `${bill.name} 비용은 ${bill.total} 달러이며 납부일은 ${bill.due}입니다.`;
}
```
- 객체를 전달해 필요한 값을 꺼내 씀
- 빠르고 명료하다
- 객체 해체 할당도 가능해 데이터를 다루는 것이 빠르고 간결하다. 

<br>

***
<br><br>

## TIP 11 : Object.assign()으로 조작 없이 객체를 생성하라 🔍

- 기본값을 설정하면서, 원래의 데이터를 유지하는 새로운 객체를 생성하려면 부수 효과 (side effect)나 조작은 발생하지 않아야 한다. 

- 객체 펼침 연산자를 사용하면 보기 편함 

- 새로운 객체를 생성하려는 의도도 명확하게 전달할 수 있다. 

<br>

***
<br><br>

## TIP 13 : 맵으로 명확하게 키-값 데이터를 갱신하라 🔍

- 데이터 변경이 잦은 키-값 컬렉션에 맵 객체를 사용하는 방법 
- 맵은 인터페이스가 명확하다
- 메서드는 예측 가능한 이름을 가짐
- 반복과 같은 동작이 내장되어 있다.
- 맵에서는 항상 명시적으로 새로운 인스턴스를 생성해야 함 
     ```js
      let filters = new Map(); 
    ```
    - `let`을 사용한 이유는 데이터를 추가하면서 객체를 조작할 것이기 때문

### 객체보다 맵을 컬렉션으로 선택하는 것이 더 나은 상황 중 2가지 

1. 키-값 쌍이 자주 추가되거나 삭제되는 경우 

  - 객체의 정보 갱신 
    - 필터링 조건 추가 (키-값 설정)
      - 객체 자체의 메서드 사용
    - 필터링 조건 삭제 
      - 언어에 정의된 `delete` 연산자 사용
    - 모든 조건 제거 
      - 변수를 재할당 

- 매서드를 차례로 연결해서 여러 값을 쉽게 추가가능
  - 새로운 인스턴스를 생성하고 바로 메서드를 연결
    - 체이닝(chaining)
    ```js
    let filters = new Map()
    .set('견종','래브라도리트리버')
    .set('크기','대형견')
    .set('색상','갈색');
    
     filters
    // Map(3) {"견종" => "래브라도리트리버", "크기" => "대형견", "색상" => "갈색"}
    
    filters.get("크기");
    // "대형견"

    ```
- 배열을 이용해서 정보 추가 
  ```js
  let filters = new Map(
    [
      ['견종','래브라도리트리버'],
      ['크기','대형견'],
      ['색상','갈색'],
    ]
  )
  filter.get('색상');
  // '갈색'
  ```
- 맵에서 값을 제거 
  ```js
    filters.delete('색상');
    filters.get('색상');
    // undefined 
  ```
- 모든 키-값 쌍을 제거 
```js
  filters.clear()
  filters.get('색상');
  // undefined
```
- 맵 인스턴스에 항상 메서드를 사용
- delete() 메서드를 사용할 수 있기 때문에 인스턴스를 생성한 후에는 언어 수준의 연산자를 섞지 않는다. 
- clear() 메서드를 사용할 수 있기 때문에 새로운 인스턴스를 생성할 필요가 없다. 

=> 정보를 자주 변경하는 경우에는 객체보다 맵을 사용하는 것이 훨씬 편리하다. 
  - 모든 동작과 의도가 매우 명료하게 보인다. 


2. 키가 문자열이 아닌 경우 

- 객체의 경우 키에 사용할 수 있는 자료형에 제약이 있다. 
  - 정수를 키로 사용할 수 없다. 
  - 배열 표기법으로 정보에 접근할 수 있지만, 꼼수에 가깝다. 
  - 문자열이 담긴 배열이다. 

- 맵은 여러 가지 자료형을 키로 받을 수 있다. 
  - 객체와 달리 배열이 반환되지 않는다. 
  - 반환된 값은 `맵이터레이터(MapIterator)`라고 부른다.
  

<br>

***
<br><br>

## TIP 14 : 맵과 펼침 연산자로 키-값 데이터를 순회하라 🔍

- 키-값 컬렉션에 항목을 자주 추가하거나 삭제하는 경우에는 객체보다 맵을 사용하는 것이 적합하다. 

```js
const filters ={
  색상: '검정색',
  견종: '래브라도리트리버',
};

function getAppliedFilters(filters){
  const keys = Object.keys(filters);
  const applied = [];
  for (const key of keys){
    applied.push(`${key}:${filters[key]}`);
  }
  return `선택한 조건은 ${applied.join(', ')} 입니다.`;
}

/* 
getAppliedFilters(filters)
"선택한 조건은 색상:검정색, 견종:래브라도리트리버 입니다." */



```
- for 문을 실행하는 동안 객체를 참조해 값을 꺼낸다.
- 객체에서 순서가 보장되지 않는다. (정렬할 수 없다.)
- 필터링 조건을 정렬하려면 먼저 키를 정렬해야 한다. 

```js
function getAppliedFilters(filters){
  const keys = Object.keys(filters);
  keys.sort();      // 키 정렬
  const applied = [];
  for (const key of keys){
    applied.push(`${key}:${filters[key]}`);
  }
  return `선택한 조건은 ${applied.join(', ')} 입니다.`;
}
```
- for...of : 컬렉션의 각 값을 하나씩 반환 
```js
const filters = new Map()
  .set('색상', '검정색')
  .set('견종','래브라도레트리버');

function checkFilters(filters){
  for (const entry of filters){
    console.log(entry)
  }
}

```
- 이터레이터는 키-값 쌍을 넘겨준다. 

```js
filters.entries();
// MapIterator {"색상" => "검정색", "견종" => "래브라도레트리버"}
```
- entries() 메서드는 맵에 있는 키-값을 쌍으로 묶은 맵이터레이터를 반환 
- 맵을 순회할 때 키와 값을 쌍으로 받아서 사용한다. 

- for 문을 이용해서 키-값을 문자열로 변환하는 메서드
```js
function getAppliedFilters(filters){
  const applied = [];
  for (const [key, value] of filters){
    applied.push(`${key}:${value}`);
  }
  return `선택한 조건은 ${applied.join(', ')} 입니다.`;
}
getAppliedFilters(filters);
// "선택한 조건은 색상:검정색, 견종:래브라도레트리버 입니다."
```
- 맵이 순서를 저장한다. 
- 배열의 경우처럼 정렬 메서드가 내장되어 있지 않다. 
  - 펼침 연산자로 해결가능
  - 맵 객체의 경우 펼침 연산자가 키-값 쌍이 반환된다. 
  ```js
    console.log(...filters);  
  // ["색상", "검정색"],["견종", "래브라도레트리버"]
    ```

```js
function getAppliedFilters(filters){
  const applied = [...filters].map(([key, value])=>{
    return `${key}:${value}`;
  });
  return `선택한 조건은 ${applied.join(', ')} 입니다.`;
}

getAppliedFilters(filters);
// "선택한 조건은 색상:검정색, 견종:래브라도레트리버 입니다."

```
```js
function sortByKey(a, b){
    return a[0] > b[0] ? 1 : -1;
}

function getAppliedFilters(filters){
  const applied = [...filters]
    .sort(sortByKey)
    .map(([key, value])=>{
      return `${key}:${value}`;
    })
    .join(', ');
  return `선택한 조건은 ${applied}입니다.`;
}

getAppliedFilters(filters);
// "선택한 조건은 색상:검정색, 견종:래브라도레트리버 입니다."

```
1. 맵을 배열로 변환
2. 배열을 정렬
3. 배열에 담긴 키-값 쌍을 `키:값` 형식의 문자열로 변환
4. 배열의 항목을 연결해서 문자열을 만듬
5. 템플릿 리터럴을 이용해서 다른 정보와 함께 문자열로 병합함 


<br>

***
<br><br>

## TIP 15 : 맵 생성 시 부수 효과를 피하라 🔍

- 부수 효과를 신경 쓰지 않으면 맵에 has() 메서드를 사용해서 키가 존재하는지 확인할 수 있다. 
  - 키가 있는지 확인, 없으면 키 설정, 이미 존재하는 키면 무시 
```js
function applyDefualts(map, defaults){
  for (const [key, value] of defaults){
    if(!map.has(key)){
      map.set(key, value);
    }
  }
}
```

- 객체를 조작하면 사용자가 직접 선택하지 않은 기본값도 모두 노출되는 문제 발생
  - 문제를 우회하는 가장 간단한 방법은 맵의 사본을 만드는 것

```js
function applyDefualts(map, defaults){
  const copy = new Map([...map]);
  for (const [key, value] of defaults){
    if(!copy.has(key)){
      copy.set(key, value);
    }
  }
  return copy;
}
```
- 필터링 조건 맵은 기본값과 사용자가 선택한 조건을 모두 포함하면서도 부수 효과로부터 안전 

- 맵은 하나의 키를 한 번만 사용한다. 값을 설정하는 대신 갱신한다.

```js
function applyDefaults(map, defaults){
  return new Map([...defaults, ...map]);
}

```


<br>

***
<br><br>

## TIP 16 : 세트를 이용해 고윳값을 관리하라 🔍

- set 은 각 고유 항목을 하나씩만 갖는 특화된 배열을 갖는다. 
- 중복된 값이 없고 고윳값만 있는 배열로 바꾸는 방법은 for문을 사용하거나 reduce() 메서드를 쓸 수 있다. 

- 세트를 이용해서 중복을 제거할 수 있다. 
```js
const colors = ['검정색','검정색', '갈색' ];
const unique = new Set(colors);
// Set {'검정색', '갈색'}

```
- 세트에 펼침 연산자를 사용하면 배열을 반환한다. 

```js
function getUnique(attributes){
  return [...new Set(attributes)];
}
```
- 순서도 보장되며 최초에 값이 추가된 위치가 유지된다. 

```js
function getUniqueColors(dogs){
  const unique = new Set();
  for (const dog of dogs){
    unique.add(dog.색상);
  }
  return [...unique];
}

// reduce 이용
[...dogs.reduce((colors, {색상}) => colors.add(색상), new Set())];

```


