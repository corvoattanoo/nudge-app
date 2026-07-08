# 🫧 Nudge

> A social activity planning platform for small groups and couples.  
> Discover local events in Warsaw, vote on them together, build a plan, and share fun interactions before you meet up.

---

## ✨ Overview

Friend groups and couples today juggle Facebook for events, WhatsApp for decisions, and their own memory for the actual plan. Everything is scattered and the excitement dies before you even leave the house.

**Nudge** brings discovery, decision-making, and social hype into one intimate space — built for small circles, not public feeds.

---

## 🎯 Core User Flow

1. Browse local events (outdoor cinema, concerts, theater, etc.)
2. Share an event card to your small group (2–6 people)
3. Group members vote — accept ✅ or decline ❌
4. If the majority approves → a **Plan** is auto-created
5. Plan includes: meeting time, location, notes, outfit suggestions
6. Before the meetup → post photo reactions ("fit check")
7. After the event → photos are saved as a **memory scrapbook**

---

## 🚀 Key Features (MVP)

| Feature | Description |
|---|---|
| 📅 Event Feed | Cards with name, price, time, location, and description |
| 👥 Small Groups | Create groups of 2–6 members |
| 🗳️ Async Voting | Share an event → group votes ✅ / ❌ |
| 📋 Auto Plan | Plan card is generated on majority approval |
| 📸 Photo Reactions | Fit checks and reactions inside a plan |
| 🗺️ Map View | Browse events on a map (Mapbox) |
| 🏛️ Memory Scrapbook | Photos saved after the event |

---

## 🛠️ Tech Stack

### Backend (`apps/api`)
- **Runtime:** Node.js + TypeScript
- **Framework:** Fastify
- **Database:** PostgreSQL
- **Real-time:** Socket.io
- **Auth:** JWT + Refresh Tokens
- **Media:** AWS S3

### Frontend (`apps/web`)
- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Maps:** Mapbox GL JS
- **State:** TBD

### Infrastructure
- **Monorepo:** pnpm workspaces
- **Containers:** Docker + Docker Compose
- **Package Manager:** pnpm

---

## 📁 Folder Structure

```
nudge-app/
├── apps/
│   ├── api/                    # Fastify backend
│   │   ├── src/
│   │   │   ├── modules/        # Feature modules (users, groups, events, plans...)
│   │   │   ├── plugins/        # Fastify plugins (auth, db, s3, socket)
│   │   │   ├── shared/         # Shared utilities, types, errors
│   │   │   └── server.ts       # App entry point
│   │   ├── prisma/             # Prisma schema & migrations
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   └── web/                    # Next.js 14 frontend
│       ├── src/
│       │   ├── app/            # App Router pages & layouts
│       │   ├── components/     # Reusable UI components
│       │   ├── features/       # Feature-level components (events, groups, plans)
│       │   ├── lib/            # API client, utils, hooks
│       │   └── styles/         # Global styles
│       ├── public/             # Static assets
│       ├── Dockerfile
│       └── package.json
│
├── packages/
│   ├── types/                  # Shared TypeScript types & interfaces
│   ├── config/                 # Shared ESLint, Prettier, TS configs
│   └── ui/                     # (Optional) Shared UI component library
│
├── infra/
│   ├── docker-compose.yml      # Local dev environment
│   ├── docker-compose.prod.yml # Production override
│   └── nginx/                  # Nginx reverse proxy config
│
├── docs/
│   ├── architecture.md         # System design & decisions
│   ├── db-schema.md            # Database schema overview
│   ├── api-routes.md           # REST API reference
│   └── design/                 # Wireframes, design tokens
│
├── .github/
│   └── workflows/              # CI/CD pipelines
│
├── pnpm-workspace.yaml
├── package.json
├── turbo.json                  # (Optional) Turborepo config
├── .env.example
├── .gitignore
└── README.md
```

---

## 🗄️ Database Schema Overview

See [`docs/db-schema.md`](./docs/db-schema.md) for the full schema.

### Tables at a Glance

| Table | Purpose |
|---|---|
| `users` | Auth, profile, avatar |
| `groups` | Small social circles (2–6 members) |
| `group_members` | Join table: user ↔ group with roles |
| `events` | Local events (name, location, time, price, source) |
| `event_shares` | An event shared to a specific group |
| `votes` | User vote on a shared event |
| `plans` | Auto-generated plan on majority approval |
| `plan_notes` | Free-form notes inside a plan |
| `media` | Photos uploaded for fit checks / scrapbook |

---

## 🔌 API Routes Overview

See [`docs/api-routes.md`](./docs/api-routes.md) for the full reference.

### Auth
```
POST   /auth/register
POST   /auth/login
POST   /auth/refresh
POST   /auth/logout
```

### Users
```
GET    /users/me
PATCH  /users/me
```

### Groups
```
POST   /groups
GET    /groups/:id
PATCH  /groups/:id
POST   /groups/:id/members
DELETE /groups/:id/members/:userId
```

### Events
```
GET    /events              # Browse feed
GET    /events/:id
POST   /events/:id/share    # Share to a group
```

### Votes
```
POST   /votes               # Cast vote on a shared event
GET    /votes/:eventShareId # Get votes for a shared event
```

### Plans
```
GET    /plans/:id
PATCH  /plans/:id
GET    /plans/:id/media
POST   /plans/:id/media     # Upload fit check / photo
```

---

## 🏃 Getting Started

> Prerequisites: Node.js 20+, pnpm, Docker

```bash
# 1. Clone the repo
git clone https://github.com/your-username/nudge-app.git
cd nudge-app

# 2. Install dependencies
pnpm install

# 3. Copy env files
cp .env.example .env
# Fill in your values (DB, JWT secret, S3, Mapbox)

# 4. Start infrastructure (Postgres, Redis, etc.)
docker-compose -f infra/docker-compose.yml up -d

# 5. Run database migrations
pnpm --filter api db:migrate

# 6. Start dev servers
pnpm dev   # Runs both api and web concurrently
```

API will be available at `http://localhost:3001`  
Web will be available at `http://localhost:3000`

---

## 🤝 Contributing

This is a personal side project. Contributions are welcome once the MVP is stable.

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/your-feature`)
3. Commit your changes (`git commit -m 'feat: add your feature'`)
4. Push to the branch (`git push origin feat/your-feature`)
5. Open a Pull Request

---

## 📄 License

MIT © Yigit

---

> *"No public feed. No follower counts. Just you and your people."*
