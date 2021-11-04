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

<br>

### 📍 4. 리퀘스트 헤더 필드

<br>

- 리퀘스트 헤더 필드는 클라이언트 측에서 서버 측으로 송신된 리퀘스트 메시지에 사용되는 헤더로, 리퀘스트의 부가 정보와 클라이언트의 정보, 리스폰스의 콘텐츠에 관한 우선 순위 등을 추가한다. 

<br>

#### 📎 4-1 Accept

> Accept: text/html, application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8

- Accept 헤더 필드는 유저 에이전트에 처리할 수 있는 미디어 타입과 미디어 타입의 상대적인 우선 순위를 전달하기 위해서 사용된다. 
- 미디어 타입의 지정은 "타입/서브 타입"으로서 한번에 여러 번 설정할 수도 있다. 

<br>

- 미디어 타입은 다음과 같은 것들이 있다.
  - 텍스트 파일 
    - text/html, text/plain, text/css ...
    - application/xhtml+xml, application/xml ...
  - 이미지 파일
    - image/jpeg, image/gif, image/png ...
  - 동영상 파일
    - video/mpeg, video/quicktime ...
  - 애플리케이션용 바이너리 파일
    - application/octet-stream, application/zip ...

<br>

-  브라우저가 PNG 이미지를 표시하지 못하는 경우에는 Accept에 image/png를 지정하지 않고, 처리 가능한 image/gif와 image/jpeg 등을 지정하도록 한다. 
- 표시하는 미디어 타입에 우선 순위를 붙이고 싶을 경우에는 세미콜론 `:` 으로 구분하고 `"q="`로 표시할 품질 지수를 더한다.
- 품질 계수는 0~1의 범위의 수치를(소수점 3자리까지)로 1이 높은 쪽이다. 
- 품질 계수의 지정이 없는 경우에는 암묵적으로 `"q=1.0"`을 나타낸다.
- 서버가 복수의 콘텐츠를 반환할 수 있는 경우에는 가장 높은 품질 계수의 미디어 타입으로 반환할 필요가 있다. 

<br>

#### 📎 4-2 Accept-Charset

<br>

>Accept-Charset:iso-8859-5, unicode-1-1:q+0.8

- Accept-Charset 헤더 필드는 유저 에이전트에서 처리할 수 있는 문자셋으로, 문자셋의 상대적인 우선 순위를 전달하기 위해서 사용된다. 
- 문자셋은 한번에 여러 개를 지정할 수 있다. 
- Accept 헤더 필드와 마찬가지로, 품질 지수에 의해 상대적 우선 순위를 표시한다. 
- 이 헤더 필드는 서버 구동형 네고시에이션에 이용된다. 

<br>

#### 📎 4-3 Accept-Encoding

> Accept-Encoding: gzip, deflate

- Accept-Encoding 헤더 필드는 유저 에이전트가 처리할 수 있는 콘텐츠 코딩과 콘텐츠 코딩의 상대적인 우선 순위를 전달하기 위해서 사용된다. 
- 콘텐츠 코딩의 지정은 한번에 여러 개를 지정할 수 있다. 

<br>

- 콘텐츠 코딩은 다음과 같은 것들이 있다. 
  - gzip 
    - 파일 압축 프로그램 gzip(GNU zip)에서 생성된 인코딩 포맷(RFC1952)으로 Lempel-Ziv 부호(LZ77)와 32비트 CRC를 사용한다. 
  - compress
    - UNIX 파일 압축 프로그램 `"compress"`에 의해서 만들어진 인코딩 포맷으로 Lempel-Ziv-Welch 부호(LZW)를 사용한다.
  - deflate
    - Zlib 포맷(RFC1950)과 deflate 압축 알고리즘(RFC1951)에 의해서 만들어진 인코딩 포맷을 조합한 것이다. 
  - identity
    - 압축과 변형을 하지 않는 디폴트 인코딩 포맷이다.

<br>

- Accept 헤더 필드와 같이 품질지수에 의해서 상대적인 우선 순위를 표시한다. 
- 또한, `*`를 지정하면 와일드 카드로서 모든 인코딩 포맷을 가리킨다. 

<br>

#### 📎 4-4 Accept-Language
> Accept-Language: ko-kr, en-us;q=0.7,en;q=0.3

