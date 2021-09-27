# 📖 9장 외부 데이터에 접근하라  ✏️

페이지를 한 번 불러오면 이후로는 자바스크립트를 이용해서 서버와 주고받는 모든 통신을 처리할 수 있다는 장점을 빼놓을 수 없다. 페이지를 매번 불러오지 않아도 된다면 사용자의 시간과 자원을 절약할 수 있다. 
- 외부 데이터에 접근하는 방법
- 전달받은 데이터를 사용하는 방법
- 자바스크립트는 비동기 언어로, 요청한 데이터를 기다리는 동안 코드 실행을 중단하지 않는다. 
- 자바스크립트는 우리에게 빠른 웹사이트를 제공하지만 비동기 요청은 다루기에 다소 어려울 수도 있다
- 자바스크립트에서 비동기 요청을 다루기 위해 사용하는 방법인 `프라미스(promise)`를 깊이 살펴보자
- 새로운 `async/await` 문법을 사용해 프라미스를 좀 더 간결하게 사용하는 방법
- 원격 데이터에 접근하기 위해 `fetch()`를 사용하는 방법
- 데이터를 브라우저에 저장해서 서버 접근 없이 사용자의 상태를 유지하는 방법 

<br>

***
<br><br>

## TIP 43 : 프라미스를 이용해 비동기적으로 데이터를 가져오라 🔍
👉 **프라미스**를 이용해 지연된 데이터 응답을 처리하는 방법

- 자바스크립트는 비동기 언어이다. 
- 비동기 언어는 그저 이전의 코드가 완전히 해결되지 않아도 이어지는 코드를 실행할 수 있는 언어를 의미 

<br>

### 코드 실행이 중단되는 이유
1. API에서 데이터를 가져오는 경우 
2. DOM이나 다른 곳에서 데이터를 가져오는 경우
3. 사용자 응답을 기다려야 하는 경우 
4. 진행을 위해 어떤 정보가 필요하고, 정보를 얻는 데 시간이 소요되는 경우 

<br><br>

- 비동기 언어의 가치는 지연된 정보를 기다리는 동안 이 정보가 필요하지 않은 다른 코드를 실행할 수 있다는 점에 있다. 
- API 응답을 기다리는 동안 여전히 다른 요소의 클릭 메서드에 응답하거나 다른 데이터 원본에 있는 값을 계산할 수 있다. 

<br>

- 프라미스가 등장하기 전에는 콜백 함수를 사용해 비동기 작업을 처리했다.
- 데이터 원본에 비용을 요청할 때 콜백 함수를 인수로 넘겨준다.
- 이 함수가 비동기 데이터를 가져온 후에는 콜백 함수를 호출한다. 
  - 예) `setTimeout()`
    - 콜백 함수를 전달받고 설정한 밀리초 이후에 콜백 함수를 실행

```js
function getUserPreferences(cb){
  return setTimeout(() => {
    cb({
      theme: 'dusk',
    });
  }, 1000);
}

function log(value){
  return console.log(value);
}

log('starting');
// starting

getUserPreferences(preferences => {
  return log(preferences.theme.toUpperCase());
});

log('ending?');
// ending?

// DUSK
```
- 자바스크립트가 비동기 언어이므로 `getUserPreferences()`를 호출하기 전이나 호출한 후에 다른 함수를 호출할 수 있고, 이렇게 호출한 함수들은 `getUserPreferences()`가 콜백 함수를 실행하기 전에 완료된다. 
- 콜백 함수는 비동기 데이터를 다루는 좋은 방법이다. 
- 문제는 비동기 함수에서 또 비동기 함수를 호출하고, 또 비동기 함수를 호출해 마침내 너무나 많은 콜백 함수가 중첩되는 경우가 생긴다. 

```js
function getMusic(theme, cb){
  return setTimeout(() => {
    if (theme === 'dusk'){
      return cb({
        album: 'music for airports',
      });
    }
    return cb({
      album: 'kind of blue',
    });
  }, 1000);
}
```
- 콜백 함수인 `getMusic()`은 API를 호출해야 하고, 이어서 API 응답에 따라 실행될 콜백 함수도 있어야 한다. 

```js
getUserPreferences(preferences => {
  return getMusic(preferences.theme, music => {
    console.log(music.album);
  });
});
```
- `getUserPreferences()`를 호출하면서 `getMusic()`을 콜백 함수로 전달한다. 
- `getMusic()`은 인수로 테마 설정(preferences.theme)과 콜백 함수를 받는다.
- 여러 비동기 함수들은 두 개의 콜백 함수를 전달받는다. 
- 요청이 성공한 경우에 실행할 콜백 함수와 오류가 발생했을 때 실행할 콜백 함수가 필요하기 때문이다. 

