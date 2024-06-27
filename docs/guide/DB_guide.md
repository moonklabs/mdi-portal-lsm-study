# Database Configuration Guide

This guide explains how to connect to various databases (MySQL, SQLite, PostgreSQL) using TypeORM.

1\. Environment File (`.env`)

First, create a `.env` file in the root directory of the backend project. Add the following environment variables to the `.env` file (except for SQLite).

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

For SQLite, `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_USERNAME`, and `DATABASE_PASSWORD` are not required.

## 2. TypeORM Configuration

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

> Change the type of `createdAt` and `modifiedAt` to `datetime` in the `User` and `Panel` entities.

### Additional

If you want to change the `synchronize` setting to `false` and generate migration files, run the following commands.

Update the `package.json` file

> Add scripts to run TypeORM CLI commands.

```js
{
  "scripts": {
    "typeorm": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli"
  }
}
```

`Generate migration files`

> Run the following command to generate migration files..

```bash
npx ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli migration:generate src/migrations/UpdateUserAndPanelTables -d src/data-source.ts
```
