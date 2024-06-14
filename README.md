# mdi-portal-lsm-study

MDI 포털 풀스택 구현 스터디

## 참여

| 이름   | 역할   |
| ------ | ------ |
| 이수민 | 풀스택 |

<img src="sumin.jpg" alt="이수민" width="125" />

## 1. 개발환경

- ### FE : Vanila JavaScript, HTML, CSS
- ### BE : Node, Nest, MySQL
- ### 버전 관리 : Github
- ### 배포 환경 : AWS

## 2. 프로젝트 구조

```
├── README.md
├── LICENSE
├── docs
│    └── daily.md
├── backend
│    └── src
│
├── frontend
│    └── src
│         ├── index.html
│         ├── index.js
│         └── styles.css

```

## 기능과 UI

- ### FE

  - [x] 새로운 윈도우 생성
  - [x] 윈도우 Drag & Drop
  - [x] 윈도우 숨기기 및 최대화
  - [x] 사용중인 윈도우를 정렬 기능
  - [x] 모든 윈도우 열기 및 최소화

  [자세한 내용](docs/frontend.md)

- ### BE

  - [x] 회원가입, 로그인, 로그아웃
  - [x] 로그인 상태에서 윈도우 저장 기능
  - [x] 생성된 윈도우 API
  - [x] 윈도우 생성 API
  - [x] 윈도우 저장 API

  [자세한 내용](docs/backend.md)

- ### UI
  - [x] 회원가입 폼
  - [x] 로그인 폼
  - [x] 새로운 작업 생성 폼
  - [x] 상단 header에 제목 표시
  - [x] header 우측에 닉네임(로그인 상태) 표시
  - [x] Taskbar 진행 작업 표시
  - [x] Taskbar nav 활성화 버튼

## 개발 일정

- ### 1주차

  - 레이아웃 및 UI 작업

- ### 2주차

  - 백엔드 API, DB 작업

- ### 3주차

  - AWS 배포 후 배포 환경 테스트

- ### 4주차

  - 기능 고도화
