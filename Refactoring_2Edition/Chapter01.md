# ๐ REFACTORING : ๋ฆฌํฉํฐ๋ง 2ํ
## ๐ 1์ฅ ๋ฆฌํํฐ๋ง: ์ฒซ ๋ฒ์งธ ์์ ๐

<br>

### ๐ 1 ์, ์์ํด๋ณด์! 

```json
{
  "hamlet": {"name": "Hamlet", "type": "tragedy"},
  "as-like": {"name": "As You Like It", "type": "comedy"},
  "othello": {"name": "Othello", "type": "tragedy"}
}
```
- ๊ณต์ฐํ  ์ฐ๊ทน ์ ๋ณด

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
- ๊ณต์ฐ๋ฃ ์ฒญ๊ตฌ์์ ๋ค์ด๊ฐ ๋ฐ์ดํฐ 

<br>

```js
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `์ฒญ๊ตฌ ๋ด์ญ (๊ณ ๊ฐ๋ช: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US",{ style: "currency", currency: "USD", minimumFractionDigits: 2}).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = 0;

    switch (play.type) {
      case "tragedy": // ๋น๊ทน
        thisAmount = 40000;
        if (perf.audience > 30) {
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;
      case "comedy": // ํฌ๊ทน
        thisAmount = 30000;
        if (perf.audience > 20) {
          thisAmount += 1000 + 500 * (perf.audience - 20);
        }
        thisAmount += 300 * perf.audience;
        break;
      default:
        throw new Error(`์ ์ ์๋ ์ฅ๋ฅด: ${play.type}`);
    }
    // ํฌ์ธํธ๋ฅผ ์ ๋ฆฝํ๋ค.
    volumeCredits += Math.max(perf.audience - 30, 0);
    // ํฌ๊ทน ๊ด๊ฐ 5๋ช๋ง๋ค ์ถ๊ฐ ํฌ์ธํธ๋ฅผ ์ ๊ณตํ๋ค. 
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

    // ์ฒญ๊ตฌ ๋ด์ญ์ ์ถ๋ ฅํ๋ค. 
    result += ` ${play.name}: ${format(thisAmount/100)} (${perf.audience}์)\n`;
    totalAmount += thisAmount;
  }
  result += `์ด์ก: ${format(totalAmount/100)}\n`;
  result += `์ ๋ฆฝ ํฌ์ธํธ: ${volumeCredits}์ \n`;
  return result;
}
```
- ๊ณต์ฐ๋ฃ ์ฒญ๊ตฌ์๋ฅผ ์ถ๋ ฅํ๋ ์ฝ๋ 

<br>

```console
  Hamlet: $650.00 (55์)
  As You Like It: $580.00 (35์)
  Othello: $500.00 (40์)
