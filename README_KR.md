# React Mdi Portal

<h3 align="center">브라우저 내 개인화된 위젯을 생성해보세요.</h3>
<!-- <hr style="width: 100%; margin: 25px 0;"> -->

<div align="center">
  <a href="README.md">🇺🇸 View in English</a>
</div>

#

<div align="center">
  <img src="https://github.com/moonklabs/mdi-portal-lsm-study/assets/62977652/77ab2ba6-d743-4ff5-aafc-4b6bfce51b97" alt="시연영상">
</div>

## Feature

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
- 👁️‍🗨️ 모든 위젯 숨기기
- 📂 모든 위젯 오픈
- 💾 위젯 상태 저장

###

<!-- 기능에 대한 자세한 내용은 아래 링크를 참고해주세요

- [Backend](docs/backend/README_KR.md)
- [Frontend](docs/frontend/README_KR.md) -->

## 데모

다음 데모 링크를 통해 배포된 프로젝트를 사용해볼 수 있습니다

- 프론트엔드: Vercel에 호스팅
- 백엔드: Koyeb에 호스팅

브라우저에서 개인화된 위젯 생성 및 관리 기능을 직접 체험해보세요!

- [react mdi portal](https://react-mdi-portal.vercel.app/)

  이 링크를 통해 react mdi portal의 모든 기능을 체험해볼 수 있습니다.

## Quick start

본인의 커스텀 앱을 넣고싶다면 [Custom](docs/guide/widget_guide.md) 를 참고해주세요, 또한 본인만의 스타일을 입히고 싶다면 [Style](docs/guide/style_guide.md) 가이드를 참고해주세요

### 요구사항

- Node.js (최소 14.0.0 버전 이상 권장)
- npm

### 1. 레포지토리 클론

```bash
git clone https://github.com/moonklabs/react-mdi-portal.git
```

### 2. 프론트엔드 실행

터미널을 생성해 아래 명령어를 입력해주세요. VSCode를 사용중이시라면 상단에 터미널을 클릭 후 새 터미널을 통해 만들 수 있습니다.

`cd frontend`

> frontend 폴더로 접근합니다.

`npm install`

> 의존성 설치

`npm run start`

> 로컬 실행

### 2. Backend -->

백엔드 환경을 실행시키기 위해 새로운 터미널을 생성해주세요.

`cd backend`

> backend 폴더로 접근합니다.

`npm install`

> 의존성 설치

`npm run start`

> 로컬 실행

_이 프로젝트는 기본적으로 SQLite를 사용하고 있습니다. MySQL, PostgreSQL 을 적용하고 싶으시다면 해당 링크를 참고해주세요 [데이터베이스 설정 가이드](docs/guide/DB_guide_KR.md)_

## Contributing

- 추가하고 싶은 기능이 있거나 버그를 발견하셨다면 메일로 보내주세요.

## About

저와 개발일지가 궁금하시다면 [About](docs/about.md), [개발일지](docs/개발일지/) 를 클릭해주시고 이 프로젝트가 도움이 되셨다면 star 버튼으로 표현해주세요!
