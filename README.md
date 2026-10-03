# MoneySecurity — Backend (NestJS)

Latihan rewrite backend MoneySecurity dari Express ke **NestJS 12 + Prisma 7**.
Database sama persis dengan proyek lama (`database/init.sql` di-port penuh ke `prisma/schema.prisma`).

## Stack

- NestJS 12 (**JavaScript**,babel + nodemon — bukan TypeScript)
- Prisma 7 (`prisma-client` generator, driver adapter `@prisma/adapter-pg`)
- PostgreSQL 16 via Docker Compose (db `moneysecurity_nest`, port 5432)
- Validasi: `class-validator` + global `ValidationPipe`
- Docs: `@nestjs/swagger` di `/api/docs`

## Menjalankan

```bash
npm install
cp .env.example .env          # sesuaikan DATABASE_URL

npm run db:up                 # nyalakan postgres
npm run db:migrate            # prisma migrate dev + generate client
npm run db:seed               # user admin@gmail.com/admin123 + demo@gmail.com/demo123
npm run start:dev             # http://localhost:3000/api
```

Endpoint: `GET http://localhost:3000/api/health` · Swagger `http://localhost:3000/api/docs`

## Struktur

```
docker-compose.yml      postgres untuk latihan
prisma/
  schema.prisma         9 model + enum TransactionType (nama kolom = snake_like DB)
  migrations/           hasil prisma migrate
  seed.js               admin + demo
scripts/smoke.js        cek cepat /api/health (server harus jalan)
src/
  main.js               bootstrap: prefix /api, ValidationPipe, filter, Swagger
  app.module.js
  health.controller.js  GET /api/health (ngecek DB lewat $queryRaw)
  prisma/               PrismaModule (@Global) + PrismaService
  common/
    response.js         ok(message, data) -> { success, message, data }
    filters/            semua error jadi { success:false, message, data:null }
  generated/prisma/     hasil prisma generate (gitignored)
```

## Script npm

| Script | Fungsi |
|---|---|
| `start` / `start:prod` | `node index.js` |
| `start:dev` | nodemon |
| `db:up` / `db:down` / `db:reset` | nyalakan / matikan / hapus volume+ulang db |
| `db:migrate` | `migrate dev` + generate client |
| `db:deploy` | `migrate deploy` (produksi) |
| `db:seed` | isi data awal |
| `db:studio` | Prisma Studio |
| `prisma:generate` | generate client saja |
| `test` / `test:cov` | jest (unit test pure JS) |
| `smoke` | cek `/api/health` server yang sedang jalan |
| `format` | prettier |

## Catatan lingkungan (WSL / NTFS)

Repo ini berada di drive Windows (`fuseblk`) yang **tidak menyimpan bit executable**:

1. `node_modules/.bin/*` tidak bisa dijalankan → semua script memanggil `node ./node_modules/...`.
2. `chmod +x` tidak berlaku → binary `schema-engine` Prisma disalin ke Linux fs, lalu `PRISMA_SCHEMA_ENGINE_BINARY` di `.env` menunjuk ke sana:

   ```bash
   mkdir -p ~/.cache/prisma-engines
   cp node_modules/@prisma/engines/schema-engine-* ~/.cache/prisma-engines/
   chmod +x ~/.cache/prisma-engines/schema-engine-*
   ```

   Ulangi kalau versi Prisma di-upgrade.
3. Prisma 7 hasilkan client `.ts` ESM; project JS membacanya lewat type stripping Node >= 22, jadi import **harus** menulis ekstensi `.ts`. Konsekuensinya **Jest tidak bisa memuat Prisma client** → check integrasi pakai `npm run smoke`, bukan jest e2e.

## Kontrak respons

Semua endpoint memakai `{ success, message, data }` (diformat `AllExceptionsFilter` untuk error) — sama dengan backend Express lama supaya frontend Vue tidak perlu diubah.