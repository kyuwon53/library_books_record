# 📚 REFACTORING : 리팩터링 2판
## 📖 11장 API 리팩터링 🔎

좋은 API는 데이터를 갱신하는 함수와 그저 조회만 하는 함수를 명확히 구분한다.

<br>

### 📍 1 질의 함수와 변경 함수 분리하기

<br>

- 겉보기 부수효과가 전혀 없이 값을 반환해주는 함수를 추구해야 한다. 
- **질의 함수(읽기 함수)는 모두 부수효과가 없어야 한다.**는 규칙을 따르는 것이다. 
- 값을 반환하면서 부수효과도 있는 함수를 발견하면 상태를 변경하는 부분과 질의하는 부분을 분리하려 시도하자!

- 최적화 기법 중 요청된 값을 캐시해두고 다음번 호출 때 빠르게 응답하는 방법이 있는데, 이러한 캐싱도 객체의 상태를 변경하지만 객체 밖에서는 관찰할 수 없다.
- 겉보기 부수효과 없이 어떤 순서로 호출하든 모든 호출에 항상 똑같은 값을 반환할 뿐이다. 

#### 절차 
1. 대상 함수를 복제하고 질의 목적에 충실한 이름을 짓는다.
  - 함수 내부를 살펴 무엇을 반환하는지 찾는다. 어떤 변수의 값을 반환한다면 그 변수 이름이 훌륭한 단초가 될 것이다.
2. 새 질의 함수에서 부수효과를 모두 제거한다
3. 정적 검사를 수행한다
4. 원래 함수(변경 함수)를 호출하는 곳을 모두 찾아낸다. 호출하는 곳에서 반환 값을 사용한다면 질의 함수를 호출하도록 바꾸고, 원래 함수를 호출하는 코드를 바로 아래 줄에 새로 추가한다. 하나 수정할 때마다 테스트한다. 
5. 원래 함수에서 질의 관련 코드를 제거한다. 
6. 테스트한다. 

<br>

#### 리펙토링 전
```js 
function alertForMiscreant(people) {
  for (const p of people) {
    if (p === "조커") {
      setOffAlarms();
      return "조커";
    }
    if (p === "사루만") {
      setOffAlarms();
      return "사루만";
    }
  }
  return "";
}
```
#### 리펙토링 후 

```js
function alertForMiscreant(people) {
  if(findMiscreant(people) != ""){
    setOffAlarms();
  }
}

function findMiscreant(people) {
  for (const p of people) {
    if (p === "조커") {
      return "조커";
    }
    if (p === "사루만") {
      return "사루만";
    }
  }
  return "";
}
```

<br>

### 📍 2 함수 매개변수화하기

<br>

두 함수의 로직이 아주 비슷하고 단지 **리터럴 값**만 다르다면, 그 **다른 값만 매개변수로 받아 처리**하는 함수 하나로 합쳐서 중복을 없앨 수 있다. 이렇게 하면 매개변수 값만 바꿔서 여러 곳에서 쓸 수 있으니 함수의 유용성이 커진다.

#### 절차
1. 비슷한 함수 중 하나를 선택한다.
2. 함수 선언 바꾸기로 리터럴들을 매개변수로 추가한다.
3. 이 함수를 호출하는 곳 모두에 적절한 리터럴 값을 추가한다.
4. 테스트한다.
5. 매개변수로 받은 값을 사용하도록 함수 본문을 수정한다. 하나 수정할 때마다 테스트한다. 
6. 비슷한 다른 함수를 호출하는 코드를 찾아 매개변수화된 함수를 호출하도록 하나씩 수정한다. 하나 수정할 때마다 테스트한다. 
  - 매개변수화된 함수가 대체할 비슷한 함수와 다르게 동작한다면, 그 비슷한 함수의 동작도 처리할 수 있도록 본문 코드를 적절히 수정한 후 진행한다. 

#### 간단한 예시 

