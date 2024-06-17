# MDI PORTAL

이 프로젝트는 웹에서 개인화된 웹 환경을 제공하는 서비스입니다. 사용자는 웹 환경에서 시계, 브라우저 패널을 자신의 필요에 맞게 생성하고 조작할 수 있습니다. [API 명세](docs/API.md)

![시연영상](https://github.com/moonklabs/mdi-portal-lsm-study/assets/62977652/95fc2455-e66e-4996-9978-34ad0ab92775)

## 기능 소개

이 프로젝트는 다음과 같은 기능을 제공합니다.

- **사용자 회원가입 및 로그인**: 회원가입과 로그인을 통해 개인화된 환경을 제공합니다.
- **타임존 및 브라우저 패널**: 타임존을 설정한 시계 패널과 브라우저 패널을 생성할 수 있습니다.
- **생성한 패널 관리**: 생성한 패널들을 Drag&Drop, 숨기기, 최대화와 같은 기능을 사용할 수 있습니다.
- **메뉴 기능**: 하단에 있는 taskbar 우측에 있는 메뉴에서 모두 숨기기, 모두 열기, grid정렬, stack 정렬을 사용할 수 있습니다.

자세한 내용은 각 부분의 README 파일을 참고하세요

- [Backend](./backend/README.md)
- [Frontend](./frontend/README.md)

## 시작하기

### 요구사항

- Node.js
- Nest.js
- Mysql, SQLite, PostgreSQL 중 선택
- npm

### 설치 및 실행

#### 1. 레포지토리 클론

```bash
git clone https://github.com/moonklabs/mdi-portal-lsm-study.git
```

#### 2. 백엔드 설정

`.env` 파일을 생성하고 DB 설정을 추가합니다. [DB 설정 가이드](docs/DB_guide.md)

`cd backend`

> backend 폴더로 접근합니다.

`npm install`

> backend 폴더로 접근 후 npm install을 실행합니다.

`npm run start`

> 위 과정이 끝난다면 해당 명령어를 사용해 서버를 열어줍니다.

#### 2. 프론트엔드 설정

`Live Server`

> 로컬 실행을 위해 VSCode에 익스텐션인 Live Server를 설치 후 우측 하단에 있는 Go Live 를 클릭합니다.

#### 사용방법

1. 브라우저에서 http://localhost:3000으로 이동합니다.
2. 회원가입 또는 로그인을 합니다.
3. 메뉴에서 다양한 패널을 추가하고 관리합니다.

#

저와 개발일지가 궁금하시다면 [About](docs/about.md), [개발일지](docs/개발일지/) 를 클릭해주세요
