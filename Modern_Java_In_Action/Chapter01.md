# 📚 모던 자바 인 액션
## 📖 1부 기초 
### 🔎 1장 자바 8, 9, 10, 11 : 무슨 일이 일어나고 있는가? 

목표 : 자바 8 이후의 핵심 기능은 무엇인가? 

TODO: 핵심 질문 만들기, 요약하기

#### 🤔 1.1 역사의 흐름은 무엇인가? 

- 자바 8에서 가장 큰 변화가 일어났다.
- 스레드를 사용하면 관리하기 어렵고 많은 문제가 발생할 수 있다는 단점이 있다.
  - ❓무슨 문제일까?
    1. 멀티 스레드의 경우 한 스레드의 문제가 전체 영향을 줌
    2. `Context Switching`이 많이 발생해 성능 저하 
    3. 동기화 필요 => 과도한 lock으로 병목 현상이 일어날 수 있다.

- 자바 8은 간결한 코드, 멀티코어 프로세서의 쉬운 활용이라는 두 가지 요구사항을 기반으로 한다. 
  - ❓멀티코어 프로세서가 뭐지?
    - 2개 이상의 프로세서를 포함한 직접회로 

#### 🤔 1.2 왜 아직도 자바는 변화하는가?

- 자바8에서 이야기하는 핵심 기능은 병렬성을 활용, 간결한 코드 인가?

##### 자바 8 핵심 기능
- 스트림 처리 
  - 스트림이란 무엇인가?
  - `java.util.stream` 패키지에 `Stream<T>`는 무엇을 의미하는가?

- 동작 파라미터화로 메서드에 코드 전달하기
  - 코드 일부를 API로 전달하는 기능이란? 
   => 메서드(우리 코드)를 다른 메서드의 인수로 넘겨주는 기능을 제공
  - 동작 파라미터가 왜 중요한가?

- 병렬성과 공유 가변 데이터
  - 스트림 메서드로 전달하는 코드는 다른 코드와 동시에 실행되더라도 안전하게 실행되야하는데 그럴려면 어떻게 해야하는가?
  - ❓일반적으로 `synchronized`는 시스템 성능에 악영향을 미친다. => 왜?
    - ❕ `lock`을 걸기 때문에 스레드는 모니터락을 획득해야 접근이 가능하고, 동기화되는 부분을 벗어나면 모니터락을 반환한다. => 병목현상 발생

#### 🤔 1.3 자바 함수
- 자바 함수의 의미는 무엇인가?
- 메서드 참조(`::`)란 무엇인가?
- 람다 : 익명함수를 사용하는 이유는 무엇인가?
- 람다 문법 형식으로 구현된 프로그램을 뭐라고 하는가? 

#### 🤔 1.4 스트림
- 포킹 단계 
- 스트림의 핵심?
  - 스트림 내의 요소를 쉽게 병렬로 처리할 수 있는 환경을 제공

#### 🤔 1.5 디폴트 메서드와 자바 모듈
- 자바9 패키지 모음을 포함하는 모듈을 정의 
- 디폴트 메서드란? 
- 어떻게 기존의 구현을 고치지 않고도 이미 공개된 인터페이스를 변경할 수 있을까?
  - ❓인터페이스에 `default` 키워드로 디폴트 메서드를 추가해서 사용할 수 있다는 말인가?

#### 🤔 1.6 함수형 프로그래밍에서 가져온 다른 유용한 아이디어
- (구조적) 패턴 매칭이란 무엇인가?
- ❓방문자 패턴(visitor pattern)이란 무엇인가?
  - 로직과 구조를 분리
  - 실제 로직을 가지고 있는 객체가 적용할 객체를 방문하면서 실행

### 요약하기 

자바 8 이후 추가된 핵심 기능에는 스트림, 디폴트 메서드, 함수형 프로그래밍이 있다. 자세한건 뒷장에서 알아보자! 

### 회고 

몰라서 하는 질문인지(나중에 찾아볼 질문), 기억을 위한 질문인지 구분해서 기록하자. 
오픈 스터디 괜찮은거 같다.