##### 리팩토링 전 
```js
function tenPercentRaise(aPerson) {
  aPerson.salary = aPerson.salary.multiply(1.1);
}

function fivePercentRaise(aPerson) {
  aPerson.salary = aPerson.salary.multiply(1.05);
}
```

##### 리팩토링 후 
```js
function raise(aPerson, factor) {
  aPerson.salary = aPerson.salary.multiply(1 + factor);
}
```
#### 복잡한 예시 

##### 리팩토링 전

```js
function baseCharge(usage) {
  if (usage < 0) {
    return usd(0);
  }
  const amount =
        bottomBand(usage) * 0.03
        + middleBand(usage) * 0.05
        + topBand(usage) * 0.07;
  return usd(amout);
}

function bottomBand(usage) {
  return Math.min(usage, 100);
}

function middleBand(usage) {
  return usage > 100 ? Math.min(usage, 200) - 100 : 0;
}

function topBand(usage) {
  return usage > 200 ? usage - 200 : 0;
}
```
##### 리팩토링 후

```js
function baseCharge(usage) {
  if (usage < 0) {
    return usd(0);
  }
  const amount =
        withinBand(usage, 0, 100) * 0.03
        + withinBand(usage, 100, 200) * 0.05
        + withinBand(usage, 200, Infinity) * 0.07;
  return usd(amout);
}

function withinBand(usage, bottom, top) {
  return usage > bottom ? Math.min(usage, top) - bottom : 0;
}
```

<br>

### 📍 3 플래그 인수 제거하기 

<br>

- 플래그 인수란 호출되는 함수가 실행할 로직을 호출하는 쪽에서 선택하기 위해 전달하는 인수다. 

- 호출할 수 있는 함수들이 무엇이고 어떻게 호출해야 하는지를 이해하기 어려워지기 때문에 플래그 인수보다 명시적인 함수를 제공하는 편이 깔끔하다. 

- 플래그 인수가 되려면 호출하는 쪽에서 불리언 값으로 (프로그램에서 사용되는 데이터가 아닌) 리터럴 값을 건네야 한다.
- 또한, 호출되는 함수는 그 인수를 (다른 함수에 전달하는 데이터가 아닌) 제어 흐름을 결정하는 데 사용해야 한다. 
- 플래그 인수를 제거하면 코드가 깔끔해짐은 물론 프로그래밍 도구에도 도움을 준다. 

#### 절차 
1. 매개변수로 주어질 수 있는 값 각각에 대응하는 명시적 함수들을 생성한다. 

2. 원래 함수를 호출하는 코드들을 모두 찾아서 각 리터럴 값에 대응되는 명시적 함수를 호출하도록 수정한다. 

#### 예시 

```js
aShipment.deliveryDate = deliveryDate(anOrder, true);

aShipment.deliveryDate = deliveryDate(anOrder, false);

function deliveryDate(anOrder, isRush) {
  if (isRush) {
    let deliveryTime;
    if(["MA", "CT"].includes(anOrder.deliveryState)){
      deliverTime = 1;
    }
    else if(["NY", "NH"].includes(anOrder.deliveryState)){
      deliverTime = 2;
    }
    else {
      deliveryTime = 3;
      }
      return anOrder.placedOn.plusDays(1 + deliveryTime);
  }
  else {
    let deliveryTime;
    if(["MA", "CT", "NY"].includes(anOrder.deliveryState)){
      deliverTime = 2;
    }
    else if(["ME", "NH"].includes(anOrder.deliveryState)){
      deliverTime = 3;
    }
    else {
      deliveryTime = 4;
      }
      return anOrder.placedOn.plusDays(2 + deliveryTime);
  }
}
```

###### 조건문 분해하기 

