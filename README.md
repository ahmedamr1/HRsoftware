# Super HR - AI-Native HR Management Platform

> **Next-generation AI-powered HR management suite** designed to transform workforce operations with intelligent automation, predictive analytics, and seamless user experience.

---

## 1. Project Overview

**Super HR** is a comprehensive, AI-native Human Resources SaaS platform built to streamline and enhance all aspects of workforce management. The system integrates cutting-edge AI capabilities across recruitment, employee management, payroll, performance tracking, and time-off management.

### Key Highlights
- 🤖 **AI-First Architecture**: Every module leverages AI for insights, automation, and decision support
- 🎨 **Premium UI/UX**: Modern, glassmorphic design with smooth animations and dark mode support
- 📊 **Real-Time Intelligence**: Predictive analytics, sentiment analysis, and capacity modeling
- 🔐 **Role-Based Access**: Separate admin and employee experiences with contextual dashboards
- ⚡ **High Performance**: Built on Next.js 16 with server-side rendering and optimized data fetching

---

## 2. System Architecture

### Frontend Architecture
```
┌─────────────────────────────────────────────────────────┐
│                    Next.js 16 App Router                │
│                   (React 19 + TypeScript)               │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Dashboard  │  │  Recruitment │  │   Employees  │  │
│  │    Module    │  │    Module    │  │    Module    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Payroll    │  │   Time-Off   │  │  Performance │  │
│  │    Module    │  │    Module    │  │    Module    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
├─────────────────────────────────────────────────────────┤
│              UI Components (Radix UI)                   │
│         Framer Motion | Tailwind CSS v4                 │
└─────────────────────────────────────────────────────────┘
```