์ด์ก: $1,730.00
์ ๋ฆฝ ํฌ์ธํธ: 47์ 
```
- ๋ ํ์คํธ ๋ฐ์ดํฐ ํ์ผ(plays.json๊ณผ invoices.json)์ ์๋ ฅํด ์คํํ ๊ฒฐ๊ณผ 

<br>

### ๐ 2 ์์ ํ๋ก๊ทธ๋จ์ ๋ณธ ์๊ฐ

<br>

- ์ค๊ณ๊ฐ ๋์ ์์คํ์ ์์ ํ๊ธฐ ์ด๋ ต๋ค. 
- ์ํ๋ ๋์์ ์ํํ๋๋ก ํ๊ธฐ ์ํด ์์ ํด์ผ ํ  ๋ถ๋ถ์ ์ฐพ๊ณ , ๊ธฐ์กด ์ฝ๋์ ์ ๋ง๋ฌผ๋ ค ์๋ํ๊ฒ ํ  ๋ฐฉ๋ฒ์ ๊ฐ๊ตฌํ๊ธฐ๊ฐ ์ด๋ ต๊ธฐ ๋๋ฌธ์ด๋ค. 
- ๋ฌด์์ ์์ ํ ์ง ์ฐพ๊ธฐ ์ด๋ ต๋ค๋ฉด ์ค์๋ฅผ ์ ์ง๋ฌ์ ๋ฒ๊ทธ๊ฐ ์๊ธธ ๊ฐ๋ฅ์ฑ๋ ๋์์ง๋ค. 

<br>

- ์ฝ๋๋ฅผ ์์ ํ  ๋ ๋จผ์  ํ๋ก๊ทธ๋จ์ ์๋ ๋ฐฉ์์ ๋ ์ฝ๊ฒ ํ์ํ  ์ ์๋๋ก ์ฝ๋๋ฅผ ์ฌ๋ฌ ํจ์์ ํ๋ก๊ทธ๋จ ์์๋ก ์ฌ๊ตฌ์ฑํ๋ค. 
- ํ๋ก๊ทธ๋จ์ ๊ตฌ์กฐ๊ฐ ๋น์ฝํ๋ค๋ฉด ๋์ฒด๋ก ๊ตฌ์กฐ๋ถํฐ ๋ฐ๋ก์ก์ ๋ค์ ๊ธฐ๋ฅ์ ์์ ํ๋ ํธ์ด ์์ํ๊ธฐ๊ฐ ํจ์ฌ ์์ํ๋ค.

> ํ๋ก๊ทธ๋จ์ด ์๋ก์ด ๊ธฐ๋ฅ์ ์ถ๊ฐํ๊ธฐ์ ํธํ ๊ตฌ์กฐ๊ฐ ์๋๋ผ๋ฉด, ๋จผ์  ๊ธฐ๋ฅ์ ์ถ๊ฐํ๊ธฐ ์ฌ์ด ํํ๋ก ๋ฆฌํฉํฐ๋งํ๊ณ  ๋์ ์ํ๋ ๊ธฐ๋ฅ์ ์ถ๊ฐํ๋ค. 

<br>

- ์ค๋ ์ฌ์ฉํ  ํ๋ก๊ทธ๋จ์ด๋ผ๋ฉด ์ค๋ณต ์ฝ๋๋ ๊ณจ์นซ๊ฑฐ๋ฆฌ๊ฐ ๋๋ค. 
- ๋ฆฌํํฐ๋ง์ด ํ์ํ ์ด์ ๋ ๋ณ๊ฒฝ ๋๋ฌธ์ด๋ค. ์ ์๋ํ๊ณ  ๋์ค์ ๋ณ๊ฒฝํ  ์ผ์ด ์ ๋ ์๋ค๋ฉด ์ฝ๋๋ฅผ ํ๋ ์ํ๋ก ๋๋ฌ๋ ์๋ฌด๋ฐ ๋ฌธ์ ๊ฐ ์๋ค. ํ์ง๋ง ๋ค๋ฅธ ์ฌ๋์ด ์ฝ๊ณ  ์ดํดํด์ผ ํ  ์ผ์ด ์๊ฒผ๋๋ฐ ๋ก์ง์ ํ์ํ๊ธฐ ์ด๋ ต๋ค๋ฉด ๋์ฑ์ ๋ง๋ จํด์ผ ํ๋ค. 

<br>

### ๐ 3 ์์ ํ๋ก๊ทธ๋จ์ ๋ณธ ์๊ฐ

<br>

- ์ฒซ ๋จ๊ณ๋ ๋ฆฌํํฐ๋งํ  ์ฝ๋ ์์ญ์ ๊ผผ๊ผผํ๊ฒ ๊ฒ์ฌํด์ค ํ์คํธ ์ฝ๋๋ค๋ถํฐ ๋ง๋ จํด์ผ ํ๋ค.
- ๋ฆฌํฉํฐ๋ง์์ ํ์คํธ์ ์ญํ ์ ๊ต์ฅํ ์ค์ํ๋ค. 
  - ๋ฆฌํํฐ๋ง ๊ธฐ๋ฒ๋ค์ด ๋ฒ๊ทธ ๋ฐ์ ์ฌ์ง๋ฅผ ์ต์ํํ๋๋ก ๊ตฌ์ฑ๋๋ค๊ณ ๋ ํ๋ ํ๋ก๊ทธ๋จ์ด ํด์๋ก ์์  ๊ณผ์ ์์ ์์์น ๋ชปํ ๋ฌธ์ ๊ฐ ๋ฐ์ํ  ๊ฐ๋ฅ์ฑ์ด ํฌ๋ค. 

<br>

- ์ฌ๊ธฐ์ ์ค์ํ ๋ถ๋ถ์ ํ์คํธ ๊ฒฐ๊ณผ๋ฅผ ๋ณด๊ณ ํ๋ ๋ฐฉ์์ด๋ค. 
- ์ถ๋ ฅ๋ ๋ฌธ์์ด์ด ์ ๋ต ๋ฌธ์์ด๊ณผ ๋๊ฐ๋ค๋ฉด ํ์คํธ๋ฅผ ํต๊ณผํ๋ค๋ ์๋ฏธ์ ์ด๋ก๋ถ์ ์ผ๊ณ , ์กฐ๊ธ์ด๋ผ๋ ๋ค๋ฅด๋ฉด ์คํจ๋ฅผ ๋ปํ๋ ๋นจ๊ฐ๋ถ์ ์ผ ๋ค. 
- ์ฆ, ์ฑ๊ณต/์คํจ๋ฅผ ์ค์ค๋ก ํ๋จํ๋ ์๊ฐ์ง๋จ ํ์คํธ๋ก ๋ง๋ ๋ค.
- ์ต์  ํ์คํธ ํ๋ ์์ํฌ๋ ์๊ฐ์ง๋จ ํ์คํธ๋ฅผ ์์ฑํ๊ณ  ์คํํ๋๋ฐ ํ์ํ ๋ชจ๋  ๊ธฐ๋ฅ์ ์ ๊ณตํ๋ค. 

<br>

> ๋ฆฌํํฐ๋งํ๊ธฐ ์ ์ ์ ๋๋ก ๋ ํ์คํธ๋ถํฐ ๋ง๋ จํ๋ค. ํ์คํธ๋ ๋ฐ๋์ ์๊ฐ์ง๋จํ๋๋ก ๋ง๋ ๋ค. 

- ํ์คํธ๋ ๋ด๊ฐ ์ ์ง๋ฅธ ์ค์๋ก๋ถํฐ ๋ณดํธํด์ฃผ๋ ๋ฒ๊ทธ ๊ฒ์ถ๊ธฐ ์ญํ ์ ํด์ค๋ค. 
- ์ํ๋ ๋ด์ฉ์ ์์ค ์ฝ๋์ ํ์คํธ ์ฝ๋ ์์ชฝ์ ์ ์ด๋๋ฉด, ๋ ๋ฒ ๋ค ๋๊ฐ์ด ์ค์ํ์ง ์๋ ํ ๋ฒ๊ทธ ๊ฒ์ถ๊ธฐ์ ๋ฐ๋์ ๊ฑธ๋ฆฐ๋ค. 
- ์ด์ ๊ฐ์ ์ค๋ณต ๊ฒ์ฌ๋ก ์ค์ ๊ฐ๋ฅ์ฑ์ ํฌ๊ฒ ์ค์ผ ์ ์๋ค. 
- ํ์คํธ๋ฅผ ์์ฑํ๋ ๋ฐ ์๊ฐ์ด ์ข ๊ฑธ๋ฆฌ์ง๋ง, ์ ๊ฒฝ ์จ์ ๋ง๋ค์ด๋๋ฉด ๋๋ฒ๊น ์๊ฐ์ด ์ค์ด์ ์ ์ฒด ์์ ์๊ฐ์ ์คํ๋ ค ๋จ์ถ๋๋ค. 

<br>

### ๐ 4 statement() ํจ์ ์ชผ๊ฐ๊ธฐ 

<br>

- ๊ธด ํจ์๋ฅผ ๋ฆฌํํฐ๋งํ  ๋๋ ๋จผ์  ์ ์ฒด ๋์์ ๊ฐ๊ฐ์ ๋ถ๋ถ์ผ๋ก ๋๋ ์ ์๋ ์ง์ ์ ์ฐพ๋๋ค. 
- ์ฝ๋ ์กฐ๊ฐ์ ๋ณ๋ ํจ์๋ก ์ถ์ถํ๋ ๋ฐฉ์์ผ๋ก ์์ ํ์ํ ์ ๋ณด๋ฅผ ์ฝ๋์ ๋ฐ์ํ  ๊ฒ์ด๋ค. 
- ์ถ์ถํ ํจ์์๋ ๊ทธ ์ฝ๋๊ฐ ํ๋ ์ผ์ ์ค๋ชํ๋ ์ด๋ฆ์ ์ง์ด์ค๋ค. 

<br>

- ๋ณ๋ ํจ์๋ก ๋นผ๋์ ๋ ์ ํจ๋ฒ์๋ฅผ ๋ฒ์ด๋๋ ๋ณ์, ์ฆ ์ ํจ์์์๋ ๊ณง๋ฐ๋ก ์ฌ์ฉํ  ์ ์๋ ๋ณ์๊ฐ ์๋์ง ํ์ธํ๋ค. 

```js
function amountFor(perf, play) {
  let thisAmount = 0;
  switch (paly.type) {
    case "tragedy": // ๋น๊ทน
      thisAmount = 40000;
      if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30);
      }
      break;
    case "comedy":  // ํฌ๊ทน
      thisAmount = 30000;
      if (perf.audience > 20) {
        thisAmount += 10000 + 500 * (perf.audience - 20);
      }
      thisAmount += 300 * perf.audience;
      break;
    default:
      throw new Error(`์ ์ ์๋ ์ฅ๋ฅด: ${play.type}`);
  }
  return thisAmount;
}
```
- `statement()` ํจ์์์ ๋ฐ์ทํ ํจ์ 
- `statement()`์์๋ `thisAmount` ๊ฐ์ ์ฑ์ธ ๋ ๋ฐฉ๊ธ ์ถ์ถํ `amountFor()` ํจ์๋ฅผ ํธ์ถํ๋ค. 

```js
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `์ฒญ๊ตฌ ๋ด์ญ (๊ณ ๊ฐ๋ช: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2}).format;
  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    let thisAmount = amountFor(perf, play);
    // ํฌ์ธํธ๋ฅผ ์ ๋ฆฝํ๋ค. 
    volumeCredits += Math.max(perf.audience - 30, 0);
    // ํฌ๊ทน ๊ด๊ฐ 5๋ช๋ง๋ค ์ถ๊ฐ ํฌ์ธํธ๋ฅผ ์ ๊ณตํ๋ค. 
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

    // ์ฒญ๊ตฌ ๋ด์ญ์ ์ถ๋ ฅํ๋ค. 
    result += `${play.name}: ${format(thisAmount/100)} (${perf.audience}์)\n`;
    totalAmount += thisAmount;
  }
  result += `์ด์ก: ${format(totalAmount/100)}\n`;
  result += `์ ๋ฆฝ ํฌ์ธํธ: ${volumeCredits}์ \n`;
  return result;
}
```
- ์์ ํ๊ณ  ๋๋ฉด ๊ณง๋ฐ๋ก ์ปดํ์ผํ๊ณ  ํ์คํธํด์ ์ค์ํ ๊ฒ ์๋์ง ํ์ธํ๋ค. 
- ์๋ฌด๋ฆฌ ๊ฐ๋จํ ์์ ์ด๋ผ๋ ๋ฆฌํฉํฐ๋ง ํ์๋ ํญ์ ํ์คํธํ๋ ์ต๊ด์ ๋ค์ด๋ ๊ฒ์ด ๋ฐ๋์งํ๋ค.
- ํ ๊ฐ์ง๋ฅผ ์์ ํ  ๋๋ง๋ค ํ์คํธํ๋ฉด, ์ค๋ฅ๊ฐ ์๊ธฐ๋๋ผ๋ ๋ณ๊ฒฝ ํญ์ด ์๊ธฐ ๋๋ฌธ์ ์ดํด๋ณผ ๋ฒ์๋ ์ข์์ ๋ฌธ์ ๋ฅผ ์ฐพ๊ณ  ํด๊ฒฐํ๊ธฐ๊ฐ ํจ์ฌ ์ฝ๋ค. 
- ์กฐ๊ธ์ฉ ๋ณ๊ฒฝํ๊ณ  ๋งค๋ฒ ํ์คํธํ๋ ๊ฒ์ ๋ฆฌํฉํฐ๋ง ์ ์ฐจ์ ํต์ฌ์ด๋ค. 
- ํ ๋ฒ์ ๋๋ฌด ๋ง์ด ์์ ํ๋ ค๋ค ์ค์๋ฅผ ์ ์ง๋ฅด๋ฉด ๋๋ฒ๊นํ๊ธฐ ์ด๋ ค์์ ๊ฒฐ๊ณผ์ ์ผ๋ก ์์ ์๊ฐ์ด ๋์ด๋๋ค.
- ์กฐ๊ธ์ฉ ์์ ํ์ฌ ํผ๋๋ฐฑ ์ฃผ๊ธฐ๋ฅผ ์งง๊ฒ ๊ฐ์ ธ๊ฐ๋ ์ต๊ด์ด ์ด๋ฌํ ์ฌ์์ ํผํ๋ ๊ธธ์ด๋ค.

