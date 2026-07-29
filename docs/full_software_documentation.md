# Super HR - Master Software Documentation

> **Next-generation AI-powered HR management suite** designed to transform workforce operations with intelligent automation, predictive analytics, and seamless user experience.

This document serves as the **master reference** for the Super HR project, combining system architecture, in-depth feature breakdowns, data models, and the comprehensive development roadmap.

---

## 1. System Architecture & Tech Stack

The application follows a modern full-stack architecture optimized for performance and developer experience.

### Core Technologies
- **Framework**: Next.js 16.1.6 (App Router)
- **Frontend**: React 19.2.3 + TypeScript 5.x
- **Styling**: Tailwind CSS v4 + Radix UI + Framer Motion (Glassmorphic design)
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma 7.3.0
- **AI Integration**: Google Gemini API (Planned)

### Data Flow
1. **Client Interaction**: User interacts with the Next.js frontend (Server & Client components).
2. **Data Fetching**: Server Components query the PostgreSQL database directly using Prisma ORM.
3. **AI Processing**: Workflows (e.g., Resume Upload) trigger AI services to extract data and score candidates.
4. **State Management**: React Context API handles global states, while Framer Motion handles UI transitions.

---

## 2. Full Features Breakdown

The platform is divided into 7 core modules.

### 🏠 Dashboard (Operational Hub)
- **Role-Based Views**: Dynamic rendering for `Admin` vs `Employee` widgets.
- **AI Intelligence Brief**: A morning summary highlighting capacity alerts, retention wins, and compliance gaps.
- **Smart Calendar & Tasks**: Visualizes upcoming leaves, interviews, and performance reviews with conflict detection.
- **AI Search Mode**: Global command palette supporting natural language queries.

### 👥 Employee Management (Workforce Intelligence)
- **Employee Directory**: Rich table/grid views with filtering for avatars, roles, and departments.
- **AI Career Pathing**: Visual trajectory models showing potential next roles based on skills.
- **Retention Risk Analysis**: Predictive labeling (Low/Medium/High) based on tenure, performance, and leave patterns.

### 💼 Recruitment Module (The Hiring Engine)
- **Job Postings & Pipeline**: Kanban board (`CandidateKanban.tsx`) where candidates move between Screening → Interview → Offer.
- **AI Resume Scoring**: Evaluates candidate resumes against job descriptions, returning a 0-100 score and AI summary.
- **Assessment Center**: Calculates "Synergy match scoring" to evaluate team blend.
- **Interview Workspace**: Collaborative space for panel interviewers to submit live feedback.
- **AI Outreach Engine**: Generates personalized cold-email templates for passive candidates.

### 💰 Payroll & Finances
- **Salary Disbursements**: One-click payroll execution with batch processing.
- **Payslip Generation**: PDF views of monthly payslips with tax breakdowns.
- **Tax Withholdings Engine**: Deducts standard taxes from gross pay based on regional rules.

### 🏖️ Time-Off Management (Attendance Intelligence)
- **Leave Requests**: Employees submit dates/reasons for Vacation, Sick Leave, etc.
- **AI Impact Analysis**: Checks department capacity. Flags a "Scarcity Risk" if approving leave drops team capacity below 92%.
- **Auto-Approval System**: Low-risk requests bypass manual manager approval automatically.

### 📊 Performance Management
- **Review Cycles**: Managers initiate quarterly/annual reviews.
- **Goal Tracking (OKRs)**: Employees set Objectives and Key Results.
- **360° Feedback**: Request anonymous peer reviews.

### 📤 Offboarding Intelligence (Respectful Departure)
- **Interactive Checklist**: State-driven UI for IT, Finance, and HR exit tasks.
- **Financial Settlement**: Auto-calculates End of Service (EOS) benefits and unused PTO payouts.
- **Resilient Fallback Engine**: Falls back to an in-memory "8 Agreed Standard Tasks" array if database templates fail to load.

---

## 3. Data Model (Prisma Schema)

```mermaid
erDiagram
    ORGANIZATION ||--o{ EMPLOYEE : employs
    ORGANIZATION ||--o{ JOB : posts
    EMPLOYEE ||--o{ TIMEOFFREQUEST : requests
    JOB ||--o{ CANDIDATE : receives

    EMPLOYEE {
        String id PK
        String clerkId
        String firstName
        String lastName
        String role
        String department
    }
    
    JOB {
        String id PK
        String title
        String status
        String type
    }
    
    CANDIDATE {
        String id PK
        String firstName
        String status
        Int aiScore
    }
    
    TIMEOFFREQUEST {
        String id PK
        String type
        DateTime startDate
        DateTime endDate
        String status
    }
```

---

## 4. Comprehensive Version Roadmap

### 🚀 Version 0.1.0: The Frontend MVP (Current State)
- **Focus**: Premium UI/UX, core module scaffolding, mock data flows.
- **Features**: Interactive "Virtual Demo Mode" frontend demonstrating the product vision with local state and simulated AI.

### 🔌 Version 0.5.0: The Backend Hookup (Next Immediate Phase)
- **Focus**: Database wiring and application security.
- **Features**: 
  - Integrate **Clerk** (or Supabase Auth) for real-world user login.
  - Replace mock data with live **Prisma ORM** queries.
  - Build Next.js API Routes for data fetching.

### 🧠 Version 1.0.0: Core Product Launch
- **Focus**: Real AI features and user workflows.
- **Features**: 
  - Connect **Google Gemini API** for live resume scoring.
  - Implement secure cloud file storage for resumes.
  - Integrate email notifications (SendGrid/Resend).

### 🏢 Version 1.5.0: Enterprise Features & Scale
- **Focus**: Multi-tenancy, security, reporting.
- **Features**: 
  - Organization isolation (B2B SaaS).
  - Audit logging for compliance.
  - Dynamic PDF/CSV exports for payroll.
  - Granular Role-Based Access Control (RBAC).

### 🌐 Version 2.0.0: The Autonomous Ecosystem
- **Focus**: External integrations and mobility.
- **Features**: 
  - Slack/Teams integrations for approvals.
  - Google/Outlook calendar syncing.
  - React Native mobile app.
  - Predictive HR churn models.

---

## 5. Developer Setup Guide

1. **Clone & Install**:
   ```bash
   npm install
   ```
2. **Configure Environment (`.env.local`)**:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/super_hr"
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
   CLERK_SECRET_KEY=your_secret
   GEMINI_API_KEY=your_gemini_key
   ```
3. **Initialize Database**:
   ```bash
   npx prisma generate
   npx prisma db push
   ```
4. **Run Development Server**:
   ```bash
   npm run dev
   ```
   *(Access via http://localhost:3000)*