### Backend Architecture
```
┌─────────────────────────────────────────────────────────┐
│              Next.js API Routes (Server)                │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   Prisma ORM │  │  Auth Context│  │  AI Services │  │
│  │              │  │  (LocalAuth) │  │  (Planned)   │  │
│  └──────┬───────┘  └──────────────┘  └──────────────┘  │
│         │                                               │
│         ▼                                               │
│  ┌─────────────────────────────────────────────────┐   │
│  │         PostgreSQL Database (Supabase)          │   │
│  │  - Employees  - Jobs       - TimeOffRequests    │   │
│  │  - Candidates - Payroll    - Performance        │   │
│  └─────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Data Flow
1. **Client** → Next.js App Router (React Server Components)
2. **Server Components** → Prisma ORM → PostgreSQL (Supabase)
3. **AI Integration** → Google Gemini API (for resume analysis, career pathing, etc.)
4. **State Management** → React Context API + Local Storage
5. **Styling** → Tailwind CSS v4 with custom design tokens

---

## 3. Tech Stack

### Core Technologies
| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Framework** | Next.js | 16.1.6 | React framework with App Router |
| **Runtime** | React | 19.2.3 | UI library |
| **Language** | TypeScript | 5.x | Type-safe development |
| **Styling** | Tailwind CSS | 4.x | Utility-first CSS framework |
| **Database** | PostgreSQL | Latest | Relational database via Supabase |
| **ORM** | Prisma | 7.3.0 | Type-safe database client |

### Key Libraries & Frameworks
```json
{
  "UI Components": {
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-tabs": "^1.1.13",
    "lucide-react": "^0.563.0"
  },
  "Animation": {
    "framer-motion": "^12.33.0"
  },
  "Authentication": {
    "@clerk/nextjs": "^6.37.3"
  },
  "Database": {
    "@prisma/client": "^7.3.0",
    "@supabase/supabase-js": "^2.95.3"
  },
  "Utilities": {
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.4.0",
    "sonner": "^2.0.7",
    "next-themes": "^0.4.6"
  }
}
```

### Development Tools
- **ESLint**: Code linting and quality
- **PostCSS**: CSS processing
- **TypeScript**: Static type checking

---

## 4. File and Folder Structure

```
f:/Super HR - Antigravity/
│
├── prisma/
│   └── schema.prisma              # Database schema definition
│
├── public/                        # Static assets
│
├── src/
│   ├── app/                       # Next.js App Router pages
│   │   ├── api/                   # API routes (planned)
│   │   ├── careers/               # Public career portal
│   │   ├── employees/             # Employee management
│   │   │   ├── new/               # Add new employee
│   │   │   ├── page.tsx           # Employee list
│   │   │   └── data.ts            # Mock employee data
│   │   ├── login/                 # Authentication page
│   │   ├── onboarding/            # Employee onboarding
│   │   ├── org-chart/             # Organization chart
│   │   ├── payroll/               # Payroll management
│   │   │   └── page.tsx           # Payroll dashboard
│   │   ├── performance/           # Performance reviews
│   │   │   └── page.tsx           # Performance tracking
│   │   ├── recruitment/           # Recruitment hub
│   │   │   ├── analytics/         # Hiring analytics
│   │   │   ├── assessments/       # Skill assessments
│   │   │   ├── interview/         # Interview workspace
│   │   │   ├── jobs/              # Job postings
│   │   │   ├── new/               # Create job posting
│   │   │   ├── outreach/          # AI outreach engine
│   │   │   ├── portal/            # Candidate portal
│   │   │   ├── referrals/         # Referral program
│   │   │   ├── sourcing/          # Talent sourcing
│   │   │   └── page.tsx           # Recruitment dashboard
│   │   ├── settings/              # Application settings
│   │   ├── time-off/              # Leave management
│   │   │   ├── new/               # Request time off
│   │   │   └── page.tsx           # Time-off dashboard
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Main dashboard
│   │   └── globals.css            # Global styles
│   │
│   ├── components/                # React components
│   │   ├── layout/                # Layout components
│   │   │   ├── Header.tsx         # App header
│   │   │   ├── SidebarClient.tsx  # Navigation sidebar
│   │   │   └── PageTransition.tsx # Page animations
│   │   ├── payroll/               # Payroll components
│   │   │   └── PayslipModal.tsx   # Payslip viewer
│   │   ├── performance/           # Performance components
│   │   │   └── PerformanceModal.tsx
│   │   ├── recruitment/           # Recruitment components
│   │   │   ├── AIRecommendationCard.tsx
│   │   │   ├── CandidateDetailView.tsx
│   │   │   ├── CandidateDocuments.tsx
│   │   │   ├── CandidateKanban.tsx
│   │   │   └── InterviewFeedbackForm.tsx
│   │   └── ui/                    # Reusable UI components
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── dialog.tsx
│   │       ├── dropdown-menu.tsx
│   │       ├── file-upload.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       └── textarea.tsx
│   │
│   ├── lib/                       # Utility libraries
│   │   ├── auth-context.tsx       # Authentication context
│   │   ├── prisma.ts              # Prisma client instance
│   │   └── utils.ts               # Helper functions
│   │
│   └── services/                  # Business logic services
│
├── .env                           # Environment variables
├── .env.local                     # Local environment overrides
├── package.json                   # Dependencies
├── tsconfig.json                  # TypeScript configuration
├── next.config.ts                 # Next.js configuration
└── README.md                      # This file
```

---

## 5. Current Features

### 🏠 **Dashboard (Operational Hub)**
- **Role-Based Views**: Separate dashboards for admins and employees
- **AI Intelligence Brief**: Morning insights with capacity alerts, retention wins, and compliance gaps
- **Smart Calendar**: AI-optimized scheduling with conflict detection
- **AI Suggested Tasks**: Intelligent task prioritization
- **Real-Time Stats**: Workforce metrics, turnover, satisfaction scores
- **AI Search Mode**: Natural language queries (e.g., "When is my next leave?")
- **Activity Feed**: Live system events and recognition tracking
- **Performance Velocity Charts**: Visual analytics for talent projection

### 👥 **Employee Management (Workforce Intelligence)**
- **Employee Directory**: Comprehensive list with avatars, roles, departments
- **AI Career Pathing**: Predictive career trajectory modeling
- **Retention Risk Analysis**: AI-powered churn prediction
- **Security Audits**: Compliance and access control
- **Search & Filters**: Smart search with AI query support
- **Talent Reports**: Diversity and performance analytics

### 💼 **Recruitment Module**
#### **Core Features**
- **Job Postings Management**: Create, edit, and track open positions
- **Candidate Pipeline**: Centralized applicant tracking across all roles
- **AI Resume Scoring**: Automated candidate evaluation (0-100 scale)
- **Public Career Portal**: External-facing job board

#### **Advanced Sub-Modules**
1. **AI Outreach Engine** (`/recruitment/outreach`)
   - Personalized candidate outreach sequences
   - Proactive talent discovery

2. **Recruitment Analytics** (`/recruitment/analytics`)
   - Hiring velocity metrics
   - Time-to-fill analysis
   - Source performance tracking

3. **Interview Workspace** (`/recruitment/interview`)
   - Collaborative panel reviews
   - Live evaluation tools
   - Interview feedback forms

4. **Assessment Center** (`/recruitment/assessments`)
   - Team skill gap analysis
   - Candidate competency mapping
   - Synergy match scoring (92% optimal blend)
   - AI-validated skill credentials

5. **Sourcing Hub** (`/recruitment/sourcing`)
   - Passive talent discovery
   - External platform integrations

6. **Referral Program** (`/recruitment/referrals`)
   - Internal referral tracking
   - Bonus management

7. **Candidate Portal** (`/recruitment/portal`)
   - Application submission
   - Resume upload with AI analysis
   - Status tracking

### 💰 **Payroll & Finances**
- **Salary Disbursements**: Monthly payroll processing
- **Payslip Generation**: Detailed pay statements with tax breakdowns
- **Tax Withholdings**: Automated tax calculations
- **Export Functionality**: CSV export for accounting
- **Run Payroll**: One-click payroll execution with progress tracking
- **Financial Metrics**: Total liability, active accounts, tax estimates

### 🏖️ **Time-Off Management (Attendance Intelligence)**
- **Leave Requests**: Vacation, sick leave, personal time
- **AI Impact Analysis**: Capacity modeling for leave approvals
- **Auto-Approval System**: AI pre-vetted requests
- **Team Capacity Tracking**: Real-time workforce availability (92% optimal)
- **Scarcity Risk Alerts**: 30-day capacity forecasting
- **Approval Workflow**: Approve/reject with AI recommendations
- **Personal Balance**: Employee PTO tracking

### 📊 **Performance Management**
- **Performance Reviews**: Structured evaluation system
- **Goal Tracking**: OKRs and milestone management
- **360° Feedback**: Multi-source performance input
- **AI Performance Insights**: Predictive performance analytics
- **Skill Proficiency**: AI analysis of talent stack
- **Growth Tracking**: Career progression monitoring

### 🎨 **UI/UX Features**
- **Dark Mode**: System-aware theme switching
- **Glassmorphism Design**: Modern frosted glass aesthetics
- **Smooth Animations**: Framer Motion page transitions
- **Responsive Layout**: Mobile-first design
- **Toast Notifications**: Real-time feedback with Sonner
- **Loading States**: Skeleton screens and progress indicators
- **Accessibility**: ARIA labels and keyboard navigation

---

## 6. Data Model

### Database Schema (Prisma)

#### **Employee**
```prisma
model Employee {
  id             String    @id @default(cuid())
  clerkId        String?   @unique
  organizationId String
  firstName      String
  lastName       String
  email          String    @unique
  role           String
  department     String
  status         String    @default("Active")
  avatar         String?
  joinedDate     DateTime  @default(now())
  
  timeOffRequests TimeOffRequest[]
  
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
}
```

#### **TimeOffRequest**
```prisma
model TimeOffRequest {
  id         String    @id @default(cuid())
  employeeId String
  employee   Employee  @relation(fields: [employeeId], references: [id])
  type       String    // Vacation, Sick Leave, etc.
  startDate  DateTime
  endDate    DateTime
  days       Int
  status     String    @default("Pending")
  reason     String?
  
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt
}
```

#### **Job**
```prisma
model Job {
  id             String    @id @default(cuid())
  organizationId String
  title          String
  department     String
  location       String
  type           String    // Full-time, Part-time, Contract
  status         String    @default("Open")
  description    String?
  
  candidates     Candidate[]
  
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
}
```

#### **Candidate**
```prisma
model Candidate {
  id         String    @id @default(cuid())
  jobId      String
  job        Job       @relation(fields: [jobId], references: [id])
  firstName  String
  lastName   String
  email      String
  phone      String?
  resumeUrl  String?
  status     String    @default("Screening")
  aiScore    Int?      // 0-100 AI-generated score
  aiSummary  String?   // AI feedback on resume
  
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt
}
```

### Entity Relationships
```
Organization (1) ──< (N) Employee
Employee (1) ──< (N) TimeOffRequest
Organization (1) ──< (N) Job
Job (1) ──< (N) Candidate
```

---

## 7. AI & Automation Components

### Current AI Features (Mock/Simulated)
1. **Resume Analysis**
   - AI scoring (0-100) for candidate fit
   - Automated skill extraction
   - Summary generation

2. **Predictive Analytics**
   - Retention risk modeling (Low/Medium/High)
   - Capacity forecasting
   - Sentiment analysis

3. **Career Pathing**
   - AI-suggested career trajectories
   - Skill gap identification
   - Growth recommendations

4. **Smart Scheduling**
   - Conflict detection
   - Auto-resolution suggestions
   - Meeting optimization

5. **Impact Analysis**
   - Leave request impact modeling
   - Team capacity calculations
   - Project milestone tracking

### Planned AI Integrations
- **Google Gemini API**: Real resume analysis and candidate screening
- **Natural Language Search**: Semantic query understanding
- **Automated Outreach**: Personalized email generation
- **Performance Predictions**: Employee trajectory forecasting
- **Compliance Monitoring**: Automated policy enforcement

### AI Workflow Example
```
Candidate Applies → Resume Upload → AI Analysis
                                    ↓
                          Extract Skills & Experience
                                    ↓
                          Generate Score (0-100)
                                    ↓
                          Create Summary Report
                                    ↓
                          Match to Job Requirements
                                    ↓
                          Recommend to Hiring Manager