> ๋ฆฌํฉํฐ๋ง์ ํ๋ก๊ทธ๋จ ์์ ์ ์์ ๋จ๊ณ๋ก ๋๋  ์งํํ๋ค. ๊ทธ๋์ ์ค๊ฐ์ ์ค์ํ๋๋ผ๋ ๋ฒ๊ทธ๋ฅผ ์ฝ๊ฒ ์ฐพ์ ์ ์๋ค.

- ํ๋์ ๋ฆฌํฉํฐ๋ง์ ๋ฌธ์ ์์ด ๋๋ผ ๋๋ง๋ค ์ปค๋ฐํ๋ค. ๊ทธ๋์ผ ์ค๊ฐ์ ๋ฌธ์ ๊ฐ ์๊ธฐ๋๋ผ๋ ์ด์ ์ ์ ์ ์ํ๋ก ์ฝ๊ฒ ๋์๊ฐ ์ ์๋ค. 
- ์ด๋ ๊ฒ ์์ํ ๋ณ๊ฒฝ๋ค์ด ์ด๋์ ๋ ์๋ฏธ ์๋ ๋จ์๋ก ๋ญ์ณ์ง๋ฉด ๊ณต์  ์ ์ฅ์๋ก ํธ์(push)ํ๋ค. 

<br>

- ํจ์๋ฅผ ์ถ์ถํ๊ณ  ๋๋ฉด ์ถ์ถ๋ ํจ์ ์ฝ๋๋ฅผ ์์ธํ ๋ค์ฌ๋ค๋ณด๋ฉด์ ์ง๊ธ๋ณด๋ค ๋ชํํ๊ฒ ํํํ  ์ ์๋ ๊ฐ๋จํ ๋ฐฉ๋ฒ์ ์๋์ง ๊ฒํ ํ๋ค. 
- ๊ฐ์ฅ ๋จผ์  ๋ณ์์ ์ด๋ฆ์ ๋ ๋ชํํ๊ฒ ๋ฐ๊ฟ๋ณด์. 

```js
function amountFor(perf, play) {
  let result = 0; // ๋ชํํ ์ด๋ฆ์ผ๋ก ๋ณ๊ฒฝ
  switch (play.type) {
    case "tragedy": // ๋น๊ทน
      result = 40000;
      if (perf.audience > 30) {
        result += 1000 * (perf.audience - 30);
      }
      break;
    case "comedy":  // ํฌ๊ทน
      result = 30000;
      if (perf.audience > 20){
        result += 10000 + 500* (perf.audience - 20);
      }
      result += 300 * perf.audience;
      break;
    default:
      throw new Error(`์ ์ ์๋ ์ฅ๋ฅด: ${play.type}`);
  }
  return result;
}
```
- ์ ์๋ ํจ์์ ๋ฐํ ๊ฐ์๋ ํญ์ **result**๋ผ๋ ์ด๋ฆ์ ์ด๋ค. ๊ทธ๋ฌ๋ฉด ๊ทธ ๋ณ์์ ์ญํ ์ ์ฝ๊ฒ ์ ์ ์๋ค. 

