# 📚 자바와 JUnit을 활용한 실용주의 단위 테스트 
## 📖 3부 더 큰 설계 그림

단위 테스트는 단지 '설계'라고 하는 더 큰 그림의 일부에 불과하다. 시스템을 개발하면서 코드 설계를 깔끔하게 유지하고 싶을 것읻. 효과적으로 리팩토링하기 위해 반대로 좋고 커다란 설계가 어떤 모습인지 이해할 필요가 있다. 

## 🔎 8장 깔끔한 코드로 리팩터링하기 

중복된 코드 조각이 늘면 유지 보수 비용도 증가하고 변경에 대한 리스크도 함께 늘어난다. 그래서 시스템에 있는 중복의 양을 최소화하려고 한다. 

낮은 중복성과 높은 명확성이라는 두 가지 목표를 합리적인 비용과 놀라운 투자 수익률로 달성할 수 있다. 단위 테스트를 만들면 이러한 목표에 도달할 수 있다는 것이다. 

<br>

### 📍 1. 작은 리팩토링

코드를 리팩토링한다는 것이 기존 기능은 그대로 유지하면서 코드의 하부 구조를 건강하게 변형하는 것이다. 다른 말로 리팩토링은 코드를 이리저리 옮겨서 시스템이 정상 동작함을 보장하는 것이다. 마음대로 코드 구조를 바꾸는 것은 위험하다. 적절한 보호 장치가 테스트이다. 

<br>

#### 🔑 1-2 메서드 추출: 두 번째로 중요한 리팩토링 친구 

리팩토링의 가장 중요한 친구는 **이름 짓기(rename)**이다. 대상은 클래스, 메서드, 모든 종류의 변수이다.
명확성은 대개 코드 의도를 선언하는 것이고, 좋은 이름은 코드 의도를 전달하는 가장 좋은 수단이다. 

메서드의 복잡도를 줄여 코드가 무엇을 담당하는지 그 정책을 쉽게 이해하는 것이다. 부분적으로 세부 로직을 추출하여 새로운 별도의 메서드로 이동한다.

코드를 이리저리 옮기면 기존 기능들이 쉽게 깨진다. 따라서 자신감을 가지고 코드를 변경할 수 있어야 하고, 지금까지 알려지지 않은 교활한 작은 결함들이 나오지 않으리라는 확신을 가져야 한다. 

코드를 안전하게 옮길 수 있는 능력은 단위 테스트의 가장 중요한 이점이다. 
새로운 기능을 안전하게 추가할 수 있고 좋은 설계를 유지하면서 변경할 수 있다. 
충분한 테스트가 없으면 코드를 변경하기 어렵다.

<br>

### 📍 2. 메서드를 위한 더 좋은 집 찾기 

임시 변수들은 쓰임새가 다양하다. 임시 변수로 값비싼 비용의 계산 값을 캐시에 넣거나 메서드 몸체에서 변경되는 것들을 수집하는 데 익숙할 것이다. 임시 변수의 또 다른 용례는 코드 의도를 명확하게 하는 것이다. 
임시 변수가 한 번만 사용된다고 해도 유효한 선택이다. 

<br>

### 📍 3. 자동 및 수동 리팩토링

자동화된 IDE가 있기 때문에 리팩토링이 기능 동작에 영향을 주지 않는 코드 변경이 될 수 있다. 
IDE는 수십 가지의 리팩토링 자동화를 내장하고 있다. 코드를 변형하는 데 든 무수한 시간뿐만 아니라 수동으로 했을 때 발생하는 실수들을 수정하는 데 든 무수한 시간도 절약해 준다. 

코드를 수동으로 변경하면 실수하기 쉽다. 리팩토링할 때는 항상 테스트를 실행하라. 어떤 경우라도 메서드를 추출할 때 기존 동작에 문제가 없는지 확인해야 한다. 

<br>

### 📍 4. 과한 리팩토링?

<br>

#### 🔑 4-1 보상: 명확하고 테스트 가능한 단위들 

알고리즘에 있는 각 구현 세부 사항은 도우미 메서드에 숨겨져 있다. 각 도우미 메서드는 명확하고 고립된 방식으로 잘 표현되어 있으며, 다른 염려할 만한 군더더기가 없다. 

<br>

#### 🔑 4-2 성능 염려: 그러지 않아도 된다. 

성능이 즉시 문제되지 않는다면 어설픈 최적화 노력으로 시간을 낭비하기보다 코드를 깔끔하게 유지하라. 
최적화된 코드는 여러 방면에서 문제 소지가 있다. 일반적으로 코드 가독성이 낮고 유지 보수 비용이 증가하고 설계 또한 유연하지 않다.

반대로 깔끔한 설계는 성능을 위해 최적화할 때 즉시 대응할 수 있는 최선의 보호막이다. 깔끔한 설계는 코드를 이동시킬 수 있는 유연성을 제공하고 다른 알고리즘을 적용하는 데도 수월하다. 

**깔끔한 설계는 최적화를 위한 최선의 준비이다.**

<br>

### 📍 5. 마치며

단위 테스트는 기본 원칙을 깨지 않고 코드를 깔끔하게 유지해 주는 보호 장치를 제공한다. 시스템에서 작은 먼지들을 쓸어버리면서 좀 더 큰 그림인 설계를 볼 수 있게 되었다. 
