# Oracle Full Stack Project

Prisma is a full-stack web app with:

- `client/`: React + Vite frontend (Tailwind, Zustand, Axios)
- `server/`: Express + MongoDB backend (JWT auth, Cloudinary avatar upload)

## Folder Structure Analysis

```text
Oracle/
├── client/
│   ├── public/                # Static assets
│   └── src/
│       ├── components/        # Shared UI (e.g., Sidebar)
│       ├── pages/             # Route pages (Login, Register, Profile, Kanban)
│       ├── store/             # Zustand stores (auth/task state)
│       ├── lib/               # API layer (axios instance + auth header)
│       ├── App.jsx            # Route definitions and protected routes
│       └── main.jsx           # React entry point
├── server/
│   └── src/
│       ├── config/            # DB + Cloudinary config
│       ├── controllers/       # Request handlers
│       ├── middleware/        # Auth, error handling, not-found
│       ├── models/            # Mongoose schemas (User, Task)
│       ├── routes/            # Auth, profile, task, health endpoints
│       ├── app.js             # Express app + route mounting
│       └── server.js          # Env loading + DB connect + server bootstrap
├── package.json               # Root-level package file (not workspace-managed yet)
└── Readme.md
```

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Zustand, Axios, React Router
- Backend: Node.js, Express, Mongoose, JWT, bcryptjs, Cloudinary
- Database: MongoDB

## Prerequisites

- Node.js 18+
- npm
- MongoDB running locally or a MongoDB Atlas URI
- Cloudinary account (for profile avatar upload)

## Environment Setup

Create server environment file:

```bash
cd /home/sabin/Desktop/FullStack/Oracle/server
cp .env.example .env
```

Set values in `server/.env`:

- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `CLOUDINARY_CLOUD_NAME`
- `CLOUDINARY_API_KEY`
- `CLOUDINARY_API_SECRET`
- `NODE_ENV`

Optional frontend env file (`client/.env`):

```bash
VITE_API_URL=http://localhost:5000/api
```

If omitted, frontend falls back to `http://localhost:5000/api`.

## Install Dependencies

```bash
cd /home/sabin/Desktop/FullStack/Oracle/server
npm install

cd /home/sabin/Desktop/FullStack/Oracle/client
npm install
```

## Run the Project

Start backend first:

```bash
cd /home/sabin/Desktop/FullStack/Oracle/server
npm run dev
```

Start frontend in a new terminal:

```bash
cd /home/sabin/Desktop/FullStack/Oracle/client
npm run dev
```

## Build and Lint (Frontend)

```bash
cd /home/sabin/Desktop/FullStack/Oracle/client
npm run lint
npm run build
```

## API Routes (Mounted in `server/src/app.js`)

- `GET /api/health`
- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/profile/me`
- `PUT /api/profile/me`
- `GET /api/tasks`
- `POST /api/tasks`
- `PATCH /api/tasks/:id`
- `DELETE /api/tasks/:id`

## Current App Flow

- Auth token is stored in `localStorage` as `oracle_token`
- Axios request interceptor sends `Authorization: Bearer <token>`
- Zustand stores manage auth/profile/task state
- Profile image can be uploaded and saved via Cloudinary