```js
function amountFor(aPerformance, play) {  // ๋ชํํ ์ด๋ฆ์ผ๋ก ๋ณ๊ฒฝ
  let result = 0;
  switch (play.type) {
    case "tragedy": // ๋น๊ทน
      result = 40000;
      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30);
      }
      break;
    case "comedy":  // ํฌ๊ทน
      result = 30000;
      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20);
      }
      result += 300 * aPerformance.audience;
      break;
    default:
      throw new Error(`์ ์ ์๋ ์ฅ๋ฅด: ${play.type}`);
  }
  return result;
}
```
- ์๋ฐ์คํฌ๋ฆฝ์ ๊ฐ์ ๋์  ํ์ ์ธ์ด๋ฅผ ์ฌ์ฉํ  ๋๋ ํ์์ด ๋๋ฌ๋๊ฒ ์์ฑํ๋ฉด ๋์๋๋ค. 
- ๋งค๊ฐ๋ณ์ ์ด๋ฆ์ ์ ๋์ด๋ก ํ์ ์ด๋ฆ์ ์ ๋๋ฐ, ์ง๊ธ์ฒ๋ผ ๋งค๊ฐ๋ณ์์ ์ญํ ์ด ๋๋ ทํ์ง ์์ ๋๋ ๋ถ์  ๊ด์ฌ(a/an)๋ฅผ ๋ถ์ธ๋ค.

> ์ปดํจํฐ๊ฐ ์ดํดํ๋ ์ฝ๋๋ ๋ฐ๋ณด๋ ์์ฑํ  ์ ์๋ค. ์ฌ๋์ด ์ดํดํ๋๋ก ์์ฑํ๋ ํ๋ก๊ทธ๋๋จธ๊ฐ ์ง์ ํ ์ค๋ ฅ์๋ค.

- ์ข์ ์ฝ๋๋ผ๋ฉด ํ๋ ์ผ์ด ๋ชํํ ๋๋ฌ๋์ผํ๋ฉฐ, ์ด๋ ๋ณ์ ์ด๋ฆ์ ์ปค๋ค๋ ์ญํ ์ ํ๋ค. 
- ๋ชํ์ฑ์ ๋์ด๊ธฐ ์ํ ์ด๋ฆ ๋ฐ๊พธ๊ธฐ์๋ ์กฐ๊ธ๋ ๋ง์ค์ด์ง ๋ง์. 

<br>

##### play ๋ณ์ ์ ๊ฑฐํ๊ธฐ 

- `aPerformance`๋ ๋ฃจํ ๋ณ์์์ ์ค๊ธฐ ๋๋ฌธ์ ๋ฐ๋ณต๋ฌธ์ ํ ๋ฒ ๋ ๋๋ง๋ค ์์ฐ์ค๋  ๊ฐ์ด ๋ณ๊ฒฝ๋๋ค. 
- `play`๋ ๊ฐ๋ณ ๊ณต์ฐ(aPerformance)์์ ์ป๊ธฐ ๋๋ฌธ์ ์ ์ด์ ๋งค๊ฐ๋ณ์๋ก ์ ๋ฌํ  ํ์๊ฐ ์๋ค. `amountFor()` ์์์ ๋ค์ ๊ณ์ฐํ๋ฉด ๋๋ค. 
- ๊ธด ํจ์๋ฅผ ์๊ฒ ์ชผ๊ฐค ๋๋ง๋ค play ๊ฐ์ ๋ณ์๋ฅผ ์ต๋ํ ์ ๊ฑฐํ๋ค. ์ด๋ฐ ์์ ๋ณ์๋ค ๋๋ฌธ์ ๋ก์ปฌ ๋ฒ์์ ์กด์ฌํ๋ ์ด๋ฆ์ด ๋์ด๋๋ ์ถ์ถ ์์์ด ๋ณต์กํด์ง๊ธฐ ๋๋ฌธ์ด๋ค. 
- ์ด๋ฅผ ํด๊ฒฐํด์ฃผ๋ ๋ฆฌํฉํฐ๋ง์ผ๋ก๋ **์์ ๋ณ์๋ฅผ ์ง์ ํจ์๋ก ๋ฐ๊พธ๊ธฐ**๊ฐ ์๋ค. 

1. ๋์๋ฌธ(`=`)์ ์ฐ๋ณ์ ํจ์๋ก ์ถ์ถํ๋ค. 
```js
function playFor(aPerformance) {
  return plays[aPerformance.playID];
}
```
```js
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `์ฒญ๊ตฌ ๋ด์ญ (๊ณ ๊ฐ๋ช: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2}).format;
  for (let perf of invoice.performances) {
    const play = playFor(perf);
    let thisAmount = amountFor(perf, play);

    // ํฌ์ธํธ๋ฅผ ์ ๋ฆฝํ๋ค. 
    volumeCredits += Math.max(perf.audience - 30, 0);
    // ํฌ๊ทน ๊ด๊ฐ 5๋ช๋ง๋ค ์ถ๊ฐ ํฌ์ธํธ๋ฅผ ์ ๊ณตํ๋ค. 
    if ("comedy" === play.type) volumeCredits += Math.floor(perf.audience / 5);

    // ์ฒญ๊ตฌ ๋ด์ญ์ ์ถ๋ ฅํ๋ค. 
    result += ` ${play.name}: ${format(thisAmount/100)} (${perf.audience}์)\n`;
    totalAmount += thisAmount;
  }
  result += `์ด์ก: ${format(totalAmount/100)}\n`;
  result += `์ ๋ฆฝ ํฌ์ธํธ: ${volumeCredits}์ \n`;
  return result;
}
```
- ์ปดํ์ผ-ํ์คํธ-์ปค๋ฐํ ๋ค์ **๋ณ์ ์ธ๋ผ์ธํ๊ธฐ**๋ฅผ ์ ์ฉํ๋ค.

```js
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `์ฒญ๊ตฌ ๋ด์ญ (๊ณ ๊ฐ๋ช: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2}).format;

  for (let perf of invoice.performances) {
    // const play = playFor(perf); // ์ธ๋ผ์ธ๋ ๋ณ์๋ ์ ๊ฑฐ
    let thisAmount = amountFor(perf, playFor(perf));

    // ํฌ์ธํธ๋ฅผ ์ ๋ฆฝํ๋ค. 
    volumeCredits += Math.max(perf.audience - 30, 0);
    // ํฌ๊ทน ๊ด๊ฐ 5๋ช๋ง๋ค ์ถ๊ฐ ํฌ์ธํธ๋ฅผ ์ ๊ณตํ๋ค. 
    if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);

    // ์ฒญ๊ตฌ ๋ด์ญ์ ์ถ๋ ฅํ๋ค. 
    result += ` ${playFor(perf).name}: ${format(thisAmount/100)} (${perf.audience}์)\n`;
    totalAmount += thisAmount;
  }
  result += `์ด์ก: ${format(totalAmount/100)}\n`;
  result += `์ ๋ฆฝ ํฌ์ธํธ: ${volumeCredits}์ \n`;
  return result;
}
```
- ๋ณ์๋ฅผ ์ธ๋ผ์ธํ ๋๋ถ์ `amountFor()`์ **ํจ์ ์ ์ธ ๋ฐ๊พธ๊ธฐ**๋ฅผ ์ ์ฉํด์ **play** ๋งค๊ฐ๋ณ์๋ฅผ ์ ๊ฑฐํ  ์ ์๊ฒ ๋์๋ค. 

