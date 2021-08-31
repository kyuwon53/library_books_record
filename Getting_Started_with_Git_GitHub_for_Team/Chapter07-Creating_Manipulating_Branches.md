# 팀 개발을 위한 Git.GitHub 시작하기 

## 7일에 끝내는 Git - Chapter 7 : 브랜치 생성 및 조작하기 

### CLI로 브랜치 생성하기 

#### branch 되돌아보기 
1. 커밋하면 커밋 객체가 생긴다. 
    - 커밋 객체에는 부모 커밋에 대한 참조와 실제 커밋을 구성하는 파일 객체가 들어 있다. 
2. 브랜치는 논리적으로는 어떤 커밋과 그 조상들을 묶어서 뜻하지만, 사실은 단순히 커밋 객체 하나를 가리킬 뿐이다.

**브랜치 언제 사용할까?**
- 새로운 기능 추가 
    - 가장 대표적으로 브랜치를 사용하는 경우 
    - [main] 브랜치의 최신 커밋으로부터 브랜치를 생성해서 개발
    - 개발, 코드 리뷰, 테스트까지 모두 완료해 이상이 없으면 [main] 브랜치로 병합 
    
- 버그 수정 
    - 버그 발생시 `bugFix`,`hotFix` 같은 이름으로 브랜치를 생성해서 작업한다. 
    
- 병합과 리베이스 테스트 
    - 잘못되었을 경우 그냥 브랜치를 삭제 
    
- 이전 코드 개성 
    - 이미 기능 구현은 완료되었으나 개선하고 싶을 때 
    - 기존 코드를 주석 처리하고 새로운 개선 코드를 작성하는데 이 방법보다 브랜치 사용을 추천 
    - 새로운 브랜치를 만들어 이전 코드는 삭제하고 새 코드를 작성 
    - 브랜치의 이전 커밋에는 코드가 여전히 남아 있기 때문에 걱정 할 필요가 없다. 
    
- 특정 커밋으로 돌아가고 싶을 때 
    - `hard reset`나 `revert`를 사용하지만 브랜치를 새로 만들어서 작업을 하고, 이후 `rebase`나 `merge`를 사용
        - `hard reset` : 커밋이 사라질 수 있다
        - `revert` : 사용이 까다롭다.
    
#### 브랜치 생성하기 

```commandline
git branch [-v]
```
- 로컬 저장소의 브랜치 목록을 보는 명령으로 -v 옵션을 사용하면 마지막 커밋도 함께 표시
    - 표시된 브랜치 중에서 이름 왼쪽에 *가 붙어 있으면 HEAD 브랜치

```commandline
git branch [-f] <브랜치이름>[커밋체크섬]
```
- 새로운 브랜치를 생성
- 커밋체크섬 값을 주지 않으면 `HEAD`로부터 브랜치를 생성 
- 이미 있는 브랜치를 다른 커밋으로 옮기고 싶을 때는 -f 옵션을 줘야 한다. 

```commandline
git branch -r[v]
```
- 원격 저장소에 있는 브랜치를 보고 싶을 때 사용
- 마찬가지로 -v 옵션을 추가하여 커밋 요약도 볼 수 있다. 

```commandline
git checkout <브랜치 이름>
```
- 특정 브랜치로 체크아웃할 때 사용
- 커밋 체크섬을 쓸 수 있지만 브랜치 이름을 쓰는 것을 강력히 권장 

```commandline
git checkout -b <브랜치 이름> <커밋 체크섬>
```
- 특정 커밋에서 브랜치를 새로 생성하고 동시에 체크아웃까지 한다. 
```commandline
git merge <대상 브랜치>
```
- 현재 브랜치와 대상 브랜치를 병합할 때 사용
- 병합 커밋 (merge commit)이 새로 생기는 경우가 많다.

```commandline
git rebase <대상 브랜치>
```
- 내 브랜치의 커밋들을 대상 브랜치에 재배치시킨다. 
- 히스토리가 깔금해져서 자주 사용하지만 조심해야 한다. 

```commandline
git branch -d <브랜치이름>
```
- 특정 브랜치를 삭제할 때 사용
- `HEAD` 브랜치나 병합이 되지 않은 브랜치는 삭제할 수 없다. 

```commandline
git branch -D <브랜치이름>
```
- 브랜치를 강제로 삭제하는 명령
- `-d`로 삭제할 수 없는 브랜치를 지우고 싶을 때 사용 

<br>

#### **브랜치 만들기** 

```commandline
git log --oneline       #커밋 로그 보기

git branch              #현재 브랜치 확인

git branch [브랜치 명]

git log --oneline --all        #변경된 브랜치 확인
```

