# Elevate Your English — Campus LMS

A full-stack Learning Management System (LMS) built as a portfolio project. It demonstrates role-based access control (Admin / Teacher / Student), a nested course hierarchy with sequential lesson unlocking, an assessment engine with attempt tracking, certificate generation, and a responsive, accessible frontend built on a custom Design System — all wired to a real REST API with no mocking.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Roles & Permissions](#roles--permissions)
- [Technical Highlights](#technical-highlights)
- [Project Structure](#project-structure)
- [Technical Decisions](#technical-decisions)
- [How to Run](#how-to-run)
- [Seed Credentials](#seed-credentials)
- [API Reference Summary](#api-reference-summary)
- [Stack Summary](#stack-summary)

---

## Overview

Elevate Your English Campus is a platform for managing English-learning courses. It supports three user roles (admin, teacher, student), a full LMS content hierarchy (courses → units → lessons), an assessment engine per unit with attempt history, certificate issuance on course completion, and role-specific analytics dashboards.

The project was built module by module, with each API contract verified against the live backend before implementation — no assumptions, no mocking. The frontend follows a versioned internal Design System (CSS Modules + design tokens), with a dedicated pass on accessibility (semantic HTML, `aria-*` attributes, keyboard navigation, screen-reader-only text).

---

## Features

### Student

- **Dashboard** — 9-block home view: hero, "continue where you left off", today's activity, weekly goals, learning path, recommendations, "today at Elevate", skills overview. Dedicated skeleton, empty and completed-course states.
- **Courses** — catalog with tabs (all / in progress / completed / available), client-side search, per-course visual identity.
- **Course Detail → Units → Lessons** — units and lessons rendered in order, with sequential unlock enforcement (a lesson stays locked until the previous one is completed, and unit N+1 requires unit N's lessons **and** its assessment to be passed).
- **Assessments** — per-unit quiz with a maximum attempt count, per-question feedback after submission, attempt history table, and contextual CTA after passing.
- **Progress** — global summary, 7/30-day growth, per-course progress, recent activity, language-skill breakdown.
- **Certificates** — list of issued certificates with PDF download (binary response) and embedded QR code.
- **Achievements** — unlockable badges (10 seeded) by category/rarity.
- **Notifications** — personal notification feed.
- **Skill Radar** — radar chart (listening / reading / writing / speaking / assessment score) built with Recharts.

### Teacher

- **Teacher Analytics** — cohort comparison table, inactivity ranking, per-assessment breakdown (pass rate, average score/attempts), and a per-student weekly trend panel.

### Admin

- **Users** — list all users, activate/deactivate accounts.

### Cross-cutting

- **Responsive Navigation** — collapsible Sidebar (desktop/tablet), fixed BottomNav + MobileMenu (mobile), full keyboard support (`Escape` to close, focus trapping/restoration, `aria-expanded`/`aria-controls`).
- **Toast System** — global `useToast()` (`showSuccess` / `showError` / `showInfo`) for async action feedback.
- **Design System** — CSS Modules + a shared token set (color, radius, spacing, shadows, z-index, typography) documented in `frontend/src/styles/globals.css`; shared components (`Button`, `Card`, `PageHeader`, `ProgressBar`, `LoadingState`, `ErrorState`, `EmptyState`, `Toast`).
- **Accessibility** — semantic status icons (icon + screen-reader-only text instead of color/emoji alone), `role="alert"` on form errors, table `<caption>` + `scope="col"` on data tables, accessible navigation (see above).

### Backend modules available (no dedicated frontend UI yet)

The following backend modules are implemented and routed (`/api/...`) but are **not yet surfaced as a page** in the current frontend: `bookings`, `availability`, `recommendations` (a frontend service stub exists but no page consumes it), `live-sessions`, `attendance`, `assignments`, `submissions`. These are not part of the current user-facing product — listed here for completeness, not as active features.

---

## Architecture

```
┌────────────────────────────────────────────────────────────┐
│                        Browser                             │
│                                                            │
│  Next.js 16 (App Router) — React 19 — CSS Modules          │
│  Port 3000                                                 │
└────────────────────┬───────────────────────────────────────┘
                     │  HTTP / JSON  (Authorization: Bearer)
┌────────────────────▼───────────────────────────────────────┐
│                    Express API                             │
│                                                            │
│  Node.js — Express 4 — JWT — express-validator              │
│  Port 4000                                                  │
│                                                            │
│  Modules: auth · users · courses · units · lessons          │
│           enrollments · progress · assessments               │
│           dashboard · teacher-analytics · achievements        │
│           certificates · notifications · recommendations      │
│           bookings · availability · live-sessions             │
│           attendance · assignments · submissions               │
└────────────────────┬───────────────────────────────────────┘
                     │  Mongoose ODM
┌────────────────────▼───────────────────────────────────────┐
│                    MongoDB                                 │
│  Collections: users · courses · units · lessons             │
│               enrollments · lessonProgress                   │
│               assessments · assessmentAttempts                │
│               achievements · certificates · notifications      │
└────────────────────────────────────────────────────────────┘
```

### Frontend layers

```
src/
├── app/
│   ├── (auth)/login/                    — Public login page
│   └── (protected)/                     — Route group with auth guard
│       ├── layout.js                    — Sidebar + Navbar + BottomNav shell
│       ├── dashboard/
│       ├── courses/[id]/units/[unitId]/lessons/[lessonId]/
│       ├── courses/[id]/units/[unitId]/assessment/
│       ├── assessments/
│       ├── progress/
│       ├── certificates/
│       ├── achievements/
│       ├── notifications/
│       ├── skill-radar/
│       ├── teacher-analytics/
│       ├── enrollments/
│       └── users/
├── components/
│   ├── auth/LoginForm/
│   ├── layout/Sidebar/ · Navbar/ · BottomNav/ · MobileMenu/ · ProtectedLayout/
│   ├── dashboard/student/                — DashboardSkeleton, LearningPathCard, etc.
│   ├── teacher-analytics/                — CohortComparisonTable, InactivityRanking, ...
│   ├── achievements/ · notifications/ · skill-radar/
│   └── ui/                               — Button, Card, PageHeader, ProgressBar,
│                                            LoadingState, ErrorState, EmptyState, Toast
├── contexts/ToastContext.js              — Global toast notifications
├── core/context/AuthContext/             — Global auth state
├── hooks/
│   ├── useAuth.js                        — Context consumer with guard
│   └── useAsyncData.js                   — Fetch/loading/error/reload hook
├── lib/
│   ├── api.js                            — Generic fetch wrapper
│   └── services/                         — One service file per resource
└── styles/                               — globals.css (design tokens) + CSS Modules
```

---

## Roles & Permissions

| Capability | Admin | Teacher | Student |
|---|:---:|:---:|:---:|
| View all users, activate/deactivate | ✓ | — | — |
| View all enrollments | ✓ | — | — |
| View courses | ✓ | ✓ | ✓ (published only) |
| View units & lessons | ✓ | ✓ | ✓ (sequential unlock applies to students) |
| Access lesson content | ✓ | ✓ | ✓ (if not locked) |
| View assessments / submit attempt | ✓ (view) | ✓ (view) | ✓ (submit, if lessons completed) |
| View own progress / dashboard | — | — | ✓ |
| Teacher Analytics (cohort, inactivity, breakdown) | — | ✓ (own cohort) | — |
| Certificates, Achievements, Notifications, Skill Radar | — | — | ✓ |
| Sidebar: "Usuarios" link | ✓ | — | — |

Lessons for students are **sequentially locked**: a student cannot access lesson N+1 until lesson N is completed. Unit N+1 requires all of unit N's lessons completed **and**, if the unit has an assessment, that assessment passed.

---

## Technical Highlights

### JWT Authentication

The backend issues a signed JWT on login (`POST /api/auth/login`), with a different token TTL per role (`JWT_TTL_ADMIN`, `JWT_TTL_TEACHER`, `JWT_TTL_STUDENT`). The frontend stores it in React state via `AuthContext` — no `localStorage`, no cookies. Every authenticated request sends `Authorization: Bearer <token>` via the generic `api.js` wrapper.

### Role-Based Access Control

RBAC is enforced at two levels:

- **Backend**: middleware (`verifyToken`, `requireRole`, `requireActiveUser`) blocks unauthorized or inactive-user requests before they reach controllers. Teacher-scoped endpoints additionally check `student.assignedTeacherId === teacherId`.
- **Frontend**: protected routes redirect unauthenticated users to `/login`; the Sidebar conditionally renders role-specific links (`Usuarios` for admin, student-only links for students).

### Nested LMS Structure & Sequential Unlock

Content is hierarchical: `Course → Unit → Lesson`, with an assessment per unit. API routes reflect this nesting (e.g. `GET /api/courses/:courseId/units/:unitId/lessons/:lessonId`). Lock state is computed server-side (`progressCalculator.isLessonLocked`) and returned per lesson/unit so the frontend never has to re-derive it.

### Assessment Engine with Attempts

Each unit has at most one assessment. Questions store `correctIndex` server-side — **excluded from the GET response** (students never see the answer). On submit, the backend verifies active enrollment, completed lessons, and remaining attempts before scoring and persisting an immutable `AssessmentAttempt`. The submit payload is `{ answers: [index0, index1, ...] }` — one integer per question, in order.

### Certificates (PDF + QR)

On 100% course completion, an enrollment is marked completed and a certificate is issued. `certificatePdf.service.js` generates the PDF (via `pdfkit`) with an embedded QR code (via `qrcode`) for verification. Download is a binary response (`res.blob()` on the frontend, not JSON).

### Dashboard Aggregation

`GET /api/dashboard/student` aggregates summary stats, 7/30-day growth, per-course enrollments with next-lesson pointers, recent activity, pending assessments, and a skill-progress breakdown — computed server-side via Mongoose aggregation pipelines, avoiding N+1 queries from the frontend.

### Responsive Navigation & Accessibility

Sidebar (desktop/tablet, backdrop + `Escape` to close), BottomNav + MobileMenu (mobile), all with focus management (focus moves into the panel on open, returns to the trigger on close), `aria-expanded`/`aria-controls`/`aria-haspopup`. Status indicators that would otherwise rely on color or emoji alone (e.g. lesson completed/locked/available) pair the icon with an `aria-hidden` flag and a screen-reader-only text equivalent.

---

## Project Structure

### Backend modules

```
src/modules/
├── auth/              — login, logout, token verification
├── users/             — CRUD + activate/deactivate
├── courses/           — CRUD + status lifecycle (draft → published → archived)
├── units/             — nested under courses
├── lessons/           — nested under units, sequential locking for students
├── assessments/        — quiz CRUD + attempt submission + attempt history
├── enrollments/         — enroll, activate, suspend
├── progress/            — per-lesson completion + overview
├── dashboard/            — role-specific dashboard aggregation
├── teacher-analytics/     — cohort comparison, inactivity, weekly trend
├── achievements/          — unlockable badges
├── certificates/           — PDF + QR generation on course completion
├── notifications/          — personal notification feed
├── recommendations/        — backend-only, no frontend page yet
├── bookings/               — backend-only, out of current LMS scope
├── availability/            — backend-only, out of current LMS scope
├── live-sessions/            — backend-only, out of current LMS scope
├── attendance/                — backend-only, out of current LMS scope
├── assignments/                — backend-only, out of current LMS scope
└── submissions/                 — backend-only, out of current LMS scope
```

Each module follows the same structure: `routes → controller → service → repository`.

### Frontend services

```
src/lib/services/
├── auth.service.js
├── courses.service.js
├── units.service.js
├── lessons.service.js
├── enrollments.service.js
├── progress.service.js
├── users.service.js
├── assessments.service.js
├── dashboard.service.js
├── teacher-analytics.service.js
├── achievement.service.js
├── certificate.service.js
├── notification.service.js
└── recommendation.service.js   — defined, not yet consumed by any page
```

Each service is a plain object with methods that call `api.js`. No class instantiation, no state.

---

## Technical Decisions

### Generic API wrapper (`api.js`)

All HTTP calls go through a single `request()` function that attaches `Content-Type`/`Authorization` headers, parses JSON, and throws a typed `Error` with `data.message` on non-2xx responses. Every service is a thin layer of named calls — auth headers and error handling aren't repeated per endpoint. Binary responses (certificate PDF) bypass this wrapper with a raw `fetch` + `res.blob()`, since `api.js` always parses JSON.

### Handling inconsistent API contracts

During development, several API response shapes required verification against the live backend rather than assumption, e.g.:

| Endpoint | Envelope key |
|---|---|
| `GET /api/progress/overview` (student) | `{ overview: [...] }` |
| `GET /api/progress/students/:id` (admin/teacher) | `{ progress: [...] }` — same shape, different key |
| `PATCH /api/progress/lessons/:id/complete` | No envelope — fields returned directly |
| Submit assessment attempt | `{ answers: [index0, index1, ...] }`, not objects |

Each was confirmed by hitting the live backend before writing the consuming page — contract-first, no guessing.

### Client-side route protection

Protected routes check auth state on mount; unauthenticated users are redirected to `/login` before protected content renders, avoiding a flash of content.

### Active navigation link

Sidebar/BottomNav use `usePathname()` and mark a link active on `pathname === href || pathname.startsWith(href + '/')`, so navigating into a nested route (e.g. `/courses/[id]/units/...`) keeps the parent link highlighted.

### Design tokens over hardcoded values

Frontend surfaces built early in the project (e.g. admin/teacher tables) originally used hardcoded hex colors and pixel radii. These were normalized to reference the shared token set in `globals.css` (`--bg-surface`, `--text-secondary`, `--radius-lg`, etc.) so all surfaces — not just the student-facing ones — stay visually consistent as the Design System evolves.

---

## How to Run

### Prerequisites

- Node.js ≥ 18
- MongoDB running locally, or via the provided `docker-compose.yml`

### 1. Backend

```bash
cd backend
npm install
```

Create `backend/.env` (see `backend/.env.example`):

```env
PORT=4000
NODE_ENV=development

MONGODB_URI=mongodb://localhost:27017/elevate_campus

JWT_SECRET=cambia_este_valor_en_produccion
JWT_TTL_ADMIN=8h
JWT_TTL_TEACHER=24h
JWT_TTL_STUDENT=7d

CLIENT_URL=http://localhost:3000
```

Run the seed (**only runs when `NODE_ENV=development`**):

```bash
npm run seed
```

This creates: 1 admin, 3 teachers, 12 students (3 cohorts, one per teacher), 4 published courses (A1–B2) with their units/lessons/assessments, and a 10-item achievement catalog. It does **not** create enrollments or lesson progress — those are created afterward via the Enrollments module (admin-only) or by exercising the app.

Start the server:

```bash
npm run dev     # nodemon (development)
npm start       # node (production)
```

The API will be available at `http://localhost:4000/api`. Swagger docs at `http://localhost:4000/api/docs`.

### 2. Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

Start the dev server:

```bash
npm run dev
```

Open `http://localhost:3000`. The root redirects to `/login`.

### 3. Docker (backend + MongoDB only)

```bash
docker-compose up
```

Spins up the Express API (port 4000) and a MongoDB 7 instance with a healthcheck. The frontend is not containerized — run it locally with `npm run dev` against the dockerized API.

---

## Seed Credentials

After running `npm run seed` in the backend:

| Role | Email | Password |
|---|---|---|
| Admin | admin@elevate.com | Admin2024! |
| Teacher | emma.johnson@elevate.com | Teacher2024! |
| Teacher | james.parker@elevate.com | Teacher2024! |
| Teacher | sofia.reyes@elevate.com | Teacher2024! |
| Student (12 total, `@demo.com`) | e.g. sarah.mitchell@demo.com | Student2024! |

Students are split into 3 cohorts (4 each), one per teacher (`assignedTeacherId`). All seeded accounts are `isActive: true`. No enrollments are pre-seeded — a fresh database has courses and users but no student progress until enrollments are created.

---

## API Reference Summary

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/login` | — | Obtain JWT |
| POST | `/api/auth/logout` | Bearer | Invalidate session |
| GET | `/api/users` | Admin | List all users |
| PATCH | `/api/users/:id/activate` \| `/deactivate` | Admin | Toggle user account |
| GET | `/api/courses` | Bearer | List courses (students see published/enrolled only) |
| GET | `/api/courses/:id/units` | Bearer | Units for a course |
| GET | `/api/courses/:id/units/:uid/lessons/:lid` | Bearer | Lesson detail |
| PATCH | `/api/progress/lessons/:id/complete` | Student | Mark lesson completed |
| GET | `/api/progress/courses/:id` \| `/overview` | Student | Course / global progress |
| GET | `/api/courses/:id/units/:uid/assessment` | Bearer | Assessment for a unit |
| POST | `/api/courses/:id/units/:uid/assessment/attempts` | Student | Submit attempt |
| GET | `/api/enrollments` | Bearer | List enrollments |
| PATCH | `/api/enrollments/:id/activate` \| `/suspend` | Admin | Enrollment lifecycle |
| GET | `/api/dashboard/student` \| `/teacher` \| `/admin` | Bearer (per role) | Role-specific dashboard aggregation |
| GET | `/api/teacher-analytics/*` | Teacher | Cohort, inactivity, breakdown, weekly trend |
| GET | `/api/achievements/me` | Student | Unlocked achievements |
| GET | `/api/certificates/me` | Student | Issued certificates |
| GET | `/api/certificates/:id/download` | Student | PDF download (binary) |
| GET | `/api/notifications/me` | Student | Notification feed |

Full interactive reference: `http://localhost:4000/api/docs` (Swagger — currently documents the Progress module in depth; other modules are routed and functional but not yet fully annotated in the Swagger spec).

---

## Stack Summary

| Layer | Technology | Version |
|---|---|---|
| Frontend framework | Next.js (App Router) | 16.2.9 |
| UI library | React | 19.2.4 |
| Styling | CSS Modules + custom Design System | — |
| Charts | Recharts | ^3.9.0 |
| Icons | lucide-react | ^1.23.0 |
| Backend framework | Express | ^4.19.2 |
| ODM | Mongoose | ^8.5.1 |
| Auth | jsonwebtoken | ^9.0.2 |
| Password hashing | bcryptjs | ^2.4.3 |
| Validation | express-validator | ^7.1.0 |
| Rate limiting | express-rate-limit | ^7.3.1 |
| PDF generation | pdfkit | ^0.19.1 |
| QR codes | qrcode | ^1.5.4 |
| API docs | swagger-ui-express | ^5.0.1 |
| Testing | Jest + Supertest + mongodb-memory-server | ^30.4.2 / ^7.2.2 / ^11.2.0 |
| Database | MongoDB | 7 (Docker) |
