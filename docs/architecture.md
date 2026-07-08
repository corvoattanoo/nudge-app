# 🏗️ Architecture — Nudge

> High-level system design and key technical decisions.

---

## System Overview

```
┌─────────────────────────────────────────────────────┐
│                     Client (Browser)                │
│              Next.js 14 — Tailwind — Mapbox         │
└─────────────────────┬───────────────────────────────┘
                      │  HTTP (REST) + WebSocket
                      ▼
┌─────────────────────────────────────────────────────┐
│                  Fastify API Server                  │
│           Node.js + TypeScript + Socket.io          │
│                                                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐            │
│  │  Auth    │ │  Groups  │ │  Events  │  ...        │
│  └──────────┘ └──────────┘ └──────────┘            │
└───────────────┬─────────────────────────────────────┘
                │
     ┌──────────┴──────────┐
     ▼                     ▼
┌──────────┐         ┌──────────┐
│ PostgreSQL│         │  AWS S3  │
│           │         │  Media   │
└──────────┘         └──────────┘
```

---

## Key Decisions

### Why Fastify?
- Faster than Express with lower overhead
- Schema-based validation (JSON Schema) built-in
- Plugin system is well-suited to a modular monolith structure

### Why Next.js 14 App Router?
- Server Components for fast initial load of the event feed
- Easy API route co-location for minor BFF needs
- Good Tailwind CSS integration

### Why PostgreSQL?
- Relational data fits this domain well (groups, votes, plans)
- Strong ACID guarantees important for voting/plan creation logic
- pg extensions available if needed (PostGIS for geo queries later)

### Why Socket.io?
- Real-time vote updates and plan creation notifications
- Simpler than raw WebSockets, good fallback support
- Room-based model maps well to groups

### Monorepo with pnpm workspaces
- Shared `packages/types` keeps frontend and backend in sync
- Single `pnpm install` at root
- `turbo.json` optional for caching build tasks

---

## Voting Logic (Application Layer)

1. User calls `POST /votes` with `{ eventShareId, vote: "yes" }`
2. API saves the vote
3. API counts total group members and current `yes` votes
4. If `yes_votes / total_members > 0.5` → **majority reached**
5. API creates a `plans` row linked to the `event_share`
6. API sets `event_shares.status = 'approved'`
7. Socket.io emits `plan:created` to the group room

---

## Media Flow (Fit Check / Scrapbook)

1. Client calls `POST /plans/:id/media` with multipart form
2. API validates file type (jpg/png/webp, max 10MB)
3. API uploads to S3 under key `plans/{planId}/{userId}/{uuid}.jpg`
4. API saves `media` row with S3 key and public URL
5. Socket.io emits `media:new` to the group room

---

## Auth Flow

- **Register / Login** → returns `accessToken` (15min) + `refreshToken` (7d)
- `accessToken` sent in `Authorization: Bearer` header
- `refreshToken` stored in httpOnly cookie
- `POST /auth/refresh` exchanges cookie for new access token
- Logout invalidates the refresh token (stored in DB or Redis)

---

## Open Architecture Questions (TBD)

- [ ] ORM: Prisma vs. raw SQL (Postgres.js / Drizzle)?
- [ ] Caching: Redis for refresh tokens? Session store?
- [ ] Event data source: manual seeding vs. third-party API (Eventim, Going)?
- [ ] PostGIS for geo-queries vs. Haversine formula in app layer?
- [ ] CDN for S3 media (CloudFront)?
- [ ] Deployment target: Railway / Render / VPS?
