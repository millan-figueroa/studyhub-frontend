# StudyHub – Project TODO

## 0. Deployment Setup (Render First)

- [ ] Confirm **backend repo** exists on GitHub

  - [ ] Check `package.json` has a `start` script (`"start": "node server.js"` or similar)
  - [ ] Ensure `server.js` (or `index.js`) listens on `process.env.PORT`
  - [ ] Make sure `cors` is installed and enabled for your frontend origin
  - [ ] Add `.env` to `.gitignore`

- [ ] Confirm **frontend repo** exists on GitHub

  - [ ] Check `package.json` has a `build` script (`"build": "vite build"` or `react-scripts build`)
  - [ ] Add `.env` to `.gitignore` (if you use environment vars for API URL)

- [ ] Deploy **backend** to Render (Web Service)

  - [ ] Connect Render to backend GitHub repo
  - [ ] Set build command (e.g., `npm install`)
  - [ ] Set start command (e.g., `npm start`)
  - [ ] Add environment variables on Render:
    - [ ] `MONGO_URI`
    - [ ] `JWT_SECRET`
    - [ ] Any others you need
  - [ ] Verify backend is reachable (e.g., test `GET /api/health` or similar)

- [ ] Deploy **frontend** to Render (Static Site)

  - [ ] Connect Render to frontend GitHub repo
  - [ ] Set build command (e.g., `npm install && npm run build`)
  - [ ] Set publish directory (e.g., `dist`)
  - [ ] Configure frontend API base URL (pointing to your Render backend):
    - [ ] In code or via environment variable, e.g. `VITE_API_BASE_URL`

- [ ] Test deployment round-trip
  - [ ] From the live frontend, try hitting a simple backend route
  - [ ] Fix any CORS or mixed-content (HTTPS) issues

---

## 1. Backend – Setup & Auth

- [ ] Initialize backend structure (if not already)

  - [ ] `/models`
  - [ ] `/routes`
  - [ ] `/controllers` (optional but good)
  - [ ] `/middleware`

- [ ] Install core dependencies

  - [ ] `express`
  - [ ] `mongoose`
  - [ ] `dotenv`
  - [ ] `cors`
  - [ ] `bcryptjs`
  - [ ] `jsonwebtoken`
  - [ ] `nodemon` (dev)

- [ ] Configure `server.js`

  - [ ] Load environment variables using `dotenv`
  - [ ] Connect to MongoDB using `MONGO_URI`
  - [ ] Enable JSON body parsing
  - [ ] Enable CORS
  - [ ] Mount routes under `/api`
  - [ ] Listen on `process.env.PORT`

- [ ] Create `User` model

  - [ ] Fields: `name`, `email`, `password`
  - [ ] Email unique
  - [ ] Pre-save hook to hash password with `bcryptjs`

- [ ] Auth routes

  - [ ] `POST /api/auth/register`
    - [ ] Validate input
    - [ ] Check if user exists already
    - [ ] Hash password
    - [ ] Save user
    - [ ] Return JWT + basic user info
  - [ ] `POST /api/auth/login`
    - [ ] Find user by email
    - [ ] Compare password with hashed password
    - [ ] Return JWT + basic user info

- [ ] Auth middleware
  - [ ] `authMiddleware` to:
    - [ ] Read `Authorization: Bearer <token>` header
    - [ ] Verify JWT using `JWT_SECRET`
    - [ ] Attach `req.user` (id, email, etc.)
    - [ ] Send 401 if token missing/invalid

---

## 2. Backend – Courses (Projects)

> **StudyHub naming:** “Courses” in the UI, but can stay as `Project` model in code.

- [ ] Create `Project` model

  - [ ] Fields:
    - [ ] `name` (course name)
    - [ ] `description`
    - [ ] `owner` (ObjectId → `User`)

- [ ] Project routes (all protected by `authMiddleware`)

  - [ ] `GET /api/projects`
    - [ ] Return only projects where `owner === req.user.id`
  - [ ] `POST /api/projects`
    - [ ] Create new project with `owner = req.user.id`
  - [ ] `GET /api/projects/:id`
    - [ ] Find project by id
    - [ ] Check `owner === req.user.id`
  - [ ] `PUT /api/projects/:id`
    - [ ] Ownership check
    - [ ] Update name/description
  - [ ] `DELETE /api/projects/:id`
    - [ ] Ownership check
    - [ ] Delete project
    - [ ] (Optional) Also delete all tasks for that project

- [ ] Add reusable ownership check helper (optional but nice)

  - [ ] Function to verify logged-in user owns the project before continuing

- [ ] Test project endpoints with Postman or similar
  - [ ] Register user, get token
  - [ ] Create project
  - [ ] Fetch projects
  - [ ] Update project
  - [ ] Delete project
  - [ ] Verify another user cannot access someone else’s projects

---

## 3. Backend – Study Tasks

> “Study Tasks” in UI, `Task` model in code.

- [ ] Create `Task` model

  - [ ] Fields:
    - [ ] `title`
    - [ ] `description`
    - [ ] `status` (e.g., `"To Do"`, `"In Progress"`, `"Done"`)
    - [ ] `project` (ObjectId → `Project`)