##### **HEAD에 대해 반드시 기억할 점**
1. HEAD는 현재 작업 중인 브랜치를 가리킨다.
2. 브랜치는 커밋을 가리키므로 HEAD도 커밋을 가리킨다. 
3. 결국 HEAD는 현재 작업 중인 브랜치의 최근 커밋을 가리킵니다. 

##### revert를 사용해서 커밋을 되돌려야 하는 경우 
- 최신 커밋부터 취소를 하는 것이 좋다
- 이전의 히스토리를 변경하지 않고도 깔끔하게 히스토리 중간의 여러 커밋 내용을 작업 이전 상태로 되돌릴 수 있다. 

<br>

***

### CLI로 checkout 하기

#### CLI를 이용한 브랜치 체크아웃 및 새 커밋 생성 

```commandline
git checkout mybranch1          #브랜치 체크아웃

git branch              # 현재 브랜치 확인

echo "third - my branch" >> file1.txt

git add file1.txt

git commit

```
- git checkout <커밋체크섬>을 하면 `HEAD`와 브랜치가 분리되는 Detached HEAD 상황이 된다.
- 다른 브랜치로 체크아웃하는 순간 Detached HEAD의 커밋들은 다 사라져서 안 보인게 된다. 

##### 새로운 커밋을 생성하면 
1. 새로 커밋을 생성하면 그 커밋의 부모는 언제나 이전 HEAD 커밋이다. 
2. 커밋이 생성되면 HEAD는 새로운 커밋으로 갱신된다.
3. HEAD가 가리키는 브랜치도 HEAD와 함께 새로운 커밋을 가리킨다. 


#### CLI를 이용한 빨리 감기 병합

- `mybranch1` 브랜치에서 추가로 한 번 더 커밋을 하고 `master` 브랜치로 체크아웃을 한 후 에 `master` 브랜치와 `mybranch1` 브랜치를 병합 

##### **커밋 후 빨리 감기 병합**
```commandline
echo "fourth - my branch" >> file1.txt      #파일에 내용 추가

cat file1.txt           #파일 내용 확인

git status          # 스테이지 상태 확인

git add file1.txt       # 스테이지에 추가

git commit          # 신규 커밋

git checkout master     # 마스터 (최신버전:main) 브랜치 체크아웃

git merge mybranch1         # 병합, Fast-forward

```

#### reset --hard로 브랜치 되돌리기 
- reset은 현재 브랜치를 특정 커밋으로 되돌릴 때 사용
- ``` git reset --hard ``` 는 **현재 브랜치를 지정한 커밋으로 옮긴** 후 해당 커밋의 내용을 작업 폴더에도 반영 

```
 git reset --hard <이동할 커밋 체크섬> 
```
- 현재 브랜치를 지정한 커밋을 옮긴다. 
- 커밋 체크섬을 알아야한다. 
- git log를 통해 확인할 수 있지만 보통 `HEAD~` 또는 `HEAD^` 로 시작하는 약칭을 사용할 수 있다. 
    - `HEAD~<숫자>` : 헤드의 부모 커밋. HEAD~n은 n번째 위쪽 조상 
    - `HEAD^<숫자>` : 부모 커밋. 병합 커밋처럼 부모가 둘 이상인 커밋에서만 의미가 있다. 
    
##### **현재 브랜치를 두 단계 이전으로 되돌리기**
```commandline
git reset --hard HEAD~2
```

- `reste --hard` 는 세 명령을 한 번에 수행하는 명령이다. 
    1. `git checkout HEAD~2`
    2. `git branch -f master`
    3. `git checkout master`
    

#### 빨리 감기 병합 상황에서 rebase 해보기 

- `git rebase <대상 브랜치>` 명령은 현재 브랜치에만 있는 새로운 커밋을 대상 브랜치 위로 재배치시킨다. 
    - 현재 브랜치에 재배치할 커밋이 없을 경우 `rebase`는 아무런 동작을 하지 않는다. 
    
##### rebase, push, branch 제거 

```commandline
git checkout mybranch1  #브랜치 변경
 
git rebase master   # rebase 시도

git checkout master     # 브랜치 변경

git rebase mybranch1    # 반대 방향에서 rebase

git push            # push

git branch -d mybranch1         # 브랜치 삭제 
```
1. `mybranch1` 브랜치로 체크아웃
2. `mybranch1` 브랜치는 이미 `master` 브랜치 위에 있기 때문에 재배치할 커밋이 없다. 그래서 rebase를 수행해도 아무 일도 일어나지 않는다.
3. `master` 브랜치로 체크아웃
4. `rebase` 명령으로 `master` => `mybranch1` 재배치 
5. `git push` : `master` 브랜치를 원격에 push
6. `git branch -d` : 필요 없어진 `mybranch1` 브랜치를 삭제 