```

---

## 8. Local Setup & Ports

### Prerequisites
- **Node.js**: v18+ (recommended v20+)
- **npm**: v9+ or **pnpm**: v8+
- **PostgreSQL**: Database (via Supabase or local)

### Installation Steps

1. **Clone the repository**
   ```bash
   cd "f:/Super HR - Antigravity"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create/update `.env.local`:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@localhost:5432/super_hr"
   
   # Clerk Authentication (if using)
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
   CLERK_SECRET_KEY=your_secret
   
   # Supabase (if using)
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   
   # Google Gemini API (for AI features)
   GEMINI_API_KEY=your_gemini_key
   ```

4. **Initialize database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```

### Running Locally

**Development Server**
```bash
npm run dev
```
- **URL**: http://localhost:3000
- **Port**: 3000 (default)

**Production Build**
```bash
npm run build
npm start
```

**Database Studio**
```bash
npx prisma studio
```
- **URL**: http://localhost:5555
- **Port**: 5555

### Current Ports & URLs
| Service | Port | URL | Status |
|---------|------|-----|--------|
| Next.js Dev Server | 3000 | http://localhost:3000 | ✅ Active |
| Prisma Studio | 5555 | http://localhost:5555 | 🔧 On-demand |
| PostgreSQL | 5432 | localhost:5432 | ✅ Active (Supabase) |

