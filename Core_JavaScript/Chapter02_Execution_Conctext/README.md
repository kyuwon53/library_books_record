# 📖 2장 실행 컨텍스트  ✏️

**실행 컨텍스트**는 실행할 코드에 제공할 환경 정보들을 모아놓은 객체로, 자바스크립트의 동적 언어로서의 성격을 가장 잘 파악할 수 있는 개념이다.    

자바스크립트는 어떤 실행 컨텍스트가 활성화되는 시점에 선언된 변수를 위로 끌어올리고(호이스팅), 외부 환경 정보를 구성하고, `this` 값을 설정하는 등의 동작을 수행하는데, 이로 인해 다른 언어에서는 발견할 수 없는 특이한 현상들이 발생한다.    

## 01 실행 컨텍스트란? 

- 실행 컨텍스트: **실행할 코드에 제공할 환경 정보들을 모아놓은 객체**다.
- 동일한 환경에 있는 코드들을 실행할 때 필요한 환경 정보들을 모아 컨텍스트를 구성하고, 이를 콜 스택에 쌓아올렸다가, 가장 위에 쌓여있는 컨텍스트와 관련 있는 코드들을 실행하는 식으로 전체 코드의 환경과 순서를 보장한다. 
- '동일한 환경', 즉 하나의 실행 컨텍스트를 구성할 수 있는 방법으로 **전역공간, eval() 함수, 함수 등**이 있다. 
- 다종으로 생성되는 전역공간과 `eval`을 제외하면 **흔히 실행 컨텍스트를 구성하는 방법은 함수를 실행**하는 것뿐이다.

<br>

- 처음 자바스크립트 코드를 실행하는 순간 전역 컨텍스트가 콜 스택에 담긴다. 
- **전역 컨텍스트**라는 개념은 일반적인 실행 컨텍스트와 특별히 다를 것이 없다.
- 자바스크립트 파일이 열리는 순간 전역 컨텍스트가 활성화된다. 
  - 최상단의 공간은 코드 내부에서 별도의 실행 명령이 없어도 브라우저에서 자동으로 실행

<br>

- 한 실행 컨텍스트가 콜 스택의 맨 위에 쌓이는 순간이 곧 현재 실행할 코드에 관여하게 되는 시점임을 알 수 있다. 
- 기존 컨텍스트는 새로 쌓인 컨텍스트보다 아래에 위치할 수밖에 없다. 
- 어떤 실행 컨텍스트가 활성화될 때 자바스크립트 엔진은 해당 컨텍스트에 관련된 코드들을 실행하는 데 필요한 환경 정보들을 수집해서 실행 컨텍스트 객체에 저장한다. 

<br>

- `VariableEnvironment`: 현재 컨텍스트 내의 식별자들에 대한 정보 + 외부 환경 정보. 선언 시점의 `LexicalEnvironment`의 스냅샷으로, 변경 사항은 반영되지 않음 
- `LexicalEnvironment`: 처음에는 `VariableEnvironment`와 같지만 변경 사항이 실시간으로 반영됨
- `ThisBinding`: `this` 식별자가 바라봐야 할 대상 객체 

<br>

## 02 VariableEnvironment
- `VariableEnvironment`에 담기는 내용은 `LexicalEnvironment`와 같지만 최초 실행 시의 스냅샷을 유지한다는 점이 다르다. 
- 실행 컨텍스트를 생성할 때 `VariableEnvironment`에 정보를 먼저 담은 다음, 이를 그대로 복사해서 `LexicalEnvironment`를 만들고, 이후에는 `LexicalEnvironment`를 주로 활용한다. 
- `VariableEnvironment`와 `LexicalEnvironment`의 내부는 `environmentRecord`와 `outerEnvironmentReference`로 구성돼있다. 
  - 초기화 과정 중에는 사실상 완전히 동일하고 이후 달라진다. 

<br>

## 03 LexicalEnvironment

- 컨텍스트를 구성하는 환경 정보들을 사전에서 접하는 느낌으로 모아놓은 것 

