# MDI Portal Backend

## 프로젝트 개요

MDI Portal Backend는 사용자 인증, 패널 관리, 타임존 및 브라우저 패널 기능을 제공하는 웹 애플리케이션의 백엔드입니다. 이 프로젝트는 NestJS와 TypeORM을 사용하여 구현되었습니다.

## 주요 기술 스택

- Node.js - 20.12.0
- Nest.js - 10.3.2
- MySQL - 8.0.31

## 프로젝트 구조

```
backend
 ┣ src
 ┃ ┣ auth
 ┃ ┃ ┣ dto
 ┃ ┃ ┃ ┗ auth-credentials.dto.ts
 ┃ ┃ ┣ auth.controller.ts
 ┃ ┃ ┣ auth.guard.ts
 ┃ ┃ ┣ auth.module.ts
 ┃ ┃ ┣ auth.service.ts
 ┃ ┃ ┣ jwt.strategy.ts
 ┃ ┃ ┗ user.entity.ts
 ┃ ┣ migrations
 ┃ ┃ ┗ 1718266159626-UpdateUserAndPanelTables.ts
 ┃ ┣ panel
 ┃ ┃ ┣ dto
 ┃ ┃ ┃ ┣ create-panel.dto.ts
 ┃ ┃ ┃ ┗ update-panel.dto.ts
 ┃ ┃ ┣ panel.controller.ts
 ┃ ┃ ┣ panel.entity.ts
 ┃ ┃ ┣ panel.module.ts
 ┃ ┃ ┗ panel.service.ts
 ┃ ┣ app.controller.spec.ts
 ┃ ┣ app.controller.ts
 ┃ ┣ app.module.ts
 ┃ ┣ app.service.ts
 ┃ ┣ data-source.ts
 ┃ ┗ main.ts
 ┣ test
 ┃ ┣ app.e2e-spec.ts
 ┃ ┗ jest-e2e.json
 ┣ .env.example
 ┣ .eslintrc.js
 ┣ .gitignore
 ┣ .prettierrc
 ┣ README.md
 ┣ db.sqlite
 ┣ nest-cli.json
 ┣ package-lock.json
 ┣ package.json
 ┣ tsconfig.build.json
 ┗ tsconfig.json
```

## 기능 설명

### 사용자 회원가입 및 로그인

- **사용된 라이브러리**: `bcrpt`, `@nestjs/jwt`
- **구현 방법**
  - **회원 가입**: 사용자가 입력한 비밀번호를 `bcrpt`를 사용하여 해싱한 후 데이터베이스에 저장합니다.
  - **로그인**: 사용자가 입력한 비밀번호를 데이터베이스에 저장된 해시된 비밀번호와 비교하여 인증을 수행합니다. 인증을 성공하면 jwt 토큰을 발급합니다.

### **JWT를 이용한 인증**

- **사용된 라이브러리**: `@nestjs/jwt`, `passport-jwt`
- **구현 방법**

  - **JWT 전략**: `passport-jwt`를 사용하여 JWT 토큰을 검증하고 사용자 인증을 수행합니다.
  - **AuthGuard**: NestJs의 `@useGuard` 데이코레이터를 사용하여 JWT 인증이 필요한 라우트에 대해 JWT 토큰을 검증합니다.

### 패널 관리

- **사용된 라이브러리**: `passport-jwt`, `TypeORM`
- **구현 방법**

  - **TypeORM**: TypeORM을 사용하여 entity와 데이터베이스 테이블을 매핑하고, 레포지토리 패턴을 통해 데이터베이스 연산을 수행했습니다.
  - **패널 생성 및 수정**: 인증된 사용자에게 클라이언트에서 패널 데이터를 받아와서 데이터베이스에 저장 및 업데이트합니다.
  - **패널 조회**: PanelController에서 JWT 인증을 통해 사용자를 확인하고 데이터베이스에서 사용자의 모든 패널을 조회합니다.
