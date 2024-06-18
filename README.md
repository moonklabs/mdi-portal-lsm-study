# MDI PORTAL

이 프로젝트는 Vanilla JavaScript, NestJS를 활용한 풀스택 프로젝트입니다. 개인화된 웹 환경을 사용하고 싶으시다면 하단 시작하기를 참고해 로컬에서 간편하게 사용하실 수 있습니다.[API 명세](docs/API.md)

![시연영상](https://github.com/moonklabs/mdi-portal-lsm-study/assets/62977652/77ab2ba6-d743-4ff5-aafc-4b6bfce51b97)

## About MDI-PORTAL

MDI 프로젝트는 웹환경에서 개인화된 웹 환경을 제공하는 프로젝트입니다. 이 프로젝트를 통해서 다음과 같은 경험을 할 수 있습니다!

- 사용자는 시계, 브라우저 등 다양한 패널을 자유롭게 배치하고 크기를 조정할 수 있습니다. 패널은 Drag&Drop으로 쉽게 이동할 수 있으며, 숨기기, 최대화, 최소화 등의 기능을 통해 패널을 관리할 수 있습니다.

- 하단의 taskbar 메뉴를 통해 모든 패널을 한 번에 숨기거나 열 수 있으며, grid 정렬과 stack 정렬 기능을 사용하여 패널을 깔끔하게 정렬할 수 있습니다.

###

기능에 대한 자세한 내용은 아래 링크를 참고해주세요

- [Backend](./backend/README.md)
- [Frontend](./frontend/README.md)

## 시작하기

### 요구사항

- Node.js
- Nest.js
- Mysql, SQLite, PostgreSQL 중 선택
- npm

### 1. 레포지토리 클론

```bash
git clone https://github.com/moonklabs/mdi-portal-lsm-study.git
```

### 1. 프론트엔드 설정

터미널을 생성해 아래 명령어를 입력해주세요. VSCode를 사용중이시라면 상단에 터미널을 클릭 후 새 터미널을 통해 만들 수 있습니다.

`cd frontend`

> frontend 폴더로 접근합니다.

`npm run start`

> lite-server가 실행되고 로컬 환경에서 웹사이트가 열립니다.

### 2. 백엔드 설정

_이 프로젝트는 기본적으로 SQLite를 사용하고 있습니다. MySQL, PostgreSQL 을 적용하고 싶으시다면 해당 링크를 참고해주세요 [데이터베이스 설정 가이드](docs/DB_guide.md)_

백엔드 환경을 실행시키기 위해 새로운 터미널을 생성해주세요.

`cd backend`

> backend 폴더로 접근합니다.

`npm install`

> backend 폴더로 접근 후 npm install을 실행합니다.

`npm run start`

> 위 과정이 끝난다면 해당 명령어를 사용해 서버를 열어줍니다.

### 추가

_backend, frontend를 같이 실행하는게 번거로우시고 VSCode를 사용중이시라면 Live Server 익스텐션도 참고해주세요._

#

저와 개발일지가 궁금하시다면 [About](docs/about.md), [개발일지](docs/개발일지/) 를 클릭해주시고 이 프로젝트가 도움이 되셨다면 star 버튼으로 표현해주세요!
