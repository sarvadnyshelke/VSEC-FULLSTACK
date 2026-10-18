# Hospital Management System

A simple student project to manage **patients, doctors and appointments**.

**Tech:** React (Create React App), Node.js, Express.js, MongoDB (Mongoose), CSS.

## What you need first
1. [Node.js](https://nodejs.org) (version 16 or newer)
2. MongoDB running locally ([MongoDB Community](https://www.mongodb.com/try/download/community)) **or** a free [MongoDB Atlas](https://www.mongodb.com/atlas) connection string

## How to run

### 1. Start the backend (Terminal 1)
```bash
cd server
npm install
cp .env.example .env      # Windows: copy .env.example .env
npm start
```
You should see `MongoDB connected` and `Server running on port 5000`.
If you use MongoDB Atlas, paste your connection string into `MONGO_URI` in `server/.env`.

### 2. Start the frontend (Terminal 2)
```bash
cd client
npm install
cp .env.example .env      # Windows: copy .env.example .env
npm start
```
Open **http://localhost:3000**

## Folder structure
```
hospital-management-system/
├── client/                 React app
│   └── src/
│       ├── components/     Layout, Message, ResourceForm, ResourcePage
│       ├── pages/          Dashboard, Patients, Doctors, Appointments
│       ├── services/       api.js (Axios calls to the backend)
│       ├── App.js          Routes
│       └── index.js        Starts React (CRA entry file)
└── server/                 Express API
    ├── config/db.js        MongoDB connection
    ├── models/             Patient, Doctor, Appointment
    ├── controllers/        CRUD logic
    ├── routes/             API URLs
    └── server.js           Main file
```

## How it works
- **Models** describe the data and rules (required fields, phone = 10 digits, ...).
- **Controllers** do Create, Read, Update, Delete in MongoDB.
- **Routes** connect URLs to controllers.
- **ResourcePage** (React) is one reusable page used by Patients, Doctors and Appointments. Each page only lists its own form fields.

## API
| Method | URL | Action |
|---|---|---|
| GET | /api/patients | Get all |
| POST | /api/patients | Add new |
| PUT | /api/patients/:id | Update |
| DELETE | /api/patients/:id | Delete |
| GET | /api/dashboard | Totals + recent appointments |

The same routes exist for `/api/doctors` and `/api/appointments`.

## Notes
- Add patients and doctors first; the appointment form lets you pick from them.
- Colors: white, blue, light gray, green (plus dark text for readability).
- Never upload your real `.env` file to GitHub.
