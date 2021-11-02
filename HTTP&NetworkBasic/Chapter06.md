# 📚 그림으로 배우는 Http & Network Basic
## 📖 6장 HTTP 헤더 🔎

웹 사이트를 이용할 때 평소에는 볼 수가 없지만 HTTP의 리퀘스트와 리스폰스에는 반드시 HTTP 헤더가 포함되어 있다.

<br>

### 📍 1. HTTP 메시지 헤더

- HTTP 프로토콜의 리퀘스트와 리스폰스에는 반드시 메시지 헤더가 포함되어 있는데 메시지 헤더에는 클라이언트나 서버가 리퀘스트나 리스폰스를 처리하기 위한 정보가 들어 있다. 

##### 리퀘스트의 HTTP 메시지 
- 메소드, URI, HTTP 버전, HTTP 헤더 필드 등으로 구성되어 있다. 

##### 리스폰스의 HTTP 메시지
- HTTP 메시지와 HTTP 버전, 상태  코드(코드와 설명), HTTP 헤더 필드 등올 구성되어 있다. 
- 가장 다양한 정보를 가지고 있는 것이 HTTP 헤더 필드이다. 
- 헤더 필드는 리퀘스트와 리스폰스 양쪽 모두 존재하는데 HTTP 메시지에 관한 정보를 가지고 있다. 

<br>

### 📍 2. HTTP 헤더 필드

<br>

#### 📎 2-1 HTTP 헤더 필드는 중요한 정보를 전달한다

- HTTP 헤더 필드는 HTTP 메시지를 구성하는 요소의 하나이다. 
- 헤더 필드는 HTTP 프로토콜 중에서 클라이언트와 서버간의 통신에서 리퀘스트에도 리스폰스에도 사용되고 있고, 부가적으로 중요한 정보를 전달하는 역할을 담당한다. 
- 메시지 바디의 크기나 사용하고 있는 언어, 인증 정보 등을 브라우저나 서버에 제공하기 위해 사용되고 있다. 

<br>

#### 📎 2-2 HTTP 헤더 필드의 구조
- HTTP 헤더 필드는 헤더 필드 명과 필드 값으로 구성되어 있고 클론 ":" 으로 나뉘어져 있다. 
  -  `헤더 필드 명 : 필드 값`
  - `Content-Type:text/html`
- 하나의 HTTP 헤더 필드가 여러 개의 필드 값을 가질 수 있다. 

<br>

#### 📎 2-3 4종류의 HTTP 헤더 필드
- HTTP 헤더 필드는 그 용도에 따라 다음과 같이 4종류로 분류된다. 

<br>

##### 일반적 헤더 필드(General Header Fields)
- 리퀘스트 메시지와 리스폰스 메시지 둘 다 사용되는 헤더이다. 

##### 리퀘스트 헤더 필드(Request Header Fields)
- 클라이언트 측에서 서버 측으로 송신된 리퀘스트 메시지에 사용되는 헤더로 리퀘스트의 부가적 정보와 클라이언트의 정보, 리스폰스의 콘텐츠에 관한 우선 순위 등을 부가한다. 

##### 리스폰스 헤더 필드(Response Header Fields)
- 서버 측에서 클라이언트 측으로 송신한 리스폰스 메시지에 사용되는 헤더로 리스폰스의 정보와 서버의 정보, 클라이언트의 추가 정보 요구 등을 부가한다. 

##### 엔티티 헤더 필드(Entity Header Fields)
- 리퀘스트 메시지와 리스폰스 메시지에 포함된 엔티티에 사용되는 헤더로 콘텐츠 갱신 시간 등의 엔티티에 관한 정보를 부가한다. 

<br>

#### 📎 2-4 HTTP/1.1 헤더 필드 일람

<br>