### 3-1 environmentRecord와 호이스팅
- `environmentRecord`에는 현재 컨텍스트와 관련된 코드의 식별자 정보들이 저장된다. 
- 컨텍스트를 구성하는 함수에 지정된 매개변수 식별자, 선언한 함수가 있을 경우 그 함수 자체, var로 선언된 변수의 식별자 등이 식별자에 해당한다. 
- 컨텍스트 내부 전체를 처음부터 끝까지 쭉 훑어나가며 **순서대로** 수집한다. 
- 변수 정보를 수집하는 과정을 모두 마쳤더라도 아직 실행 컨텍스트가 관여할 코드들은 실행되기 전의 상태이다. 
- 코드가 실행되기 전에 이미 해당 환경에 속한 코드의 변수명들을 모두 알고 있게 되는 것이다.
- **자바스크립트 엔진은 식별자들을 최상단으로 끌어올려놓은 다음 실제 코드를 실행한다**
- **호이스팅** '끌어올리다'라는 의미

#### 호이스팅 규칙

- 인자를 함수 내부의 다른 코드보다 먼저 선언 및 할당이 이뤄진 것으로 간주할 수 있다.
- `environmentRecord`는 현재 실행될 컨텍스트의 대상 코드 내에 어떤 식별자들이 있는지에 관심이 있다. 
- 변수를 호이스팅할 때 변수명만 끌어올리고 할당 과정은 원래 자리에 그대로 남겨둔다. 
- 함수를 실행하는 순간 함수의 실행 컨텍스트가 생성된다. 
- 이때 변수명과 함수 선언의 정보를 위로 끌어올린다.(수집한다.)
- 변수는 선언부와 할당부를 나누어 선언부만 끌어올리는 반면 함수 선언은 함수 전체를 끌어올린다.

<br>

#### 함수 선언문과 함수 표현식
- 함수 선언문은 function 정의부만 존재하고 별도의 할당 명령이 없는 것을 의미한다. 
- 함수 표현식은 정의한 function을 별도의 변수에 할당하는 것을 말한다. 
- 함수 선언문의 경우 반드시 함수명이 정의돼 있어야하지만 함수 표현식을 없어도 된다. 

<br>

- 기명 함수 표현식은 외부에서는 함수명으로 함수를 호출할 수 없다.
- 함수명은 오직 함수 내부에서만 접근할 수 있다. 
- 함수 선언문은 전체를 호이스팅한 반면 함수 표현식은 변수 선언부만 호이스팅한다. 
- 함수를 다른 변수에 값으로써 **'할당'**한 것이 곧 **함수 표현식이다.**
- 원활한 협업을 위해서는 전역공간에 함수를 선언하거나 동명의 함수를 중복 선언하는 경우는 없어야만 한다.

### 3-2 스코프, 스코프 체인, outerEnvironmentReference
- 스코프란 식별자에 대한 유효범위이다. 
- 자바스크립트는 특이하게도 전역공간을 제외하면 **오직 함수에 의해서만** 스코프가 생성된다. 
- '식별자의 유효범위'를 안에서부터 바깥으로 차례로 검색해나가는 것을 **스코프 체인**이라 한다. 
- 이를 가능케 하는 것이 바로 `LexicalEnvironment`의 두 번째 수집 자료인 `outerEnvironmentReference`이다. 

