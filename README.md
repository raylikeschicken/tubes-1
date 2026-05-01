# Web Top Up Game

Platform top up game untuk MLBB, PUBG Mobile, Free Fire, COD Mobile, dan Arena of Valor.

## Fitur

- Katalog produk top up per game
- Login dan register user
- Dashboard admin untuk order, user, dan produk
- Backend API Next.js + PostgreSQL

## Development

```bash
npm install
npm run dev
```

## PostgreSQL

Create the database tables before running the app:

```bash
psql "$POSTGRES_URL" -f database/schema.sql
```

## Environment

Copy `.env.example` to `.env.local` for local development or set these variables in your hosting dashboard:

```bash
POSTGRES_URL=postgres://user:password@localhost:5432/webtopup
JWT_SECRET=change-me
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
NEXT_PUBLIC_WHATSAPP_NUMBER=6281234567890
```

On Vercel, `NEXT_PUBLIC_API_URL` can be empty because API routes are served from the same deployment.