##### 일반 헤더 필드
| 헤더 필드 명 | 설명 |
| :---: | :---: |
| Cache-Control | 캐싱 동작 지정 |
| Connection | Hop-by-hop 헤더, 커넥션 관리|
| Date | 메시지 생성 날짜 |
| Pragma | 메시지 제어 |
| Trailer | 메시지의 끝에 있는 헤더의 일람 |
| Transfer-Encoding | 메시지 바디의 전송 코딩 형식 지정 |
| Upgrade | 다른 프로토콜에 업그레이드 |
| Via | 프록시 서버에 관한 정보 |
| Warning | 에러 통지 |

<br>

##### 리퀘스트 헤더 필드
| 헤더 필드 명 | 설명 |
| :---: | :---: |
| Accept | 유저 에이전트가 처리 가능한 미디어 타입 |
| Accept-Charset | 문자셋 우선 순위|
| Accept-Encoding | 콘텐츠 인코딩 우선 순위 |
| Accept-Language | 언어(자연어) 우선 순위 |
| Authorization | 웹 인증을 위한 정보 |
| Expect | 서버에 대한 특정 동작의 기대 |
| From | 유저의 메일 주소 |
| Host | 요구된 리소스의 호스트 |
| If-Match | 엔티티 태그의 비교 |
| If-Modified-Since | 리소스의 갱신 시간 비교 |
| If-None-Match | 엔티티 태그의 비교(If-Match의 반대) |
| If-Range | 리소스가 갱신되지 않은 경우에 인티티의 바이트 범위의 요구를 송신|
| If-Unmodified-Since | 리소스의 갱신 시간 비교( If-Modified-Since의 반대) |
| Max-Authorization | 최대 전송 홉 수 |
| Proxy-Authorization | 프록시 서버의 클라이언트 인증을 위한 정보 |
| Range | 엔티티 바이트 범위 요구 |
| Referer | 리퀘스트중의 URI를 취득하는 곳 |
| TE | 전송 인코딩의 우선 순위 |
| User-Agent | HTTP 클라이언트의 정보 |

<br>

##### 리스폰스 헤더 필드
| 헤더 필드 명 | 설명 |
| :---: | :---: |
| Accept-Ranges | 바이트 단위의 요구를 수신할 수 있는지 없는지 여부 |
| Age | 리소스의 지정 경과 시간 |
| Etag | 리소스 특정하기 위한 정보 |
| Location | 클라이언트를 지정한 URI에 리다이렉트 |
| Proxy-Authenticate | 프록시 서버의 클라이언트 인증을 위한 정보 |
| Retry-After | 리퀘스트 재시행의 타이밍 요구 |
| Server | HTTP 서버 정보 |
| Vary | 프록시 서버에 대한 캐시 관리 정보 |
| WWW-Authenticate | 서버의 클라이언트 인증을 위한 정보 |

<br>

##### 엔티티 헤더 필드
| 헤더 필드 명 | 설명 |
| :---: | :---: |
| Allow | 리소스가 제공하는 HTTP 메소드 |
| Content-Encoding | 엔티티 바디에 적용되는 콘텐츠 인코딩 |
| Content-Language | 엔티티의 자연어 |
| Content-Length | 엔티티 바디의 사이즈(단위:바이트) |
| Content-Location | 리소스에 대응하는 대체 URI |
| Content-MD5 | 엔티티 바디의 메시지 다이제스트 |
| Content-Type | 엔티티 바디의 유효기간 날짜 |
| Expires | 엔티티 바디의 유효기간 날짜 |
| Last-Modified | 리소스의 최종 갱신 날짜 |

<br>

#### 📎 2-5 HTTP/1.1 이외의 헤더 필드
- HTTP에서 교환되는 HTTP 헤더 필드가 RFC2616에서 정의된 47종류만 있는 것은 아니다 
- 쿠키와 Set-Cookie, Content-Disposition와 같이, 그 외에 RFC에 정의되어 폭 넓게 사용되고 있는 것도 있다. 
- 비표준 헤더 필드는 RFC4229 HTTP Header Field Registrations에 정리되어 있다. 

<br>