#### 스코프 체인 
- `outerEnvironmentReference`은 현재 호출된 함수가 선언될 당시의 `LexicalEnvironment`를 참조한다.
- '선언될 당시', '선언하다'라는 행위가 실제로 일어날 수 있는 시점이란 콜 스택 상에서 어떤 실행 컨텍스트가 활성화된 상태일 뿐이다. 
- 모든 코드는 실행 컨텍스트가 활성화 상태일 때 실행되기 때문이다. 
- `outerEnvironmentReference`는 연결리스트 형태를 띈다. 
- 선언 시점의 `LexicalEnvironment`를 계속 찾아 올라가면 마지막엔 전역 컨텍스트의 `LexicalEnvironment`가 있다. 
- 또한 각 `outerEnvironmentReference`는 오직 자신이 선언된 시점의 `LexicalEnvironment`만 참조하고 있으므로 가장 가까운 요소부터 차례대로만 접근할 수 잇고 다른 순서로 접근하는 것은 불가능하다. 
- 여러 스코프에서 동일한 식별자를 선언한 경우에는 **무조건 스코프 체인 상에서 가장 먼저 발견된 식별자에만 접근 가능**하게 된다. 
- 전역 공간에서는 전역 스코프에서 생성된 변수에만 접근할 수 있다. 
- 함수 내부에서 변수를 선언했기 때문에 전역 공간에서 선언한 동일한 이름의 변수에는 접근할 수 없다. 이를 **변수 은닉화**하고 한다. 

<br>

#### 전역변수와 지역변수
- 전역 공간에서 선언한 변수는 전역변수
- 함수 내부에서 선언한 변수는 무조건 지역변수이다. 
- 코드의 안전성을 위해 가급적 전역변수 사용을 최소화하고자 노력하자.

<br>

## 04 this 
- 실행 컨텍스트의 `thisBinding`에는 `this`로 지정된 객체가 저장된다. 
- 실행 컨텍스트 활성화 당시에 `this`가 지정되지 않은 경우 `this`에는 전역 객체가 저장된다.
- 함수를 호출하는 방법에 따라 `this`에 저장되는 대상이 다르다.

<br>

## 05 정리 
- 실행 컨텍스트는 실행할 코드에 제공할 환경 정보들을 모아놓은 객체이다. 
- 실행 컨텍스트는 전역 공간에서 자동으로 생성되는 전역 컨텍스트와 eval 및 함수 실행에 의한 컨텍스트 등이 있다. 
- 실행 컨텍스트 객체는 활성화되는 시점에 `VariableEnvironment`, `LexicalEnvironment`, `ThisBinding`의 세 가지 정보를 수집한다. 

<br>

- 실행 컨텍스트를 생성할 때는 `VariableEnvironment`와 `LexicalEnvironment`가 동일한 내용으로 구성되지만 `LexicalEnvironment`는 함수 실행 도중에 변경되는 사항이 즉시 반영되는 반면 `VariableEnvironment`는 초기 상태를 유지한다. 
- `VariableEnvironment`와 `LexicalEnvironment`는 매개변수명, 변수의 식별자, 선언한 함수의 함수명 등을 수집하는 `environmentRecord`와 바로 직전 컨텍스트의 `LexicalEnvironment` 정보를 참조하는 `outerEnvironmentReference`로 구성돼 있다. 

<br>

- 호이스팅은 실행 컨텍스트가 관여하는 코드 집단의 최상단으로 이들을 '끌어올린다'고 해석하는 것이다. 
- 변수 선언과 값 할당이 동시에 이뤄진 문장은 '선언부'만을 호이스팅한다. 

<br>

- 스코프는 변수의 유효범위를 말한다. 
- `outerEnvironmentReference`는 해당 함수가 선언된 위치의 `LexicalEnvironment`를 참조한다. 
- 코드 상에서 어떤 변수에 접근하려고 하면 현재 컨텍스트의 `LexicalEnvironment`를 탐색해서 발견되면 그 값을 반환하고, 발견하지 못 할 경우 다시 `outerEnvironmentReference`에 담긴 `LexicalEnvironment`를 탐색하는 과정을 거친다. 
- 전역 컨텍스트의 `LexicalEnvironment`까지 탐색해도 해당 변수를 찾지 못하면 `undefined`를 반환한다. 

<br>

- 전역 컨텍스트의 `LexicalEnvironment`에 담긴 변수를 전역변수라 하고, 가급적 전역변수의 사용은 최소화하는 것이 좋다. 

- `this`에는 실행 컨텍스트를 활성화하는 당시에 지정된 `this`가 저장된다.
- 함수를 호출하는 방법에 따라 그 값이 달라지는데, 지정되지 않은 경우에는 전역 객체가 저장된다.