- [ ] Task routes (all protected + project ownership enforced)

  - [ ] `GET /api/projects/:projectId/tasks`
    - [ ] Verify project exists and `owner === req.user.id`
    - [ ] Find tasks where `project === projectId`
  - [ ] `POST /api/projects/:projectId/tasks`
    - [ ] Verify project ownership
    - [ ] Create task with `project = projectId`
  - [ ] `PUT /api/projects/:projectId/tasks/:taskId`
    - [ ] Verify project ownership
    - [ ] Update task fields (title, description, status)
  - [ ] `DELETE /api/projects/:projectId/tasks/:taskId`
    - [ ] Verify project ownership
    - [ ] Delete task

- [ ] Test task endpoints
  - [ ] Create a project
  - [ ] Add tasks to that project
  - [ ] Fetch tasks
  - [ ] Update task status
  - [ ] Delete a task
  - [ ] Confirm that tasks for one user’s project are not accessible by another user

---

## 4. Frontend – Setup & Global Auth

- [ ] Ensure React app (Vite or CRA) is set up

  - [ ] Clean out starter code (logos, boilerplate, etc.)
  - [ ] Create a simple layout (header, main content)

- [ ] Install dependencies

  - [ ] `react-router-dom`
  - [ ] (Optional) `axios` or use `fetch`

- [ ] Create routing

  - [ ] `/login`
  - [ ] `/register`
  - [ ] `/dashboard`
  - [ ] `/courses/:id` (or `/projects/:id`)

- [ ] Create `AuthContext`

  - [ ] Holds `user` and `token`
  - [ ] Provides `login`, `logout`, and maybe `register` helpers
  - [ ] Initializes from `localStorage` on page load

- [ ] Implement a basic Protected Route approach
  - [ ] If no token in context → redirect to `/login`
  - [ ] Wrap `Dashboard` and `Course` pages in this protection

---

## 5. Frontend – Auth Pages

- [ ] **Login Page**

  - [ ] Form: email, password
  - [ ] On submit:
    - [ ] Call `POST /api/auth/login`
    - [ ] If success:
      - [ ] Save token + user in context
      - [ ] Save token in `localStorage`
      - [ ] Navigate to `/dashboard`
    - [ ] If error, show basic error message

- [ ] **Register Page**
  - [ ] Form: name, email, password
  - [ ] On submit:
    - [ ] Call `POST /api/auth/register`
    - [ ] Either:
      - [ ] Auto-login with returned token, or
      - [ ] Redirect to `/login`
    - [ ] Show errors (email in use, weak password, etc.)

---

## 6. Frontend – Dashboard (Courses Page)

- [ ] Create `Dashboard` page

  - [ ] On mount:
    - [ ] Fetch `GET /api/projects` with `Authorization: Bearer <token>`
  - [ ] Show:
    - [ ] List of courses (projects)
      - [ ] Name
      - [ ] Description
      - [ ] Button/link → “View Course” (`/courses/:id`)
  - [ ] Add new course UI:
    - [ ] Simple form: name + description
    - [ ] On submit → `POST /api/projects`, then refresh list
  - [ ] Optional:
    - [ ] Buttons to edit course name/description
    - [ ] Button to delete a course

- [ ] Handle UX states
  - [ ] Loading state while fetching
  - [ ] Error state if fetch fails
  - [ ] Empty state if no courses

---

## 7. Frontend – Course Detail (Study Tasks)

- [ ] Create `CoursePage` for `/courses/:id`

  - [ ] On mount:
    - [ ] Fetch `GET /api/projects/:id` for course info
    - [ ] Fetch `GET /api/projects/:id/tasks` for study tasks

- [ ] Display course info

  - [ ] Course name
  - [ ] Description

- [ ] Display study tasks

  - [ ] List of tasks with:
    - [ ] Title
    - [ ] Description
    - [ ] Status (select/dropdown)
  - [ ] On status change:
    - [ ] Call `PUT /api/projects/:projectId/tasks/:taskId`
    - [ ] Update UI

- [ ] Add new task UI

  - [ ] Form: title, description, status (default “To Do”)
  - [ ] On submit:
    - [ ] Call `POST /api/projects/:projectId/tasks`
    - [ ] Refresh task list

- [ ] Delete task

  - [ ] Button to delete
  - [ ] Call `DELETE /api/projects/:projectId/tasks/:taskId`
  - [ ] Remove from UI

- [ ] Handle UX states
  - [ ] Loading state while fetching tasks
  - [ ] Error state
  - [ ] Empty state when no tasks

---

## 8. Polish, Testing, and Presentation

- [ ] Add simple responsive styling (mobile-friendly)

  - [ ] Ensure layout works on small screens
  - [ ] Buttons and forms easily clickable

- [ ] Error handling & validation

  - [ ] Show basic API error messages
  - [ ] Prevent submitting empty forms

- [ ] Final deployment checks

  - [ ] Confirm deployed frontend can:
    - [ ] Register a user
    - [ ] Login
    - [ ] Create a course
    - [ ] Create tasks
    - [ ] Update task status
    - [ ] Delete tasks and courses

- [ ] README.md

  - [ ] Short project description (StudyHub summary)
  - [ ] Tech stack
  - [ ] How to run backend locally
  - [ ] How to run frontend locally
  - [ ] API endpoint list (Auth, Projects, Tasks)
  - [ ] Deployed URLs
    - [ ] Backend Render URL
    - [ ] Frontend Render URL

- [ ] Presentation prep (5–10 minutes)
  - [ ] Demo login/registration
  - [ ] Demo creating a course
  - [ ] Demo adding/editing tasks
  - [ ] Explain architecture (MERN, JWT, ownership checks)
  - [ ] Mention real use-case: post-course review sessions