#### 📎 2-6 End-to-end 헤더와 Hop-by-hop 헤더
- HTTP 레더 필드는 캐시와 비캐시 프록시의 동작을 정의하기 위해서 두 가지 카테고리로 분류되어 있다. 

##### End-to-end 헤더
- 리퀘스트나 리스폰스의 최종 수신자에게 전송된다. 
- 캐시에서 구축된 리스폰스 중 보존되야 하고, 다시 전송되지 않으면 안되도록 되어 있다. 

##### Hop-by-hop 헤더
- 한 번 전송에 대해서만 유효하고 캐시와 프록시에 의해서 전송되지 않는 것도 있다. 
- HTTP/1.1과 그 이후에서 사용되는 Hop-by-hop 헤더는 Connection 헤더 필드에 열거해야 한다. 

<br>

- HTTP/1.1에서 hop-by-hop 헤더에는 다음과 같은 것이 있다. 
- 여기에서 열거하는 8개의 헤더 필드 이외에는 모두 End-by-end 헤더에 분류된다. 
  - Connection
  - Keep-Alive
  - Proxy-Authenticate
  - Proxy-Authorization
  - Trailer
  - TE
  - Transfer-Encoding
  - Upgrade

<br>

### 📍 3. HTTP/1.1 일반 헤더 필드

- 일반 헤더 필드는 리퀘스트 메시지와 리스폰스 메시지 양쪽에서 사용되는 헤더이다.

<br>

#### 📎 3-1 Cache-Control

- Cache-Control 헤더는 디렉티브로 불리는 명령을 사용하여 캐싱 동작을 지정한다. 
- 지정한 디렉티브에는 파라미터가 있는 것과 없는 것도 있으며 여러 개의 디렉티브를 지정하는 경우에는 콤마 ","로 구분한다. 
- Cache-Control 헤더 필드의 디렉티브는 리퀘스트 및 리스폰스 할 때에 사용할 수 있다.
`Cache-Control: private, max-age=0, no-cache`

##### Cache-Control 디렉티브 일람
- 사용 가능한 디렉티브를 리퀘스트와 리스폰스로 나눠서 다음과 같이 나타낸다. 

###### 캐시 리퀘스트 디렉티브
| 디렉티브 | 파라미터 | 설명 |
| :---: | :---: | :---: |
| no-cache | 없음 | 오리진 서버에 강제적인 재검증 |
| no-store | 없음 | 캐시는 리퀘스트, 리스폰스의 일부분을 보존해서는 안됨 |
| max-age = [초] | 필수 | 리스폰스의 최대 age 값 |
| max-state(= [초]) | 생략 가능 | 기한이 지난 리스폰스를 수신 |
| min-fresh = [초] | 필수 | 지정한 시간 이후에 변경된 리스폰스를 보냄 |
| no-transform | 없음 | 프록시는 미디어 타입을 변환해서는 안됨 |
| only-if-cached | 없음 | 캐시에서 리소스를 취득 |
| cache-extension | - | 새로운 디렉티브를 위해서 토큰 |

###### 캐시 리스폰스 디렉티브
| 디렉티브 | 파라미터 | 설명 |
| :---: | :---: | :---: |
| public | 없음 | 어딘가에 리스폰스 캐시가 가능 |
| private | 생략 가능 | 특정 유저에 대해서만 리스폰스 |
| no-cache | 생략 가능 | 유효성의 재확인 없이는 캐시는 사용해서는 안됨 |
| no-store | 없음 | 캐시는 리퀘스트, 리스폰스의 일부분을 보존해서는 안됨 |
| no-transform | 없음 | 프록시는 미디어 타입을 변경해서는 안됨 |
| must-revalidate | 없음 | 캐시 가능하지만 오리진 서버에 리소스의 재확인을 요구 |
| proxy-revalidate | 없음 | 중간 캐시 서버에 대해서 캐시했던 리스폰스의 유효성의 재확인을 요구 |
| max-age = [초] | 필수 | 리스폰스의 최대 Age 값 |
| s-maxage = [초] | 필수 | 공유 캐시 서버의 리스폰스 최대 Age 값 |
| cache-extension | - | 새로운 디렉티브를 위한 토큰 |

