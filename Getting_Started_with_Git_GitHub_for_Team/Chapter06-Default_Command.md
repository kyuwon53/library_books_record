# 팀 개발을 위한 Git.GitHub 시작하기 

## 7일에 끝내는 Git - Chapter 6 : PART 1에서 수행했던 기본 명령어 

***

## Git Bash를 시작하자 

<br>

### 리눅스 명령어
- pwd  : 현재 폴더의 위치를 확인합니다.
- ls -a : 현재 폴더의 파일 목록을 확인합니다.
- cd : 홈 폴더로 이동합니다. 홈 폴더는 사용자 이름과 폴더명이 같고 내 문서 폴더의 상위 폴더입니다. 
- cd <폴더이름> : 특정 위치의 디렉토리로 이동합니다. 
- cd ../    : 현재 폴더의 상위 폴더로 이동합니다. 
- mkdir <새폴더 이름> : 현재 폴더의 아래에 새로운 폴더를 만듭니다. 
- echo "Hello Git"  : 메아리라는 뜻, 화면에 " " 안의 문장인 " Hello Git "을 표시합니다.
  

- git status : Git 워킹트리의 상태를 보는 명령. 워킹트리가 아닌 폴더에서 실행하면 오류가 발생 
    - git status -s : git status 명령 보다 짧게 요약해서 상태를 보여주는 명령, 변경된 파일이 많을 때 유용 
- git init :  현재 폴더에 Git 저장소를 생성 [.git]이라는 숨김 폴더가 생성되는데 사실 이 폴더가 로컬저장소. 
    - 워킹트리 : 일반적인 작업이 일어나는 곳. Git에서의 작업 폴더. 커밋을 체크아웃하면 생성되는 파일과 디렉토리. 작업 폴더에서 [.git](로컬저장소)를 뺀 나머지 부분 
    - 로컬저장소 : 커밋, 커밋을 구성하는 객체, 스테이지가 모두 이 폴더에 저장 
    - 원격저장소 : 로컬저장소를 업로드하는 곳. GitHub
    - Git 저장소 : 엄밀하게는 로컬저장소를 의미하지만 넓은 의미로 작업 폴더를 의미 
    - 작업 폴더 : 워킹트리 + 로컬저장소 

<br>
    
### 옵션 설정하기 
```commandline
 git config --global <옵션명>
지정한 전역 옵션의 내용을 살펴봅니다. 

 git config --global <옵션명> < 새로운 값>
지정한 전역 옵션의 값을 새로 설정합니다. 

 git config --global --unset <옵션명>
지정한 전역 옵션을 삭제합니다. 

 git config --local <옵션명>
지정한 지역 옵션의 내용을 살펴봅니다.

 git config --local <옵션명> < 새로운 값>
지정한 지역 옵션의 값을 새로 설정합니다.

 git config --local --unset <옵션명>
지정한 지역 옵션의 값을 삭제합니다.

 git config --system <옵션명>
지정한 시스템 옵션의 내용을 살펴봅니다.

 git config --system <옵션명> <값>
지정한 시스템 옵션의 값을 새로 설정합니다.

 git config --system --unset <옵션명> <값>
지정한 시스템 옵션의 값을 삭제합니다.

 git config --list
현재 프로젝트의 모든 옵션을 살펴봅니다. 

```
- 시스템 환경 옵션 : PC 전체의 사용자를 위한 옵션
- 전역 옵션 : 현재 사용자를 위한 옵션
- 지역 옵션 : 현재 Git 저장소에서만 유효한 옵션 

- 우선순위 : 지역 옵션 > 전역 옵션 > 시스템 옵션 
  - 개인 PC에서는 `전역 옵션` 
  - 공용 PC처럼 여러 사람이 사용하거나 Git을 잠깐만 써야 할 일이 있다면 `지역 옵션`
  - `시스템 옵션` Git이나 소스트리 설치시에 몇 가지 값들이 지정되는데 직접 수정하는 일은 그리 많지 않다
  

<br>

#### **Git 전역 옵션 설정**
```commandline
 git config --global user.name       #현재 user.name 확인

 git config --global user.name "바꿀 이름"           # user.name 바꾸기 
```

<br>

#### **Git 기본 에디터 확인**
```commandline
 git config core.editor        #기본 에디터 확인 

 git config --global core.editor

 git config --system core.editor

 git config --global core.editor "code --wait" #기본 에디터 VSCODE 설정 

```

<br>

***

## 기본 CLI 명령어 살펴보기


### **기본 CLI git 명령어**
```commandline
 git add 파일1 파일2..   
파일들을 스테이지에 추가 

 git commit
스테이지에 있는 파일들을 커밋

 git commit -a
add 명령을 생략하고 바로 커밋. 변경된 파일과 삭제된 파일은 자동으로 스테이징되고 커밋된다. 
주의할 점은 untracked 파일은 커밋되지 않는다는 것 

 git push [-u] [원격저장소별명] [브랜치이름]
현재 브랜치에서 새로 생성한 커밋들을 원격저장소에 업로드. -u 옵션으로 브랜치의 업스트림을 등록할 수 있다. 
한 번 등록한 후에는 git push만 입력해도 된다. 

 git pull 
원격저장소의 변경사항을 워킹트리에 반영한다. [ git fetch + git merge ] 

 git fetch [원격저장소별명][브랜치이름]
원격저장소의 브랜치와 커밋들을 로컬저장소와 동기화합니다. 옵션을 생략하면 모든 원격저장소에서 모든 브랜치를 가져옵니다. 

 git merge 브랜치이름
지정한 브랜치의 커밋들을 현재 브랜치 및 워킹트리에 반영합니다. 

```

