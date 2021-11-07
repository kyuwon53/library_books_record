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


