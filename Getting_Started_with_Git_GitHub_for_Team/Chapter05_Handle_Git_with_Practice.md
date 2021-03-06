# 팀 개발을 위한 Git.GitHub 시작하기 

## 7일에 끝내는 Git - Chapter 5 : 실무 사례와 함께 Git 다루기

### GitHub에서 새로운 원격저장소 만들기 
1. GitHub에서 원격저장소를 만들고 이를 내 컴퓨터에 클론한다.
2. 내 컴퓨터에서 먼저 로컬저장소를 만들고 GitHub에 원격저장소를 만들어 로컬저장소에 원격 저장소 주소를 `remote add`한다. 

- [Initialize this repository with a README] : 원격저장소를 만들면서 동시에 `README.md` 파일이 자동으로 만들어진다.
- [MIT License]: License  허가서가 자동으로 생성되어 프로젝트 파일에 포함된다. 
    - 이 오픈소스를 사용하려면 MIT 라이센스를 따라야 한다고 사용자에게 안내하는 것 
    - '이 소스를 재가공해서 재배포해도 된다'는 라이센스 
  
- ###### amend: 원격저장소에 푸시했어도 방금 했던 커밋을 수정할 수 있다. 
- ###### cherry-pick : 다른 브랜치의 커밋 하나만 내 브랜치에 반영하기 
  - 변경사항을 복사해 왔지만, 서로 같은 커밋은 아니다.
- ###### reset : 옛날 커밋으로 브랜치를 되돌리기 
  - `Soft/Mixed reset`: 모든 기억을 남기면서 브랜치 되돌리기 
    - **Soft** : 모든 로컬 변경사항 유지
    - **Mixed** : 작업 상태는 그대로 두지만 인덱스는 리셋
      - 커밋은 없던 걸로 되돌렸지만 기록이 스테이지 아래에 살아있으니 다시 무엇을 add할지 결정할 수 있다.    

  -  `Hard reset` : 모든 기억을 지우며 브랜치를 되돌리기     
    - **Hard** : 모든 작업 상태 내 변경 사항을 버림 
    - 브랜치가 깔끔하게 과거로 돌아가지만 원격 브랜치는 아직 남아있다.
    - 원격 브랜치에도 반영하려면 [강제 푸시]를 사용합니다.
      - 강제 푸시는 반드시 나만 쓰는 브랜치에서만 해야 한다.
      - 다른 사람이 함께 사용하고 있다면 히스토리가 꼬인다.
  

- ###### revert : 커밋의 변경사항을 되돌리는 새로운 커밋 만들기
  - 방금 한 커밋, 이전에 한 커밋도 얼마든지 되돌릴 수 있다. 
  - 잘못된 커밋이 있으면 언제든지 Revert로 되돌린다. 
  
- ###### stash: 커밋하지 않은 변경 사항을 서랍 속에 넣어두기 
  - 아직 커밋으로 만들기 애매한 파일들을 잠깐 서랍 속에 넣어뒀다가 다시 꺼내 쓰는 방법 
    - stash에는 tracked 상태(추적중 - 한번이라도 Git에 올렸던 상태)인 파일들만 들어갑니다. 
    - 새로 만든 파일은 들어가지 않는다. 