- Accept-Language 헤더 필드는 유저 에이전트가 처리할 수 있는 자연어의 세트(한국어와 영어라는 의미)와 자연어 세트의 상대적인 우선 순위를 전달하기 위해서 사용된다. 
- 자연어 세트는 한번에 여러 개를 지정할 수 있다. 
- Accept 헤더 필드와 같이 품질 지수에 의해 상대적인 우선 순위를 나타낸다.
- 한국어 리소스가 있는 경우에는 한국어로, 없으면 영어 리소스로 리스폰스를 받고 싶다는 것을 나타내고 있다. 

<br>

#### 📎 4-5 Authorization

<br>

> Authorization: Basic dWVub3NlbjpwYXNzd29yZA==

- Authorization 헤더 필드는 유저 에이전트의 인증 정보(크리덴셜 값)을 전달하기 위해서 사용된다.
- 통상, 서버에 인증을 받으려 하는 유저 에이전트는 상태 코드 401 리스폰스의 뒤에 리퀘스트에 Authorization 헤더 필드를 포함한다. 
- 공유 캐시가 Authorization 헤더 필드를 포함하는 리퀘스트를 받은 경우에는 조금은 다른 동작을 한다. 
- HTTP 엑세스 인증과 Authorization 헤더 필드에 대해서는 다음 장에서 상세하게 설명한다. 

<br>

#### 📎 4-6 Expect

<br>

> Expect: 100-continue

- Expect 헤더 필드는 클라이언트가 서버에 특정 동작 요구를 전달한다. 
- 기대하고 있는 요구에 서버가 응답하지 못해서 에러가 발생하는 경우에는 상태 코드 `417 Expectation Failed`를 반환한다.
- 클라이언트는 이 헤더 필드에 원하는 확장을 딸려 보낼 수 있지만 HTTP/1.1의 사양에서는 `100-continue(상태 코드 100 Continue의 의미)`만 정의되어 있다.
- 상태 코드 100 리스폰스를 가진 클라이언트는 리퀘스트할 대에 `Expect: 100-continue`로 지정해야 한다.

<br>

#### 📎 4-7 From

- From 헤더 필드는 유저 에이전트를 사용하고 있는 유저의 메일 주소를 전달한다. 
- 기본적으로는 검색 엔진 등의 에이전트 책임자에게 연락처 메일 주소를 나타내는 목적으로 사용된다. 
- 에이전트를 사용하는 경우에는 되도록 From 헤더 필드를 포함해야 한다 (에이전트에 따라서는 User-Agent 헤더 필드에 메일 주소를 포함하고 있는 것도 있다).

<br>

#### 📎 4-8 Host
> Host: www.hackr.jp

- Host 헤더 필드는 리퀘스트한 리소스의 인터넷 호스트와 포트 번호를 전달한다. 
- Host 헤더 필드는 HTTP/1.1에서 유일한 필수 헤더 필드이다. 
- Host 헤더 필드가 존재하는 이유는 1대의 서버에서 복수의 도메인을 할당할 수 있는 가상 호스트의 구조와 매우 깊은 관련이 있다. 

<br>

- 리퀘스트가 서버에 오면 호스트 명을 IP 주소로 해결해 리퀘스트가 처리된다.
- 같은 IP 주소로 복수의 도메인이 적용되어 있다고 한다면 어느 도메인에 대한 리퀘스트인지 알 수가 없다. 
- Host 헤더 필드에 리퀘스트를 받을 호스트명을 명확하게 해둘 필요가 있다. 
- 서버에 호스트 명이 설정되어 있지 않는 경우에는 아래와 같이 값을 비워서 보낸다
 > Host:

 <br>

#### 📎 4-9 If-Match

- `If-xxx`라는 서식의 리퀘스트 헤더 필드는 조건부 리퀘스트라고 부른다. 
- 조건부 리퀘스트를 받은 서버는 지정된 조건에 맞는 경우에만 리퀘스트를 받는다. 

> If-Match: "123456"

- If-Match 헤더 필드는 조건부 리퀘스트의 하나로 서버 상의 리소스를 특정하기 위해서 엔티티 태그(ETag) 값을 전달한다. 
- 서버는 약한 ETag 값을 사용할 수 없다.(ETag 헤더 필드의 조항을 참조)
- 서버는 If-Match의 필드 값과 리소스의 ETag 값이 일치한 경우에만 리퀘스트를 받아들일 수 있다. 
- 일치하지 않으면 상태 코드 `412 Precondition Failed` 리스폰스를 반환한다.
- If-Match 필드 값에 `*`를 지정할 수도 있다. 이 경우에는 ETag 값에 구애받지 않고 리소스가 존재하면 리퀘스트를 처리할 수 있다.

