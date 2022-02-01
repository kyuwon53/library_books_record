# 📚 자바와 JUnit을 활용한 실용주의 단위 테스트 
## 📖 1부 단위 테스트의 기초 
## 🔎 3장 JUnit 단언 깊게 파기 

`햄크레스트` 라이브러리를 활용하여 JUnit에서 다양한 방법으로 단언을 활용하는 방법을 배우자. 또 예외가 발생하는 테스트를 작성하는 방법도 배우자. 


<br>

### 📍 1. JUnit 단언

Junit에서 단언은 테스트에 넣을 수 있는 정적 메서드 호출이다. 각 단언은 **어떤 조건이 참인지 검증하는 방법**이다. 단언한 조건이 참이 아니면 테스트는 그 자리에서 멈추고 실패(failure)를 보고한다. 
  - JUnit이 테스트를 실행했을 때 예외가 발생하고 잡지 않은 경우에는 오류(error)로 보고된다. 

<br>

#### 🔑 1-1 assertTrue
- 가장 기본적인 단언
  `org.junit.Assert.assertTrue(someBooleanExpression);`
  `import static org.junit.Assert.*;`

- 테스트 이름은 검증하려는 동작에 관한 일반적인 설명이며, 단언도 이 방식으로 작성할 수 있다. 
  - 특정 사례에 해당하는 경우 검증하는 기댓값 또는 명시적으로 지정하는 것이 낫다. 

<br>

#### 🔑 1-2 assertThat 은 명확한 값을 비교 

대부분 단언은 기대하는 값과 반환된 실제 값을 비교한다. 
명시적으로 기대하는 값을 단언한다. 

- `assertThat()` 정적 메서드는 햄크레스트 단언의 예이다. 
- 햄크레스트 단언의 첫 번째 인자는 실제(actual) 표현식, 즉 우리가 검증하고자 하는 값(종종 대상 시스템에 대한 메서드 호출)이다. 
- 두번째 인자는 매처(matcher)이다. 
  - 메처는 실제 값과 표현식의 결과를 비교한다. 
  - 메처는 테스트 가독성을 크게 높여 준다. 
    - 마치 일반 문장처럼 왼쪽에서 오른쪽으로 읽을 수 있다. 
  - `JUnit`이 제공하는 핵심 햄크레스트 메처를 사용하려면 코드에 정적 임포트를 추가해야 한다. 
    ` import static org.hamcrest.CoreMatchers.*;`
- `equalTo` 매처에는 어떤 자바 인스턴스나 기본형 값이라도 넣을 수 있다. 
- `equalTo` 메처는 비교 기준으로 `equals()` 메서드를 사용한다. 
- 자바 기본형은 객체형으로 오토박싱되기 때문에 어떤 타입도 비교할 수 있다. 
- 일반적인 단언보다 햄크레스트 단언이 실패할 경우에 오류 메시지에서 더 많은 정보를 알 수 있다. 

##### 햄크래스트 단언이 실패한 경우 오류 메시지 
```console
java.lang.AssertionError:
Expected: <100>
  but: was <101>
    at org.hamcrest.MatcherAssert.assertThat(MatcherAssert.java:20)
```

##### 일반적인 단언(`assertTrue()`) 오류 메시지 
```console
java.lang.AssertionError
    at org.junit.Assert.fail(Assert.java:86)
```

<br>

#### 🔑 1-3 중요한 햄크레스트 매처 살펴보기 

JUnit에 포함되어 있는 햄크레스트 `CoreMatchers` 클래스는 바로 매처를 시작할 수 있는 매처 모음을 제공한다. 

매처를 몇 개만 사용해도 되지만 더 많은 햄크레스트 매처를 도입할수록 테스트 코드의 표현력은 깊어진다. 

- 자바 배열 혹은 컬렉션 객체를 비교할 때는 `equalTo()` 메서드를 사용하며, 예상한 대로 작동한다. 

