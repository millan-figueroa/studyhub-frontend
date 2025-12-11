# StudyHub – Collaborative Study Planner

StudyHub is a MERN-stack web application designed to help my classmates and me stay organized during our post-cohort review sessions.  
Admins can create **Modules** (like “Backend Review” or “React Deep Dive”), and inside each module they can create **Study Tasks**—assignments, readings, practice problems, or group study sessions.

Users track task status (To Do → In Progress → Done) and use the tool during our twice-weekly meetups to stay aligned and accountable.

---

## Features

### Core Features

- User registration and login using JWT authentication
- Secure logout and persistent session handling
- Create / read / update / delete Modules
- Create / read / update / delete Study Tasks nested inside a module
- Task workflow statuses: **To Do**, **In Progress**, **Done**
- Dashboard page showing a user’s modules, tasks, and progress
- Module detail page that displays tasks within that module
- Responsive UI (desktop + mobile)

### Planned Enhancements

- Invite other users to collaborate on a module
- Progress bar for module completion
- Role-based permissions (only admins can create modules)

### Additional Stretch Features

- Pomodoro timer
- Calendar integration
- Reminder system

---

## Technologies

### Backend

- Node.js
- Express
- MongoDB + Mongoose
- JWT authentication
- bcrypt password hashing
- dotenv
- CORS

### Frontend

- React (Vite)
- React Router
- Context API
- Axios

### Deployment

- Backend: Render (Web Service)
- Database: MongoDB Atlas
- Frontend: Render (Static Site)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/millan-figueroa/studyhub.git
cd studyhub
```

---

### 2. Install both backend and frontend dependencies in one shot:

```bash
(cd studyhub-backend && npm install) && (cd ../studyhub-frontend && npm install)
```

## Running the Backend

### 3. Create a .env File

```bash
PORT=####
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 4. Start Backend Server

```bash
nodemon server.js
```

## Running the Frontend

### 5. Install Frontend Dependencies

```bash
cd ../studyhub-frontend
npm install
```

### 6. Create a .env File to connect to backend

```bash
VITE_API_BASE_URL=http://localhost:3001
```

### 7. Start React Dev Server

```bash
npm run dev
```

Open a browser and navigate to http://localhost:5173
