# 📚 자바와 JUnit을 활용한 실용주의 단위 테스트 
## 📖 2부 빠른 암기법 습득

JUnit으로 생산성을 높이려면 테스트 대상과 커버하는 경께 조건, 좋은 테스트의 요건을 배워야 한다.
운이 좋게도 이러한 항목들의 가이드라인은 유용한 암기법인 FIRST, Right-BICEP, CORRECT로 요약할 수 있다.

## 🔎 5장 좋은 테스트의 FIRST 속성

테스트 또한 유지 보수해야 하는 코드이다. 

##### 테스트 문제점
- 테스트를 사용하는 사람에게 어떤 정보도 주지 못하는 테스트 
- 산발적으로 실패하는 테스트 
- 어떤 가치도 증명하지 못하는 테스트 
- 실행하는 데 오래 걸리는 테스트 
- 코드를 충분히 커버하지 못하는 테스트
- 구현과 강하게 결합되어 있는 테스트, 따라서 작은 변화에도 다수의 테스트가 깨진다. 
- 수많은 설정 고리로 점프하는 난해한 테스트

<br>

### 📍 1. FIRST: 좋은 테스트 조건 

#### FIRST 원리 
- **[F]ast**: 빠른
- **[I]solated**: 고립된
- **[R]epeatable**: 반복 가능한 
- **[S]elf-validating**: 스스로 검증 가능한 
- **[T]imely**: 적시의 

테스트를 먼저 작성하고 코드를 작성하면 이전과 다른 더 좋은 결과를 얻을 수도 있다. 
많은 사람이 이를 가리켜 **테스트 주도 개발(TDD, Test-Driven Development)**라고 한다. 

일반적인 단위 테스트(POUT, Plain Ol'Unit Testing)와 TDD 차이점은 TDD에서는 테스트를 먼저 작성한다는 것이다. 

테스트를 먼저 작성하든 이후에 작성하든 FIRST 원리를 고수하면 어떤 것이든 잘해 나갈 수 있을 것이다. 

<br>

### 📍 2. [F]IRST: 빠르다

- 빠른 테스트는 코드만 실행하며 소요 시간은 수 밀리초 수준이다. 
- 느린 테스트는 데이터베이스, 파일, 네트워크 호출처럼 필요한 외부 자원을 다루는 코드를 호출한다. 실행 시간은 수십, 수백, 수천 밀리초가 걸리기도 한다. 

- 단위 테스트를 하루에 서너 번 실행하기도 버겁다면 무언가 잘못된 방향으로 나아가고 있는 것이다. 
- 테스트를 빠르게 유지하라! 설계를 깨끗하게 하면 빠르게 유지할 수 있다. 가장 먼저 느린 테스트에 대한 의존성을 줄여라 

- 테스트 코드는 빠르게 동작하며, 느린 것에 의존하는 코드를 최소화한다면 작성하기도 쉬워진다. 
- 의존성을 최소화하는 것 역시 좋은 설계의 목표이다. 
- 코드를 클린 객체 지향 설계 개념과 맞출수록 단위 테스트 작성도 쉬워진다. 

<br>

### 📍 3. F[I]RST: 고립시킨다

- 좋은 단위 테스트는 검증하려는 작은 양의 코드에 집중한다. 
- 테스트 대상 코드는 데이터베이스를 읽는 다른 코드와 상호 작용할 수도 있다. 
- 데이터 의존성은 많은 문제를 만든다. 궁극적으로 데이터베이스에 의존해야 하는 테스트는 데이터베이스가 올바른 데이터를 가지고 있는지 확인해야 한다. 
- 단순히 외부 저장소와 상호 작용하게 되면 테스트가 가용성 혹은 접근성 이슈로 실패할 가능성이 증가한다. 
- 좋은 단위 테스트는 다른 단위 테스트에 의존하지 않는다. 
- 테스트 코드는 어떤 순서나 시간에 관계없이 실행할 수 있어야 한다. 
- 각 테스트가 작은 양의 동작에만 집중하면 테스트 코드를 집중적이고 독립적으로 유지하기 쉬워진다. 
  - 테스트에 두 번째 단언을 추가할 때 다음과 같이 스스로 질문해야 한다. 
    - "이들 단언이 단일 동작을 검증하도록 돕는가, 아니면 내가 새로운 테스트 이름으로 기술할 수 있는 어떤 동작을 대표하는가?"
- 객체 지향 클래스 설계의 단일 책임 원칙에 따르면 **클래스는 작고 단일한 목적**을 가져야한다.
  - 단일 책임 원칙은 클래스를 변경해야 할 이유가 하나만 있어야 한다고 말한다.
- 테스트 메서드가 하나 이상의 이유로 깨진다면 테스트를 분할하는 것도 고려해라. 

<br>

### 📍 4. FI[R]ST: 좋은 테스트는 반복 가능해야 한다.

- 테스트는 뜬금없이 나오면 안 된다. 
- 테스트 설계에서 테스트 결과가 매번 어떻게 나와야 하는지에 대해 설명하는 단언을 제공해야 한다. 
  - 테스트 코드 자체로 그 내용을 설명할 수 있어야 한다. 
- 반복 가능한 테스트는 실행할 때마다 결과가 같아야 한다. 
  - 반복 가능한 테스트를 만들려면 직접 통제할 수 없는 외부 환경에 있는 항목들과 격리시켜야 한다. 
- 하지만 시스템은 불가피하게 통제할 수 없는 요소와 상호 작용해야 할 것이다. 
  - 테스트 대상 코드의 나머지를 격리하고 독립성을 유지하는 방법으로 **목 객체**를 사용할 수 있다. 
- 산발적으로 실패하는 테스트는 골칫거리이다. 
  - 때때로 테스트가 동시에 실행되는 코드를 주도하면 시스템 결함이 드러나기도 한다. 
  
  **각 테스트는 항상 동일한 결과를 만들어 내야 한다.**

<br>

### 📍 4. FIR[S]T: 스스로 검증 가능하다

- 테스트는 기대하는 것이 무엇인지 단언하지 않으면 테스트가 아니다. 
- 테스트는 스스로 검증 가능할 뿐만 아니라 준비할 수도 있어야 한다. 
- 테스트에 필요한 어떤 설정 단계든 자동화를 해야 한다. 
  - 테스트를 실행하는 데 외부 설정이 필요하다면 FIRST 중에 I 부분(고립성)을 위반한 것이다. 
- 테스트 코드는 전체 시스템을 위한 단위 테스트 묶음의 일부로 동작한다.

<br>

### 📍 4. FIRS[T]: 적시에 사용한다

- 적절한 순간에 단위 테스트에 집중하라. 단위 테스트는 좋은 습관이다. 
- 단위 테스트처럼 좋은 실천 습관은 지속적인 경계를 요구한다. 
- 단위 테스트를 더 많이 할수록 테스트 대상 코드가 줄어든다. 
  - 먼저 단위 테스트 작성이 쉬워진다. 
  - 두 번째로 새로운 코드를 넣었을 때 테스트 효과가 즉시 나타난다.
- 옛날 코드에 대한 테스트는 시간 낭비가 될 수도 있다. 
  - 코드에 큰 결함이 없고 당장 변경할 예정이 없다면(즉, 코드를 변경하지만 현재에서 어떤 것도 깨지 않아야 할 때)