- 경우에 따라 `is` 작식자를 추가하여 매처 표현의 가독성을 더 높일 수도 있다. 
- `is`는 단지 넘겨받은 매처를 반환할 뿐(즉, 아무것도 안 함)이다. 
  - 때때로 아무것도 하지 않는 코드가 가독성을 높여 주기도 한다.
- 어떤 것을 부정하는 단언을 만든다면 `not` 매처를 사용한다. 

- `null`이 아닌 값을 자주 검사하는 것은 설계 문제이거나 지나치게 걱정하는 것이다. 
  - 많은 경우에 이러한 검사는 불필요하고 가치가 없다. 
  - ```java
      assertThat(account.getName(), is(notNullValue())); // 유용하지 않음
      assertThat(account.getName(), equalTo("my big fat acct")); 
     ```
    - `account.getName()` 호출이 `null`을 반환한다면 두 번째 단언인 `equalTo("...")`는 테스트를 하지 않는다. 
  - 예외를 던지는 `null` 참조 예외는 테스트 오류가 발생하며 테스트 실패는 발생하지 않는다. 
  - `JUnit`은 발생한 예외를 테스트 코드에서 잡지 않는 경우 오류를 보고한다. 

##### JUnit 팸크레스트 매처를 이용하면 다음 일을 할 수 있다. 
  - 객체 타입을 검사한다. 
  - 두 객체의 참조가 같은 인스턴스인지 검사한다. 
  - 다수의 매처를 결합하여 둘 다 혹은 둘 중에 어떤 것이든 성공하는지 검사한다. 
  - 어떤 컬렉션이 요소를 포함하거나 조건에 부합하는지 검사한다. 
  - 어떤 컬렉션이 아이템 몇 개를 모두 포함하는지 검사한다. 
  - 어떤 컬렉션에 있는 모든 요소가 매처를 준수하는지 검사한다. 

