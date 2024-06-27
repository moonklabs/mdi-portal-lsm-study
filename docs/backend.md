# React Mdi Portal Backend

## README Introduction

This document summarizes the backend-related content of the MDI Portal. It includes explanations of the project's technology stack, structure, and features.

## Stack

- Node.js (Recommended minimum version 14.0.0 or higher)
- Nest.js (10.0.0)
- SQLite (5.1.7)

## Project Structure

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
 ┃ ┣ app.module.ts
 ┃ ┣ data-source.ts
 ┃ ┗ main.ts
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

## Feature Description

### User Registration and Login

- **Libraries Used**: `bcrpt`, `@nestjs/jwt`
- **Implementation Method**
  - **Registration**: Hash the password entered by the user using `bcrypt` and save it to the database.
  - **Login**: Compare the password entered by the user with the hashed password stored in the database for authentication. If authentication is successful, issue a JWT token.

### **Authentication with JWT**

- **Libraries Used**: `@nestjs/jwt`, `passport-jwt`
- **Implementation Method**

  - **JWT Strategy**: Use `passport-jwt` to verify the JWT token and authenticate the user.

  - **AuthGuard**: Use NestJs's `@UseGuards` decorator to verify the JWT token for routes that require JWT authentication.

### Panel Management

- **Libraries Used**: `passport-jwt`
- **Implementation Method**

  - **Creating and Updating Panels**: Receive panel data from the client for authenticated users and save or update it in the database.

  - **Retrieving Panels**: The `PanelController` authenticates the user using JWT and retrieves all panels of the user from the database.