```js
function deliveryDate(anOrder, isRush) {
  if (isRush) {
    return rushDeliveryDate(anOrder);
  }
  else {
    return regularDeliveryDate(anOrder);
  }
  function rushDeliveryDate(anOrder){
    let deliveryTime;
    if(["MA", "CT"].includes(anOrder.deliveryState)){
      deliverTime = 1;
    }
    else if(["NY", "NH"].includes(anOrder.deliveryState)){
      deliverTime = 2;
    }
    else {
      deliveryTime = 3;
      }
      return anOrder.placedOn.plusDays(1 + deliveryTime);
  }
  function regularDeliveryDate(anOrder) {
    let deliveryTime;
    if(["MA", "CT", "NY"].includes(anOrder.deliveryState)){
      deliverTime = 2;
    }
    else if(["ME", "NH"].includes(anOrder.deliveryState)){
      deliverTime = 3;
    }
    else {
      deliveryTime = 4;
      }
      return anOrder.placedOn.plusDays(2 + deliveryTime);
  }

```

<br>

### 📍 4 객체 통째로 넘기기 

<br>

- 하나의 레코드에서 값 두어 개를 가져와 인수로 넘기는 코드를 보면, 그 값들 대신 레코드를 통째로 넘기고 함수 본문에서 필요한 값들을 꺼내 쓰도록 수정한다. 
- 레코드를 통째로 넘기면 변화에 대응하기 쉽다. 예컨대 그 함수가 더 다양한 데이터를 사용하도록 바뀌어도 매개변수 목록은 수정할 필요가 없다. 
- 레코드를 통째로 넘긴다면 이런 로직 중복도 없앨 수 있다. 
- 함수가 레코드 자체에 의존하기를 원치 않을 때는 이 리펙터링을 수행하지 않는데, 레코드와 함수가 서로 다른 모듈에 속한 상황이면 특히 더 그렇다. 
- 어떤 객체로부터 값 몇 개를 얻은 후 그 값들만으로 무언가를 하는 로직이 있다면, 그 로직을 객체 안으로 집어넣어야 함을 알려주는 악취로 봐야 한다. 
- 객체 통째로 넘기기는 특히 매개변수 객체 만들기 후, 즉 산재한 수많은 데이터 더미를 새로운 객체로 묶은 후 적용하곤 한다. - 한 객체가 제공하는 기능 중 항상 똑같은 일부만을 사용하는 코드가 많다면, 그 기능만 따로 묶어서 클래스로 추출하라는 신호일 수 있다. 
- 다른 객체의 메서드를 호출하면서 호출하는 객체 자신이 가지고 있는 데이터 여러 개를 건네는 경우다. 이런 상황이면 데이터 여러 개 대신 객체 자신의 참조만 건네도록 수정할 수 있다. 

#### 절차 
1. 매개변수들을 원하는 형태로 받는 빈 함수를 만든다. 
  - 마지막 단계에서 이 함수의 이름을 변경해야 하니 검색하기 쉬운 이름으로 지어준다.
2. 새 함수의 본문에서는 원래 함수를 호출하도록 하며, 새 매개변수와 원래 함수의 매개변수를 매핑한다. 
3. 정적 검사를 수행한다. 
4. 모든 호출자가 새 함수를 사용하게 수정한다. 하나씩 수정하며 테스트하자. 
  - 수정 후에는 원래의 매개변수를 만들어내는 코드 일부가 필요 없어질 수 있다. 따라서 죽은 코드 제거하기로 없앨 수 있을 것이다. 
5. 호출자를 모두 수정했다면 원래 함수를 인라인한다. 
6. 새 함수의 이름을 적절히 수정하고 모든 호출자에 반영한다. 

#### 예시 

```js
// 호출자 
const low = aRoom.daysTempRange.low;
const high = aRoom.daysTempRange.high;
if (!aPlan.withinRange(low, high)){
  alert.push("방 온도가 지정 범위를 벗어났습니다.");
}

// HeatingPlan 클래스 
withinRange(bottom, top) {
  return (bottom >= this._temperatureRange.low) 
          && (top <= this._temperatureRange.high);
}
```

##### 리펙터링 적용 

