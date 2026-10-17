# Hospital Management System

React + Node/Express + MongoDB (Mongoose). Manage patients, doctors and appointments with full CRUD.

## Requirements
- Node.js 18+
- MongoDB running locally (`mongodb://127.0.0.1:27017`) or a MongoDB Atlas connection string

## Setup

### 1. Backend
```bash
cd server
npm install
cp .env.example .env      # Windows: copy .env.example .env
# edit .env and set MONGO_URI if needed
npm run dev               # or: npm start   -> http://localhost:5000
```

### 2. Frontend (new terminal)
```bash
cd client
npm install
cp .env.example .env      # optional; defaults to http://localhost:5000/api
npm run dev               # -> http://localhost:5173
```

Open http://localhost:5173.

## Environment variables (`server/.env`)
| Name | Description |
|------|-------------|
| PORT | API port (default 5000) |
| MONGO_URI | MongoDB connection string |
| CLIENT_URL | Frontend origin allowed by CORS (default http://localhost:5173) |

## API
`GET /api/dashboard` and, for `patients`, `doctors`, `appointments`:
`GET /api/<resource>`, `GET /api/<resource>/:id`, `POST /api/<resource>`, `PUT /api/<resource>/:id`, `DELETE /api/<resource>/:id`

## Notes
- Appointments reference a patient and a doctor (chosen from dropdowns). Deleting a patient or doctor also deletes their appointments.
- Add patients and doctors first, then book appointments.
- Theme: white, blue, light gray and green. Text uses a dark shade of the blue.
