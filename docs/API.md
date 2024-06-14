# API 명세서

## 개요

이 문서는 API의 엔드포인트, 요청 및 응답 형식, 인증 방법 등을 설명합니다. [Swagger](http://localhost:3000/api#)

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
  {
    "username": "string",
    "password": "string"
  }
  ```