#### 배포 버전에 태깅하기 
|CLI|설명|
| :--- | :--- |
|git tag -a -m <간단한 메시지> <태그 이름>[브랜치 or 체크섬]|-a 로 주석 있는 (annotated) 태그를 생성합니다. 메시지와 태그 이름은 필수이며 브랜치 이름을 생략하면 HEAD에 태그를 생성합니다.|
|git push <원격저장소 별명><태그 이름>| 원격 저장소에 태그를 업로드합니다. |

##### tag 작성 

```commandline
git log --oneline

git tag -a -m "첫 번째 태그 생성" v0.1         # 주석 잇는 태그 작성

git log --oneline       

git push origin v0.1            # 태그 푸시
```
- 태그는 커밋을 식별할 수 있는 유용한 정보 
- 태그를 사용하면 GitHub의 [Tags] 탭엣 확인할 수 있고, [Release] 탭에서 다운받을 수 있다. 

<br>

***

### CLI로 3-way 병합하기 

#### 긴급한 버그 처리 시나리오 
1. (옵션)오류가 없는 버전 (주로 Tag가 있는 커밋)으로 롤백
2. `master`(`main`) 브랜치로부터 `[hotfix]` 브랜치 생성
3. 빠르게 소스 코드 수정/테스트 완료 
4. `master`(`main`) 브랜치로 병합 (Fast-forward) 및 배포 
5. 개발 중인 브랜치에도 병합 ( 충돌 발생 가능성 높음 )

##### **새로운 브랜치 및 커밋 생성 , hotfix 브랜치 생성, 커밋, master 병합**
```commandline
git checkout master                #master로 체크아웃
 
git checkout -b feature1           # feature1 브랜치 생성 및 체크아웃

echo "기능 1 추가" >> file1.txt     # 파일 내용 수정

git add file1.txt                 # 스테이징

git commit                        # 커밋

git checkout -b hotfix master     # master로부터 hotfix 브랜치 생성, 체크아웃

echo "some hot fix" >> file1.txt

git add file1.txt

git commit

git checkout master

git merge hotfix

git push
```
- `hotfix`의 커밋은 버그 수정이었기 때문에 `featyre1` 브랜치에도 반영해야 한다. 
- 서로 다른 분기로 진행되고 있기때문에 3-way 병합을 해야 한다. 

##### **병합 및 충돌 해결하기**
```commandline
git checkout feature1

git merge master

git status
```
- `git merge master` 명령이 충돌로 인해 실패합니다. 
- `git status` 명령을 실행하여 충돌 대상 파일을 확인 
- `git merge --abort` 를 통해 merge를 취소할 수도 있다.  

- VSCODE 에서 충돌난 파일을 열면 충돌 부분이 다른 색으로 표시되고 위 쪽에는 4개의 선택 메뉴가 보인다. 
    1. HEAD의 내용만 선택
    2. master의 내용만 선택
    3. 둘 다 선택
    4. 다른 내용을 확인하는 버튼

```commandline
git add file1.txt       # 1. 스테이징

git commit      # 2. 머지 커밋 생성
```
1. `git add` 및 `git status`를 수행하면 충돌한 파일의 수정을 완료한 후에 `git commit` 명령을 수행하면 된다
2. `git commit` 명령으로 충돌난 3 way 병합을 마무리 짓는다. 
    - 병합 커밋으로 커밋 메시지는 굳이 편집하지 않고 저장한 후 에디터를 빠져 나온다. 
    
<br>

***

### CLI로 rebase 해 보기 

#### rebase 사용하기 

- 3-way 병합을 하면 병합 커밋이 생성되기 때문에 트리가 다소 지저분해진다는 단점이 있다.
- 트리를 깔끔하게 하고 싶다면 rebase를 사용할 수 있다.
    - rebase(재배치) : 내 브랜치의 커밋들을 재배치하는 것 
        1. HEAD와 대상 브랜치의 공통 조상을 찾는다.
        2. 공통 조상 이후에 생성한 커밋들을 대상 브랜치 뒤로 재배치한다. 
    - 재배치 된 커밋은 원래 커밋과는 다른 커밋이다. 
    - 주로 로컬 브랜치를 깔끔하게 정리하고 싶을 때 사용 
    - 여러 Git 가이드에서 원격 저장소에 존재하는 브랜치에 대해서느 rebase를 하지 말 것을 권하고 있다. 