```js
function amountFor(aPerformance, play) { 
  let result = 0;
  switch (playFor(aPerformance).type) {
    case "tragedy": // ๋น๊ทน
      result = 40000;
      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30);
      }
      break;
    case "comedy":  // ํฌ๊ทน
      result = 30000;
      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20);
      }
      result += 300 * aPerformance.audience;
      break;
    default:
      throw new Error(`์ ์ ์๋ ์ฅ๋ฅด: ${playFor(aPerformance).type}`);  // play๋ฅผ playFor() ํธ์ถ๋ก ๋ณ๊ฒฝ
  }
  return result;
}
```
- play ๋งค๊ฐ๋ณ์๋ฅผ ์ญ์  

```js
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `์ฒญ๊ตฌ ๋ด์ญ (๊ณ ๊ฐ๋ช: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US", {style: "currency", currency: "USD", minimumFractionDigits: 2}).format;

  for (let perf of invoice.performances) {
    // const play = playFor(perf); // ์ธ๋ผ์ธ๋ ๋ณ์๋ ์ ๊ฑฐ
    let thisAmount = amountFor(perf);   // ํ์ ์์ด์ง ๋งค๊ฐ๋ณ์ ์ ๊ฑฐ

    // ํฌ์ธํธ๋ฅผ ์ ๋ฆฝํ๋ค. 
    volumeCredits += Math.max(perf.audience - 30, 0);
    // ํฌ๊ทน ๊ด๊ฐ 5๋ช๋ง๋ค ์ถ๊ฐ ํฌ์ธํธ๋ฅผ ์ ๊ณตํ๋ค. 
    if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);

    // ์ฒญ๊ตฌ ๋ด์ญ์ ์ถ๋ ฅํ๋ค. 
    result += ` ${playFor(perf).name}: ${format(thisAmount/100)} (${perf.audience}์)\n`;
    totalAmount += thisAmount;
  }
  result += `์ด์ก: ${format(totalAmount/100)}\n`;
  result += `์ ๋ฆฝ ํฌ์ธํธ: ${volumeCredits}์ \n`;
  return result;
}
```

```js
function amountFor(aPerformance) {    // ํ์ ์์ด์ง ๋งค๊ฐ๋ณ์ ์ ๊ฑฐ
  let result = 0;
  switch (playFor(aPerformance).type) {
    case "tragedy": // ๋น๊ทน
      result = 40000;
      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30);
      }
      break;
    case "comedy":  // ํฌ๊ทน
      result = 30000;
      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20);
      }
      result += 300 * aPerformance.audience;
      break;
    default:
      throw new Error(`์ ์ ์๋ ์ฅ๋ฅด: ${playFor(aPerformance).type}`);  // play๋ฅผ playFor() ํธ์ถ๋ก ๋ณ๊ฒฝ
  }
  return result;
}
```
- ์ ๋๋ก ๋ฆฌํฉํฐ๋ง๋ ์ฝ๋๋ฒ ์ด์ค๋ ๊ทธ๋ ์ง ์์ ์ฝ๋๋ณด๋ค ์ฑ๋ฅ์ ๊ฐ์ ํ๊ธฐ๊ฐ ํจ์ฌ ์์ํ๋ค
- ์ง์ญ ๋ณ์๋ฅผ ์ ๊ฑฐํด์ ์ป๋ ๊ฐ์ฅ ํฐ ์ฅ์ ์ ์ถ์ถ ์์์ด ํจ์ฌ ์ฌ์์ง๋ค๋ ๊ฒ์ด๋ค. ์ ํจ๋ฒ์๋ฅผ ์ ๊ฒฝ ์จ์ผ ํ  ๋์์ด ์ค์ด๋ค๊ธฐ ๋๋ฌธ์ด๋ค. 

```js
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `์ฒญ๊ตฌ ๋ด์ญ (๊ณ ๊ฐ๋ช: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2}).format;

  for (let perf of invoice.performances) {

    // ํฌ์ธํธ๋ฅผ ์ ๋ฆฝํ๋ค. 
    volumeCredits += Math.max(perf.audience - 30, 0);
    // ํฌ๊ทน ๊ด๊ฐ 5๋ช๋ง๋ค ์ถ๊ฐ ํฌ์ธํธ๋ฅผ ์ ๊ณตํ๋ค. 
    if ("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience / 5);

    // ์ฒญ๊ตฌ ๋ด์ญ์ ์ถ๋ ฅํ๋ค. 
    result += ` ${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience}์)\n`;
    totalAmount += amountFor(perf);
  }
  result += `์ด์ก: ${format(totalAmount/100)}\n`;
  result += `์ ๋ฆฝ ํฌ์ธํธ: ${volumeCredits}์ \n`;
  return result;
}
```

<br>

##### ์ ๋ฆฝ ํฌ์ธํธ ๊ณ์ฐ ์ฝ๋ ์ถ์ถํ๊ธฐ 

- ์์์ **play** ๋ณ์๋ฅผ ์ ๊ฑฐํ ๊ฒฐ๊ณผ ๋ก์ปฌ ์ ํจ๋ฒ์์ ๋ณ์๊ฐ ํ๋ ์ค์ด์ ์ ๋ฆฝ ํฌ์ธํธ ๊ณ์ฐ ๋ถ๋ถ์ ์ถ์ถํ๊ธฐ๊ฐ ํจ์ฌ ์ฌ์์ก๋ค.

