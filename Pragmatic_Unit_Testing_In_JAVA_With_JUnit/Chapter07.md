# 📚 자바와 JUnit을 활용한 실용주의 단위 테스트 
## 📖 2부 빠른 암기법 습득

JUnit으로 생산성을 높이려면 테스트 대상과 커버하는 경께 조건, 좋은 테스트의 요건을 배워야 한다.
운이 좋게도 이러한 항목들의 가이드라인은 유용한 암기법인 FIRST, Right-BICEP, CORRECT로 요약할 수 있다.

## 🔎 7장 경계 조건: CORRECT 기억법 

단위 테스트는 종종 경계 조건들에 관계된 결함들을 미연에 방지하는 데 도움이 된다. 경계 조건은 행복 경로의 끝에 있는 것으로 자주 문제가 발생한다. 

- **[C]onformance(준수)**: 값이 기대한 양식을 준수하고 있는가?
- **[O]rdering(순서)**: 값의 집합이 적절하게 정렬되거나 정렬되지 않았나?
- **[R]ange(범위)**: 이성적인 최솟값과 최댓값 안에 있는가?
- **[R]eference(참조)**: 코드 자체에서 통제할 수 없는 어떤 외부 참조를 포함하고 있는가?
- **[E]xistence(존재)**: 값이 존재하는가(널이 아니거나(non-null), 0이 아니거나(nonzero), 집합에 존재하는가 등)?
- **[C]ardinality(기수)**: 정확히 충분한 값들이 있는가?
- **[T]ime(절대적 혹은 상대적 시간)**: 모든 것이 순서대로 일어나는가? 정확한 시간에? 정시에?

각 CORRECT 조건에 대해 넘겨진 인수, 필드와 지역적으로 관리하는 변수들까지 가능한 모든 발생 원인이 데이터에 미칠 영향을 고려하라.

> 그 밖의 문제될 것이 있는가?

한 가지 가능한 오류 시나리오를 생각해 두면 종종 연계되는 다른 시나리오도 떠올릴 수 있다. 테스트에 대해 가능한 오랫동안 상상력을 유지해라. 

<br>

### 📍 1. [C]ORRECT: [C]onformance(준수)

많은 데이터 요소가 특정 양식을 따라야 한다.
각 경계 조건이 발생했을 때 어떤 일이 일어나는지 보여 줄 수 있는 테스트 코드를 작성해야 한다. 

이메일 주소, 전화번호, 계좌 번호, 파일 이름 등 양식 있는 문자열 데이터를 검증할 때는 많은 규칙이 필요하다. 

계좌 번호 같은 필드는 시스템에 있는 수많은 메서드에 넘겨질 것이다. 하지만 시스템에 그 필드가 처음 입력될 때 검증한다면 그 필드를 인자로 넘길 때마다 검사하지 않아도 된다. 시스템의 데이터 흐름을 이해하면 불필요한 검사를 최소화할 수 있다. 

<br>

### 📍 2. C[O]RRECT: [O]rdering(순서)

데이터 순서 혹은 커다란 컬렉션에 있는 데이터 한 조각의 위치는 코드가 쉽게 잘못될 수 있는 CORRECT 조건에 해당한다.

<br>

### 📍 3. CO[R]RECT: [R]ange(범위)

자바 기본형으로 변수를 만들 때 대부분은 필요한 것보다 훨씬 많은 용량을 가진다. 불필요하게 잘못될 가능성이 생긴다.

기본형의 과도한 사용에 대한 코드 냄새를 기본형 중독(primitive obsession)이라고 한다. 
자바 같은 객체 지향 언어의 장점은 사용자 정의 추상화를 클래스로 만들 수 있다는 것이다. 

<br>

#### 🔑 3-1 불변성을 검사하는 사용자 정의 매처 생성 

`@After` 메서드에 있는 단언은 `constrainsSidesTo`라는 사용자 정의 햄크레스트 매처를 사용한다. 
매처는 왼쪽에서 오른쪽으로 읽었을 때 잘 읽히는 단언을 표현한다. 