##### **reset --hard 및 rebase 시도**
```commandline
git reset --hard HEAD~  # 1. 현재 브랜치를 한 단계 되돌린다 

git rebase master          # 2.HEAD 브랜치의 커밋들을 master로 재배치 


```
1. 커밋을 한 단계 이전으로 되돌림. 병합 커밋이 사라진다. 
2. rebase를 시도하지만 merge에서와 마찬가지로 충돌로 인해 rebase는 실패 
    - 수도응로 충돌을 해결한 후에 스테이지에 추가
    - `git rebase --continue` 명령을 수행하라고 알려줌
    

##### **충돌 해결 및 rebase 이어서 하기**
```commandline
git status              # 1. 충돌 대상 확인 및 수동으로 충돌 해결

git add file1.txt       # 2. 변경사항 스테이징 및 상태 확인

git rebase --continue   # 3. 리베이스 계속 진행

git checkout master     

git merge feature1      # 4. 빨리 감기 병합
```
1. 충돌 파일을 확인하고 이전과 같은 방식으로 VSCODE를 이용해 수동으로 파일 내용을 수정하고 저장
2. 스테이지에 변경사항을 추가 
3. `git rebase --continue` 명령을 수행해서 이어서 리베이스 작업을 진행
    - `merge`는 마지막 단계에서 `git commit` 명령을 사용
    - `rebase`는 `git rebase --continue` 명령을 사용해야 한다. 
        - 마지막 단계에서 명령어가 다른 것은 3-way병합은 기존 커밋의 변경 없이 새로운 병합 커밋을 하나 생성 
        - 충돌도 한 번만 발생
        - 충돌 수정 완료 후 `git commit` 명령을 수행하면 `merge` 작업 완료
    - rebase 는 재배치 대상 커밋이 여러 개일 경우 여러 번 충돌이 발생할 수 있다. 
        - 기존의 커밋을 하나씩 단계별로 수정하기 때문에 `git rebase --continue` 명령으로 충돌로 인해 중단된 rebase를 재개 
    

4. 마지막으로 `master(main)` 브랜치에서 `feature1` 브랜치로 병합 


| |3-way 병합| rebase |
| :---: | :---: | :---: |
|**특징**|머지 커밋 생성|현재 커밋들을 수정하면서 대상 브랜치 위로 재배치함|
|**장점**|한 번만 충돌 발생|깔끔한 히스토리|
|**단점**|트리가 약간 지저분해짐|여러 번 충돌이 발생할 수 있음|


#### 유용한 rebase의 사용법 : 뻗어나온 가지 없애기 

```commandline
git reset --hard HEAD~  # 병합 커밋 되돌리기

git rebase origin/master    # rebase 수행으로 현재 커밋 재배치 

git push        
```
- 커밋을 하나 되돌린다. 마지막 커밋은 병합 커밋이었으므로 병합되기 전 커밋으로 돌아가게 된다. 
- 이 커밋이 튀어나온 커밋이니까 어딘 가에 재배치를 해야 한다.
- `git rebase origin/master` 명령을 수행하면 로컬 `master(main)` 브랜치의 가지 커밋이 `[origin/master(main)]` 브랜치 위로 재배치된다.


#### rebase 주의사항 

- 원격 저장소에 푸시한 브랜치는 `rebase`하지 않는 것이 원칙 
    - 같은 커밋이 동시에 존재하게 되면서 동일한 커밋의 사본이 여러개 존재하고, 충돌도 발생하고, 히스토리는 꼬인다.
    
#### 임시 브랜치 사용하기 

```commandline
$ git branch test feature1

$ git checkout test
Switched to branch 'test'

$ echo "아무말 대잔치" >test.txt

$ git add .
warning: LF will be replaced by CRLF in test.txt.
The file will have its original line endings in your working directory

$ git commit -m "임시 커밋"
[test 550b266] 임시 커밋
 1 file changed, 1 insertion(+)
 create mode 100644 test.txt

$ git log --oneline --graph --all -n4
* 550b266 (HEAD -> test) 임시 커밋
| * 3083c9d (origin/master, master) master2 커밋
| * 99fe7b4 master 커밋 1
|/
* 6c7ff54 (feature1) 새로운 기능 1 추가

$ git checkout master
Switched to branch 'master'
Your branch is up to date with 'origin/master'.

$ git branch -D test
Deleted branch test (was 550b266).

$ git log --oneline --graph --all -n3
* 3083c9d (HEAD -> master, origin/master) master2 커밋
* 99fe7b4 master 커밋 1
* 6c7ff54 (feature1) 새로운 기능 1 추가

```
- 임시 브랜치인 `test` 브랜치를 생성하고 커밋한 후에 다시 `master` 브랜치로 돌아가서 `test` 브랜치를 삭제한 결과
- 다양한 작업을 미리 테스트해 보고 싶을 때 간단하게 임시 브랜치를 만들어서 사용하고 불필요해지면 삭제

