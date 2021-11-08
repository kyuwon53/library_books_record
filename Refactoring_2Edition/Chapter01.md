# 📚 그림으로 배우는 Http & Network Basic
## 📖 1장 리펙터링: 첫 번째 예시 🔎

<br>

### 📍 1 자, 시작해보자! 

```json
{
  "hamlet": {"name": "Hamlet", "type": "tragedy"},
  "as-like": {"name": "As You Like It", "type": "comedy"},
  "othello": {"name": "Othello", "type": "tragedy"}
}
```
- 공연할 연극 정보

<br>

```json
[
  {
    "customer":"BigCo",
    "performances":[
      {
        "playID":"hamlet",
        "audience": 55
      },
      {
        "playID":"as-like",
        "audience": 35
      },
      {
        "playID":"othello",
        "audience": 40
      }
    ]
  }
]
```
- 공연료 청구서에 들어갈 데이터 

<br>

```js
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US",{ style: "currency", currency: "USD", minimumFractionDigits: 2}).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;

    switch (play.type) {
      case "tragedy": // 비극
        thisAmount = 40000;
        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;
      case "comedy": // 희극
        thisAmount = 30000;
        if (perf.audience > 20) {
          thisAmount += 1000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${play.type}`);
    }
    // 포인트를 적립한다.
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다. 
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

    // 청구 내역을 출력한다. 
    result += ` ${play.name}: ${format(thisAmount/100)} (${perf.audience}석)\n`;
    totalAmount += thisAmount;
  }
  result += `총액: ${format(totalAmount/100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}
```
- 공연료 청구서를 출력하는 코드 

<br>

```console
  Hamlet: $650.00 (55석)
  As You Like It: $580.00 (35석)
  Othello: $500.00 (40석)
총액: $1,730.00
적립 포인트: 47점
```
- 두 테스트 데이터 파일(plays.json과 invoices.json)을 입력해 실행한 결과 

<br>

### 📍 2 예시 프로그램을 본 소감

<br>

- 설계가 나쁜 시스템은 수정하기 어렵다. 
- 원하는 동작을 수행하도록 하기 위해 수정해야 할 부분을 찾고, 기존 코드와 잘 맞물려 작동하게 할 방법을 강구하기가 어렵기 때문이다. 
- 무엇을 수정할지 찾기 어렵다면 실수를 저질러서 버그가 생길 가능성도 높아진다. 

<br>

- 코드를 수정할 때 먼저 프로그램의 작동 방식을 더 쉽게 파악할 수 있도록 코드를 여러 함수와 프로그램 요소로 재구성한다. 
- 프로그램의 구조가 빈약하다면 대체로 구조부터 바로잡은 뒤에 기능을 수정하는 편이 작업하기가 훨씬 수월하다.

> 프로그램이 새로운 기능을 추가하기에 편한 구조가 아니라면, 먼저 기능을 추가하기 쉬운 형태로 리팩터링하고 나서 원하는 기능을 추가한다. 

<br>

- 오래 사용할 프로그램이라면 중복 코드는 골칫거리가 된다. 
- 리펙터링이 필요한 이유는 변경 때문이다. 잘 작동하고 나중에 변경할 일이 절대 없다면 코드를 현대 상태로 나둬도 아무런 문제가 없다. 하지만 다른 사람이 읽고 이해해야 할 일이 생겼는데 로직을 파악하기 어렵다면 대책을 마련해야 한다. 

<br>

### 📍 3 예시 프로그램을 본 소감

<br>

- 첫 단계는 리펙터링할 코드 영역을 꼼꼼하게 검사해줄 테스트 코드들부터 마련해야 한다.
- 리팩터링에서 테스트의 역할은 굉장히 중요하다. 
  - 리펙터링 기법들이 버그 발생 여지를 최소화하도록 구성됐다고는 하나 프로그램이 클수록 수정 과정에서 예상치 못한 문제가 발생할 가능성이 크다. 

<br>

- 여기서 중요한 부분은 테스트 결과를 보고하는 방식이다. 
- 출력된 문자열이 정답 문자열과 똑같다면 테스트를 통과했다는 의미의 초록불을 켜고, 조금이라도 다르면 실패를 뜻하는 빨간불을 켠다. 
- 즉, 성공/실패를 스스로 판단하는 자가진단 테스트로 만든다.
- 최신 테스트 프레임워크는 자가진단 테스트를 작성하고 실행하는데 필요한 모든 기능을 제공한다. 

