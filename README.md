
# Government Exam Prep Platform

A production-ready web application for practicing MCQs, similar to LeetCode but for Government Exams (SSC, Railway, etc.).

## Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Database:** PostgreSQL + Prisma ORM
- **Auth:** NextAuth.js v5 (Credentials + Google)
- **Styling:** Tailwind CSS + Shadcn UI
- **State:** Zustand + URL Search Params

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL Database
- Docker (Optional, for running DB locally)

### 1. Install Dependencies
Run the following command to install all necessary packages:
```bash
npm install
```

### 2. Setup Environment Variables
Update the `.env` file with your database credentials:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/math_mastery?schema=public"
AUTH_SECRET="your_secure_random_string"
```

### 3. Setup Database
Apply the schema to your database:
```bash
npx prisma generate
npx prisma db push
```

### 4. Run Development Server
Start the application:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view it.

## Troubleshooting
If you encounter network errors during installation:
1. Check your internet connection.
2. Ensure you are not behind a strict corporate firewall.
3. Run `npm cache clean --force` and try installing again.

If you see `EPERM` or port errors:
1. Run `npm run dev -- -p 4000` to use a different port.
2. Check if another service is using port 3000.
