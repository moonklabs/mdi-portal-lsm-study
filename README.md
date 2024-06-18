# MDI PORTAL

이 프로젝트는 vanila javascript, nest.js를 사용한 풀스택 프로젝트입니다. 개인화된 웹 환경을 사용하고 싶으시다면 아래를 참고해서 로컬에서 간편하게 사용하실 수 있습니다.[API 명세](docs/API.md)

![시연영상](https://github.com/moonklabs/mdi-portal-lsm-study/assets/62977652/f1bb20b1-be9a-4a41-9d82-1c6e4b817071)

## About MDI-PORTAL

<!-- 이 프로젝트는 다음과 같은 기능을 제공합니다. -->

<!-- - **사용자 회원가입 및 로그인**: 회원가입과 로그인을 통해 개인화된 환경을 제공합니다.
- **타임존 및 브라우저 패널**: 타임존을 설정한 시계 패널과 브라우저 패널을 생성할 수 있습니다.
- **생성한 패널 관리**: 생성한 패널들을 Drag&Drop, 숨기기, 최대화와 같은 기능을 사용할 수 있습니다.
- **메뉴 기능**: 하단에 있는 taskbar 우측에 있는 메뉴에서 모두 숨기기, 모두 열기, grid정렬, stack 정렬을 사용할 수 있습니다. -->

MDI 프로젝트는 웹환경에서 개인화된 웹 환경을 제공하기 위해 진행된 프로젝트입니다. 이 프로젝트를 통해서 다음과 같은 경험을 할 수 있습니다!

- 사용자는 시계, 브라우저 등 다양한 패널을 자유롭게 배치하고 크기를 조정할 수 있습니다. 패널은 Drag&Drop으로 쉽게 이동할 수 있으며, 숨기기, 최대화, 최소화 등의 기능을 통해 필요한 정보를 효율적으로 관리할 수 있습니다.

- 편리한 패널 정렬 기능: 하단의 taskbar 메뉴를 통해 모든 패널을 한 번에 숨기거나 열 수 있으며, grid 정렬과 stack 정렬 기능을 사용하여 패널을 깔끔하게 정렬할 수 있습니다. 이 기능은 작업 효율성을 크게 향상시킵니다.

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

### 2. 백엔드 설정

`.env` 파일을 생성하고 DB 설정을 추가합니다.

_이 프로젝트는 기본적으로 SQLite를 사용하고 있습니다. MySQL, PostgreSQL 을 적용하고 싶다면 해당 링크를 참고해주세요 [데이터베이스 설정 가이드](docs/DB_guide.md)_

`cd backend`

> backend 폴더로 접근합니다.

`npm install`

> backend 폴더로 접근 후 npm install을 실행합니다.

`npm run start`

> 위 과정이 끝난다면 해당 명령어를 사용해 서버를 열어줍니다.

### 2. 프론트엔드 설정

`Live Server`

> 로컬 실행을 위해 VSCode에 익스텐션인 Live Server를 설치합니다.

`Go Live`

> 프로젝트에 `index.html` 파일을 열고, 우측 하단의 "Go Live" 버튼을 클릭합니다.

#### 사용방법

1. Live Server를 사용해 브라우저를 열어줍니다.
2. 회원가입 또는 로그인을 합니다.
3. 메뉴에서 다양한 패널을 추가하고 관리합니다.

#

저와 개발일지가 궁금하시다면 [About](docs/about.md), [개발일지](docs/개발일지/) 를 클릭해주시고 이 프로젝트가 도움이 되셨다면 Star 버튼으로 표현해주세요!
