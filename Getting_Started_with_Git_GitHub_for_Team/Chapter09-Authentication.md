# 팀 개발을 위한 Git.GitHub 시작하기 
***
## Chapter 9: 인증 기능 살펴보기 
***

### 인증 관련 기능 사용하기
Git과 GitHub를 사용하다 보면 인증 관련 문제가 발생한다. 여러 가지 계정을 사용해야 하는데 계정을 전환하는 방법을 모를 때도 있고,
아이디와 패스워드를 잘못 입력했는데, 다시 입력하는 창이 나오지 않을 때도 있다.

#### 원도우의 자격 증명(Credential) 관리 

##### **credential.helper 변수 값 사용해보기**
```commandline
$ git config credential.helper
manager-core

$ git config --local credential.helper

$ git config --global credential.helper

$ git config --system credential.helper
manager-core

```
- manager 값 외에도 cache 또는 store 값도 올 수 있지만 윈도우에서는 manager를 사용하는 것이 일반적이다. 

- 자격 증명 관리자 실행
    - `웹 자격 증명`
    - `windows 자격 증명` 
        - `windows 자격 증명`에 GitHub 아이디와 패스워드가 저장된다.
    - 소스트리에서도 볼 수 있다.
        -[도구 - 옵션 - 인증] - [v] 
      
- 아직 로그인이 되어 있지 않은 상태에서 계정 정보를 입력하는 방법은 두 가지
    1. 소스트리에서 직접 입력
    2. CLI에서 git push 명령 사용 
        - `git push` : 해당 사이트와 관련된 인증 정보가 없다면 자동으로 인증 정보를 생성하고 이를 자격 증명 관리자에게 저장
    
<br>

#### 맥 PC에서 인증 관련 사용자 옵션 
##### mac에서의 git 인증 관리
```commandline
$ git config --local credential.helper
$ git config --global credential.helper
$ git config --system credential.helper
osxkeychain

```
<br>

#### 리눅스에서 cache 옵션 사용하기 
##### 리눅스에서 인증 옵션 확인해보기
```commandline
$ git config --local credential.helper
$ git config --global credential.helper
$ git config --system credential.helper

```
- 리눅스는 특별한 옵션이 설정되어 있지 않다. 
##### credential.helper 값을 cache로 지정
```commandline
$ git config credential.helper "cache --timeout=30"     # 30초간 아이디 및 패스워드 저장
$ git push          # 최초 1회 아이디와 패스워드 입력
Usernaem for ''
Password for ''

```

#### 리눅스에서 store 옵션 사용하기 
##### credential.helper 값을 store로 지정 
```commandline
$ git config credential.helper store     # 인증 방식 store로 변경
$ git push          # 최초 1회 아이디와 패스워드 입력
Usernaem for ''
Password for ''

```
##### git 인증 초기화 
```commandline
$ git config --unset credential.helper          #옵션 삭제 
$ file ~/.git-credentials                       # 인증 파일 정보 확인
$ rm ~/.git-credentials                         # 인증 파일 삭제

```

### SSH 키 생성 및 사용하기 
- SSH(Secure SHell) 프로토콜 : unix나 linux 같은 OS에 안전하게 접속하기 위해 만들어짐
    - 최근에는 클라우드 등 리눅스 서버에 접속하기 위해서 주로 많이 사용.
    
- https 방식은 GitHub에 내가 올바른 사용자라는 것을 알려주기 위해서 사용자 아이디와 패스워드를 이용해서 사용자 인증을 했다.
- SSH를 이용하면 `공개키 / 비밀키` 방식을 사용한다.
    - 공개키: 자물쇠
    - 비밀키: 열쇠 
    
#### SSH 키 생성하기 
```commandline
$ ssh-keygen            # SSH key 생성 밑으론 엔터 
Generating public/private rsa key pair.
Enter file in which to save the key (/c/Users/USER/.ssh/id_rsa):
Created directory '/c/Users/USER/.ssh'.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /c/Users/USER/.ssh/id_rsa
Your public key has been saved in /c/Users/USER/.ssh/id_rsa.pub
The key fingerprint is:
SHA256:/KkszL6AdISVK8hwCkzUDPGLH9/aNwB3CLt1K/9GWHA USER@leesuin
The key's randomart image is:
+---[RSA 3072]----+
|+== ..           |
|o.o=..   . E     |
|++....o . o      |
|o.o.oo = o .     |
| ..+. = S +      |
| ..oo..o + o     |
|  ...+ .+ +      |
|     .*. = .     |
|     oo++ +.     |
+----[SHA256]-----+

$ cd ~/.ssh/        # 키가 저장된 폴더로 이동

$ pwd
/c/Users/USER/.ssh

$ ls                # 두 개의 키 파일 확인
id_rsa  id_rsa.pub

$ cat id_rsa.pub            # 공개키 확인, 내용을 메모장에 붙여 넣는다.
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDsFmvqX4G9eZxIASs4UvIRAcNVM+taWjBY328ZLKE56Dg0nWkaA/bsvIK5KelGdfcaUylAs95YaimQiDuQNf38kAy0tOZFQpVOUzwAIcxYeXMzgrftop9EAbMI0fhVP+mhJU4C9Xw/SXFyZu5c1ZS0ORmXSqvwpXFsiNVuG1wo4Prsz/muvesRpISKAjNfEl6CphnIYjRSI+6SHpCcaFSoapR0wzfGreZvxJRkjITYsRmLPQLSKsYuJZCTpCKooc6fa3+E1Ne39U9glJ8HtSIWHfS8yyQbmjwRkru0zYjlc0M5VYyS+00yciTd4eskl1t/eFyOYCocfbNWdwSSnAi1z0003rq0JUPMukUkpP3/SftSLxVJVaM2cUt46vzZUNCdE1dDehvKyedXx754wbCzBxxzC73vmHswsr7O+dFYqd0XwzQn+0poqw1sVVijhP0sVkpExAVGAJfgFBHCPTNFvVDV0ctVLFc4q1iEyjh2BnRT+Rx3HnxdoTtuwAz7Sss= USER@leesuin


```
- GitHub 등록 (자물쇠에 해당하는 공개키를 등록)
    - `[Settings]` - `[Personal settings]` - `[SSH and GPG Keys]` - `[New SSH key]` : SSH Key추가
    - `[Title]` : 명확하게 어떤 공개키인지 알려주는 내용
    - `[Key]` : 앞 단계에서 메모장에 붙여 넣은 공개키의 내용을 붙여 넣는다. 
    - `[Add SSH Key]` 클릭 
    
#### SSH를 이용해서 저장소 클론하기 

- HTTPS를 사용하는 원격 저장소 주소 : https://github.com/kyuwon53/hello-git-cli.git
- SSH를 사용하는 원격 저장소 주소 : git@github.com:kyuwon53/hello-git-cli.git

- 마지막으로 SSH 설정 파일을 만들어 줘야 한다. 
```commandline
$ echo "Host github.com" >> ~/.ssh/config
```
- VSCODE 로 내용을 아래와 같이 수정하고 저장 
```commandline
Host github.com
  Hostname github.com
  IdentityFile ~/.ssh/id_rsa
```
- SSH 인증은 cache에 저장하는 옵션에 비해 패스워드가 노출되지 않는 장점이 있기 때문에 사용된다. 