<br>

> 리펙터링하기 전에 제대로 된 테스트부터 마련한다. 테스트는 반드시 자가진단하도록 만든다. 

- 테스트는 내가 저지른 실수로부터 보호해주는 버그 검출기 역할을 해준다. 
- 원하는 내용을 소스 코드와 테스트 코드 양쪽에 적어두면, 두 번 다 똑같이 실수하지 않는 한 버그 검출기에 반드시 걸린다. 
- 이와 같은 중복 검사로 실수 가능성을 크게 줄일 수 있다. 
- 테스트를 작성하는 데 시간이 좀 걸리지만, 신경 써서 만들어두면 디버깅 시간이 줄어서 전체 작업 시간은 오히려 단축된다. 

<br>

### 📍 4 statement() 함수 쪼개기 

<br>

- 긴 함수를 리펙터링할 때는 먼저 전체 동작을 각각의 부분으로 나눌 수 있는 지점을 찾는다. 
- 코드 조각을 별도 함수로 추출하는 방식으로 앞서 파악한 정보를 코드에 반영할 것이다. 
- 추출한 함수에는 그 코드가 하는 일을 설명하는 이름을 지어준다. 

<br>

- 별도 함수로 빼냈을 때 유효범위를 벗어나는 변수, 즉 새 함수에서는 곧바로 사용할 수 없는 변수가 있는지 확인한다. 

```js
function amountFor(perf, play) {
  let thisAmount = 0;
  switch (paly.type) {
    case "tragedy": // 비극
      thisAmount = 40000;
      if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30);
      }
      break;
    case "comedy":  // 희극
      thisAmount = 30000;
      if (perf.audience > 20) {
        thisAmount += 10000 + 500 * (perf.audience - 20);
      }
      thisAmount += 300 * perf.audience;
      break;
    default:
      throw new Error(`알 수 없는 장르: ${play.type}`);
  }
  return thisAmount;
}
```
- `statement()` 함수에서 발췌한 함수 
- `statement()`에서는 `thisAmount` 값을 채울 때 방금 추출한 `amountFor()` 함수를 호출한다. 

