# TO-DO StudyHub Frontend

## 8. Frontend – Setup

- [x] Create `studyhub-frontend` with Vite (or CRA)
- [x] `npm install`
- [x] Clean starter files
- [x] Install dependencies
  - [x] `react-router-dom`
  - [ ] `axios` (or plan to use `fetch`)
- [ ] Create folder structure
  - [ ] `/src/pages`
  - [ ] `/src/components`
  - [ ] `/src/context`
  - [ ] `/src/api` (optional helper functions)
- [ ] Add `.env` for frontend
  - [ ] `VITE_API_BASE_URL="https://<your-backend-on-render>/api"`

---

## 9. Frontend – Auth Flow

- [ ] Create `AuthContext` in `/src/context/AuthContext.jsx`
  - [ ] Store `user` and `token`
  - [ ] Load from `localStorage` on startup
  - [ ] Provide `login`, `logout`, (and maybe `register`) functions
- [ ] Set up routing (`react-router-dom`)
  - [ ] `/login`
  - [ ] `/register`
  - [ ] `/dashboard`
  - [ ] `/courses/:moduleId`
- [ ] Implement protected route logic
  - [ ] Redirect to `/login` if no token for protected pages
- [ ] Login page
  - [ ] Form for email/password
  - [ ] Call `POST /api/auth/login`
  - [ ] Save token + user to context and `localStorage`
  - [ ] Redirect to `/dashboard`
- [ ] Register page
  - [ ] Form for name/email/password
  - [ ] Call `POST /api/auth/register`
  - [ ] Either auto-login or redirect to `/login`

---

## 10. Frontend – Dashboard (modules)

- [ ] Dashboard page (`/dashboard`)
  - [ ] On mount, fetch `GET /api/modules` with `Authorization` header
  - [ ] Display list of modules
  - [ ] Link each module to `/modules/:moduleId`
- [ ] Add new module form
  - [ ] Call `POST /api/modules`
  - [ ] Refresh list on success
- [ ] Optional:
  - [ ] Edit module name/description
  - [ ] Delete module (call `DELETE /api/modules/:id`)

---

## 11. Frontend – Course Detail & Tasks

- [ ] Course detail page (`/modules/:moduleId`)
  - [ ] Fetch module info (`GET /api/modules/:id`)
  - [ ] Fetch tasks (`GET /api/modules/:moduleId/tasks`)
- [ ] Display tasks
  - [ ] Show title, description, status
  - [ ] Status dropdown or buttons
    - [ ] On change, call `PUT /api/tasks/:taskId`
- [ ] Add new task form
  - [ ] Call `POST /api/modules/:moduleId/tasks`
  - [ ] Refresh list
- [ ] Delete task
  - [ ] Button to call `DELETE /api/tasks/:taskId`
  - [ ] Remove from UI

---

## 12. Frontend – UX & Styling

- [ ] Add loading states for API calls
- [ ] Add error messages for failed API calls
- [ ] Basic layout with header/nav
- [ ] Responsive design for mobile/tablet
- [ ] Clean up unused components and code

---

## 13. Deployment & Final Checks

- [ ] Deploy backend to Render (Web Service)
  - [ ] Environment variables set (MONGO_URI, JWT_SECRET, PORT)
- [ ] Deploy frontend to Render (Static Site)
  - [ ] `VITE_API_BASE_URL` pointing to backend URL
- [ ] From live frontend:
  - [ ] Register & login user
  - [ ] Create a module
  - [ ] Add tasks
  - [ ] Update task status
  - [ ] Delete tasks/modules
- [ ] Final `README.md` at root or in each repo
  - [ ] Project summary
  - [ ] Tech stack
  - [ ] Setup steps
  - [ ] Deployed URLs
