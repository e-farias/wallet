# Wallet
>
> A wallet fullstack web app. Made with TypeScript, Next.js, Prisma &amp; ☕.

<br>

## 📌 - Engines

Specific versions of engines, libraries, frameworks, plugins and other versioned tools.

- **node**: v22.14.0
- **pnpm**: 9.12.2
- **docker**: 28.1.1
- **docker-composer**: v2.11.2

<br>

## ⚙️ - Install

- Clone this repositories
- Install

  ```bash
  pnpm install
  ```

- Create your .env file from .env.example

- Up services with docker-composer:

  ```bash
  docker-compose build --no-cache && docker-compose --env-file .env up -dV
  ```

- Update database:

  ```bash
    pnpm db:update
  ```

<br>

## ▶️ - Run

- Run app via pnpm script

  ```bash
  pnpm dev
  ```

## 🏗️ - Arch

- The nice arch is in develop branch
- Time spent on the project: 14hs
