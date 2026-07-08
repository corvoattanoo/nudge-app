# 🗄️ Database Schema — Nudge

> This document is the reference for the PostgreSQL schema.  
> ORM: **Prisma** (or raw SQL migrations — TBD)

---

## Tables

---

### `users`

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | PK |
| `email` | `varchar(255)` | Unique, required |
| `password_hash` | `text` | Bcrypt |
| `username` | `varchar(50)` | Unique, display name |
| `avatar_url` | `text` | S3 URL, nullable |
| `created_at` | `timestamptz` | Default now() |
| `updated_at` | `timestamptz` | Auto-updated |

---

### `groups`

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | PK |
| `name` | `varchar(100)` | Group display name |
| `created_by` | `uuid` | FK → users.id |
| `created_at` | `timestamptz` | Default now() |

> Max 6 members enforced at the application layer.

---

### `group_members`

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | PK |
| `group_id` | `uuid` | FK → groups.id |
| `user_id` | `uuid` | FK → users.id |
| `role` | `enum('admin','member')` | Admin = group creator |
| `joined_at` | `timestamptz` | Default now() |

> Unique constraint on `(group_id, user_id)`.

---

### `events`

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | PK |
| `title` | `varchar(255)` | Event name |
| `description` | `text` | Nullable |
| `location_name` | `varchar(255)` | Venue name |
| `lat` | `float8` | Latitude |
| `lng` | `float8` | Longitude |
| `starts_at` | `timestamptz` | Event start time |
| `ends_at` | `timestamptz` | Nullable |
| `price` | `numeric(10,2)` | 0 = free |
| `currency` | `varchar(3)` | Default 'PLN' |
| `category` | `varchar(50)` | e.g. 'concert', 'cinema' |
| `image_url` | `text` | Cover image |
| `source_url` | `text` | Original listing URL |
| `created_at` | `timestamptz` | Default now() |

---

### `event_shares`

Represents an event being shared to a specific group for voting.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | PK |
| `event_id` | `uuid` | FK → events.id |
| `group_id` | `uuid` | FK → groups.id |
| `shared_by` | `uuid` | FK → users.id |
| `status` | `enum('pending','approved','rejected')` | Default 'pending' |
| `shared_at` | `timestamptz` | Default now() |

---

### `votes`

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | PK |
| `event_share_id` | `uuid` | FK → event_shares.id |
| `user_id` | `uuid` | FK → users.id |
| `vote` | `enum('yes','no')` | |
| `voted_at` | `timestamptz` | Default now() |

> Unique constraint on `(event_share_id, user_id)`.

---

### `plans`

Auto-created when an event_share reaches majority approval.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | PK |
| `event_share_id` | `uuid` | FK → event_shares.id, unique |
| `group_id` | `uuid` | FK → groups.id |
| `event_id` | `uuid` | FK → events.id |
| `meet_time` | `timestamptz` | Confirmed meeting time |
| `meet_location` | `text` | Nullable override |
| `outfit_notes` | `text` | Outfit suggestion |
| `status` | `enum('upcoming','past')` | |
| `created_at` | `timestamptz` | Default now() |
| `updated_at` | `timestamptz` | Auto-updated |

---

### `plan_notes`

Free-form notes added by group members to a plan.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | PK |
| `plan_id` | `uuid` | FK → plans.id |
| `user_id` | `uuid` | FK → users.id |
| `content` | `text` | |
| `created_at` | `timestamptz` | Default now() |

---

### `media`

Photos uploaded as fit checks (pre-event) or scrapbook entries (post-event).

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | PK |
| `plan_id` | `uuid` | FK → plans.id |
| `user_id` | `uuid` | FK → users.id |
| `s3_key` | `text` | S3 object key |
| `url` | `text` | Public/signed URL |
| `type` | `enum('fit_check','scrapbook')` | |
| `uploaded_at` | `timestamptz` | Default now() |

---

## Relationships Diagram (simplified)

```
users ──< group_members >── groups
users ──< event_shares ──> events
          event_shares ──< votes ── users
          event_shares ──── plans ──< plan_notes
                            plans ──< media
```

---

## Notes

- All primary keys use `uuid` (generated at application layer with `crypto.randomUUID()` or DB `gen_random_uuid()`).
- `timestamptz` is used throughout for timezone safety.
- Voting logic and plan auto-creation are handled in the application layer (not DB triggers).
- Media URLs may be pre-signed S3 URLs (time-limited) — caching strategy TBD.