```js
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2}).format;
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = amountFor(perf, play);
    // 포인트를 적립한다. 
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다. 
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

    // 청구 내역을 출력한다. 
    result += `${play.name}: ${format(thisAmount/100)} (${perf.audience}석)\n`;
    totalAmount += thisAmount;
  }
  result += `총액: ${format(totalAmount/100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}
```
- 수정하고 나면 곧바로 컴파일하고 테스트해서 실수한 게 없는지 확인한다. 
- 아무리 간단한 수정이라도 리팩터링 후에는 항상 테스트하는 습관을 들이는 것이 바람직하다.
- 한 가지를 수정할 때마다 테스트하면, 오류가 생기더라도 변경 폭이 작기 때문에 살펴볼 범위도 좁아서 문제를 찾고 해결하기가 훨씬 쉽다. 
- 조금씩 변경하고 매번 테스트하는 것은 리팩터링 절차의 핵심이다. 
- 한 번에 너무 많이 수정하려다 실수를 저지르면 디버깅하기 어려워서 결과적으로 작업 시간이 늘어난다.
- 조금씩 수정하여 피드백 주기를 짧게 가져가는 습관이 이러한 재앙을 피하는 길이다.

> 리팩터링은 프로그램 수정을 작은 단계로 나눠 진행한다. 그래서 중간에 실수하더라도 버그를 쉽게 찾을 수 있다.

- 하나의 리팩터링을 문제없이 끝낼 때마다 커밋한다. 그래야 중간에 문제가 생기더라도 이전의 정상 상태로 쉽게 돌아갈 수 있다. 
- 이렇게 자잘한 변경들이 어느정도 의미 있는 단위로 뭉쳐지면 공유 저장소로 푸시(push)한다. 

<br>

- 함수를 추출하고 나면 추출된 함수 코드를 자세히 들여다보면서 지금보다 명확하게 표현할 수 있는 간단한 방법은 없는지 검토한다. 
- 가장 먼저 변수의 이름을 더 명확하게 바꿔보자. 

```js
function amountFor(perf, play) {
  let result = 0; // 명확한 이름으로 변경
  switch (play.type) {
    case "tragedy": // 비극
      result = 40000;
      if (perf.audience > 30) {
        result += 1000 * (perf.audience - 30);
      }
      break;
    case "comedy":  // 희극
      result = 30000;
      if (perf.audience > 20){
        result += 10000 + 500* (perf.audience - 20);
      }
      result += 300 * perf.audience;
      break;
    default:
      throw new Error(`알 수 없는 장르: ${play.type}`);
  }
  return result;
}
```
- 저자는 함수의 반환 값에는 항상 **result**라는 이름을 쓴다. 그러면 그 변수의 역할을 쉽게 알 수 있다. 

```js
function amountFor(aPerformance, play) {  // 명확한 이름으로 변경
  let result = 0;
  switch (play.type) {
    case "tragedy": // 비극
      result = 40000;
      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30);
      }
      break;
    case "comedy":  // 희극
      result = 30000;
      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20);
      }
      result += 300 * aPerformance.audience;
      break;
    default:
      throw new Error(`알 수 없는 장르: ${play.type}`);
  }
  return result;
}
```
- 자바스크립와 같은 동적 타입 언어를 사용할 때는 타입이 드러나게 작성하면 도움된다. 
- 매개변수 이름에 접두어로 타입 이름을 적는데, 지금처럼 매개변수의 역할이 뚜렷하지 않을 때는 부정 관사(a/an)를 붙인다.

> 컴퓨터가 이해하는 코드는 바보도 작성할 수 있다. 사람이 이해하도록 작성하는 프로그래머가 진정한 실력자다.

- 좋은 코드라면 하는 일이 명확히 드러나야하며, 이때 변수 이름은 커다란 역할을 한다. 
- 명확성을 높이기 위한 이름 바꾸기에는 조금도 망설이지 말자. 

<br>

##### play 변수 제거하기 

- `aPerformance`는 루프 변수에서 오기 때문에 반복문을 한 번 돌 때마다 자연스레 값이 변경된다. 
- `play`는 개별 공연(aPerformance)에서 얻기 때문에 애초에 매개변수로 전달할 필요가 없다. `amountFor()` 안에서 다시 계산하면 된다. 
- 긴 함수를 잘게 쪼갤 때마다 play 같은 변수를 최대한 제거한다. 이런 임시 변수들 때문에 로컬 범위에 존재하는 이름이 늘어나는 추출 작업이 복잡해지기 때문이다. 
- 이를 해결해주는 리팩터링으로는 **임시 변수를 질의 함수로 바꾸기**가 있다. 

1. 대입문(`=`)의 우변을 함수로 추출한다. 
```js
function playFor(aPerformance) {
  return plays[aPerformance.playID];
}
```
```js
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2}).format;
  for (let perf of invoice.performances) {
    const play = playFor(perf);
    let thisAmount = amountFor(perf, play);

    // 포인트를 적립한다. 
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다. 
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

    // 청구 내역을 출력한다. 
    result += ` ${play.name}: ${format(thisAmount/100)} (${perf.audience}석)\n`;
    totalAmount += thisAmount;
  }
  result += `총액: ${format(totalAmount/100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}
```
- 컴파일-테스트-커밋한 다음 **변수 인라인하기**를 적용한다.