사용자 정의 햄크레스트 매처를 구현하려면 `org.hamcrest.TypeSafeMatcher` 클래스를 상속하여 매칭하고자 하는 타입을 지정한다. 
사용자 정의 매처 클래스는 단언이 실패할 때 제공할 의미 있는 메시지를 `describeTo()` 메서드에 기재해야 한다. 

사용자 정의 매처 클래스는 또한 매처 인스턴스를 반환하는 정적 팩토리 메서드(static factory method)를 제공해야 한다. 단언을 작성할 때 이 팩토리 메서드를 호출한다. 

<br>

#### 🔑 3-2 불변 메서드를 내장하여 범위 테스트 

테스트할 대부분의 범위는 애플리케이션-도메인 제약이라기보다는 자료 구조에 관한 제약에 의존하게 될 것이다.

희소 배열(sparse array)에 관한 의심스러운 구현을 살펴보자. 희소 배열은 저장 공간을 줄이는 목적으로 설계된 자료 구조이다. 희소 배열을 위한 핵심 지점(sweet spot)은 대응되는 값이 대부분 null인 넓은 범위의 인덱스들이다. 

null이 아닌 값을 저장하고 값 배열과 합을 이루는 인덱스들의 배열을 쌍으로 저장하여 이러한 목적을 달성한다. 

희소 배열 코드는 배열의 쌍을 추적하고 변경하여 조금 복잡하다. 
오류를 예방하는 데 도움을 주는 한 가지 방법은 구형에 맞는 불변식을 결정하는 것이다. 
희소 배열 구현에서는 null이 아닌 값만 허용하기 때문에 배열 크기는 반드시 null이 아닌 값들의 개수와 같아야 한다.

인덱싱은 수많은 잠재적인 오류를 포함하고 있다. `CORRECT` 약어의 `Range(범위)` 부분 마지막 노트로 인덱스를 다룰 때 고려해야 할 몇 가지 테스트 시나리오는 다음과 같다. 

- 시작과 마지막 인덱스가 같으면 안 된다. 
- 시작이 마지막보다 크면 안 된다.
- 인덱스는 음수가 아니어야 한다.
- 인덱스가 허용된 것보다 크면 안 된다.
- 개수가 실제 항목 개수와 맞아야 한다.

<br>

### 📍 4. COR[R]ECT: [R]eference(참조)

어떤 메서드를 테스트할 때는 다음을 고려해야 한다. 

- 범위를 넘어서는 것을 참조하고 있지 않은지
- 외부 의존성은 무엇인지
- 특정 상태에 있는 객체를 의존하고 있는지 여부
- 반드시 존재해야 하는 그 외 다른 조건들 

어떤 상태에 대해 가정할 때는 그 가정이 맞지 않으면 코드가 합리적으로 잘 동작하는지 검사해야 한다. 
사전 조건이 맞지 않았을 때 메서드가 우아하게 동작함을 보장하고 싶다.
  - 우아하게 동작한다는 것은 보통 종료 상황에서 요청을 받자마자 동작을 바로 중지하지 않고 자원 해제 등 필요한 사항을 처리하고 종료하는 것을 의미한다. 

사후 조건들(postconditions)은 코드가 참을 유지해야 하는 조건들을 의미하며, 테스트의 단언으로 명시한다. 때때로 이것은 단순히 호출한 메서드의 반환값이다. 
또 다른 부작용(side effects)(호출 행동의 결과로 발생하는 상태 변화들을 의미)을 검사해야 할 필요도 있다. 

<br>

### 📍 5. CORR[E]CT: [E]xistence(존재)

스스로에게 "주어진 값이 존재하는가?"라고 물어봄으로써 많은 잠재적인 결함을 발견할 수 있다. 어떤 인자를 허용하거나 필드를 유지하는 메서드에 대해 그 값이 null, 0 혹은 비어 있는 경우라면 어떤 일이 일어날지 생각해 보라.