<br>

- 프라미스는 콜백 함수를 인수로 받는 대신에 성공과 실패에 대응하는 메서드를 사용한다. 
- 콜백 함수를 중첩하는 대신에 여러 개의 비동기 프라미스를 연결할 수도 있다. 

<br>

- 프라미스는 비동기 작업을 전달받아서 응답에 따라 두 가지 메서드 중 하나를 호출하는 객체이다. 
- 프라미스는 비동기 작업이 성공하거나 충족된 경우 `then()` 메서드에 결과를 넘겨준다. 
- 비동기 작업에 실패하거나 거부되는 경우에는 프라미스가 `catch()` 메서드를 호출한다. 
- `then()`과 `catch()` 메서드에는 모두 함수를 인수로 전달한다. 
- 두 메서드에 인수로 전달되는 함수에는 비동기 작업의 결과인 응답만이 인수로 전달된다. 

- 프라미스는 두 개의 인수, `resolve()`와 `reject()`를 전달받는다. 
- `resolve()`는 코드가 의도대로 동작했을 때 실행된다. 
- `resolve()`가 호출되면 `then()` 메서드에 전달된 함수가 실행된다. 

```js
function getUserPreferences() {
  const preferences = new Promise((resolve, reject) => {
    resolve({
      theme: 'dusk',
    });
  });
  return preferences;
}

getUserPreferences()
  .then(preferences =>{
    console.log(preferences.theme);
  });
//'dusk'
```
- `getUserPreferences()` 함수는 프라미스를 반환하도록 정의되었다. 
- `getUserPreferences()`를 실제로 호출한 다음에 `then()` 또는 `catch()` 메서드를 호출할 것이다. 
- 프라미스를 설정할 때 `then()`과 `catch()` 메서드를 모두 사용할 수 있다. 
- `then()` 메서드는 성공한 경우를 처리하고, `catch()` 메서드는 거절된 경우를 처리한다. 
```js
  function getMusic(theme){
    if (theme === 'dusk') {
      return Promise.resolve({
        album: 'music for airports',
      });
    }
    return Promise.resolve({
      album: 'kind of blue',
    });
  }

getUserPreferences()
  .then(preference => {
    return getMusic(preference.theme);
  })
  .then(music => {
    console.log(music.album);
  });
// music for airports
```
- `getUserPreferences()`의 `then()` 메서드에 전달한 함수의 내부에서 `getMusic()`을 호출해 반환할 수 있다. 
- 그 후에 연결된 또 다른 `then()`메서드에서 `getMusic()`의 결과를 이용하는 함수가 호출된다. 
- 여러 개의 중첩된 콜백 함수에 데이터를 전달하는 대신 여러 개의 `then()` 메서드를 통해 데이터를 아래로 내려주는 것이다. 
```js
getUserPreferences()
  .then(preference => getMusic(preference.theme))
  .then(music => {console.log(music.album); });
```
 
 - 프라미스를 반환하기 때문에 암묵적인 반환을 이용하는 화살표 함수로 모든 코드를 한 줄로 만들 수 있다. 
 - 프라미스를 연결하는 경우에는 `catch()` 메서드를 개별적으로 연결할 필요가 없다. 
 - `catch()` 메서드를 하나만 정의해서 프라미스가 거절되는 모든 경우를 처리할 수 있다. 

```js
function getArtist(album){
  return Promise.resolve({
    artist: 'Brian Eno',
  });
}

function failMusic(theme){
  return Promise.reject({
    type: '네트워크 오류',
  });
}

getUserPreferences()
  .then(preference => failMusic(preference.theme))
  .then(music => getArtist(music.album))
  .catch(e => {
    console.log(e);
  });
```
- `catch()` 메서드는 다른 `then()` 메서드보다 뒤에 정의되었지만, `getMusic()`이 거부될 때 실행될 것이다. 

<br>

- 프라미스를 이용하면 여러 가지 상황을 매우 쉬운 인터페이스로 처리할 수 있다. 
- 프라미스가 담긴 배열을 받아 모든 프라미스가 종료되었을 때의 성공 또는 실패 결과를 반환하는 `Promise.all`이라는 메서드도 있다. 
- 프라미스는 너저분하게 작성되고 말았을 코드를 멋지고 읽기 좋게 만들 수 있는 훌륭한 도구이다. 