```js
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2}).format;

  for (let perf of invoice.performances) {
    // const play = playFor(perf); // 인라인된 변수는 제거
    let thisAmount = amountFor(perf, playFor(perf));

    // 포인트를 적립한다. 
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다. 
    if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);

    // 청구 내역을 출력한다. 
    result += ` ${playFor(perf).name}: ${format(thisAmount/100)} (${perf.audience}석)\n`;
    totalAmount += thisAmount;
  }
  result += `총액: ${format(totalAmount/100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}
```
- 변수를 인라인한 덕분에 `amountFor()`에 **함수 선언 바꾸기**를 적용해서 **play** 매개변수를 제거할 수 있게 되었다. 

```js
function amountFor(aPerformance, play) { 
  let result = 0;
  switch (playFor(aPerformance).type) {
    case "tragedy": // 비극
      result = 40000;
      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30);
      }
      break;
    case "comedy":  // 희극
      result = 30000;
      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20);
      }
      result += 300 * aPerformance.audience;
      break;
    default:
      throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);  // play를 playFor() 호출로 변경
  }
  return result;
}
```
- play 매개변수를 삭제 

```js
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2}).format;

  for (let perf of invoice.performances) {
    // const play = playFor(perf); // 인라인된 변수는 제거
    let thisAmount = amountFor(perf);   // 필요 없어진 매개변수 제거

    // 포인트를 적립한다. 
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다. 
    if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);

    // 청구 내역을 출력한다. 
    result += ` ${playFor(perf).name}: ${format(thisAmount/100)} (${perf.audience}석)\n`;
    totalAmount += thisAmount;
  }
  result += `총액: ${format(totalAmount/100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}
```

```js
function amountFor(aPerformance) {    // 필요 없어진 매개변수 제거
  let result = 0;
  switch (playFor(aPerformance).type) {
    case "tragedy": // 비극
      result = 40000;
      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30);
      }
      break;
    case "comedy":  // 희극
      result = 30000;
      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20);
      }
      result += 300 * aPerformance.audience;
      break;
    default:
      throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);  // play를 playFor() 호출로 변경
  }
  return result;
}
```
- 제대로 리팩터링된 코드베이스는 그렇지 않은 코드보다 성능을 개선하기가 훨씬 수월하다
- 지역 변수를 제거해서 얻는 가장 큰 장점은 추출 작업이 훨씬 쉬워진다는 것이다. 유효범위를 신경 써야 할 대상이 줄어들기 때문이다. 

```js
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2}).format;

  for (let perf of invoice.performances) {

    // 포인트를 적립한다. 
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다. 
    if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);

    // 청구 내역을 출력한다. 
    result += ` ${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience}석)\n`;
    totalAmount += amountFor(perf);
  }
  result += `총액: ${format(totalAmount/100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}
```

<br>

##### 적립 포인트 계산 코드 추출하기 

- 앞에서 **play** 변수를 제거한 결과 로컬 유효범위의 변수가 하나 줄어서 적립 포인트 계산 부분을 추출하기가 훨씬 쉬워졌다.

```js
// 새로 추출한 함수
function volumeCreditsFor(perf) {
  let volumeCredits = 0;
  volumeCredits += Math.max(perf.audience - 30, 0);
  if ("comedy" === playFor(perf).type)
    volumeCredits += Math.floor(perf.audience / 5);
  return volumeCredits;
}
```

```js
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2}).format;

  for (let perf of invoice.performances) {
    // 포인트를 적립한다. 추출한 함수를 이용해 값을 누적
    volumeCredits += volumeCredits(perf);

    // 청구 내역을 출력한다. 
    result += ` ${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience}석)\n`;
    totalAmount += amountFor(perf);
  }
  result += `총액: ${format(totalAmount/100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}
```
- 새로 추출한 함수에서 쓰이는 변수들 이름을 적절히 바꾼다.

```js
function volumeCreditsFor(aPerformance)) {
  let result = 0;
  result += Math.max(aPerformance.audience - 30, 0);
  if ("comedy" === playFor(aPerformance).type)
    result += Math.floor(aPerformance.audience / 5);
  return result;
}
```

<br>

##### format 변수 제거하기

- 임시 변수는 나중에 문제를 일으킬 수 있다. 
- 임시 변수는 자신이 속한 루틴에서만 의미가 있어서 루틴이 길고 복잡해지기 쉽다. 

```js
function format(aNumber) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2}).format(aNumber);
}
```

```js
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  for (let perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf);

    // 청구 내역을 출력한다. 
    result += ` ${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience}석)\n`;
    totalAmount += amountFor(perf);
  }
  result += `총액: ${format(totalAmount/100)}\n`;   // 임시 변수였던 format을 함수 호출로 대체
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}
```
- 이름짓기는 중요하면서도 쉽지 않은 작업이다. 
- 긴 함수를 작게 쪼개는 리팩터링은 이름을 잘 지어야만 효과가 있다. 
- 본문을 읽지 않고도 무슨 일을 하는지 알 수 있어야 한다. 나중에 좋은 이름이 떠오를 때 바꾸는 식이 좋다. 

