# TO-DO StudyHub Frontend

## 8. Frontend – Setup

- [x] Create `studyhub-frontend` with Vite (or CRA)
- [x] `npm install`
- [x] Clean starter files
- [x] Install dependencies
  - [x] `react-router-dom`
  - [x] `axios` (or plan to use `fetch`)
- [x] Create folder structure
  - [x] `/src/clients` (`api.ts` HTTP client)
  - [x] `/src/components` (`Navbar.tsx`)
  - [x] `/src/context` (`AuthProvider.tsx`)
  - [x] `/src/pages` (`AuthPage.tsx`, `HomePage.tsx`, `ProjectsPage.tsx`, `ProjectDetailsPage.tsx`)
  - [x] `/src/types` (`index.ts` for shared types)
- [x] Ensure entry files
  - [x] `/src/App.tsx`
  - [x] `/src/main.tsx`
- [x] Add `.env` for frontend
  - [x] `VITE_API_BASE_URL="https://<your-backend-on-render>/api"`

---

## 9. Frontend – Auth Flow

- [x] Create `AuthProvider` in `/src/context/AuthProvider.tsx`
  - [x] Store `user` and `token` in state
  - [x] Load `user` and `token` from `localStorage` on startup
  - [x] Provide `login`, `logout`, and optional `register` helpers via context
- [x] Wrap app in `AuthProvider` in `main.tsx`
- [x] Define auth-related types in `/src/types/index.ts` (e.g., `User`, `AuthResponse`)
- [x] Set up routing in `App.tsx` (`react-router-dom`)
  - [x] `/` → `HomePage`
  - [x] `/auth` (or `/login`) → `AuthPage`
  - [x] `/modules` → `ProjectsPage`
  - [x] `/modules/:moduleId` → `ProjectDetailsPage`
- [ ] Implement protected route logic \*\*\* revisit
  - [ ] Create a `RequireAuth`/`PrivateRoute` wrapper component (in `/src/components`)
  - [ ] Redirect to `/auth` if no token for protected pages (`/modules`, `/modules/:moduleId`)
- [x] Auth UI (`AuthPage.tsx`)
  - [x] Login form (email/password)
    - [x] Call `POST /api/auth/login` via `api.ts`
    - [x] Save token + user to context and `localStorage`
    - [x] Redirect to `/modules` on success
  - [ ] Register form (name/email/password) or tab
    - [x] Call `POST /api/auth/register`
    - [x] Either auto-login or redirect to login view

---

## 10. Frontend – Dashboard (modules)

- [x] Modules dashboard page (`ProjectsPage.tsx` at route `/modules`)
  - [x] On mount, fetch `GET /api/modules` with `Authorization` header using `api.ts`
  - [x] Display list of modules owned by the logged-in user
  - [x] Link each module to `/modules/:moduleId` (`ProjectDetailsPage.tsx`)
- [x] Add new module form (component in `/src/components`, used in `ProjectsPage.tsx`)
  - [x] Call `POST /api/modules`
  - [x] Refresh module list on success
- [ ] Optional module actions
  - [ ] Edit module name/description (`PUT /api/modules/:id`)
  - [ ] Delete module (`DELETE /api/modules/:id`) and remove from UI

---

## 11. Frontend – Module Detail & Tasks

- [x] Module detail page (`ProjectDetailsPage.tsx` at route `/modules/:moduleId`)
  - [x] Fetch module info (`GET /api/modules/:id`)
  - [x] Fetch tasks for module (`GET /api/modules/:moduleId/tasks`)
- [x] Display tasks list
  - [x] Show title, description, status for each task
  - [x] Status dropdown or buttons
    - [x] On change, call `PUT /api/tasks/:taskId` to update status
- [ ] Add new task form (component in `/src/components`, used in `ProjectDetailsPage.tsx`)
  - [ ] Call `POST /api/modules/:moduleId/tasks`
  - [ ] Refresh tasks list on success
- [ ] Delete task
  - [ ] Button to call `DELETE /api/tasks/:taskId`
  - [ ] Remove task from UI without full page reload

---

## 12. Frontend – UX & Styling

- [ ] Add loading states for API calls (modules, tasks, auth)
- [ ] Add error handling and messages for failed API calls
- [ ] Basic layout with header/nav
  - [ ] Use `Navbar.tsx` to show app name + nav links (e.g., Modules, Logout)
- [ ] Responsive design for mobile/tablet
  - [ ] Ensure pages use layout components and CSS in `index.css`
- [ ] Clean up unused components, assets, and code

---

## 13. Deployment & Final Checks

- [ ] Deploy backend to Render (Web Service)
  - [ ] Environment variables set (MONGO_URI, JWT_SECRET, PORT)
- [ ] Deploy frontend (Static Site – Render or Netlify)
  - [ ] `VITE_API_BASE_URL` pointing to deployed backend URL
- [ ] From live frontend:
  - [ ] Register & login user
  - [ ] Create a module
  - [ ] Add tasks to a module
  - [ ] Update task status
  - [ ] Delete tasks/modules
- [ ] Final `README.md` at root or in each repo
  - [ ] Project summary
  - [ ] Tech stack
  - [ ] Setup steps
  - [ ] Deployed URLs