<br>

##### 캐시가 가능한지 여부를 나타내는 디렉티브
###### 1) public 디렉티브
> Cache-control: public

- public 디렉티브가 사용되는 경우, 다른 유저에게도 돌려줄 수 있는 캐시를 해도 좋다는 것을 명시적으로 나타낸다. 

###### 2) private 디렉티브 
> Cache-control: private

- private 디렉티브가 사용되는 경우, 리스폰스는 특정 유저만을 대상으로 하고 있다는 것을 나타낸다. 
- public 디렉티브와 기능이 반대이다. 
- 캐시 서버는 특정 유저를 위해서 리소스를 캐시할 수 있지만, 다른 유저로부터 같은 리퀘스트가 온다고 하더라도 그 캐시를 반환하지 않도록 한다. 

###### 3) no-cache 디렉티브
> Cache-control: no-cache
- no-cache 디렉티브는 캐시로부터 오래된 리소스가 반환되는 것을 막기 위해 사용된다. 
- 캐시된 리스폰스를 클라이언트가 받아 들이지 않음을 나타냄
- 즉, 중간 캐시 서버가 오리진 서버까지 리퀘스트를 전송해야 한다. 
- 서버의 리스폰스에 no-cache 디렉티브가 사용된 경우, 캐시 서버는 리소스를 저장할 수가 없다. 
- 오리진 서버는 캐시 서버가 이후의 리퀘스트에서 리소스의 유효성을 재확인하지 않고는 그 리스폰스를 사용하지 못하도록 한다. 

> Cache-control: no-cache=Location

- 서버의 리스폰스로 no-cache의 필드 값에 헤더 필드 명이 지정된 경우에는 이 지정된 헤더 필드만 캐시할 수 없다. 
- 즉, 지정된 헤더 필드 이외에는 캐시하는 것이 가능하다.
- 이 파라미터는 리스폰스 디렉티브만 사용할 수 있다. 

<br>

##### 캐시로 보존 가능한 것을 제어하는 디렉티브
###### 1) no-store 디렉티브
> Cache-control: no-store
- no-store 디렉티브가 사용된 경우, 리퀘스트(그와 대응되는 리스폰스) 혹은 리스폰스에 기밀 정보가 포함되어 있음을 나타낸다. 
- 캐시는 리퀘스트, 리스폰스의 일부분을 로컬 스토리지에 보존해서는 안 되도록 지정한다. 

<br>

##### 캐시 기한이나 검증을 지정하는 디렉티브
###### 1) s-maxage 디렉티브
> Cache-control: s-maxage=604800 (단위 : 초)
- s-maxage 디렉티브의 기능은 max-age 디렉티브와 동일한데 다른 점은 여러 유저가 이용 할 수 있는 공유 캐시 서버에만 적용된다는 것이다. 
- 같은 유저에 반복해서 리스폰스를 반환하는 캐시 서버는 무효한 디렉티브이다. 
- s-maxage 디렉티브가 사용되는 경우, Expires 헤더 필드와 max-age 디렉티브는 무시된다. 

<br>

###### 2) max-age 디렉티브
> Cache-control: max-age=604800(단위: 초)
- 클라이언트의 리퀘스트로 max-age 디렉티브가 사용되었다면 지정되었던 값보다 새로운 경우에는 캐시되었던 리소스를 받아들일 수 있다. 
- 지정한 값이 0이면 캐시 서버는 리퀘스트를 항상 오리진 서버에 넘길 필요가 있다. 
- 서버의 리스폰스에서 max-age 디렉티브가 사용되는 경우, 캐시 서버가 유효성의 재확인을 하지 않고 리소스를 캐시에 보존해 두는 최대 시간을 나타낸다
- HTTP/1.1 캐시 서버는 동시에 Expires 헤더 필드가 달린 경우에는 max-age 디렉티브의 지정을 우선하고 Expires 헤더 필드를 무시한다. 
- HTTP/1.0 캐시 서버는 반대로 max-age 디렉티브가 무시된다. 

