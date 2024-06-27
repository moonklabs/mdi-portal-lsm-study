# 데이터베이스 설정 가이드

이 가이드는 TypeORM을 사용하여 다양한 데이터 베이스(MySQL, SQLite, PostgreSQL)에 연결하는 방법을 설명합니다.

## 1. 환경 파일 (`.env`)

먼저, backend 프로젝트의 루트 디렉토리에 `.env` 파일을 생성합니다. 다음과 같은 환경 변수를 `.env` 파일에 추가합니다. (SQLite 제외)

#### mysql

```bash
DATABASE_TYPE=mysql
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USERNAME=root
DATABASE_PASSWORD=password
DATABASE_NAME=mydatabase
```

#### postgres

```bash
DATABASE_TYPE=postgres
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=password
DATABASE_NAME=mydatabase
```

#### sqlite

SQLite의 경우 DATABASE_HOST, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD는 필요하지 않습니다.

## 2. TypeORM 설정

#### src/AppModule.ts

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PanelModule } from './panel/panel.module';
import { AuthModule } from './auth/auth.module';
import { AppDataSource } from './data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
    }),
    PanelModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### 2.1 MySQL, PostgreSQL

#### src/data.source.ts

```ts
import { DataSource } from 'typeorm';
import { User } from './auth/user.entity';
import { Panel } from './panel/panel.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql' | 'sqlite' | 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Panel],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  subscribers: [],
});
```

### 2.2 SQLite

```ts
import { DataSource } from 'typeorm';
import { Panel } from './panel/panel.entity';
import { User } from './auth/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const dataSource = new DataSource({
  type: 'sqlite',
  database: './database.sqlite',
  entities: [Panel, User],
  synchronize: true,
  logging: true,
});

export default dataSource;
```

> User, Panel Entity에 createdAt, modifiedAt의 타입을 datetime으로 바꿔줍니다.

### 추가

TypeORM 설정 시 synchronize 설정을 false로 바꾼 후 마이그레이션 파일을 생성하고 싶다면 아래 명령어를 실행해주세요.

`package.json` 파일 업데이트

> 스크립트를 추가하여 TypeORM CLI 명령을 실행할 수 있도록 합니다.

```js
{
  "scripts": {
    "typeorm": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli"
  }
}
```

`마이그레이션 파일 생성`

> 다음 명령을 실행하여 마이그레이션 파일을 생성합니다.

```bash
npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli migration:generate src/migrations/UpdateUserAndPanelTables -d src/data-source.ts
```
