# 📖 10장 컴포넌트 아키텍처를 이용해 관련 파일을 모아라  ✏️

전술은 당면한 문제를 해결하고, 전략은 다가올 문제를 예상해 자원을 할당하는 것이다.

소프트웨어 개발 세계에서는 확장과 재상용이 쉽고 관리가 가능하도록 코드를 정리하는 것을 아키텍처라고 부른다. 

- 프로젝트의 구조를 기초부터 다지는 방법
- 최신 자바스크립트 도구를 활용해 여러 조각의 코드를 하나의 완성품으로 만드는 방법
- 가져오기(import)와 내보내기(export)를 이용해서 코드를 서로 다른 파일로 분리하는 방법 
- **npm**을 이용해 서드파티 코드를 추가하는 방법 
- 컴포넌트 아키텍처 패턴을 이용해 애플리케이션을 훌륭하게 설계된 조각으로 나누는 방법
- 빌드 도구를 이용해 조각 파일을 최종적으로 사용할 수 있는 자원으로 병합하는 방법
- 자바스크립트가 책임져온 애니메이션을 CSS를 이용해서 다루는 방법

클린 아키텍처를 위한 첫 번째 단계는 가져오기와 내보내기를 이용해 코드를 재사용 가능하고 공유할 수 있는 조각으로 분리하는 것이다. 


<br>

***
<br><br>

## TIP 47 : 가져오기와 내보내기로 기능을 분리하라 🔍
👉 파일 간에 코드를 공유하는 방법 

- Require.js와 CommonJS 같은 프로젝트가 모듈을 이용해서 파일 간에 코드를 공유할 수 있는 방법
- 모듈 시스템을 이용해 프로젝트에서 코드를 쉽게 재사용할 수 있게 되었다. 
- 모듈은 단순화되었고, 이제는 간단한 `import` 문과 `export` 문을 사용할 수 잇다. 
- 단순한 인터페이스를 이용하면 프로젝트 내의 파일 간에 코드를 공유할 수 있다. 
- 코드를 결합하고 압축해서 하나의 파일로 만드는 것은 여전히 좋은 방법이다. 
- 기존 코드를 내보내려면 `export` 문만 작성하면 된다. 
  - 코드를 공유하고 싶다면 간단한 `export` 문만 추가하면 된다. 
- 가장 기본적으로 우리가 해야 할 것은 공유하고자하는 데이터를 내보내는 것뿐입니다. 
- 함수, 변수, 클래스를 내보낼 수 있다. 
- 여러 함수 중 일부 함수만 내보내는 경우에는 기본적으로 공개 함수와 비공개 함수를 생성한 것과 같다. 
- 때로는 내보내지 않고 비공개로 두고 싶은 함수도 있다.
- 그럴 때는 원하는 함수만 내보낼 수 있다. 

```js
function getPower(decimalPlaces){
  return 10 ** decimalPlaces;
}

function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1);
}

function roundToDecimalPlace(number, decimalPlaces = 2) {
  const round = getPower(decimalPlaces);
  return Math.round(number * round) / round;
}

export { capitalize, roundToDecimalPlace };
```

- 다른 파일에서 함수를 사용하려면 **import** 키워드를 작성하고 불러오려는 함수를 **중괄호** 안에 작성한다. 
- 그 뒤에 가져올 파일의 경로를 지정하는데, **현재 파일을 기준으로 상대 경로로 작성한다.**

```js
import { capitalize,roundToDecimalPlace } from "./util";

function giveTotal(name, total) {
  return `${capitalize(name)}님, 합계는 ${roundToDecimalPlace(total)}입니다.`;
}

giveTotal('sara', 10.3333333);
// "sara님, 합계는 10.33입니다."

export { giveTotal };
```

```js
import { capitalize } from "./util";

function greet(name) {
  return `Hello, ${capitalize(name)}!`;
}

greet('ashley');
// Hello, Ashley!

export { greet };
```
- 모든 것을 가져올 필요는 없다. 한 가지 항목만 필요하다면 그렇게 해도 된다. 

