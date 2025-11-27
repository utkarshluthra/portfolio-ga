# Deployment Guide: Vercel + Supabase

This guide explains how to deploy your portfolio using **Vercel** (frontend/API) and **Supabase** (PostgreSQL database).

## 1. Supabase Setup (Database)

1.  **Create Project**: Go to [Supabase](https://supabase.com) and create a new project.
2.  **Get Credentials**:
    *   Go to **Project Settings** -> **Database**.
    *   Find the **Connection String** section.
    *   Switch to **Transaction Pooler (IPv4)** mode (recommended for Vercel).
    *   Copy the URI. This is your `DATABASE_URL`.
        *   *Format*: `postgres://[user]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true`
    *   Copy the **Session Mode** (Direct) URI. This is your `DIRECT_URL`.
        *   *Format*: `postgres://[user]:[password]@aws-0-[region].supabase.co:5432/postgres`

## 2. Code Configuration

### Update Prisma Schema
Ensure your `prisma/schema.prisma` is configured for PostgreSQL and Supabase:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

### Environment Variables
In your local `.env` file (for testing with Supabase):
```bash
DATABASE_URL="your-transaction-pooler-url"
DIRECT_URL="your-direct-url"
```

## 3. Vercel Setup (Deployment)

1.  **Import Project**: Go to [Vercel](https://vercel.com) and import your Git repository.
2.  **Environment Variables**: Add the following variables in the Vercel deployment screen:
    *   `DATABASE_URL`: Paste the Transaction Pooler URL from Supabase.
    *   `DIRECT_URL`: Paste the Direct URL from Supabase.
3.  **Deploy**: Click **Deploy**.

Vercel will run `npm install`, generate the Prisma Client (via `postinstall` script), and build the app.

## 4. Database Migration (Production)

After deployment (or locally if connected to remote DB), you need to push your schema to Supabase.

**Option A: Run from Local Machine (Recommended)**
1.  Update your local `.env` with the Supabase URLs.
2.  Run:
    ```bash
    npx prisma db push
    ```
3.  (Optional) Seed data:
    ```bash
    npx tsx prisma/seed.ts
    ```

**Option B: Run from Vercel**
You can add `npx prisma db push` to your build command, but running it locally is safer and gives you more control.

## Local Development (Switching Back)

If you want to develop locally using SQLite:
1.  Change `provider = "sqlite"` in `schema.prisma`.
2.  Remove `directUrl`.
3.  Update `.env` to `DATABASE_URL="file:./dev.db"`.
