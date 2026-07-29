# Super HR - Full Features Breakdown for Developers

This document provides a deep dive into every feature module within Super HR. It is designed to help developers understand the exact scope, UI requirements, and backend logic needed to maintain or build out each feature.

---

## 1. 🏠 Dashboard (The Operational Hub)

The Dashboard is the landing page (`/` or `/dashboard`) and acts as the central command center.

### Core Capabilities
- **Role-Based Views**: The UI must dynamically render different widgets based on whether the logged-in user is an `Admin` or `Employee`.
- **AI Intelligence Brief**: A morning summary widget highlighting capacity alerts, retention wins, and compliance gaps.
    - *Developer Note*: This will eventually require an API call to a prompt-engineered LLM endpoint (Gemini) that ingests recent DB events and outputs a summary.
- **Smart Calendar**: Displays upcoming leaves, interviews, and performance reviews. Must include conflict detection logic.
- **Activity Feed**: A real-time stream of company events (new hires, anniversaries, peer recognition).
- **AI Search Mode**: A global command palette (e.g., `Cmd+K`) that supports natural language queries.

---

## 2. 👥 Employee Management (Workforce Intelligence)

Located under `/employees`. This module handles the core HR directory and talent analytics.

### Core Capabilities
- **Employee Directory**: A rich table/grid view (`page.tsx`) showing avatars, roles, and departments. Includes advanced filtering and search.
- **AI Career Pathing**: Visual trajectory models showing an employee's potential next roles based on skills.
- **Retention Risk Analysis**: A predictive label (Low/Medium/High) on employee profiles.
    - *Developer Note*: This requires a background cron job or trigger that evaluates employee tenure, recent performance scores, and leave frequency to assign a risk score.
- **Security Audits**: Tracking who has access to what internal systems.

---

## 3. 💼 Recruitment Module (The Hiring Engine)

The largest module, located under `/recruitment`. It manages the entire ATS (Applicant Tracking System) lifecycle.

### Sub-Modules
1. **Job Postings & Pipeline**: A Kanban board (`CandidateKanban.tsx`) where candidates are dragged between stages (Screening → Interview → Offer).
2. **AI Resume Scoring**: When a resume is uploaded, it must be parsed, sent to the Gemini API with the Job Description, and return a 0-100 score + summary.
3. **Assessment Center (`/recruitment/assessments`)**: Calculates "Synergy match scoring". Evaluates how a candidate's skills blend with the existing team.
4. **Interview Workspace (`/recruitment/interview`)**: A collaborative space for panel interviewers to submit live feedback via `InterviewFeedbackForm.tsx`.
5. **AI Outreach Engine (`/recruitment/outreach`)**: Generates personalized cold-email templates for passive candidates based on their LinkedIn/resume data.
6. **Candidate Portal (`/careers`)**: The public-facing site where external users can view jobs and submit applications.

---

## 4. 💰 Payroll & Finances

Located under `/payroll`. Handles the financial distribution logic.

### Core Capabilities
- **Salary Disbursements**: Admin view to authorize monthly company-wide payroll.
- **Payslip Generation**: Employees can view and download PDF versions of their monthly payslips via `PayslipModal.tsx`.
- **Tax Withholdings Engine**: A calculation utility that deducts standard taxes from gross pay based on regional/mock rules.
- **Run Payroll Workflow**: A critical transactional flow.
    - *Developer Note*: This requires ACID-compliant database transactions. If one employee's payroll fails, the batch should either rollback or flag the specific error safely.

---

## 5. 🏖️ Time-Off Management (Attendance Intelligence)

Located under `/time-off`. Manages leave requests and team capacity.

### Core Capabilities
- **Leave Requests**: Employees submit dates and reasons.
- **AI Impact & Capacity Analysis**: When a request is made, the system checks the department's calendar. If approving the leave drops the team capacity below 92%, it flags a "Scarcity Risk".
- **Auto-Approval System**: Low-risk requests (e.g., 1 day off with 100% team capacity) can bypass manual manager approval.
- **Balance Tracking**: Deducting days from an employee's annual PTO allowance.

---

## 6. 📊 Performance Management

Located under `/performance`. Handles evaluations and OKRs.

### Core Capabilities
- **Review Cycles**: Managers can initiate Q1/Q2/Q3/Q4 reviews via `PerformanceModal.tsx`.
- **Goal Tracking (OKRs)**: Employees set Objectives and Key Results, updating progress bars manually or via integrations.
- **360° Feedback**: System allows requesting anonymous peer reviews.
- **Growth Tracking**: Historical charting of an employee's performance scores over their tenure.

---

## 7. 📤 Offboarding Intelligence (Respectful Departure)

A high-fidelity module designed to cleanly exit an employee without breaking system dependencies.

### Core Capabilities
- **Interactive Checklist**: A state-driven UI where admins toggle IT, Finance, and HR tasks.
    - *Developer Note*: The UI uses heavy React state management. Be careful of "Maximum update depth" errors by ensuring proper memoization (e.g., `useMemo`, `useCallback`) when passing the employee context to the checklist children.
- **Financial Settlement (End of Service)**: Auto-calculates final salary payouts including unused PTO days.
- **Resilient Fallback Engine**: If the database fails to load the custom checklist template, the system falls back to an in-memory "8 Agreed Standard Tasks" array so the admin isn't blocked.
- **Auto-Registration**: For testing/demo purposes, if a mock employee is selected for offboarding, the system dynamically inserts them into the DB to prevent foreign-key crashes.

---

## 🛠️ Summary for Developers

When building or modifying these features, keep the following principles in mind:
1. **AI is an Assistant, Not an Autocrat**: Always ensure a human (Admin) can override AI scores, capacity warnings, and auto-approvals.
2. **State Management**: Features like the Offboarding Checklist and the Recruitment Kanban board require complex, optimistic UI updates. Rely heavily on React Context and ensure you aren't causing unnecessary re-renders.
3. **Mock vs. Real**: As we transition from MVP (v0.1.0) to Backend Hookup (v0.5.0), ensure you replace all `localStorage` and hardcoded `data.ts` arrays with Prisma `await prisma.entity.findMany()` calls inside Next.js Server Components.