```js
// HeatingPlan 클래스 
withinRange(aNumberRange) {
  return (aNumberRange.low >= this._temperatureRange.low) &&
         (aNumberRange.high <= this._temperatureRange.high);
}

// 호출자 
if (!aPlan.withinRange(aRoom.daysTempRange)){
  alert.push("방 온도가 지정 범위를 벗어났습니다.");
}
```

#### 예시: 새 함수를 다른 방식으로 만들기 
```js
// 호출자 
const tempRange = aRoom.daysTempRange;
const isWithinRange = aPlan.NEWwithinRange(tempRange);
if (!iswithinRange){
  alert.push("방 온도가 지정 범위를 벗어났습니다.");
}

// HeatingPlan 클래스 
NEWwithinRange(tempRange) {
  const low = tempRange.low;
  const high = tempRange.high;
  const isWithinRange = this.withinRange(low, high);
  return isWithinRange;
}
```
<br>

### 📍 5 매개변수를 질의 함수로 바꾸기

<br>

매개변수 목록은 함수의 변동 요인을 모아놓은 곳이다. 함수의 동작에 변화를 줄 수 있는 일차적인 수단이다. **중복은 피하는 게 좋으며 짧을수록 이해하기 쉽다.**

해당 매개변수를 제거하면 값을 결정하는 책임 주체가 달라진다. 매개변수가 있다면 결정 주체가 호출자가 되고, 매개변수가 없다면 피호출 함수가 된다. 
**호출하는 쪽을 간소하게 만든다.**

즉, 책임 소재를 피호출 함수로 옮긴다는 뜻인데, 물론 피호출 함수가 그 역할을 수행하기에 적합할 때만 그렇게 한다. 

제거하려는 매개변수의 값을 다른 매개변수에 질의해서 얻을 수 있다면 안심하고 질의 함수로 바꿀 수 있다. 

주의사항: 대상 함수가 **참조 투명**해야 한다. 
  - 참조 투명: 함수에 똑같은 값을 건네 호출하면 항상 똑같이 동작한다. 
- 매개변수를 없애는 대신 가변 적연 변수를 이용하는 일은 하면 안된다. 

#### 절차

1. 필요하다면 대상 매개변수의 값을 계산하는 코드를 별도 함수로 추출해놓는다. 
2. 함수 본문에서 대상 매개변수로의 참조를 모두 찾아서 그 매개변수의 값을 만들어주는 표현식을 참조하도록 바꾼다. 하나 수정할 때마다 테스트한다. 
3. 함수 선언 바꾸기로 대상 매개변수를 없앤다. 

#### 예시

```js
get finalPrice() {
  const basePrice = this.quantity * this.itemPrice;
  let discountLevel;
  if (this.quantity > 100) {
    discountLevel = 2;
  } 
  else {
    discountLevel = 1;
    return this.discountedPrice(basePrice, discountLevel);
  }
}
discountedPrice(basePrice, discountLevel) {
  switch (discountLevel) {
    case 1: return basePrice * 0.95;
    case 2: return basePrice * 0.9;
  }
}
```
##### 리팩토링 후 

```js
discountedPrice(basePrice, discountLevel) {
  switch (this.discountLevel) {
    case 1: return basePrice * 0.95;
    case 2: return basePrice * 0.9;
  }
}

get finalPrice() {
  const basePrice = this.quantity * this.itemPrice;
  return this.discountedPrice(basePrice);
}
discountedPrice(basePrice) {
  switch (this.discountLevel) {
    case 1: return basePrice * 0.95;
    case 2: return basePrice * 0.9;
  }
}
```

<br>

### 📍 6 질의 함수를 매개변수로 바꾸기

<br>

함수 안에 두기엔 거북한 참조를 발견할 때가 있다. 
  - 전역 변수를 참조한다거나(같은 모듈에 안에서라도)
  - 제거하길 원하는 원소를 참조하는 경우