```js
function usd(aNumber) {   // 함수 이름 변경 format -> usd
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2}).format(aNumber/100);
}
```

```js
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  for (let perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf);

    // 청구 내역을 출력한다. 
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`;
    totalAmount += amountFor(perf);
  }
  result += `총액: ${usd(totalAmount)}\n`;   // 임시 변수였던 format을 함수 호출로 대체
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}
```
- 이름을 바꿀 때, 여러 차례 등장하는 100으로 나누는 코드도 추출한 함수로 옮겼다. 화면에 출력할 때는 다시 달러 단위로 변환해야 하므로 포맷 변환 함수인 `usd()`에서 나눗셈까지 처리해주면 좋다. 

<br>

##### volumeCredits 변수 제거하기 

- **반복문 쪼개기**로 `volumeCredits` 값이 누적되는 부분을 따로 빼낸다. 

```js
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  
  for (let perf of invoice.performances) {
    // 청구 내역을 출력한다. 
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`;
    totalAmount += amountFor(perf);
  }
  for (let perf of invoice.performances) {    // 값 누적 로직을 별도 for 문으로 분리
    volumeCredits += volumeCreditsFor(perf);
  }
  result += `총액: ${usd(totalAmount)}\n`;   // 임시 변수였던 format을 함수 호출로 대체
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}
```

- **문장 슬라이드하기**를 적용해서 `volumeCredits` 변수를 선언하는 문장을 반복문 바로 앞으로 옮긴다. 

```js
function statement(invoice, plays) {
  let totalAmount = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  
  for (let perf of invoice.performances) {
    // 청구 내역을 출력한다. 
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`;
    totalAmount += amountFor(perf);
  }
  let volumeCredits = 0;                      // 변수 선언(초기화)을 반복문 앞으로 이동
  for (let perf of invoice.performances) {    
    volumeCredits += volumeCreditsFor(perf);
  }
  result += `총액: ${usd(totalAmount)}\n`; 
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}
```
- `volumeCredits` 값 갱신과 관련한 문장들을 한데 모아두면 **임시 변수를 질의 함수로 바꾸기**가 수월해진다. 

```js
function totalVolumeCredits() {
  let volumeCredits = 0;
  for (let perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf);
  }
  return volumeCredits;
}
```
```js
function statement(invoice, plays) {
  let totalAmount = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  
  for (let perf of invoice.performances) {
    // 청구 내역을 출력한다. 
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`;
    totalAmount += amountFor(perf);
  }
  let volumeCredits = totalVolumeCredits();       // 값 계산 로직을 함수로 추출
  result += `총액: ${usd(totalAmount)}\n`; 
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}
```
- 함수 추출이 끝났다면, `volumeCredits` **변수를 인라인**할 차례

```js
function statement(invoice, plays) {
  let totalAmount = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  
  for (let perf of invoice.performances) {
    // 청구 내역을 출력한다. 
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}석)\n`;
    totalAmount += amountFor(perf);
  }
  result += `총액: ${usd(totalAmount)}\n`;    // 변수 인라인
  result += `적립 포인트: ${totalVolumeCredits()}점\n`;
  return result;
}
```
- 때로는 리팩터링이 성능에 상당한 영향을 주기도 한다. 그럼에도 개의치 않고 리팩터링한다. 
- 잘 다듬어진 코드라야 성능 개선 작업도 훨씬 수월하기 때문이다. 
- 리팩터링 과정에서 성능이 크게 떨어졌다면 리팩터링 후 시간을 내어 성능을 개선한다. 
  - 리팩터링된 코드를 예전으로 되돌리는 경우도 있다. 
  - 대체로 리팩터링 덕분에 성능 개선을 더 효과적으로 수행할 수 있다. 
- 결과적으로 더 깔끔하면서 더 빠른 코드를 얻게 된다. 

- 따라서 리팩터링으로 인한 성능 문제에 대해 **특별한 경우가 아니라면 일단 무시하라**.
- 리팩터링 때문에 성능이 떨어진다면, 하던 리팩터링을 마무리하고 나서 성능을 개선하자. 