```js
const PI = 3.14;
const E = 2.71828;

export { E, PI };
```
- 내보내기는 함수만 가능한 것이 아니다. 변수와 클래스도 내보낼 수 있다. 
- 내보내기와 가져오기는 해체 할당과 거의 동일한 문법을 사용한다. 
- 가져오는 항목을 모두 객체의 속성으로 관리하면 변수명으로 모든 것을 가져올 수 있다. 
- 별표(*)를 이용해서 모든 함수를 불러오고 변수명을 지정할 수 있다. 
- 객체에 속한 함수처럼 호출할 수 있다. 

```js
import * as utils from './util';

function greet(name){
  return `Hello, ${utils.capitalize(name)}!`;
}

greet('ashley');
// Hello, Ashley!

export { greet };
```
- 해체 할당과 마찬가지로 가져오는 함수나 데이터의 이름을 바꿀 수도 있다. 
- **as** 키워드를 이용해 새로운 변수에 데이터를 할당한다. 
- 선언한 객체를 파일의 끝에서 개별적으로 추가하는 대신, 각각의 함수 앞에 **export** 키워드를 추가한다. 
  - 파일의 끝부분에 객체를 추가할 필요가 없으므로 코드가 훨씬 더 쉬워진다. 
```js
function getPower(decimalPlaces) {
  return 10 ** decimalPlaces;
}

export function capitalize(word) {
  return word[0].toUpperCase() + word.slice(1);
}

export function roundToDecimalPlace(number, decimalPlaces = 2) {
  const round = getPower(decimalPlaces);
  return Math.round(number * round) / round;
}
```
- 함수를 한 번에 하나씩 내보내더라도 불러서 쓰는 방법은 동일하다.
- 해당 파일의 내보내기 기본값(export default)을 선언할 수 있다. 이렇게 하면 가져오기 과정이 좀 더 짧아진다.
- 남아있는 다른 함수에도 `export` 키워드를 추가할 수 있다. 

```js
import { capitalize } from "../single/util";

export function parseRegion(address) {
  const region = address.state || address.providence || '';
  return region.toUpperCase();
}

export function parseStreet({ street }) {
  return street.split(' ')
    .map(part => capitalize(part))
    .join(' ');
}

export default function normalize(address) {
  const street = parseStreet(address);
  const city = address.city;
  const region = parseRegion(address);
  return `${street} ${city}, ${region}`;
}
```
- `normalize()` 함수를 가져올 때는 앞서 살펴본 것과 같은 문법을 사용하지만 중괄호를 사용하지 않는다. 
  - 중괄호를 사용하지 않으면 내보내기 기본값만 가져온다. 
  - 함수 이름을 똑같이 사용할 필요도 없다. 
  - 내보내기 기본값은 원하는 변수명으로 가져올 수 있다. 
  - 가독성을 위해 같은 이름을 사용하는 것이 좋다. 
```js
import normalize from "./address";

function getAddress(user) {
  return normalize(user.address);
}

export default getAddress;
```
- 내보내기 기본값으로 정해진 함수와 함께 다른 함수도 가져와야 하는 경우에는 **import** 문을 혼합할 수 있다. 
- 쉼표를 이용해서 기본값과 중괄호를 분리한다. 
```js
import normalize, { parseRegion, parseStreet } from "./address";

function getAddress(user) {
  return normalize(user.address);
}

export function getAddressByRegion(users) {
  return users.reduce((regions,user) => {
    const { address } = user;
    const region = parseRegion(address);
    const addresses = regions[region] || [];
    regions[region] = [...addresses, normalize(address)];
    return regions;
  }, {});
}

const bars = [
  {
    name: 'Saint Vitus',
    address: {
      street: '1120 manhattan ave',
      city: 'Brooklyn',
      state: 'NY',
    },
  },
];
getAddressByRegion(bars);
// {
//   NY: ["1120 Manhattan Ave Brooklyn, NY"]
// }
```
- 가져오기 기본값은 특히 클래스를 불러올 때 유용하다. 

```js
import { capitalize } from "../single/util";

export default class Address {
  constructor(address) {
    this.address = address;
  }

  normalize() {
    const street = this.parseStreet(this.address);
    const city = this.address.city;
    const region = this.parseRegion(this.address);
    return `${street} ${city}, ${region}`;
  }

  parseStreet({ street }) {
    return street.split(' ')
      .map(part => capitalize(part))
      .join(' ');
  }

  parseRegion(address) {
    const region = address.state || address.providence || '';
    return region.toUpperCase();
  }
}
```



