# React Mdi Portal

<h3 align="center">브라우저 내 개인화된 위젯을 생성해보세요.</h3>
<hr style="width: 100%; margin: 25px 0;">
<div align="center">
  <img src="https://github.com/moonklabs/mdi-portal-lsm-study/assets/62977652/77ab2ba6-d743-4ff5-aafc-4b6bfce51b97" alt="시연영상">
</div>

## About react-mdi-portal

프로젝트는 React, Nest로 구성되어 있으며, 다음과 같은 기능을 지원합니다.

<!-- - 사용자는 시계, 브라우저 등 다양한 패널을 자유롭게 배치하고 크기를 조정할 수 있습니다. 패널은 Drag&Drop으로 쉽게 이동할 수 있으며, 숨기기, 최대화, 최소화 등의 기능을 통해 패널을 관리할 수 있습니다.

- 하단의 taskbar 메뉴를 통해 모든 패널을 한 번에 숨기거나 열 수 있으며, grid 정렬과 stack 정렬 기능을 사용하여 패널을 깔끔하게 정렬할 수 있습니다. -->

- 🌐 브라우저 위젯 생성
- 🕒 시계 위젯 생성
- 🖱️ 위젯 Drag&Drop
- ↔️ 위젯 Resize
- 📏 위젯 Grid Sort
- 🗂️ 위젯 Stack Sort
- 👁️ 위젯 숨기기
- 🔲 위젯 최대화
- 💾 위젯 상태 저장
- 👁️‍🗨️ 모든 위젯 숨기기
- 📂 모든 위젯 오픈

###

기능에 대한 자세한 내용은 아래 링크를 참고해주세요

- [Backend](./backend/README.md)
- [Frontend](./frontend/README.md)

## Quick start

### 요구사항

- React
- Node.js (16.20.2)
- Nest.js
- Sqlite (mysql, postgresql 선택 가능)
- npm

### 1. 레포지토리 클론

```bash
git clone https://github.com/moonklabs/mdi-portal-lsm-study.git
```

### 1. FrontEnd

터미널을 생성해 아래 명령어를 입력해주세요. VSCode를 사용중이시라면 상단에 터미널을 클릭 후 새 터미널을 통해 만들 수 있습니다.

`cd frontend`

> frontend 폴더로 접근합니다.

`npm install`

> 의존성 설치

`npm run start`

> 로컬 실행

### 2. Backend

_이 프로젝트는 기본적으로 SQLite를 사용하고 있습니다. MySQL, PostgreSQL 을 적용하고 싶으시다면 해당 링크를 참고해주세요 [데이터베이스 설정 가이드](docs/DB_guide.md)_

백엔드 환경을 실행시키기 위해 새로운 터미널을 생성해주세요.

`cd backend`

> backend 폴더로 접근합니다.

`npm install`

> 의존성 설치

`npm run start`

> 로컬 서버 실행

#

저와 개발일지가 궁금하시다면 [About](docs/about.md), [개발일지](docs/개발일지/) 를 클릭해주시고 이 프로젝트가 도움이 되셨다면 star 버튼으로 표현해주세요!