<br>

***
<br><br>

## TIP 44 : async/await로 함수를 명료하게 생성하라 🔍
👉 async/await를 이용해 프라미스를 효율적으로 처리하는 방법을 살펴보자 

- 프라미스는 콜백과 비교하면 엄청난 발전이지만 인터페이스가 여전히 다소 투박하다. 
- 프라미스를 사용해도 여전히 메서드에서 콜백을 다뤄야 한다. 

<br>

- `async` 키워드를 이용해서 선언한 함수는 비동기 데이터를 사용한다는 것을 의미한다. 
- 비동기 함수의 내부에서 `await` 키워드를 사용하면 값이 반환될 때까지 함수의 실행을 중지시킬 수 있다. 

1. `async/await`가 프라미스를 대체하지는 않는다.
  - 단지 프라미스를 더 나은 문법으로 감싸는 것에 불과하다. 
2. 현재는 브라우저 지원이 충분하지 않고 컴파일을 거쳐서 사용하는 경우에는 약간의 버그가 있다. 
  - 서버 측 자바스크립트에 사용할 때는 안전하지만, 브라우저에서 사용할 때는 문제가 발생할 수 있다.

```js
async function getTheme() {
const {theme}  = await getUserPreferences();
return theme;
}

getTheme()
.then(theme => {
  console.log(theme);
});
```
- `getTheme()` 함수 내부에서 `getUserPreferences()`를 호출할 수 있다. 
- 함수를 호출하기 전에 `await` 키워드를 추가해서 `getUserPreferences()`가 프라미스를 반환한다는 것을 알려줘야 한다. 
- 이렇게 하면 프라미스가 완료되었을 때 반환되는 값이 새로운 변수에 담긴다. 

- 비동기 함수의 재미있는 점은 프라미스로 변환된다는 것이다. 
  - 즉, `getTheme()`를 호출해도 여전히 `then()` 메서드가 필요하다. 

- 여러 개의 프라미스를 연결했을 때, `async/await`를 이용하면, 개별 프라미스에서 반환된 값을 변수에 먼저 할당하고 다음에 이어질 함수로 전달할 수 있다.
- 즉, 연결된 프라미스를 하나의 함수로 감싸진 여러 개의 함수 호출로 변환할 수 있다. 

```js
async function getArtistByPreference() {
  const { theme } = await getUserPreferences();
  const { album } = await getMusic(theme);
  const { artist } = await getArtist(album);
  return artist;
}

getArtistByPreference()
  .then(artist => {
    console.log(artist);
  });
```
```js
getArtistByPreference()
  .then(artist => {
    console.log(artist);
  })
  .catch(e => {
    console.error(e);
  });
```
- 오류 퍼리는 비동기 호출을 감싼 함수의 밖으로 옮겨야 한다. 
- `getArtistByPreference()`를 실행할 때 `catch()` 메서드를 사용한다. 
- `getArtistByPreference()`를 실행하면 프라미스를 반환하므로, 내부의 비동기 함수가 오류를 일으킬 때를 대비해서 `catch()` 메서드를 추가하는 것이다. 
- 프라미스는 여러 상황에서 사용하는데, 가장 흔한 것은 API에서 데이터를 가져오는 경우이다. 

<br>

***
<br><br>

## TIP 45 : fetch로 간단한 AJAX 호출을 처리하라🔍
👉 `fetch()`를 이용해 원격 데이터를 가져오는 방법을 알아보자

- API를 사용하면 현재 정보를 가져올 수 있고, 화면을 새로 고침하지 않고도 단일 요소를 갱신할 수 있다. 
- API를 이용하면 네이티브 소프트웨어처럼 작동하는 매우 빠른 애플리케이션을 만들어낼 수 있다. 
- AJAX 호출을 처리할 수 있는 `fetch()`라는 훨씬 간단한 도구가 생겼다. 
- `fetch()` 명세는 **WHATWG(Web Hypertext Application Technology Working Group)**가 정의한다. 
  - 따라서 대부분의 최신 브라우저에서 지원되지만 Node.js에서는 기본적으로 지원되지 않는다. 

<br>