```js
// ์๋ก ์ถ์ถํ ํจ์
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
  let result = `์ฒญ๊ตฌ ๋ด์ญ (๊ณ ๊ฐ๋ช: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2}).format;

  for (let perf of invoice.performances) {
    // ํฌ์ธํธ๋ฅผ ์ ๋ฆฝํ๋ค. ์ถ์ถํ ํจ์๋ฅผ ์ด์ฉํด ๊ฐ์ ๋์ 
    volumeCredits += volumeCredits(perf);

    // ์ฒญ๊ตฌ ๋ด์ญ์ ์ถ๋ ฅํ๋ค. 
    result += ` ${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience}์)\n`;
    totalAmount += amountFor(perf);
  }
  result += `์ด์ก: ${format(totalAmount/100)}\n`;
  result += `์ ๋ฆฝ ํฌ์ธํธ: ${volumeCredits}์ \n`;
  return result;
}
```
- ์๋ก ์ถ์ถํ ํจ์์์ ์ฐ์ด๋ ๋ณ์๋ค ์ด๋ฆ์ ์ ์ ํ ๋ฐ๊พผ๋ค.

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

##### format ๋ณ์ ์ ๊ฑฐํ๊ธฐ

- ์์ ๋ณ์๋ ๋์ค์ ๋ฌธ์ ๋ฅผ ์ผ์ผํฌ ์ ์๋ค. 
- ์์ ๋ณ์๋ ์์ ์ด ์ํ ๋ฃจํด์์๋ง ์๋ฏธ๊ฐ ์์ด์ ๋ฃจํด์ด ๊ธธ๊ณ  ๋ณต์กํด์ง๊ธฐ ์ฝ๋ค. 

```js
function format(aNumber) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2}).format(aNumber);
}
```

```js
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `์ฒญ๊ตฌ ๋ด์ญ (๊ณ ๊ฐ๋ช: ${invoice.customer})\n`;
  for (let perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf);

    // ์ฒญ๊ตฌ ๋ด์ญ์ ์ถ๋ ฅํ๋ค. 
    result += ` ${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience}์)\n`;
    totalAmount += amountFor(perf);
  }
  result += `์ด์ก: ${format(totalAmount/100)}\n`;   // ์์ ๋ณ์์๋ format์ ํจ์ ํธ์ถ๋ก ๋์ฒด
  result += `์ ๋ฆฝ ํฌ์ธํธ: ${volumeCredits}์ \n`;
  return result;
}
```
- ์ด๋ฆ์ง๊ธฐ๋ ์ค์ํ๋ฉด์๋ ์ฝ์ง ์์ ์์์ด๋ค. 
- ๊ธด ํจ์๋ฅผ ์๊ฒ ์ชผ๊ฐ๋ ๋ฆฌํฉํฐ๋ง์ ์ด๋ฆ์ ์ ์ง์ด์ผ๋ง ํจ๊ณผ๊ฐ ์๋ค. 
- ๋ณธ๋ฌธ์ ์ฝ์ง ์๊ณ ๋ ๋ฌด์จ ์ผ์ ํ๋์ง ์ ์ ์์ด์ผ ํ๋ค. ๋์ค์ ์ข์ ์ด๋ฆ์ด ๋ ์ค๋ฅผ ๋ ๋ฐ๊พธ๋ ์์ด ์ข๋ค. 

```js
function usd(aNumber) {   // ํจ์ ์ด๋ฆ ๋ณ๊ฒฝ format -> usd
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2}).format(aNumber/100);
}
```

```js
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `์ฒญ๊ตฌ ๋ด์ญ (๊ณ ๊ฐ๋ช: ${invoice.customer})\n`;
  for (let perf of invoice.performances) {
    volumeCredits += volumeCreditsFor(perf);

    // ์ฒญ๊ตฌ ๋ด์ญ์ ์ถ๋ ฅํ๋ค. 
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}์)\n`;
    totalAmount += amountFor(perf);
  }
  result += `์ด์ก: ${usd(totalAmount)}\n`;   // ์์ ๋ณ์์๋ format์ ํจ์ ํธ์ถ๋ก ๋์ฒด
  result += `์ ๋ฆฝ ํฌ์ธํธ: ${volumeCredits}์ \n`;
  return result;
}
```
- ์ด๋ฆ์ ๋ฐ๊ฟ ๋, ์ฌ๋ฌ ์ฐจ๋ก ๋ฑ์ฅํ๋ 100์ผ๋ก ๋๋๋ ์ฝ๋๋ ์ถ์ถํ ํจ์๋ก ์ฎ๊ฒผ๋ค. ํ๋ฉด์ ์ถ๋ ฅํ  ๋๋ ๋ค์ ๋ฌ๋ฌ ๋จ์๋ก ๋ณํํด์ผ ํ๋ฏ๋ก ํฌ๋งท ๋ณํ ํจ์์ธ `usd()`์์ ๋๋์๊น์ง ์ฒ๋ฆฌํด์ฃผ๋ฉด ์ข๋ค. 

<br>

##### volumeCredits ๋ณ์ ์ ๊ฑฐํ๊ธฐ 

- **๋ฐ๋ณต๋ฌธ ์ชผ๊ฐ๊ธฐ**๋ก `volumeCredits` ๊ฐ์ด ๋์ ๋๋ ๋ถ๋ถ์ ๋ฐ๋ก ๋นผ๋ธ๋ค. 

