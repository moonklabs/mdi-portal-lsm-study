# API 명세서

## 개요

이 문서는 API의 엔드포인트, 요청 및 응답 형식 등을 설명합니다. [Swagger](http://localhost:3000/api#)

## 기본 정보

- **Base URL**: `https://localhost:3000.api`
- **응답 형식**: JSON
- **인증 방법**: Bearer Token

## 엔드포인트

### 1. 사용자 관련 API

#### 1.1. 사용자 회원가입

- **URL**: `/auth/signup`
- **Method**: `POST`
- **설명**: 새로운 사용자를 등록합니다.
- **요청 헤더**:

  - `Content-Type`: `application/json`

- **요청 본문**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **응답**:

  ```json

  ```

  #### 1.2. 사용자 로그인

- **URL**: `/auth/signin`
- **Method**: `POST`
- **설명**: 사용자가 로그인 합니다.
- **요청 헤더**:

  - `Content-Type`: `application/json`

- **요청 본문**:
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **응답**:

  ```json

  ```

### 2. 패널 관련 API

#### 2.1. 패널 조회

- **URL**: `/panel`
- **Method**: `GET`
- **설명**: 사용자와 관련된 패널을 조회합니다.
- **요청 헤더**:

  - `Content-Type`: `application/json`

- **요청 본문**:

  ```json

  ```

- **응답**:

  ```json
  {
    "id": 1,
    "title": "inflearn",
    "content": ""
    .
    .
    .
    .
  }
  ```

  #### 2.2. 패널 저장 및 수정

- **URL**: `/panel/save`
- **Method**: `POST`
- **설명**: 사용자의 패널을 저장 및 수정합니다.
- **요청 헤더**:

  - `Content-Type`: `application/json`

- **요청 본문**:
  ```json
  {
    "id": 1,
    "title": "inflearn",
    "content": ""
    .
    .
    .
    .
  }
  ```
- **응답**:

  ```json

  ```