- 자세한 내용은 (햄크레스트 API 문서)[http://hamcrest.org/JavaHamcrest/javadoc/1.3/org/hamcrest/CoreMatchers.html]를 참고 

<br>

#### 🔑 1-4 부동소수점 수를 두 개 비교 

컴퓨터는 모든 부동소수점 수를 표현할 수 없다. 자바에서 부동소수점 타입(float과 double)의 어떤 수들은 근사치로 구해야 한다. 

```java
assertThat(2.31 * 3, equalTo(6.96));
```
```console.log
java.lang.AssertionError:
Expected: <6.96>
  but: was <6.9599999999999999>
```

두개의 float 혹은 double 양을 비교할 때는 두 수가 벌어질 수 있는 공차 또는 허용 오차를 지정해야 한다. 

```java
assertTrue(Math.abs((2.32 * 3) - 6.96) < 0.0005);
```
이 단언은 잘 읽히지 않는다. 실패 메시지 또한 내용을 파악하기 어렵다. 

- `isCloseTo`라는 햄크레스트 매처를 사용할 수 있다. 이 매처는 `closeTo()` 정적 메서드를 제공한다. 

```java
import static org.hamcrest.number.IsCloseTo.*;
// ...
  assertThat(2.32 * 3, closeTo(6.96, 0.0005));
```

<br>

#### 🔑 1-5 단언 설명

모든 JUnit 단언의 형식(전통적 fail(), 햄크레스트 assertThat())에는 `message`라는 선택적 첫 번째 인자가 있다. 
  - `message` 인자는 단언의 근거를 설명해준다. 

설명문을 추가하는 것보단 **테스트를 코드 자체만으로 이해할 수 있게 작성하는 것**이다. 
테스트 이름을 변경하거나, 의미 있는 상수를 도입하거나, 변수 이름을 개선하거나, 복잡한 초기화 작업을 의미 있는 이름을 가진 도우미 메서드로 추출하거나, 가독성이 우수한 햄크레스트 단언을 사용하는 등의 방법을 활용하는 것이 테스트를 훨씬 좋게 만든다. 

<br>

### 📍 2. 예외를 기대하는 세 가지 방법 

어떤 클래스가 예외를 던지는 조건을 이해하면 그 클래스를 사용하는 클라이언트 개발자의 삶이 한결 편안해진다. 

JUnit은 적어도 세 가지 다른 방식으로 기대한 예외를 던지는지 명시할 수 있다. 

<br>

#### 🔑 2-1 단순한 방식: 에너테이션 사용 

JUnit의 `@Test` 애너테이션은 기대한 예외를 지정할 수 있는 인자를 제공한다. 

```java
@Test(expected=InsufficientFundsException.class)
public void throwsWhenWithdrawingTooMuch() {
  account.withdraw(100);
}
```

<br>

#### 🔑 2-2 옛 방식: try/catch와 fail

발생한 예외를 처리하는 방법으로 `try/catch` 블록을 활용할 수도 있다. 

```java
try{
  account.withdraw(100);
  fail();
}
catch(InsufficientFundsException expected){
}
```
- 예외가 발생하면 제어권은 `catch` 블록으로 넘어가고 테스트가 종료된다. 즉, 테스트 통과이다. 그렇지 않으면 제어권은 fail 문으로 넘어갑니다.
- 예외 변수를 `expected`로 명명하여 코드를 읽는 사람에게 예외를 예상했고 잡았다는 것을 강조할 수 있다. 
- 예외가 발생한 후 어떤 상태를 검사할 떄 유용하다.

```java
try {
  account.withdraw(100);
  fail();
}
catch(InsufficientFundsException expected){
  asserThat(expected.getMessage(), equalTo("balance only 0"));
}
```

<br>

#### 🔑 2-3 새로운 방식: ExpectedException 규칙

- JUnit은 커스텀 규칙을 정의하여 테스트가 실행되는 흐름 동안 발생하는 일에 대한 더 큰 통제권을 부여한다. 
- JUnit 규칙은 관점 지향 프로그래밍(AOP, Aspect-Oriented Programming)과 유사한 기능을 제공한다.
- JUnit은 (별도로 코딩할 필요 없이) 바로 사용할 수 있는 소수의 유용한 규칙들을 제공한다. 
- `ExpectedException` 규칙을 사용하려면 테스트 클래스에 `ExpectedException` 인스턴스를 `public`으로 선언하고 `@Rule` 애너테이션을 부착해야 한다. 

```java
import org.junit.rules.*;
// ...
  @Rule
  public ExpextedException thrown = ExpectedException.none();

  @Test
  public void exceptionRule() {
    thrown.expect(InsufficientFundsException.class);
    thrown.expectMessage("balance only 0");

    accout.withdraw(100);
  }
```
- `thrown` 규칙 인스턴스는 `InsufficientFundsException` 예외가 발생함을 알려 준다. 
- 예외 객체에 적절한 메시지가 포함되어 있는지 검사하길 원하여 `thrown` 규칙에 다른 기대 사항을 지정했다. 
- 규칙에 대한 모든 기대 사항이 충족되면 테스트가 통과하고, 그렇지 않으면 실패한다. 

<br>

#### 🔑 2-4 예외 무시 

검증된 예외를 처리하려고 테스트 코드에 `try/catch` 블록에 넣지 마세요. 그 대신 발생하는 예외를 다시 던지세요. 

```java
@Test
public void readsFromTestFile() throws IOException {
  String filename = "test.txt";
  BufferedWriter writer = new BufferedWriter(new FileWriter(filename));
  writer.write("test data");
  writer.close();
  // ...
}
```
- 긍정적인 테스트를 설계한다면 정말 예외적인 상황을 제외하고는 예외가 발생하지 않음을 알 것이다. 
- JUnit은 예외를 잡아 테스트 실패가 아니라 테스트 오류로 보고한다. 