<br>

#### **간단한 텍스트 파일 생성하고 확인 -> 생성한 파일 스테이지에 추가하기**
```commandline
 echo "hello git" > file.txt   #큰 따옴표 안의 텍스트로 file1.txt 파일 생성

 git status                    # 상태 확인 

 git add file1.txt             # 스테이지 영역에 파일 추가 
```

<br>

#### **reset 명령으로 스테이징 취소하기**
```commandline
 git reset [파일명]...
```
- 스테이지 영역에 있는 파일들을 스테이지에서 내립니다. (`언스테이징`)
- 워킹트리의 내용은 변경되지 않습니다.
- 옵션을 생략할 경우 스테이지의 모든 변경사항을 초기화합니다. 
  - 옵션( soft, mixed, hard) 중 옵션 생략시 `mixed reset`으로 동작 
```commandline
 cat [파일명] 
```
- 파일 내용이 변경되었는지 확인 

<br>

### **CLI로 커밋**
```commandline
 git add [파일명]

 git commit # 커밋 실행, VSCODE 실행시 커밋 메시지 입력 후 저장&닫기 
```
- 첫 줄과 둘째 줄 사이는 반드시 한 줄 비워야 한다.
  - 첫 줄에는 작업 내용의 요약. -> 제목
  - 다음 줄에는 자세하게 작업 내용을 기록합니다. -> 본문 
- 만약 git commit 명령 실행 후 커밋을 하고 싶지 않다면 VSCODE에서 X 버튼을 눌러 종료한다. 커밋도 자동으로 취소된다.
- vim 에디터에서는 `:q!` 를 입력하고 `Enter`를 누르면 종료 

<br>

#### **커밋 확인하기**
```commandline
 git log --oneline --graph --all --decorate
```
- 커밋 히스토리를 확인
- 히스토리 앞의 16진수 7자리 숫자는 커밋 체크섬 혹은 커밋 아이디이다.
  - 실제로 40자리이지만 앞의 7자리만 화면에 보여준다.
- 옵션
  - `--online`   : 커밋 메시지를 한 줄로 요약해서 보여줌. 생략하면 커밋 정보를 자세히 표시 
  - `--graph`    : 커밋 옆에 브랜치의 흐름을 그래프로 보여준다. GUI와 유사한 모습으로 나옴
  - `--decorate` : 브랜치와 태그 등의 참조를 간결히 표시. 원래는 `--decorate=short` 옵션을 의미
  - '--all'      : all 옵션이 없을 경우 **HEAD**와 관계없는 옵션은 보여주지 않습니다. 

<br>

### **git log의 다양한 옵션**
```commandline
 git log
```
현재 브랜치의 커밋 이력을 보는 명령 

```commandline
 git log -n<숫자>
```
전체 커밋 중에서 최신 n개의 커밋만 살펴봅니다.  

#### **좋은 커밋 메시지의 7가지 규칙**
1. 제목과 본문을 빈 줄로 분리한다.
2. 제목은 50자 이내로 쓴다.
3. 제목을 영어로 쓸 경우 첫 글자는 대문자로 쓴다.
4. 제목에는 마침표를 넣지 않는다.
5. 제목을 영어로 쓸 경우 동사원형(현재형)으로 시작한다.
6. 본문을 72자 단위로 줄바꿈한다.
7. 어떻게 보다 **무엇과 왜**를 설명한다. 

### **도움말 기능 사용하기**
```commandline
 git help <명령어> 
```
해당 명령어의 도움말을 표시한다. 도움말에는 명령의 의미와 세부적인 옵션들이 매우 자세하게 표시된다. 

```commandline
 git help status
 git help commit
 git help add
```
도움말 명령을 수행하면 웹 브라우저가 열리면서 해당 명령어에 대한 내용이 표시된다. 

<br>

***

## 원격저장소 관련 CLI 명령어 

### remote, push, pull 

```commandline
 git remote add <원격저장소 이름> <원격저장소 주소>
```
- 원격저장소를 등록
- 원격저장소는 여러 개 등록할 수 있지만 같은 별명의 원격저장소는 하나만 가질 수 있다.
- 통상 첫 번째 원격저장소를 origin으로 지정한다. 

```commandline
 git remote -v
```
- 원격저장소 목록을 살펴봅니다.

- 업스트림 브랜치: 로컬저장소와 연결된 원격저장소를 일컫는 단어. 
- `--set-upstream` 이나 `-u` 옵션을 사용하면 origin 저장소의 `main` 브랜치가 로컬저장소의 `main` 브랜치의 업스트림으로 지정되어 push가 가능 

```commandline
git push -u origin master

git push
```


### clone
- 저장소 주소가 꼭 원격일 필요는 없다. 
```commandline
git clone <저장소주소> [새로운 폴더명]
```
- 저장소 주소에서 프로젝트를 복재해 옵니다. 
- 새로 생길 폴더명은 생략 가능
- 폴더명을 생략하면 프로젝트 이름과 같은 이름의 폴더가 새로 생성된다. 
- 저장소 주소는 꼭 원격일 필요가 없으며 로컬저장소도 `git clone` 명령으로 복제할 수 있다. 

#### **추가 commit and push**
```commandline
echo "second" >> file1.txt # 파일에 내용 한 줄 추가 

git commit -a   # 스테이징 없이 바로 커밋 

git push 
```
- `git commit -a` : 옵션을 사용하면 기존에 커밋 이력이 있는 파일, 즉 modified 상태의 파일의 스테이징 과정을 생략 

#### **git pull**
```commandline
cd ~/Documents/hello-git-cli        #처음 저장소로 이동

git pull 
```