<br>

#### 📎 4-10 If-Modified-Since

> If-Modified-Since: Thu, 15 Apr 2004 00:00:00 GMT

- `If-Modified-Since` 헤더 필드는 조건부 리퀘스트의 하나로 리소스가 갱신 날짜가 필드 값보다 새롭지 않다면 리퀘스트를 받아들이겠다는 뜻을 전달한다. 
- 필드 값에 지정된 날짜 이후에, 지정한 리소스가 갱신되어 있지 않은 경우에는 상태 코드 `304 Not Modified` 리스폰스를 반환한다. 

<br>

#### 📎 4-11 If-None-Match

- If-None-Match 헤더 필드는 조건부 리퀘스트의 하나로 If-Match 헤더 필드와는 반대로 동작을 한다. 
- If-None-Match의 필드 값에 지정된 엔티티 태그(ETag) 값이 지정된 리소스의 ETag 값과 일치하지 않으면 리퀘스트를 받아들이겠다는 뜻을 전달한다. 
- GET과 HEAD 메소드에서 If-None-Match 헤더 필드를 사용함으로써 최신의 리소스를 요구하는 것이 되기 때문에 If-Modified-Since 헤더 필드를 사용하는 것과 비슷하다. 

<br>

#### 📎 4-12 If-Range
- If-Range 헤더 필드는 조건부 리퀘스트의 하나로 If-Range로 지정한 필드 값(ETag 값, 혹은 날짜를 지정)과 지정한 리소스의 ETag 값 혹은 날짜가 일치하면 Range 리퀘스트로서 처리하고 싶다는 것을 전달한다. 
- 일치하지 않는 경우에는 리소스 전체를 반환한다.
- 서버 측의 리소스가 갱신되어 있는 경우, 클라이언트 측에서 가지고 있는 리소스의 일부분은 뮤효한 것이 되기 때문에 Range 리퀘스트는 당연히 무효하다. 
- 서버는 일단 상태 코드 `412 Precondition Failed` 리스폰스를 반환하고 클라이언트에 다시 리퀘스트를 보내도록 재촉한다. 

<br>

#### 📎 4-13 If-Unmodified-Since

<br>

> If-Unmodified-Since: Thu, 03 Jul 2012 00:00:00 GMT

- If-Unmodified-Since 헤더 필드는 If-Modified-Since 헤더 필드와 반대로 동작을 한다. 
- 지정된 리소스가 필드 값에 지정된 날짜 이후에 갱신되어 있지 않는 경우에만 리퀘스트를 받아들이도록 전달한다. 
- 지정된 날짜 이후에 갱신된 경우에는 상태 코드 `412 Precondition Failed` 리스폰스를 반환한다. 

<br>

#### 📎 4-14 Max-Forwards

<br>

> Max-Forwards: 10

- Max-Forwards 헤더 필드는 TRACE 혹은 OPTIONS 메소드에 의한 리퀘스트를 할 때에 전송해도 좋은 서버 수의 최대치를 10진수 정수로 지정한다. 
- 서버는 다음 서버에 리퀘스트를 전송할 때는 Max-Forwards 값에서 1을 빼서 다시 세트한다. 
- Max-Forwards 값이 0인 리퀘스트를 받은 경우에는 전송하지 않고 리스폰스를 반환할 필요가 있다. 

<br>

- HTTP를 사용한 통신에서는 리퀘스트가 프록시 서버 등 여러 대의 서버를 경유해 가는 경우가 있다. 
- 도중에 프록시 서버에서 무언가의 원인으로 리퀘스트 전송이 실패하게 되면 클라이언트에는 리스폰스가 되돌아 오지 않기 때문에 알 수가 없다. 
- 이러한 문제가 발생한 경우의 원인 조사에 Max-Forwards 헤더 필드는 활용된다. 
- 필드 값이 0이 되었던 서버가 리스폰스를 하기 때문에 그 서버까지의 상황을 알 수 있다. 

<br>

#### 📎 4-15 Proxy-Authorization

<br>

> Proxy-Authorization: Basic dGlwOjkpNLAGfFY5

- Proxy-Authorization 헤더 필드는 프록시 서버에서의 인증 요구를 받아들인 때에 인증에 필요한 클라이언트의 정보를 전달한다. 
- 클라이언트와 서버의 HTTP 엑세스 인증과 비슷한데 다른 점은 클라이언트와 프록시 사이에 인증이 이루어진다는 것이다. 
- 클라이언트와 서버의 경우, Authorization 헤더 필드와 같은 역할을 한다. 