<br>

###### 3) min-fresh 디렉티브
> Cache-Control: min-fresh=60 (단위 : 초)

- `min-fresh` 디렉티브가 사용되는 경우, 캐시된 리소스가 적어도 지정된 시간은 최신 상태의 것을 반환하도록 캐시 서버에 요구한다. 
- 예를 들면, 60초로 지정되어 있는 경우에는 60초 이내에 유효 기한이 끝나는 리소스를 리스폰스로 반환하면 안된다.

<br>

###### 1) max-state 디렉티브
> Cache-Control: max-stale = 3600 (단위: 초)

- `max-stale` 디렉티브가 사용되는 경우, 캐시된 리소스의 유효 기한이 끝났더라도 받아들일 수 있음을 나타냄
- 디렉티브에 값이 지정되어 있지 않는 경우는 클라이언트는 아무리 시간이 경과했더라도 리스폰스를 받아 들인다. 
- 값이 지정되어 있는 경우에는 유효 기한이 지난 후로부터 지정 시간 내라면 받아 들인다는 뜻을 서버에 전달한다. 

<br>

###### 2) only-if-cached 디렉티브 
> Cache-Control: only-if-cached

- `only-if-cached` 디렉티브가 사용되는 경우, 클라이언트는 캐시 서버에 대해서 목적한 리소스가 로컬 캐시에 있는 경우만 리스폰스를 반환하도록 요구한다. 
- 즉, 캐시 서버에서 리스폰스의 리로드와 유효성을 재확인하지 않도록 요구한다. 
- 캐시 서버가 로컬 캐시로부터 응답할 수 없는 경우에는 "504 Gateway Timeout" 상태를 반환한다. 

<br>

###### 3) must-revalidate 디렉티브 
> Cache-Control: must-revalidate

- `must-revalidate` 디렉티브가 사용되는 경우, 리스폰스의 캐시가 현재도 유효한지 아닌지의 여부를 오리진 서버에 조회를 요구한다. 
- 프록시가 오리진 서버에 도달할 수 없고, 리소스를 다시 요구할 수 없는 경우에는 캐시는 클라이언트에 `504(Gateway Timeout)`를 반환한다. 
- 또한, `must-revalidate` 디렉티브가 사용되는 경우, 리퀘스트에서 `max-stale` 디렉티브를 사용하고 있더라도 무시한다.(효과를 없앱니다.)

<br>

###### 4) proxy-revalidate 디렉티브
> Cache-Control: proxy-revalidate

- `proxy-revalidate` 디렉티브가 사용되는 경우, 모든 캐시 서버에 대해서 이후의 리퀘스트로 해당 리스폰스를 반환할 때는 반드시 유효성 재확인을 하도록 요구한다. 

<br>

###### 5) no-transform 디렉티브
> Cache-Control: no-transform

- `no-transform` 디렉티브가 사용되는 경우, 리퀘스트와 리스폰스의 어느 쪽에 있어서도 캐시가 엔티티 바디의 미디어 타입을 변경하지 않도록 지정한다. 
- 캐시 서버 등에 의해서 이미지가 압축되는 것을 방지한다. 

<br>

##### Cache-Control 확장
###### 1) cache-extension 토큰
> Cache-Control: private, community="UCI"

- `Cache-Control` 헤더 필드는 `cache-extension` 토큰을 사용하여 디렉티브를 확장할 수 있다. 
- `extension tokens`는 이해할 수 있는 캐시 서버에 대해서만 의미가 있다. 

<br>

#### 📎 3-2 Connection
- 프록시에 더 이상 전송하지 않는 헤더 필드를 지정
- 지속적 접속 관리

