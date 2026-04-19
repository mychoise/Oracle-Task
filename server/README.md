# Oracle Backend
Express + MongoDB backend aligned with the client app.
## Routes
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/profile/me`
- `PUT /api/profile/me`
- `GET /api/tasks`
- `POST /api/tasks`
- `PATCH /api/tasks/:id`
- `DELETE /api/tasks/:id`
- `GET /api/health`
## Setup
```bash
cd server
cp .env.example .env
npm install
npm run dev
```
## Notes
- Uses MongoDB via `mongoose`
- Uses JWT bearer tokens for protected routes
- Tasks are scoped per logged-in user
