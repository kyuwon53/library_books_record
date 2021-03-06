# 객체지향의 사실과 오해: 01 협력하는 객체들의 공동체
- 객체지향 : 어떤 객체들의 어떤 메시지를 주고받으며 협력하는가
## 객체지향에서 가장 중요한 개념 : **역할, 책임, 협력**
  - 요청과 응답으로 구성된 협력
    > 일반적으로 하나의 문제를 해결하기 위해 다수의 사람 혹은 역할이 필요하기 때문에 한 사람에 대한 **요청(request)** 이 또 다른 사람에 대한 요청을 유발하는 것이 일반적이다. 따라서 요청은 *연쇄적* 으로 발생한다.
    >
    > 요청을 받은 사람은 주어진 책임을 다하면서 필요한 지식이나 서브스를 제공한다. 즉, 다른 사람의 요청에 **응답(response)** 한다. 응답 역시 요청의 방향과 반대 방향으로 연쇄적으로 전달된다.
    >
    > 요청과 응답을 통해 다른 사람과 **협력(collaboration)** ...중략.... 협력의 성공은 특정한 역할을 맡은 각 개인이 얼마나 요청을 성실히 이행하는가에 달려 있다.
    >
  - 협력하는 과정 속에서 역할이 존재
  ### 역할 : 어떤 협력에 참여하는 사람이 협력 안에서 차지하는 **책임** 이나 임무를 의미
    - 특정한 역할은 특정한 책임을 암시
    > 역할과 책임은 협력이 원할하게 진행되는 데 필요한 핵심적인 구성 요소다.
     사람들이 협력을 위해 특정한 역할을 맡고 역할에 적합한 책임을 수행한다는 사실은 몇가지 중요한 개념을 제시한다.
    >  1. 여러 사람이 동일한 역할을 수행할 수 있다.
    >  2. 역할은 대체 가능성을 의미한다.
    >  3. 책임을 수행하는 방법은 자율적으로 선택할 수 있다.
    >     - 다형성: 동일한 요청에 대해 서로 다른 방식으로 응답할 수 있다.
    >  4. 한 사람이 동시에 여러 역할을 수행할 수 있다.
- 협력의 핵심: 특정한 책임을 수행하는 역할들 간의 연쇄적인 요청과 응답을 통해 목표를 달성한다는 것.
- 시스템은 역할과 책임을 수행하는 객체로 분할된다.
- 시스템의 기능은 객체 간의 연쇄적인 요청과 응답의 흐름으로 구성된 협력으로 구현된다.
## 객체지향 설계 : 적절한 객체에게 적절한 책임을 할당하는 것에서 시작된다.
  ### 책임: 객체지향 설계의 품질은 결정하는 가장 중요한 요소.
  ### 역할: 관련성 높은 책임의 집합
    1. 여러 객체가 동일한 역할을 수행할 수 잇다.
    2. 역할은 대체 가능성을 의미한다.
    3. 각 객체는 책임을 수행하는 방법을 자율적으로 선택할 수 있다.
    4. 하나의 객체가 동시에 여러 역할을 수행할 수 있다.
    5. `유연하고 재사용 가능`한 협력 관계를 구축하는 데 중요한 설계 요소.


## 객체: 애플리케이션의 기능을 구현하기 위해 존재. `상태`와 `행동`을 함께 지닌 실체.
  - `협력적`
    - 협력을 위해 메시지를 전송
    - 메시지를 전송하는 객체(sender)와 메시지를 수신하는 객체(receiver) 사이의 관계로 구성됨.
  - `자율적` : 자신의 상태를 직접 관리하고 상태를 기반으로 스스로 판단하고 행동할 수 있음
    - 데이터와 프로세스를 하나의 틀 안에 함께 묶음
    - 유지보수가 쉽고 재사용이 용이함
    > 객체의 사적인 부분은 객체 스스로 관리하고 외부에서 일체 간섭할 수 없도록 차단해야 하며,
    > 객체의 외부에서는 접근이 허락된 수단을 통해서만 객체와 의사소통해야 한다.
    > 객체는 다른 객체가 `무엇`을 수행하는지는 알 수 있지만 `어떻게` 수행하는지에 대해서는 알 수 없다.
  - `메서드` : 객체가 수신된 메시지를 처리하는 방법
  - `객체의 자율성을 높이는 핵심`: 외부의 요청이 무엇인지를 표현하는 메시지와 요청을 처리하기 위한 구체적인 방법인 메서드를 **분리**하는 것

