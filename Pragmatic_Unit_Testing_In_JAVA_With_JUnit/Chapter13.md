# 📚 자바와 JUnit을 활용한 실용주의 단위 테스트 
## 📖 4부 더 큰 단위 테스트 그림

## 🔎 13장 까다로운 테스트

스레드와 영속성(persistence)에 연관된 코드를 테스트할 것이다. 

<br>

### 📍 1. 멀티스레드 코드 테스트 

동시성 처리가 필요한 애플리케이션 코드를 테스트하는 것은 기술적으로 단위 테스트의 영역이 아니다. 통합 테스트로 분류하는 것이 낫다. 애플리케이션 고유의 로직 중 일부는 동시적으로 실행될 수 있음을 고려하여 통합적으로 검증해야 한다. 

스레드를 사용하는 코드에 대한 테스트는 느린 경향이 있다. 
동시성 문제가 없다는 것을 보장하면서 실행 시간의 범위를 확장해야 하기 때문이다. 

<br>

#### 🔑 1-1 단순하고 똑똑하게 유지

멀티스레드 코드를 테스트할 때는 다음 주요 주제를 따라라 

- **스레드 통제와 애플리케이션 코드 사이의 중첩을 최소화하라**
  - 스레드 없이 다량의 애플리케이션 코드를 단위 테스트할 수 있도록 설계를 변경하라.
  - 남은 작은 코드에 대해 스레드에 집중적인 테스트를 작성하라. 
- **다른 사람의 작업을 믿어라**
  - `BlockingQueue` 클래스를 사용하라. 

자바는 동시성을 지원하는 수많은 대안을 제시한다. 

<br>

#### 🔑 1-2 모든 매칭 찾기 