어떤 데이터가 존재하지 않거나 초기화되지 않은 상태로 사용되면 숨막히게 예외를 던지는 경향이 있다. 
`프로파일 이름이 설정되지 않음`처럼 특정한 메시지를 예외에서 알려 주면 문제를 추적하는 과정을 매우 단순하게 만들 수 있다. 

잠재적인 지옥으로 향하는 고속도로처럼 테스트를 추가하고 싶다면 호출된 메서드가 null을 반환하거나, 기대하는 파일이 없거나, 네트워크가 다운되었을 때 어떤 일이 일어나는지 확인하는 테스트를 작성하세요.

null 값, 0, 빈 문자열과 다른 무정부주의자의 덫들로 충분히 테스트하라. 

<br>

### 📍 6. CORRE[C]T: [C]ardinality(기수)

문제에 대해 충분히 생각하지 않아서 오류들이 너무 자주 발생하는데, 이것을 `울타리 기둥 오류(fencepost errors)`라고 한다.

울타리 기둥 오류는 한 끗 차이로 발생하는 수많은 경우 중 한 가지를 의미하며, 종종 한곳 혹은 다른 곳에서 치명적인 상태가 되고는 한다. 

기수를 사용하면 `일부` 혹은 `없음`보다 좀 더 구체적인 답변을 볼 수 있다. 

집합을 이루는 값 개수는 다음 세 가지 경우에 흥미롭다. 
#### 0-1-n 법칙

- 0
- 1
- 다수(1보다 많은)

같은 상수를 사용하고 있으므로 테스트는 전혀 변경할 필요가 없다. 

테스트 코드는 0, 1, n이라는 경계 조건에만 집중하고 n은 비즈니스 요구 사항에 따라 바뀔 수 있다. 

<br>

### 📍 7. CORREC[T]: [T]ime(시간)

<br>

#### 시간에 관하여 마음에 담아 두어야 할 측면
- 상대적 시간(시간 순서)
- 절대적 시간(측정된 시간)
- 동시성 문제들 

메서드들의 호출 순서가 맞지 않았을 때 어떤 일이 일어날지 생각해보자. 
데이터 순서가 중요한 것처럼 메서드의 호출 순서도 중요하다. 
타임아웃으로 보호되지 않는 조건들을 찾아라. 이를테면 발생하지 않을 일을 기다리느라 코드가 무한 대기에 빠지지는 않았는지 확인하라. 

시간에 민감한 테스트는 이러한 경계 조건에 해당하는 날들을 확실하게 확인해야 한다. 

어떤 하위 라이브러리가 이 문제들을 정확하게 처리할 것이라고 가정하지 마라. 때가 되면 여기저기 깨진 코드가 많아진다. 

실패에 대한 또 다른 해결책은 시스템 시계에 의존하는 테스트를 작성하는 것이다. 테스트 코드에 통제할 수 있는 곳에서 얻어 오는 시간을 사용하도록 애플리케이션을 변경하라. 

시간에 따라 서서히 퍼지는 문제점 중 하나는 동시성과 동기화된 접근 맥락에 관한 문제이다. 
[멀티스레드이면서 동시적인 프로그램을 설계하고 구현하고 디버깅하는 것은 별도로 다루고 있다.](http://www.yes24.com/Product/Goods/3015162)

동시에 같은 객체를 다수의 스레드가 접근한다면 어떤 일이 벌어질까?
어떤 전역 혹은 인스턴스 수준의 데이터나 메서드에 동기화를 해야 할까?
파일 혹은 하드웨어에 외적인 접근은 어떻게 처리해야 할까?
클라이언트에 동시성 요구 사항이 있다면 다수의 클라이언트 스레드를 보여주는 테스트를 작성할 필요가 있다. 

<br>

### 📍 8. 마치며

<br>

모든 경계를 알 필요가 있다. 테스트에서는 더욱 그렇다. 경계 조건들은 자주 고약하고 작은 결함들을 만들어 내는 곳이다. 
**CORRECT** 약어는 단위 테스트를 작성할 때 고려해야 하는 경계들을 기억하는 데 도움을 준다. 