##### 프록시에 더 이상 전송하지 않는 헤더 필드를 지정
> Connection: 더 이상 전송하지 않는 헤더 필드 명
- 클라이언트의 리퀘스트 혹은 서버의 리스폰스에서 `Connection` 헤더 필드를 사용하며 프록시 서버에 더 이상 전송하지 않는 헤더 필드(hop-by-hop 헤더)를 지정할 수 있다

<br>

##### 지속적 접속 관리 
> Connection: Close
- `HTTP/1.1`에서는 지속적 접속이 디폴트로 되어 있다. 
- 리퀘스트를 송신했던 클라이언트는 접속이 계속 유지되면서 추가 리퀘스트를 송신하도록 한다. 
- 서버 측에서 명시적으로 접속을 끊고 싶을 경우에는 `Connection` 헤더 필드에 `Close`라고 지정한다. 
> Connection: Keep-Alive
- `HTTP/1.1` 이전 버전의 HTTP에서는 지속적 접속이 디폴트가 아니었다. 
- 오래된 버전의 HTTP에서 지속적 접속을 하고 싶은 경우에는 `Connection` 헤더 필드에 `Keep-Alive`라고 지정해야 한다. 


<br>

#### 📎 3-3 Date

- Date 헤더 필드는 HTTP 메시지를 생성한 날짜를 나타낸다. 
- `HTTP/1.1`에서는 RFC1123에 다음과 같이 날짜 포맷이 지정되어 있다. 
> Date: Tue, 03 Jul 2012 04:40:59 GMT

<br>

- 오래된 버전의 HTTP에서는 RFC850에 정의된 다음과 같은 포맷을 사용한다. 
> Date: Tue, 03-Jul-12 04:40:59 GMT

<br>

- 표준 C 라이브러리에 포함되어 있는 `asctime()` 함수의 출력 형식과 같다. 
> Date: Tue Jul 03 04:40:59 2012

<br>

#### 📎 3-4 Pragma
- `Pragma` 헤더 필드는 HTTP/1.1 보다 오래된 버전의 흔적으로 HTTP/1.0 와의 후방 호환성만을 위해서 정의되어 있는 헤더 필드이다. 
> Pragma: no-cache
- 일반 헤더 필드이지만 클라이언트의 리퀘스트에서만 사용된다. 
- 클라이언트는 캐시된 리소스의 리스폰스를 원하지 않음을 모든 중간 서버에 알리기 위해 사용된다.
- 모든 중간 서버가 HTTP/1.1을 기준으로 구성되어 있다면 캐시 동작 지정은 `Cache-Control: no-cache`를 사용하는 것이 바람직하지만, 중간 서버의 HTTP 버전을 모두 파악한 후에 리퀘스트를 보내는 일은 현실적으로 없다. 

> Cache-Control: no-cache <br>
> Pragma: no-cache

<br>

#### 📎 3-5 Trailer

<br>

- `Trailer` 헤더 필드는 메시지 바디의 뒤에 기술되어 있는 헤더 필드를 미리 전달할 수 있다. 
- HTTP/1.1에 구현되어 있는 청크 전송 인코딩을 사용하고 있는 경우에 사용 가능하다. 
> HTTP/1.1 200 OK<br>
> Date: Tue, 03 Jul 2012 04:40:56 GMT<br>
> Content-Type: text/html<br>
> ...<br>
> Transfer-Encoding: chunked<br>
> **Trailer: Expires**<br>
><br>
> ...(메시지 바디)... <br>
> 0 <br>
> **Expires: Tue, 28 Sep 2004 23:59:59 GMT**

<br>