<br>

#### 📎 4-16 Range

<br>

> Range: bytes=5001-10000

- Range 헤더 필드는 리소스의 일부분만 취득하는 Range 리퀘스트를 할 때 지정 범위를 전달한다. 
- Range 헤더 필드가 달린 리퀘스트를 받아들인 서버가 리퀘스트를 처리할 수 있는 경우에는 상태 코드 `206 Partial Content` 리스폰스를 반환한다.
- Range 리퀘스트를 처리할 수 없는 경우에는 상태 코드 200 OK 리스폰스로 리소스 전체를 반환한다. 

<br>

#### 📎 4-17 Referer

<br>

> Referer: http://www.hackr.jp/index.htm

- Referer 헤더 필드는 리퀘스트가 발생한 본래 리소스의 URI를 전달한다.
- 기본적으로 Referer 헤더 필드는 보내져야 하지만, 브라우저의 주소창에 직접 URI를 입력한 경우와 보안상 바람직하지 않다고 판단된 경우에는 보내지 않아도 괜찮다. 
- 본래 리소스의 URI의 쿼리에 ID 및 패스워드와 비밀 정보 등이 포함되어 있는 경우, Referer를 통해서 그 정보가 다른 서버에 누설되어 버릴 가능성이 있다. 
- 또한, Referer 철자는 "Referer"가 올바르지만, 잘못된 철자 그대로 사용되고 있다. 

<br>

#### 📎 4-18 TE

<br>

> TE: gzip, deflate;q=0.5

- TE 헤더 필드는 리스폰스로 받을 수 있는 전송 코딩의 형식과 상대적인 우선순위를 전달한다. 
- Accept-Encoding 헤더 필드와 매우 비슷하지만 여기선 전송 코딩에 적용된다. 
- TE 헤더 필드는 전송 코딩의 지정 이외에 Trailer를 동반하는 청크 전송 인코딩 형식을 지정하는 것이 가능하다. 
- 이 경우, 필드 값에 `"trailers"`라고 기록한다.
> TE: trailers

<br>

#### 📎 4-19 User-Agent

<br>

> User-Agent:Mozila/5.0 (Windows NT 6.1) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.162 Sagari/535.195

- User-Agent 헤더 필드는 리퀘스트를 생성한 브라우저와 유저 에이전트의 이름 등을 전달하기 위한 필드이다. 
- 로봇 엔진의 리퀘스트의 경우에는 로봇 엔진의 책임자 메일 주소가 부가된 것도 있다. 
- 또는 프록시 경유로 리퀘스트의 경우에는 프록시 서버의 이름 등이 부가된 것도 있다.

<br>

### 📍 5. 리스폰스 헤더 필드

<br>

- 리스폰스 헤더 필드는 서버 측으로부터 클라이언트 측으로 송신되는 리스폰스 메시지에 적용된 헤더로 리스폰스의 부가 정보나 서버의 정보, 클라이언트에 부가 정보 요구 등을 나타낸다. 

<br>

#### 📎 5-1 Accept-Ranges

<br>

> Accept-Ranges: bytes

- Accept-Ranges 헤더 필드는 서버가 리소스의 일부분만 지정해서 취득할 수 있는 Range 리퀘스트를 접수할 수 있는지 여부를 전달한다. 
- 지정 가능한 필드 값은 2개이며 수신 가능한 경우에는 `"bytes"`, 수신 불가능한 경우에는 `"none"`이라고 기록한다.

<br>

#### 📎 5-2 Age

<br>

> Age: 600

- Age 헤더 필드는 얼마나 오래 전에 오리진 서버에서 리스폰스가 생성되었는지를 전달한다. 
- 필드 값의 단위는 초이다. 
- 리스폰스한 서버가 캐시 서버라면, 캐시된 리스폰스가 다시 실증되었던 때부터 검증한 시간이 된다. 
- 프록시가 리스폰스를 생성했다면 Age 헤더 필드는 필수이다. 

<br>

#### 📎 5-3 ETag

<br>

> ETag: "82e22293907ce725faf67773957acd12"

- ETag 헤더 필드는 엔티티 태그라고 불리며 일의적으로 리소스를 특정하기 위한 문자열을 전달한다. 
- 서버는 리소스마다 ETag 값을 할당한다. 
- 리소스가 갱신되면 ETag 값도 갱신할 필요가 있다. 
- ETag 값의 문자에는 특별히 룰이 정해져 있지 않고 서버에 따라 다양한 ETag 값을 할당한다. 