- 먼저 `fetch()`를 사용하려면 API 끝점(endpoint)이 필요하다. 
- API 끝점이 준비되었으니 여기에 요청을 보낸다. 
  1. 첫번째로 처리해볼 요청은 간단한 GET 요청이다. 
    - 데이터를 가져오는 것만 처리한다면 `fetch()` 호출은 간단하다. 
    - 끝점 URL을 인수로 해서 `fetch()`를 호출하면 된다.
    ```js
    fetch('https://jsonplaceholder.typicode.com/posts/1');
    // {
    //   userId: 1,
    //   id: 1,
    //   title: 'First Post',
    //   body: 'This is my first post...',
    // }
    ```
  - 요청을 보내고 나면 `fetch()`는 응답을 처리하는 프라미스를 반환한다. 
  - 이어서 해야 할 작업은 `then()` 메서드에 응답을 처리하는 콜백 함수를 추가하는 것이다. 
  - 결국 우리가 필요한 것은 응답 본문이다. 
  - 응답 객체는 본문 외에도 상태 코드, 헤더 등 상당한 정보를 가지고 있다. 
  - `fetch()`는 다양한 믹스인을 포함하고 있어서 응답 본문 데이터를 자동으로 변환해줍니다.
  - 이 경우에는 JSON을 가져온다는 사실을 알고 있으므로 응답에 `json()`을 호출해 JSON으로 변환할 수 있다. 
  - `json()` 메서드도 프라미스를 반환하기 때문에 `then()` 메서드를 추가해야 한다. 
  - 추가한 `then()` 메서드의 콜백에서 파싱된 데이터를 처리할 수 있다. 

```js
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(data => {
    return data.json();
  })
  .then(post => {
    console.log(post.title);
  });
```
- `fetch()` 프라미스는 상태 코드가 **404**여서 요청에 실패한 경우에도 응답 본문을 반환한다. 
- 즉, 요청이 실패하는 경우 `catch()` 메서드만으로 처리할 수 없다. 
- 응답에는 응답 코드가 200에서 299 사이인 경우 **true**로 설정되는 `ok`라는 필드가 있다. 
  - 이 필드를 이용해서 응답을 확인하고, 문제가 있으면 오류 처리로 넘어가도록 할 수 있다. 
  - 아쉬운 점은 `ok` 필드를 인터넷 익스플로러는 지원 하지 않고, 엣지만 지원한다는 점이다. 
  - 인터넷 익스플로러를 지원해야하는 경우에는 `response.status`를 이용해 200에서 299 사이의 값인지 확인

```js
fetch('https://jsonplaceholder.typicode.com/pots/1')
  .then(data => {
    if (!data.ok){
      throw Error(data.status);
    }
    return data.json();
  })
  .then(post => {
    console.log(post.title);
  })
  .catch(e => {
    console.log(e);
  });
```
- GET 요청 외의 다른 요청을 처리할 때는 몇가지 조건을 추가로 설정해야 한다. 
- 두 번째 인수로 설정 조건을 담은 객체를 전달해야 한다. 
- 설정 객체는 서로 다른 다양한 세부 사항을 담을 수 있다. 
- **POST** 요청을 보내기 때문에 **POST** 메서드를 사용한다고 선언해야 한다. 
- JSON 데이터를 보내기 때문에 헤더의 **Content-Type**을 `application/json`으로 설정해야 한다.
- 끝으로 **JSON** 데이터를 담은 문자열로 요청 본문을 추가하낟. 

```js
const update = {
  title: 'Clarence White Techniques',
  body: 'Amazing',
  userId: 1,
};

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(update),
};

fetch('https://jsonplaceholder.typicode.com/posts',options).
then(data => {
  if (!data.ok) {
    throw Error(data.status);
  }
  return data.json();
}).then(update => {
  console.log(update);
  // {
  //   title: 'Clarence White Techniques',
  //   body: 'Amazing',
  //   userId: 1,
  //   id: 101
  // };
}).catch(e => {
  console.log(e);
});
```
- 요청 본문의 형식으로는 **JSON** 데이터가 가장 흔하지만 **FormData**와 같은 다른 방식도 있다.
- 요청을 필요에 따라 조정할 수 있는 다양한 방법이 있으며 **모드(mode)**, **캐시 방법** 등을 설정할 수 있다. 
- 끝으로 코드를 작성할 때는 **AJAX** 요청을 어디서 다룰지, 그 위치에 주의하라
- `fetch()`는 대부분의 경우 인터넷 연결이 필요하고 API 끝점이 프로젝트 진행 중에 바뀔수 있다는 점도 놓치지 말아야 한다. 
- `fetch()` 작업을 한곳에 모아두는 것도 좋은 방법이다. 
  - 이렇게 하면 수정과 테스트가 쉬워진다. 