#### 📎 3-6 Transfer-Encoding
- `Transfer-Encoding` 헤더 필드는 메시지 바디의 전송 코딩 형식을 지정하는 경우에 사용된다. 
- HTTP/1.1에서 전송 코딩 형식으로 청크 전송만이 정의되어 있다. 
> HTTP/1.1 200 Ok <br>
> Date: Tue, 03, Jul 2012 04:40:56 GMT <br>
> Cache-Control: public, max-age=604800 <br>
> Content-Type: text/javascript; charset=utf-8 <br>
> Expires: Tue, 10 Jul 2012 04:40:56 GMT <br>
> X-Framge-Options: DENY <br>
> X-XSS-Protection: 1; mode=block <br>
> Content-Encoding: gzip <br>
> **Transfer-Encoding: chunked** <br>
> Connection: keep-alive <br>
> <br>
> Cf0  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<- 16진수(10진수로 
> 3312) <br>
> ...3312bytes 정도의 chunk 데이터 <br>
> 392 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <- 16진수(10진수로 914) <br>
> ...914bytes 정도의 chunk 데이터 <br>
> 0

- `Transfer-Encoding` 헤더 필드로 지정한 것처럼 청크 전송 코딩이 유효한 상태이고 3,312 bytes와 912 bytes의 청크 데이터로 분할되어 있다.

<br>

#### 📎 3-7 Upgrade
<br>
- Upgrade 헤더 필드는 HTTP 및 다른 프로토콜의 새로운 버전이 통신에 이용되는 경우에 사용된다. 
- 지정하는 대상이 전혀 다른 통신 프로토콜이라고 하더라도 문제 없다. 
- Upgrade 헤더 필드에 의해서 업그레이드 되는 대상은 클라이언트와 인접한 서버 사이뿐이기 때문에 Upgrade 헤더 필드를 사용하는 경우는 `Connection:Upgrade`도 지정할 필요가 있다. 
- Upgrade 헤더 필드가 달린 리퀘스트에 대해서 서버는 상태 코드 `101 Switching Protocols`이라는 리스폰스로 응답할 수 있다.

<br>

#### 📎 3-8 Via

<br>

- Via 헤더 필드는 클라이언트와 서버 간의 리퀘스트 혹은 리스폰스 메시지의 경로를 알기 위해서 사용된다. 
- 프록시 혹은 게이트웨이는 자신의 서버 정보를 Via 헤더 필드에 추가한 뒤에 메시지를 전송한다. 
- 이것은 `traceroute`와 메일의 `Received` 헤더의 기능과 유사하다. 
- Via 헤더 필드는 전송된 메시지의 추적과 리퀘스트 루프의 회피 등에 사용되기 때문에 프록시를 경유하는 경우에는 반드시 부가할 필요가 있다. 
- Via 헤더는 배송 경로를 알기 위해 TRACE 메소드와 연계해서 자주 사용된다. 

<br>

#### 📎 3-9 Warning

<br>

- Warning 헤더는 HTTP/1.0 리스폰스 헤더(Retry-After)가 HTTP/1.1에서 변경된 것으로, 리스폰스에 관한 추가 정보를 전달한다. 
- 기본적으로 캐시에 관한 문제의 경고를 유저에 전달한다. 
> Warning: 113 gw.hackr.jp:8080 "Heuristic expiration"Tue, 03 Jul => 2012 05:09:44 GMT

- Warning 헤더 형식은 다음과 같이 되어 있다. 마지막 날짜는 생략할 수 있다. 
> Warning: [경고 코드][경고한 호스트:포트 번호]"[경고문]" ([날짜])

##### HTTP/1.1 경고 코드 

| 코드  | 경고문 | 설명 |
| :---: | :---: | :---: |
|  110  | Response is state | 프록시가 유효기간이 지난 리소스를 반환했다 |
|  111  | Revalidation failed | 프록시가 리소스의 유효성 재확인에 실패했다(서버에 도달할 수 없는 등) |
|  112  | Disconnection operation | 프록시가 네트워크로부터 고의로 끊겨 있다 |
|  113  | Heuristic expiration | 리스폰스가 24시간이상 경과하고 있는 경우(캐시의 유효기한을 24시간 이상으로 설정하고 있는 경우) |
|  199  | Miscellaneous warning | 임의의 경고문 |
|  214  | Transformation applied | 프록시가 인코딩과 미디어 타입 등에 대응해서 무언가의 처리를 한 경우 |
|  299  | Miscellaneous persistent warning | 임의의 경고문|



