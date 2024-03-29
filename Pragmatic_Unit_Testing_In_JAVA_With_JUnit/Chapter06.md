# 📚 자바와 JUnit을 활용한 실용주의 단위 테스트 
## 📖 2부 빠른 암기법 습득

JUnit으로 생산성을 높이려면 테스트 대상과 커버하는 경께 조건, 좋은 테스트의 요건을 배워야 한다.
운이 좋게도 이러한 항목들의 가이드라인은 유용한 암기법인 FIRST, Right-BICEP, CORRECT로 요약할 수 있다.

## 🔎 6장 Right-BICEP: 무엇을 테스트할 것인가?

메서드 혹은 클래스의 코드를 보았을 때 숨어 있는 모든 버그를 찾아내는 것은 불가능하다. 
우리에게 필요한 것은 무엇을 테스트하는 것이 중요한지 도와줄 수 있는 지침이다. 

**Right-BICEP**은 무엇을 테스트할지에 대해 쉽게 선별하게 한다. 

- **Right** 결과가 올바른가?
- **B** 경계 조건(boundary conditions)은 맞는가?
- **I** 역 관계(inverse relationship)를 검사할 수 있는가?
- **C** 다른 수단을 활용하여 교차 검사(cross-check)할 수 있는가?
- **E** 오류 조건(error conditions)을 강제로 일어나게 할 수 있는가?
- **P** 성능 조건(performance characteristics)은 기준에 부합하는가?

<br>

### 📍 1. [Right]-BICEP: 결과가 올바른가?

테스트 코드는 무엇보다도 먼저 기대한 결과를 산출하는지 검증할 수 있어야 한다. 
소프트웨어의 최종 사용자 목표를 반영하는 긍정적인 사례이지만 전체에 비해서는 작은 부분이다. 

행복 경로 테스트는 중요한 다음 질문에서 한 가지 답변을 나타낸다.
> 나는 코드가 정상적으로 동작한다면, 그것을 알 수 있을까?

다른 관점으로, 어떤 작은 부분의 코드에 대해 행복 경로 테스트를 할 수 없다면 그 내용을 완전히 이해하지 못한 것이다. 
그리고 앞의 질문에 대답할 수 있을 때까지 잠시 추가 개발은 보류하면 좋다. 

사실 어떤 단위 테스터들은 명시적으로 그들이 작성하는 모든 단위 테스트에 앞의 질문을 되묻는다. 또 시나리오에서 코드가 반환해야 하는 답을 보여 주는 테스트 코드를 작성할 수 있을 때까지 실제 코드 작성을 중단한다. 

단위 테스트는 선택을 문서화한다. 어떤 변경이 발생하면 적어도 현재까지 코드가 어떻게 동작했는지는 알게 된다. 

<br>

### 📍 2. Right-[B]ICEP: 경계 조건은 맞는가?

코드에 있는 분명한 행복 경로는 입력 값의 양극단을 다루는 코드 시나리오의 경계 조건에 걸리지 않을 수도 있다. 
마주치는 수많은 결함은 이러한 모서리 사례(corner case)이므로 테스트로 이것들을 처리해야 한다. 

#### 경계 조건

- 모호하고 일관성 없는 입력 값
  - 예: 특수 문자가 포함된 파일 이름
- 잘못된 양식의 데이터
  - 예: 최상위 도메인이 빠진 이메일 주소
- 수치적 오버플로를 일으키는 계산
- 비거나 빠진 값
  - 예: 0, 0.0, "" , null
- 이성적인 기댓값을 훨씬 벗어나는 값
  - 예: 150세의 나이
- 중복을 허용해서는 안 되는 목록에 중복 값이 있는 경우
- 정렬이 안 된 정렬 리스트 혹은 그 반대. 정렬 알고리즘에 이미 정렬된 입력 값을 넣는 경우나 정렬 알고리즘에 역순 데이터를 넣는 경우
- 시간 순이 맞지 않는 경우
 - 예: HTTP 서버가 OPTIONS 메서드의 결과를 POST 메서드보다 먼저 반환해야 하지만 그 후에 반환하는 경우 
- 클래스를 설계할 때 잠재적인 정수 오버플로 등을 고려할지 여부는 전적으로 우리에게 달렸다. 
- 클래스가 외부에서 호출하는 API이고 클라이언트를 완전히 믿을 수 없다면 나쁜 데이터에 대한 보호가 필요하다. 
- 코드 제한 사항을 문서화하는 테스트를 추가하는 것이다. 

<br>

### 📍 3. 경계 조건에서는 CORRECT를 기억하라 

CORRECT 약어는 잠재적인 경계 조건을 기억하는 데 도움을 준다. 각 항목에 대해 유사한 조건을 테스트하려는 메서드에 해당하며, 이 조건을 위반했을 때 어떤 일이 일어날 수 있는지 고려해라. 

