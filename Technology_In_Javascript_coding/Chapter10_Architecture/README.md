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

<br>

***
<br><br>

## TIP 48 : npm으로 커뮤니티 코드를 끌어와라 🔍
👉 npm을 이용해 외부 코드를 가져오는 방법

- 라이브러리 코드를 여러분의 프로젝트에 직접 내려받고, 버전을 관리하고, 익숙한 규칙에 따라 개별 파일에서 코드를 가져와 사용할 수 있다. 
- npm(node package manager)(Node 패키지 관리자)이라는 도구를 이용해 작업을 할 수 있다. 
- 페이스북이 만든 yarn처럼 npm을 대체할 수 있는 도구도 있다. 

<br>

- npm은 중요한 프로젝트이며 대부분 코드를 가져오기 위해 사용한다. 
- npm을 이용해서 프로젝트의 메타데이터와 구성 정보를 설정하고, 명령줄 스크립트를 실행하고, 다른 사람들이 쓸 수 있도록 프로젝트를 게시할 수도 있다. 
- npm을 사용하려면 Node.js를 설치해야 한다. 
- Node.js와 npm을 설치한 후에는 프로젝트를 초기화해야 한다. 
  - 터미널을 열고 프로젝트 디렉터리의 가장 상위로 이동한 후 npm init을 실행한다. 
    - 이 명령은 package.json 파일의 생성을 도와주는 구성 도구를 실행한다. 
    - package.json 파일에는 이름, 설명, 라이선스 등과 같은 프로젝트의 메타데이터 정보뿐 아니라, 모든 외부 의존성 코드도 포함되어 있다. 
    - `npm init` 명령은 단지 package.json 파일만 생성한다. 
```json
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specifiied\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```
- 이 파일은 대규모 자바스크립트 애플리케이션의 가장 중요한 진입점
- 외부 의존성에 대한 정보를 저장하는 곳이다. 

<br>

- 코드를 가져와서 쓸 만큼 만족스럽다면 `npm install --save lodash` 명령을 실행해 프로젝트에 설치한다. 

- `npm install` 명령은 몇 가지 작업을 수행한다. 
  1. 프로젝트에 `node_modules` 디렉토리가 없는 경우에는 디렉터리를 생성하고 패키지를 내려받는다.
  2. 설치하는 패키지의 버전 번호로 `package.json` 파일을 갱신한다. 
  3. 설치하는 코드의 버전에 대한 세부 정보를 담은 `package-lock.json` 파일을 생성한다. 
  - `package-lock.json` 파일에는 해당 코드가 필요로 하는 다른 라이브러리에 대한 정보도 담겨 있다. 

```json
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specifiied\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "lodash": "^4. 17. 15"
  }
}
```
- 갱신된 `package.json`, `dependencies` 필드 추가 

<br>

- 프로젝트의 어느 곳에서든 동일한 문법으로 코드를 가져올 수 있다는 점이 좋다. 
- 코드를 읽을 때 어떤 함수가 코드베이스 외부에서 가져온 것인지 쉽게 확인할 수 있다. 
- 상대 경로를 사용하지 않고 불러온 코드는 외부 코드이다. 
- npm을 이용하면 개발 의존성을 다루고 실행할 수 있는 깔끔한 인터페이스를 제공한다. 
  - 예를 들어 프로젝트에 `Prettier`를 추가한다고 하자.
  - `Prettier`는 스타일 가이드에 맞게 코드 서식을 수정해주는 도구이다. 
  - 이 도구는 개발 작업에는 필요하지만, 실환경 코드에 필요한 의존성은 아니다. 
  - 실환경에 필요하지 않은 의존성이므로 `npm install --save-dev prettier`로 설치한다. 
  - `--save-dev` 플래그를 사용해도 `package.json` 파일을 갱신하지만, `--save` 플래그를 사용한 경우와는 의존성을 추가하는 필드가 다르다. 

<br>

- `prettier`는 `node_modules` 디렉토리에 설치되었기 때문에 명령줄에서 직접 접근할 수 없다. 
- `prettier --tab width=4 --write ./code/*.js` 명령을 실행해 탭 간격을 공백 네 칸으로 변환할 수 있다. 
- npm 스크립트는 동일한 명령을 실행할 때 node_modules 디렉토리에 설치한 패키지를 실행한다. 
- `package.json` 파일이 있는 디렉토리에서 `npm run clean`을 실행하면 프로젝트에 설치한 `Prettier` 패키지를 npm이 실행해준다. 

<br>

***
<br><br>

## TIP 49 : 컴포넌트 아키텍처를 이용해 애플리케이션을 만들어라 🔍
👉 컴포넌트 아키텍처로 흩어져 있는 HTML, 자바스크립트, CSS를 모으는 방법 

- 컴포넌트는 관련 있는 모든 코드를 조합해 하나의 디렉터리에 담은 것이다. 
- 조각을 하나씩 추가하는 방법으로 웹 페이지나 애플리케이션을 만들 수 있다. 
- 컴포넌트 아키텍처에 문제가 없는 것은 아니다. 
  - 가장 큰 문제는 빌드 도구에 의존한다는 점이며, 그보다 덜하기는 하지만 프레임워크에 의존한다는 문제도 있다. 
- 컴포넌트 아키텍처를 이용하면 간단한 패키지 하나에 모든 것을 결합할 수 있다. 

<br>

- 컴포넌트를 재사용할 수 있도록 만들려고 한다. 즉, 최대한 하드 코딩하는 설정이 없어야 한다.
- 클릭할 때의 동작을 컴포넌트에 주입한다.
- 동작이나 자원을 컴포넌트에 전달하는 것은 다른 형태의 의존성 주입이다. 
- 의존성 주입을 이용하면 유연하고 재사용 가능한 코드를 작성할 수 있다. 
- 리엑트에서는 주입된 의존성을 함수의 인자를 통해 접근할 수 있다. 
- 또한, 해체 할당을 이용해서 꺼내올 수 있다. 
- 중괄호는 템플릿 문법이고, 변수 정보를 감싸고 있다. 
- 즉, 변수 `message`의 값이 곧 버튼에 표시되는 메시지이다. 

<br>
- 하나의 논리적인 장소에 모든 것이 모여 있을 때 컴포넌트를 다루는 것이 정말 간단하는 점을 알 수 있다. 
- 컴포넌트 아키텍처는 직관적으로 이해하기 쉽다. 
- 관련된 파일을 한곳에 모으는 것이다. 
- 유일한 어려움은 모든 것을 연결하기가 쉽지 않다.
- 컴포넌트 아키텍처가 동작하는 유일한 이유는 코드를 영리하게 결합하는 훌륭한 도구가 있기 때문이다. 




