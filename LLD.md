# Low-Level Design (LLD) - Math Mastery Platform

## 1. Component Architecture Details
### 1.1 TestSimulator.tsx
- **Responsibility**: Rendering individual questions, managing timed test configurations, marking questions for review, and collecting real-time answer payloads.
- **State Hooks**:
  - `currentQIndex: number` -> The active question in view.
  - `answers: Record<string, number>` -> The user's active selections keyed by `question.id`.
  - `markedForReview: Set<string>` -> The flagged items locally.
  - `timeLeft: number` -> The test configuration duration decremented synchronously via `setInterval`.
- **References**:
  - Utilizes `answersRef` and `markedRef` specifically to memoize the dynamic state, ensuring stable closures within the final countdown execution loop (preventing stale closures from wiping results).
- **Sub-components**: Formatter buttons, Markdown HTML parsers, Question Palette grids, Clock HUD.

### 1.2 Auth Layout (Login & Signup)
- **Responsibility**: Authenticating users directly via Edge operations and ensuring styling remains completely detached from the global `NavbarWrapper`.
- **Logic**:
  - Implement dynamic `page.tsx` splits encapsulating `<LoginForm />` inside Client-side scopes (`'use client'`), passing form submission metadata (`FormData`) natively into `authenticate` / `googleSignIn` (Server Actions).
  - Uses `useActionState` to hook into standard HTML `<form action>` processing. No standard REST calls are executed from these files.

### 1.3 Activity Heatmap (Dashboard)
- **Responsibility**: Visually graphing user attempts across 53 weeks (Year-view) or 6 continuous chunks (Month-view).
- **Core Algorithm**: Parses raw Date arrays generated from Prisma queries into localized Date keys. Converts dimensions natively via explicit array mappings (100% Client-side).

## 2. API Routes & Server Actions Structure
Next.js API is exclusively used for automated tooling/external processing, while Server Actions are the primary transport wrapper.

### **Server Action Files**:
- `/actions/auth.ts`: Validates credential schemas against `Zod`, runs `bcrypt.hash/compare`, directly binds to `signIn` inside `next-auth`.
- `/actions/questions.ts`: Triggers Prisma `upsert` queries to flip `isBookmarked` booleans for a specific Question ID.
- `/actions/stats.ts`: Analyzes `UserProgress` records targeting active users to synthesize the Activity Heatmap block structure. Takes an optional `targetYear` parameter.
- `/actions/tests.ts`: Orchestrates taking raw `answersJson`, executing a mapping function across all expected mock questions from `mockTests.ts`, executing true/false score logic, appending it into `UserTestAttempt`, and returning an unguessable CUID.

### **API Routes**:
- `/api/seed/route.ts`: A strict-protected REST endpoint leveraging query URL parameter parsing (`?token=ADMIN_SECRET`) to intercept unauthorized requests prior to triggering massive database chunking and migrations (`createMany`).

## 3. Database Schema Mapping (Prisma)
- **`User` Entity**: `id` [CUID PK], `email` [Unique], `password` [Hashed String], `role` [String], `subscriptionStatus` [String].
- **`UserTestAttempt` Entity**: `score` [Float], `accuracy` [Float], `answersJson` [Text/JSON Mapping], `startedAt/completedAt` [Timestamps]. FK linked strictly to `userId` via Cascade.
- **`Question` Entity**: `text` [Markdown], `options` [Stringified JSON Array], `correctOptionIndex` [Int]. Contains fields specifically parsed from localized extraction models (Difficulty, Subject, ExamType).
- **`UserProgress` Entity**: Resolves the many-to-many complexities of individual user performance logic by serving as a localized pivot mapping `userId` to `questionId`. Stores `status`, `isSolved`, `isCorrect`, and `isBookmarked`. Has compound unique keys over `[userId, questionId]`.

## 4. Authentication Flow (NextAuth v5)
1. User fires standard Form Input via Edge.
2. Credentials interceptor validates exact match against `/src/lib/prisma`.
3. Middleware (`/src/middleware.ts`) automatically validates `session` cookies on incoming edge-requests.
4. Non-authenticated calls fetching `/dashboard` are violently intercepted via `Response.redirect`.
5. Authenticated calls fetching `/login` are caught server-side by checking `await auth()` inside the layout itself.

## 5. Extensibility
The platform is designed to seamlessly integrate new exam configurations simply by overriding constants in `/src/data/mockTests.ts` and pushing new dataset chunks through the `/api/seed` utility pipeline. No Prisma migrations are fundamentally required to shift test domains from SSC to state-level exams.
