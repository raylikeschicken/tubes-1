# Web Top Up Game

Platform top up game untuk MLBB, PUBG Mobile, Free Fire, COD Mobile, dan Arena of Valor.

## Fitur

- Katalog produk top up per game
- Login dan register user
- Dashboard admin untuk order, user, dan produk
- Backend API Express + MongoDB

## Development

```bash
npm install
npm run dev
```

## Environment

Copy `.env.example` to `.env.local` for local development or set these variables in your hosting dashboard:

```bash
NEXT_PUBLIC_API_URL=https://your-backend-domain.com
NEXT_PUBLIC_WHATSAPP_NUMBER=6281234567890
```

If `NEXT_PUBLIC_API_URL` is empty, checkout still works through WhatsApp fallback.