### Authentication Flow
Currently using **mock authentication** via `auth-context.tsx`:
- Login page: `/login`
- Role selection: Admin or Employee
- Session stored in `localStorage` as `super_hr_role`
- No password required (development only)

---

## 9. Known Issues & Limitations

### Current Limitations
1. **Mock Authentication**: Using localStorage-based auth instead of Clerk/Supabase Auth
2. **AI Features**: Most AI capabilities are simulated (no real Gemini API integration yet)
3. **No API Routes**: Backend API endpoints not fully implemented
4. **Mock Data**: Using hardcoded data instead of database queries
5. **No File Upload**: Resume upload UI exists but no backend storage
6. **Missing Tests**: No unit or integration tests implemented
7. **No Email Service**: Email notifications not configured
8. **Incomplete Payroll**: Tax calculations are simplified/mocked

### Known Bugs
- **Tailwind Dynamic Classes**: Some dynamic color classes (e.g., `text-${color}-500`) may not work due to JIT compilation
- **TypeScript Errors**: Minor type mismatches in some components (see `tsc_errors.txt`)
- **Build Warnings**: ESLint warnings in production build

### Browser Compatibility
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ⚠️ IE11 (not supported)

---

## 10. Testing Setup

### Current Status
❌ **No automated tests implemented**

