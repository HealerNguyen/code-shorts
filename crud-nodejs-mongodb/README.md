# Elegant Blog API

Fastify + TypeScript + Prisma (MongoDB) + Zod. Features: **auto slug** (slugify), **reading time** (words ÷ WPM), **standard JSON envelope** (`status`, `data`, `meta.timestamp`).

**Logs:** In development, HTTP logs use **Pino + `pino-pretty`** (colors, readable). Startup uses **consola**. In production (`NODE_ENV=production`), Pino prints plain JSON lines (no `pino-pretty` required at runtime).

## Setup

1. Copy env. **Local MongoDB** (default in `.env.example`):

   ```bash
   cp .env.example .env
   ```

   `DATABASE_URL` points at `mongodb://127.0.0.1:27017/blog` — database name `blog`, host `127.0.0.1`, port `27017` (MongoDB default). Change the path if you use another DB name. For Atlas, uncomment the example in `.env.example` and use your SRV string instead.

2. Install and generate Prisma Client:

   ```bash
   yarn install
   yarn db:generate
   yarn db:push
   ```

3. Run:

   ```bash
   yarn dev
   ```

## API

Base path: `/api/posts`

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Liveness (standard envelope) |
| GET | `/api/posts` | List posts |
| GET | `/api/posts/slug/:slug` | Get by slug |
| GET | `/api/posts/:id` | Get by Mongo ObjectId |
| POST | `/api/posts` | Create `{ title, content }` |
| PATCH | `/api/posts/:id` | Update `{ title?`, `content?` } |
| DELETE | `/api/posts/:id` | Delete |

### Example

```bash
curl -s http://localhost:3000/health | jq

curl -s -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Hello World","content":"Word ".repeat(400)}' | jq
```

Response shape:

```json
{
  "status": "success",
  "data": { ... },
  "meta": { "timestamp": "2026-03-25T12:00:00.000Z" }
}
```

## Local MongoDB

Either install MongoDB Community and run `mongod`, or use Docker:

```bash
docker run -d --name mongo-blog -p 27017:27017 mongo:7
```

Keep `DATABASE_URL="mongodb://127.0.0.1:27017/blog"` (or `localhost` instead of `127.0.0.1`) in `.env`, then `yarn db:push`.
