# High-Level Design (HLD) - Math Mastery Platform

## 1. System Overview
Math Mastery Platform is a comprehensive, full-stack Next.js web application designed to help students prepare for government examinations (SSC, Railway, etc.). It provides a dynamic test simulation environment, extensive question banks, topic-wise practice modules, and real-time analytics.

## 2. Architecture Diagram (Conceptual)
```text
[ Client Browser ] <---(HTTPS)---> [ Next.js Edge / Vercel ]
       |                                   |  |
       |  (UI state / React)               |  | (Server Actions & API Routes)
       v                                   v  v
[ LocalStorage ]                     [ Prisma ORM ]
       ^                                   |
       | (Cache marked questions,          | (Queries / Mutations)
       |  Theme, Offline data)             v
                                     [ SQLite Database ]
```

## 3. Core Technologies
- **Frontend Layer:** Next.js 14/15 (App Router), React, Tailwind CSS, Lucide Icons.
- **Backend Layer:** Next.js Server Actions, Next.js API Routes.
- **Database Layer:** SQLite (via Prisma ORM).
- **Authentication:** NextAuth.js (v5) supporting Credentials (Email/Password) and Google OAuth provider.
- **Styling:** Tailwind CSS with custom responsive UI utilities and dynamic typography.

## 4. High-Level Components
### 4.1 Frontend Component Tree
- **(Auth) `/login`, `/signup`**: Split-screen premium authentication pages handling credential submissions and OAuth hooks.
- **(Core) `/dashboard`**: The central user hub featuring an Activity Heatmap, Topic Proficiency Charts, and quick actions.
- **(Test Engine) `/tests/[testId]`**: A fully-featured real-time mock test engine. Tracks active timers, question palettes, mark-for-review caching, and final submissions.
- **(Practice) `/practice`, `/pyq`**: Interactive learning modules loading categorized subsets of the question bank.

### 4.2 Backend & Data Processing
- **Server Actions**: Used extensively to bypass manual API routes. Allows the client to invoke strongly-typed backend operations (`submitMockTest`, `toggleBookmark`, `getUserStats`).
- **Database Architecture**: Managed via Prisma schemas modeling strict relationships between `User`, `Question`, `UserProgress` (for bookmarking and analytics), and `UserTestAttempt`.

## 5. System Data Flow: Mock Test Execution
1. **Initiation**: User clicks "Start Test". Server fetches metadata and `getMockTestEngineData`.
2. **Session**: The Next.js client renders `TestSimulator.tsx`. Time left is managed via React state. Any "Mark for Review" toggles are saved to local memory (`useRef`/State).
3. **Execution**: User interacts with answers. `answers` state tracks JSON mapping.
4. **Completion**: Timer ends or User clicks Submit. Client invokes `submitMockTest()` Server Action, passing the mapped JSON.
5. **Validation**: Server intercepts, parses the JSON payload, compares responses against SQLite `Question.correctOptionIndex`, computes score/accuracy, and commits a `UserTestAttempt` row to SQLite.
6. **Result**: Server forces a router mutation, migrating the user to the `/result` screen to view statistics.
