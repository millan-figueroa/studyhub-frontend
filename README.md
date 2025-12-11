# 🐱‍💻 StudyHub – Collaborative Study Planner

StudyHub is a MERN-stack web application designed to help us stay organized during our post-cohort review sessions. <br>
Admins can create **Modules** (like “Backend Review” or “React Deep Dive”), and inside each module they can create **Study Tasks**—assignments, readings, practice problems, or group study sessions.<br>

Users track task status (To Do > In Progress > Done) and use the tool during our twice-weekly meetups to stay aligned and accountable.

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

- Add Github Authentication
- Progress bar for module completion
- Role-based permissions (only admins can create modules)
- Calendar integration

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

# 🚧 Challenges I Encountered

## 1. Enum Mismatch Causing 500 Errors

I ran into a debugging challenge where my backend enum in taskSchema.js expected values like "To Do", while my frontend in ModuleDetailsPage.tsx was sending "todo".
This small mismatch caused a 500 error and taught me how strict Mongoose enums are — and how important it is to keep backend and frontend data contracts aligned.

## 2. Keeping Frontend State in Sync With CRUD Operations

Even when my backend functions worked, the UI sometimes didn’t update because I wasn’t correctly updating state in React.
I had to refine my map() and filter() patterns across files like ModulesPage.tsx and ModuleDetailsPage.tsx to ensure the UI always reflected the latest backend changes.

## 3. Deployment Issues Breaking the Frontend

Although everything worked locally, deploying introduced new challenges:

mismatched API base URLs

environment variable issues

/api route differences

CORS errors

### These issues helped me understand how different deployment environments can behave from local development, especially in full-stack apps.

## 🌱 Future Features

### Task Kanban Board

- Drag-and-drop interface for moving tasks between **todo → in-progress → done**
- More visual way to track study progress

### Deadlines & Reminders

- Add due dates to tasks
- Visual deadline indicators or optional notifications

### Module Progress Tracking

- Automatic progress bars based on completed tasks
- Quick overview of how close each module is to completion

### User Profile & Settings

- Update username, email, or password
- Add optional avatar or display preferences

### Search & Filtering

- Search modules or tasks by keywords
- Filter tasks by status, date, or priority

### Light/Dark Mode Toggle

- Add a UI theme switch for accessibility and personalization

### Priority Levels

- High/medium/low priority tags
- Improved task visibility based on importance

### Custom Task Ordering

- Allow users to reorder tasks manually
- Drag-to-sort or arrow-based ordering

### Notes or Attachments

- Add notes, images, or helpful links to tasks
- Makes the app more of a study companion

### Improved Dashboard

- Total modules overview
- Tasks due soon / today’s tasks
- Completion stats for motivation

### Mobile UI Enhancements

- Better mobile layout
- Optional swipe gestures for marking tasks complete

## Anki Deck Library

The Anki Deck Library lets users upload and store their own flashcard decks directly in the app. It creates a shared space where learners can organize their study materials and access custom decks anytime.