- 이 문제는 해당 참조를 매개변수로 바꿔 해결할 수 있다. 참조를 풀어내는 책임을 호출자로 옮기는 것이다.

- 이런 상황 대부분은 코드의 의존 관계를 바꾸려 할 때 벌어진다. 
- 대상 함수가 더 이상 (매개변수화하려는) 특정 원소에 의존하길 원치 않을 때 일어난다. 

- 똑같은 값을 건네면 매번 똑같은 결과를 내는 함수는 다루기 쉽다. 이를 `참조 투명성`이라 한다.
- 참조 투명하지 않은 원소에 접근하는 모든 함수는 참조 투명성을 잃게 되는데, 이 문제는 해당 원소를 매개변수로 바꾸면 해결된다. 
- 책임이 호출자로 옮겨진다는 점을 고려해야 하지만, 모듈을 참조 투명하게 만들어 얻는 장점은 아주 크다. 
  - 그래서 모듈을 개발할 때 순수 함수들을 따로 구분하고, 프로그램의 입출력과 기타 가변 원소들을 다루는 로직으로 순수 함수들의 겉을 감싸는 패턴을 많이 활용한다. 

- 이 리팩터링에도 단점은 있다. 
  - 질의 함수를 매개변수로 바꾸면 어떤 값을 제공할지를 호출자가 알아내야 한다. 
  - 책임 소재를 프로그램의 어디에 배정하느냐의 문제로 귀결된다. 

#### 절차

1. 변수 추출하기로 질의 코드를 함수 본문의 나머지 코드와 분리한다. 
2. 함수 본문 중 해당 질의를 호출하지 않은 코드들을 별도 함수로 추출한다. 
  - 이 함수의 이름은 나중에 수정해야 하니 검색하기 쉬운 이름으로 짓는다. 
3. 방금 만든 변수를 인라인하여 제거한다. 
4. 원래 함수도 인라인한다. 
5. 새 함수의 이름을 원래 함수의 이름으로 고쳐준다. 

#### 예시
##### 리팩토링 전
```js
// HeatingPlan 클래스
get targetTemperature() {
  if (thermostat.selectedTemperature > this._max){
    return this._max;
  }else if (thermostat.selectedTemperature < this._min){
    return this._min;
  }else{
    return thermostat.selectedTemperature;
  }
}

// 호출자
if (thePlan.targetTemperature > thermostat.currentTemperature){
  setToHeat();
}else if (thePlan.targetTemperature < thermostat.currentTemperature){
  setToCool();
}else {
  setOff();
}
```
- `targetTemperature()` 메서드가 전역 객체인 `thermostat`에 의존한다.
- 이 전역 객체에 건네는 **질의 메서드를 매개변수로 옮겨서 의존서을 끊어보자.**

##### 리팩토링 후 
```js
// HeatingPlan 클래스
get targetTemperature(selectedTemperature) {
  if (selectedTemperature > this._max){
    return this._max;
  }else if (selectedTemperature < this._min){
    return this._min;
  }else{
    return selectedTemperature;
  }
}

// 호출자
if (thePlan.targetTemperature(thermostat.selectedTemperature) > 
    thermostat.currentTemperature){
  setToHeat();
}else if (thePlan.targetTemperature(thermostat.selectedTemperature) < 
          thermostat.currentTemperature){
  setToCool();
}else {
  setOff();
}
```
- 이 리팩터링을 수행하면 호출하는 쪽 코드는 전보다 다루기 어려워지는 게 보통이다. 
- `의존성을 모듈 바깥으로 밀어낸다`함은 그 **의존성을 처리하는 책임을 호출자에게 지운다**는 뜻이기 때문이다. 
- `HeatingPlan`클래스는 불변이 되었다. 모든 필드가 생성자에서 설정되며, 필드를 변경할 수 있는 메서드는 없다. 
- 같은 객체의 `targetTemperature()`에 같은 인수를 넘겨 호출하면 언제나 똑같은 결과를 돌려줄 것이다. 