**강력한 ETag 값과 약한 ETag 값**
- Etag에는 강한(strong) ETag 값과 약한(weak) ETag 값으로 구별되어 있다. 

1. 강한 ETag 값
- 강한 ETag 값은 엔티티가 아주 조금 다르더라도 반드시 값은 변화한다. 
> ETag: "Usagi-1234"

2. 약한 ETag 값
- 약한 ETag 값은 리소스가 같다는 것만을 나타낸다. 
- 의미가 다른 리소스로 그 차이가 있는 경우에만 ETag 값이 변화한다. 
- 또한, 값의 앞부분에 "W/" 가 붙는다. 
> ETag: W/"usagi-1234"

<br>

#### 📎 5-4 Location

<br>

> Location: http://www.usagidesign.jp/sample.html

- Location 헤더 필드는 리스폰스의 수신자에 대해서 Request-URI 이외의 리소스 엑세스를 유도하는 경우에 사용된다.
- 기본적으로, `"3xx: Redirection"` 리스폰스에 대해서 리다이렉트 처의 URI를 기술한다. 
- 대부분의 브라우저에서는 Location 헤더 필드를 포함한 리스폰스를 받으면 강제로 리다이렉트 하는 곳의 리소스에 엑세스를 시도한다. 

<br>

#### 📎 5-5 Proxy-Authenticate

<br>

> Proxy-Authenticate: Basic realm="Usagidesign Auth"

- Proxy-Authenticate 헤더 필드는 프록시 서버에서의 인증 요구를 클라이언트에 전달한다. 
- 클라이언트와 서버와의 HTTP 엑세스 인증과 비슷한데 다른 점은 클라이언트와 프록시 사이에서 인증이 이루어진다는 것이다.
- 클라이언트와 서버의 경우, `WWW-Authorization` 헤더 필드와 같은 역할을 한다. 
- HTTP 엑세스 인증에 대해서는 다음 장에서 상세하게 설명한다. 

<br>

#### 📎 5-6 Retry-After

<br>

> Retry-After: 120

- Retry-After 헤더 필드는 클라이언트가 일정 시간 후에 리퀘스트를 다시 시행해야 하는지를 전달한다. 
- 주로 상태 코드 `503 Service Unavailable` 리스폰스나 `3xx Redirect` 리스폰스와 함께 사용된다. 
- 값으로는 날짜(Web, 04 Jul 2012 06:34:24 GMT 등의 형식)이라든가 리스폰스 이후의 몇 초를 지정할 수 있다. 

<br>

#### 📎 5-7 Server

<br>

> Server: Apache/2.2.17(Unix)

- Server 헤더 필드는 서버에 설치되어 있는 HTTP 서버의 소프트웨어를 전달한다. 
- 단순히 서버의 소프트웨어 명칭만이 아닌, 버전이나 옵션에 대해서도 기재하는 경우가 있다. 

> Server: Apache/2.2.6 (Unix) PHP/5.2.5

<br>

#### 📎 5-8 Vary

<br>

> Vary: Accept-Language

- Vary 헤더 필드는 캐시를 컨트롤하기 위해서 사용한다. 
- 오리진 서버가 프록시 서버에 로컬 캐시를 사용하는 방법에 대한 지시를 전달한다. 
- 오리진 서버로부터 Vary에 지정되었던 리스폰스를 받아들인 프록시 서버는 이후 캐시된 때의 리퀘스트와 같은 Vary에 지정되어 있는 헤더 필드를 가진 리퀘스트에 대해서만 캐시를 반환할 수 있다. 
- 같은 리소스에 대한 리퀘스트라도 Vary에 지정되었던 헤더 필드가 다른 경우에는 오리진 서버로부터 리소스를 취득할 필요가 있다. 

<br>

#### 📎 5-9 WWW-Authenticate

<br>

> WWW-Authenticate: Basic realm="Usagidesign Auth"

- WWW-Authenticate 헤더 필드는 HTTP 엑세스 인증에 사용되는데 Request-URI에 지정했던 리소스에 적용할 수 있는 인증 스키마("Basic" 혹은 "Digest")와 파라미터를 나타내는 challenge를 전달한다. 

- WWW-Authenticate 헤더 필드는 상태 코드 `401 Unauthorized` 리스폰스에 반드시 포함된다. 
- 이 예에서 "realm"는 Request-URI에 지정된 보호되었던 리소스를 식별하기 위한 문자열이다. 