```js
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `์ฒญ๊ตฌ ๋ด์ญ (๊ณ ๊ฐ๋ช: ${invoice.customer})\n`;
  
  for (let perf of invoice.performances) {
    // ์ฒญ๊ตฌ ๋ด์ญ์ ์ถ๋ ฅํ๋ค. 
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}์)\n`;
    totalAmount += amountFor(perf);
  }
  for (let perf of invoice.performances) {    // ๊ฐ ๋์  ๋ก์ง์ ๋ณ๋ for ๋ฌธ์ผ๋ก ๋ถ๋ฆฌ
    volumeCredits += volumeCreditsFor(perf);
  }
  result += `์ด์ก: ${usd(totalAmount)}\n`;   // ์์ ๋ณ์์๋ format์ ํจ์ ํธ์ถ๋ก ๋์ฒด
  result += `์ ๋ฆฝ ํฌ์ธํธ: ${volumeCredits}์ \n`;
  return result;
}
```

- **๋ฌธ์ฅ ์ฌ๋ผ์ด๋ํ๊ธฐ**๋ฅผ ์ ์ฉํด์ `volumeCredits` ๋ณ์๋ฅผ ์ ์ธํ๋ ๋ฌธ์ฅ์ ๋ฐ๋ณต๋ฌธ ๋ฐ๋ก ์์ผ๋ก ์ฎ๊ธด๋ค. 

```js
function statement(invoice, plays) {
  let totalAmount = 0;
  let result = `์ฒญ๊ตฌ ๋ด์ญ (๊ณ ๊ฐ๋ช: ${invoice.customer})\n`;
  
  for (let perf of invoice.performances) {
    // ์ฒญ๊ตฌ ๋ด์ญ์ ์ถ๋ ฅํ๋ค. 
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}์)\n`;
    totalAmount += amountFor(perf);
  }
  let volumeCredits = 0;                      // ๋ณ์ ์ ์ธ(์ด๊ธฐํ)์ ๋ฐ๋ณต๋ฌธ ์์ผ๋ก ์ด๋
  for (let perf of invoice.performances) {    
    volumeCredits += volumeCreditsFor(perf);
  }
  result += `์ด์ก: ${usd(totalAmount)}\n`; 
  result += `์ ๋ฆฝ ํฌ์ธํธ: ${volumeCredits}์ \n`;
  return result;
}
```
- `volumeCredits` ๊ฐ ๊ฐฑ์ ๊ณผ ๊ด๋ จํ ๋ฌธ์ฅ๋ค์ ํ๋ฐ ๋ชจ์๋๋ฉด **์์ ๋ณ์๋ฅผ ์ง์ ํจ์๋ก ๋ฐ๊พธ๊ธฐ**๊ฐ ์์ํด์ง๋ค. 

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
  let result = `์ฒญ๊ตฌ ๋ด์ญ (๊ณ ๊ฐ๋ช: ${invoice.customer})\n`;
  
  for (let perf of invoice.performances) {
    // ์ฒญ๊ตฌ ๋ด์ญ์ ์ถ๋ ฅํ๋ค. 
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}์)\n`;
    totalAmount += amountFor(perf);
  }
  let volumeCredits = totalVolumeCredits();       // ๊ฐ ๊ณ์ฐ ๋ก์ง์ ํจ์๋ก ์ถ์ถ
  result += `์ด์ก: ${usd(totalAmount)}\n`; 
  result += `์ ๋ฆฝ ํฌ์ธํธ: ${volumeCredits}์ \n`;
  return result;
}
```
- ํจ์ ์ถ์ถ์ด ๋๋ฌ๋ค๋ฉด, `volumeCredits` **๋ณ์๋ฅผ ์ธ๋ผ์ธ**ํ  ์ฐจ๋ก

```js
function statement(invoice, plays) {
  let totalAmount = 0;
  let result = `์ฒญ๊ตฌ ๋ด์ญ (๊ณ ๊ฐ๋ช: ${invoice.customer})\n`;
  
  for (let perf of invoice.performances) {
    // ์ฒญ๊ตฌ ๋ด์ญ์ ์ถ๋ ฅํ๋ค. 
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}์)\n`;
    totalAmount += amountFor(perf);
  }
  result += `์ด์ก: ${usd(totalAmount)}\n`;    // ๋ณ์ ์ธ๋ผ์ธ
  result += `์ ๋ฆฝ ํฌ์ธํธ: ${totalVolumeCredits()}์ \n`;
  return result;
}
```
- ๋๋ก๋ ๋ฆฌํฉํฐ๋ง์ด ์ฑ๋ฅ์ ์๋นํ ์ํฅ์ ์ฃผ๊ธฐ๋ ํ๋ค. ๊ทธ๋ผ์๋ ๊ฐ์์น ์๊ณ  ๋ฆฌํฉํฐ๋งํ๋ค. 
- ์ ๋ค๋ฌ์ด์ง ์ฝ๋๋ผ์ผ ์ฑ๋ฅ ๊ฐ์  ์์๋ ํจ์ฌ ์์ํ๊ธฐ ๋๋ฌธ์ด๋ค. 
- ๋ฆฌํฉํฐ๋ง ๊ณผ์ ์์ ์ฑ๋ฅ์ด ํฌ๊ฒ ๋จ์ด์ก๋ค๋ฉด ๋ฆฌํฉํฐ๋ง ํ ์๊ฐ์ ๋ด์ด ์ฑ๋ฅ์ ๊ฐ์ ํ๋ค. 
  - ๋ฆฌํฉํฐ๋ง๋ ์ฝ๋๋ฅผ ์์ ์ผ๋ก ๋๋๋ฆฌ๋ ๊ฒฝ์ฐ๋ ์๋ค. 
  - ๋์ฒด๋ก ๋ฆฌํฉํฐ๋ง ๋๋ถ์ ์ฑ๋ฅ ๊ฐ์ ์ ๋ ํจ๊ณผ์ ์ผ๋ก ์ํํ  ์ ์๋ค. 
- ๊ฒฐ๊ณผ์ ์ผ๋ก ๋ ๊น๋ํ๋ฉด์ ๋ ๋น ๋ฅธ ์ฝ๋๋ฅผ ์ป๊ฒ ๋๋ค. 

- ๋ฐ๋ผ์ ๋ฆฌํฉํฐ๋ง์ผ๋ก ์ธํ ์ฑ๋ฅ ๋ฌธ์ ์ ๋ํด **ํน๋ณํ ๊ฒฝ์ฐ๊ฐ ์๋๋ผ๋ฉด ์ผ๋จ ๋ฌด์ํ๋ผ**.
- ๋ฆฌํฉํฐ๋ง ๋๋ฌธ์ ์ฑ๋ฅ์ด ๋จ์ด์ง๋ค๋ฉด, ํ๋ ๋ฆฌํฉํฐ๋ง์ ๋ง๋ฌด๋ฆฌํ๊ณ  ๋์ ์ฑ๋ฅ์ ๊ฐ์ ํ์. 

<br>

- `volumeCredits` ๋ณ์๋ฅผ ์ ๊ฑฐํ๋ ์์์ ๋จ๊ณ๋ฅผ ์์ฃผ ์๊ฒ ๋๋ด๋ค. 
1. **๋ฐ๋ณต๋ฌธ ์ชผ๊ฐ๊ธฐ**๋ก ๋ณ์ ๊ฐ์ ๋์ ์ํค๋ ๋ถ๋ถ์ ๋ถ๋ฆฌํ๋ค.
2. **๋ฌธ์ฅ ์ฌ๋ผ์ด๋ํ๊ธฐ**๋ก ๋ณ์ ์ด๊ธฐํ ๋ฌธ์ฅ์ ๋ณ์ ๊ฐ ๋์  ์ฝ๋ ๋ฐ๋ก ์์ผ๋ก ์ฎ๊ธด๋ค. 
3. **ํจ์ ์ถ์ถํ๊ธฐ**๋ก ์ ๋ฆฝ ํฌ์ธํธ ๊ณ์ฐ ๋ถ๋ถ์ ๋ณ๋ ํจ์๋ก ์ถ์ถํ๋ค. 
4. **๋ณ์ ์ธ๋ผ์ธํ๊ธฐ**๋ก volumeCredits ๋ณ์๋ฅผ ์ ๊ฑฐํ๋ค. 

- ํญ์ ๋จ๊ณ๋ฅผ ์ด์ฒ๋ผ ์๊ฒ ๋๋๋ ๊ฒ์ ์๋์ง๋ง, ๊ทธ๋๋ ์ํฉ์ด ๋ณต์กํด์ง๋ฉด ๋จ๊ณ๋ฅผ ๋ ์๊ฒ ๋๋๋ ์ผ์ ๊ฐ์ฅ ๋จผ์  ํ๋ค. 
- ํนํ ๋ฆฌํฉํฐ๋ง ์ค๊ฐ์ ํ์คํธ๊ฐ ์คํจํ๊ณ  ์์ธ์ ๋ฐ๋ก ์ฐพ์ง ๋ชปํ๋ฉด ๊ฐ์ฅ ์ต๊ทผ ์ปค๋ฐ์ผ๋ก ๋์๊ฐ์ ํ์คํธ์ ์คํจํ ๋ฆฌํฉํฐ๋ง์ ๋จ๊ณ๋ฅผ ๋ ์๊ฒ ๋๋  ๋ค์ ์๋ํ๋ค. 
- ์ฝ๋๊ฐ ๋ณต์กํ ์๋ก ๋จ๊ณ๋ฅผ ์๊ฒ ๋๋๋ฉด ์์ ์๋๊ฐ ๋นจ๋ผ์ง๋ค. 

<br>

```js
function appleSauce() {
  let totalAmount = 0;
  for (let perf of invoice.performances) {
    totalAmount += amountFor(perf);
  }
  return totalAmount;
}
```
```js
function statement(invoice, plays) {
  let result = `์ฒญ๊ตฌ ๋ด์ญ (๊ณ ๊ฐ๋ช: ${invoice.customer})\n`;
  for (let perf of invoice.performances) {
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}์)\n`;
  }
  let totalAmount = appleSauce();             // ํจ์ ์ถ์ถ & ์์ ์ด๋ฆ ๋ถ์ฌ

  result += `์ด์ก: ${usd(totalAmount)}\n`;    
  result += `์ ๋ฆฝ ํฌ์ธํธ: ${totalVolumeCredits()}์ \n`;
  return result;
}
```

