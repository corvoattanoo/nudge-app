# 🔌 API Routes — Nudge

> Base URL: `http://localhost:3001/api/v1`  
> All protected routes require `Authorization: Bearer <access_token>`

---

## Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/register` | ❌ | Create a new user account |
| `POST` | `/auth/login` | ❌ | Login, returns access + refresh tokens |
| `POST` | `/auth/refresh` | ❌ | Exchange refresh token for a new access token |
| `POST` | `/auth/logout` | ✅ | Invalidate refresh token |

### `POST /auth/register`
```json
// Request
{
  "email": "user@example.com",
  "password": "securepassword",
  "username": "yigit"
}

// Response 201
{
  "user": { "id": "...", "email": "...", "username": "..." },
  "accessToken": "...",
  "refreshToken": "..."
}
```

---

## Users

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/users/me` | ✅ | Get current user profile |
| `PATCH` | `/users/me` | ✅ | Update profile (username, avatar) |
| `POST` | `/users/me/avatar` | ✅ | Upload avatar to S3 |

---

## Groups

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/groups` | ✅ | Create a new group |
| `GET` | `/groups` | ✅ | List groups the current user belongs to |
| `GET` | `/groups/:id` | ✅ | Get group details + members |
| `PATCH` | `/groups/:id` | ✅ Admin | Update group name |
| `DELETE` | `/groups/:id` | ✅ Admin | Delete a group |
| `POST` | `/groups/:id/members` | ✅ Admin | Invite a user to the group |
| `DELETE` | `/groups/:id/members/:userId` | ✅ Admin | Remove a member |
| `DELETE` | `/groups/:id/members/me` | ✅ | Leave the group |

### `POST /groups`
```json
// Request
{ "name": "Weekend Crew" }

// Response 201
{
  "id": "...",
  "name": "Weekend Crew",
  "createdBy": "...",
  "members": [{ "userId": "...", "role": "admin" }]
}
```

---

## Events

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/events` | ✅ | Browse event feed (with filters) |
| `GET` | `/events/:id` | ✅ | Get single event details |
| `POST` | `/events/:id/share` | ✅ | Share event to a group |

### `GET /events` Query Params

| Param | Type | Description |
|---|---|---|
| `category` | `string` | Filter by category (concert, cinema...) |
| `lat` | `float` | User latitude for proximity sort |
| `lng` | `float` | User longitude |
| `radius` | `number` | Radius in km (default: 10) |
| `from` | `ISO date` | Filter by start date |
| `to` | `ISO date` | Filter by end date |
| `page` | `number` | Pagination (default: 1) |
| `limit` | `number` | Items per page (default: 20) |

### `POST /events/:id/share`
```json
// Request
{ "groupId": "..." }

// Response 201
{
  "eventShareId": "...",
  "status": "pending",
  "votes": []
}
```

---

## Votes

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/votes` | ✅ | Cast or update a vote |
| `GET` | `/votes/:eventShareId` | ✅ | Get all votes for a share |

### `POST /votes`
```json
// Request
{
  "eventShareId": "...",
  "vote": "yes"   // or "no"
}

// Response 200
{
  "id": "...",
  "vote": "yes",
  "planCreated": false   // true if this vote triggered plan creation
}
```

---

## Plans

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/plans` | ✅ | List plans for the current user's groups |
| `GET` | `/plans/:id` | ✅ | Get plan details |
| `PATCH` | `/plans/:id` | ✅ Admin | Update meet time / location / outfit notes |
| `GET` | `/plans/:id/media` | ✅ | Get all media for this plan |
| `POST` | `/plans/:id/media` | ✅ | Upload a photo (fit check or scrapbook) |
| `DELETE` | `/plans/:id/media/:mediaId` | ✅ | Delete own photo |

### `POST /plans/:id/media`
```json
// Multipart form-data
// Field: file (image)
// Field: type = "fit_check" | "scrapbook"

// Response 201
{
  "id": "...",
  "url": "https://s3.../...",
  "type": "fit_check",
  "uploadedAt": "..."
}
```

---

## Real-time Events (Socket.io)

> Namespace: `/`  
> All events require a valid JWT passed in handshake auth.

| Event (server → client) | Payload | Description |
|---|---|---|
| `vote:new` | `{ eventShareId, userId, vote }` | A new vote was cast |
| `plan:created` | `{ planId, groupId }` | A plan was auto-created |
| `media:new` | `{ planId, mediaId, url, type }` | New photo uploaded |
| `group:member_joined` | `{ groupId, userId }` | New member joined |

---

## Error Format

All errors follow this shape:

```json
{
  "statusCode": 400,
  "error": "Bad Request",
  "message": "Human-readable message here"
}
```

| Status | Meaning |
|---|---|
| `400` | Validation error |
| `401` | Missing or invalid token |
| `403` | Forbidden (not a group member, etc.) |
| `404` | Resource not found |
| `409` | Conflict (already voted, already a member) |
| `500` | Internal server error |