- **[C]onformance(준수)**: 값이 기대한 양식을 준수하고 있는가?
- **[O]rdering(순서)**: 값의 집합이 적절하게 정렬되거나 정렬되지 않았나?
- **[R]ange(범위)**: 이성적인 최솟값과 최댓값 안에 있는가?
- **[R]eference(참조)**: 코드 자체에서 통제할 수 없는 어떤 외부 참조를 포함하고 있는가?
- **[E]xistence(존재)**: 값이 존재하는가(널이 아니거나(non-null), 0이 아니거나(nonzero), 집합에 존재하는가 등)
- **[C]ardinality(기수)**: 정확히 충분한 값들이 있는가?
- **[T]ime(절대적 혹은 상대적 시간)**: 모든 것이 순서대로 일어나는가? 정확한 시간에? 정시에?

<br>

### 📍 4. Right-B[I]CEP: 역 관계를 검사할 수 있는가?

때때로 논리적인 역 관계를 적용하여 행동을 검사할 수 있다. 긍정 사례 답변들과 역 답변을 합하면 전체가 되어야 한다. 교차 검사는 모든 요소를 더하고 균형이 맞는지 확인하는 방법으로, 복식 부기에서 총 계정 원장을 맞추는 것과 같다. 

<br>

### 📍 5. Right-BI[C]EP: 다른 수단을 활용하여 교차 검사할 수 있는가?

흥미로운 문제에는 무수한 해법이 존재한다. 그중 성능이 좋거나 냄새가 좋기 때문에 1등 해법을 선택한다. 그러면 프로덕션 결과를 교차 검사하기 위해 '패배자' 해법이 남는다. 
아마도 프로덕션 시스템에 활용하기에는 너무 느리거나 유연하지 않겠지만, 그것들이 믿을 수 있고 참값을 보장한다면 1등 해법을 교차 검사할 때 활용할 수 있다.

교차 검사를 보는 다른 방법은 클래스의 서로 다른 조각 데이터를 사용하여 모든 데이터가 합산되는지 확인해 보는 것입니다. 

<br>

### 📍 6. Right-BIC[E]P: 오류 조건을 강제로 일어나게 할 수 있는가?

테스트 코드로 모든 실전 문제를 우아하고 이성적인 방식으로 다루기 원할 것이다.
그렇게 하려면 테스트도 오류들을 강제로 발생시켜야 한다. 

#### 오류의 종류 혹은 다른 환경적인 제약 사항

- 메모리가 가득 찰 때
- 디스크 공간이 가득 찰 때
- 벽시계 시간에 관한 문제들
- 네트워크 가용성 및 오류들
- 시스템 로드
- 제한된 색상 팔레트
- 매우 높거나 낮은 비디오 해상도

좋은 단위 테스트는 단지 코드에 존재하는 로직 전체에 대한 커버리지를 달성 하는 것이 아니다. 
때때로 뒷주머니에서 작은 창의력을 꺼내는 노력이 필요하다. 
가장 끔찍한 결함들은 종종 전혀 예상하지 못한 곳에서 나온다. 

<br>

### 📍 7. Right-BICE[P]: 성능 조건은 기준에 부합하는가?

추측만으로 성능 문제에 바로 대응하기보다는 단위 테스트를 설계하여 진짜 문제가 어디에 있으며 예상한 변경 사항으로 어떤 차이가 생겼는지 파악해야 한다. 

#### 주의사항
- 전형적인 코드 덩어리를 충분한 횟수만큼 실행하길 원할 것이다. 이렇게 타이밍과 CPU 클록 주기(clock cycle)에 관한 이슈를 제거한다. 
- 반복하는 코드 부분을 자바(JVM)가 최적화하지 못하는지 확인해야 한다. 
- 최적화되지 않은 테스트는 한 번에 수 밀리초가 걸리는 일반적인 테스트 코드들보다 매우 느리다. 느린 테스트들은 빠른 것과 분리하라. 
- 동일한 머신이라도 실행 시간은 시스템 로드처럼 잡다한 요소에 따라 달라질 수 있다.
  - 성능을 테스트할 때는 사전 조건을 단단하게 정의해 놓아야 반복성과 재현성을 보장할 수 있다. 

환경에 따라 실패하는 테스트를 다루는 것은 결코 즐겁지 않으며 여러 환경에서 일관성 있는 동작을 보장하는 해법은 쉽지 않다. 유일한 해법은 가능한 프로덕션 환경과 유사한 머신에서 실행하는 것이다. 

- 단위 성능 측정을 잘 사용하는 방법은 변경 사항을 만들 때 기준점(baseline)으로 활용하는 것이다. 
- 상대적인 개선량을 찾아라. 
- 모든 성능 최적화 시도는 실제 데이터로 해야 하며 추측을 기반으로 해서는 안 된다. 

<br>

### 📍 8. 마치며

**Right-BICEP** 암기법을 활용하여 행복 경로, 경계 조건과 오류 조건을 다루는 테스트를 작성해야 함을 기억할 것이다. 
또 결과를 교차 검사하고 역 관계를 살펴보며 테스트 코드의 유효성을 강화할 수 있다는 것, 언제 코드의 성능을 보는 것이 유용한지도 알았다. 