### Planned Testing Strategy
1. **Unit Tests**: Jest + React Testing Library
2. **Integration Tests**: Playwright for E2E
3. **API Tests**: Supertest for API routes
4. **Database Tests**: Prisma test environment

### Manual Testing
Currently relying on manual testing:
1. Navigate to http://localhost:3000
2. Login as Admin or Employee
3. Test each module manually
4. Verify UI responsiveness and interactions

---

## 11. Pending Features & Next Steps

### High Priority
- [ ] **Real Authentication**: Integrate Clerk or Supabase Auth
- [ ] **Database Integration**: Replace mock data with Prisma queries
- [ ] **AI Integration**: Connect Google Gemini API for resume analysis
- [ ] **File Upload**: Implement resume storage (Supabase Storage or S3)
- [ ] **API Routes**: Build REST/GraphQL endpoints
- [ ] **Email Service**: Configure SendGrid/Resend for notifications

### Medium Priority
- [ ] **Advanced Analytics**: Real-time dashboards with charts (Recharts/Chart.js)
- [ ] **Notifications System**: In-app notifications with WebSockets
- [ ] **Mobile App**: React Native version
- [ ] **Multi-Tenancy**: Organization isolation and management
- [ ] **Audit Logs**: Track all system changes
- [ ] **Export Features**: PDF reports, CSV exports

### Low Priority
- [ ] **Internationalization**: Multi-language support (i18n)
- [ ] **Accessibility Audit**: WCAG 2.1 AA compliance
- [ ] **Performance Optimization**: Code splitting, lazy loading
- [ ] **SEO Optimization**: Meta tags, sitemap, robots.txt
- [ ] **Documentation**: API docs, component storybook

### Future Enhancements
- **Slack/Teams Integration**: Notifications and bot commands
- **Calendar Sync**: Google Calendar, Outlook integration
- **Video Interviews**: Built-in video conferencing
- **Learning Management**: Training and certification tracking
- **Benefits Administration**: Health insurance, 401k management
- **Expense Management**: Receipt scanning, approval workflows

---

## 12. Development Workflow

### Git Workflow (Recommended)
```bash
# Feature branch
git checkout -b feature/new-feature

# Commit changes
git add .
git commit -m "feat: add new feature"

# Push and create PR
git push origin feature/new-feature
```

### Code Style
- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js recommended config
- **Prettier**: (Not configured, recommended to add)
- **Naming Conventions**:
  - Components: PascalCase (`EmployeeCard.tsx`)
  - Files: kebab-case for pages (`time-off/page.tsx`)
  - Variables: camelCase (`userRole`)

### Component Structure
```tsx
// Preferred component pattern
"use client" // Only if using client-side features

import { ComponentProps } from "@/types"

export default function ComponentName({ prop1, prop2 }: ComponentProps) {
  // Hooks
  const [state, setState] = useState()
  
  // Handlers
  const handleAction = () => {}
  
  // Render
  return <div>...</div>
}
```

---

## 13. Contributing

### How to Contribute
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write/update tests
5. Submit a pull request

### Code Review Process
- All PRs require review
- Run `npm run lint` before submitting
- Ensure `npm run build` succeeds
- Update documentation if needed

---

## 14. License

**Proprietary** - All rights reserved

---

## 15. Contact & Support

For questions or support:
- **Project Lead**: [Your Name]
- **Email**: [your-email@example.com]
- **Documentation**: This README
- **Issues**: GitHub Issues (if applicable)

---

## 16. Changelog

### Version 0.1.0 (Current)
- ✅ Initial project setup
- ✅ Dashboard with role-based views
- ✅ Employee management module
- ✅ Recruitment system with AI scoring
- ✅ Payroll management
- ✅ Time-off tracking
- ✅ Performance reviews
- ✅ Assessment center
- ✅ Dark mode support
- ✅ Responsive design

---

**Built with ❤️ using Next.js, React, TypeScript, and Tailwind CSS**