- `totalAmount` ๋ณ์๋ฅผ ์ธ๋ผ์ธํ ๋ค์, ํจ์ ์ด๋ฆ์ ๋ ์๋ฏธ ์๊ฒ ๊ณ ์น๋ค. 

```js
function statement(invoice, plays) {
  let result = `์ฒญ๊ตฌ ๋ด์ญ (๊ณ ๊ฐ๋ช: ${invoice.customer})\n`;
  for (let perf of invoice.performances) {
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}์)\n`;
  }

  result += `์ด์ก: ${usd(totalAmount())}\n`;    // ๋ณ์ ์ธ๋ผ์ธ ํ ํจ์ ์ด๋ฆ ๋ฐ๊พธ๊ธฐ
  result += `์ ๋ฆฝ ํฌ์ธํธ: ${totalVolumeCredits()}์ \n`;
  return result;
}
```
```js
function totalAmount() {
  let totalAmount = 0;
  for (let perf of invoice.performances) {
    totalAmount += amountFor(perf);
  }
  return totalAmount;
}
```

- ์ถ์ถํ ํจ์ ์์์ ์ฐ์ธ ์ด๋ฆ๋ค๋ ๋ณ๊ฒฝ

```js
function totalAmount() {
  let result = 0;     // ๋ณ์ ์ด๋ฆ ๋ฐ๊พธ๊ธฐ
  for (let perf of invoice.performances) {
    result += amountFor(perf);
  }
  return result;
}
function totalVolumeCredits() {
  let result = 0;     // ๋ณ์ ์ด๋ฆ ๋ฐ๊พธ๊ธฐ
  for (let perf of invoice.performances) {
    result += volumeCreditsFor(perf);
  }
  return result;
}
```
<br>

### ๐ 5 ์ค๊ฐ ์ ๊ฒ: ๋๋ฌดํ๋ ์ค์ฒฉ ํจ์ 

<br>

```js
function statement(invoice, plays) {
  let result = `์ฒญ๊ตฌ ๋ด์ญ (๊ณ ๊ฐ๋ช: ${invoice.customer})\n`;
  for (let perf of invoice.performances) {
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience}์)\n`;
  }

  result += `์ด์ก: ${usd(totalAmount())}\n`; 
  result += `์ ๋ฆฝ ํฌ์ธํธ: ${totalVolumeCredits()}์ \n`;
  return result;

  function totalAmount() {
    let result = 0;     
    for (let perf of invoice.performances) {
      result += amountFor(perf);
    }
    return result;
  }
  // ์ฌ๊ธฐ์๋ถํฐ ์ค์ฒฉ ํจ์ ์์
  function totalVolumeCredits() {
    let result = 0;     
    for (let perf of invoice.performances) {
      result += volumeCreditsFor(perf);
    }
    return result;
  }
  function usd(aNumber) { 
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2}).format(aNumber/100);
  }
  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);
    if ("comedy" === playFor(aPerformance).type)
      result += Math.floor(aPerformance.audience / 5);
    return result;
  }
  function playFor(aPerformance) {
    return plays[aPerformance.playID]
  }

  function amountFor(aPerformance) {
    let result = 0;
    switch (playFor(aPerformance).type) {
      case "tragedy" :    // ๋น๊ทน
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy" :    // ๋น๊ทน
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`์ ์ ์๋ ์ฅ๋ฅด: ${playFor(aPerformance).type}`);
    }
    return result;
  } // amountFor() ๋
} // statement() ๋
```

<br>

### ๐ 6 ๊ณ์ฐ ๋จ๊ณ์ ํฌ๋งทํ ๋จ๊ณ ๋ถ๋ฆฌํ๊ธฐ 

<br>

- ํ๋ก๊ทธ๋จ์ ๋ผ๋ฆฌ์ ์ธ ์์๋ฅผ ํ์ํ๊ธฐ ์ฝ๋๋ก ์ฝ๋์ ๊ตฌ์กฐ๋ฅผ ๋ณด๊ฐํ๋ ๋ฐ ์ฃผ์์ ์ ๋๊ณ  ๋ฆฌํฉํฐ๋งํ๋ค. ๋ฆฌํฉํฐ๋ง ์ด๊ธฐ ๋จ๊ณ์์ ํํ ์ํํ๋ ์ผ์ด๋ค. 
- ๋ณต์กํ๊ฒ ์ฝํ ๋ฉ์ด๋ฆฌ๋ฅผ ์๊ฒ ์ชผ๊ฐ๋ ์์์ ์ด๋ฆ์ ์ ์ง๋ ์ผ๋งํผ ์ค์ํ๋ค. 

- 


