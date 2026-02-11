# 🌸 Mamma's Care Project
Mamma's Care Project is a comprehensive pregnancy companion application designed to support expectant mothers through their journey. It provides tools for tracking health, managing reminders, logging moods, and preserving precious baby moments.

# 🚀 Features
Interactive Dashboard: Real-time pregnancy progress tracking, including current week, trimester, and baby size comparisons (e.g., "Your baby is the size of an avocado").
 ![image alt]()

AI-Powered Chat: Integrated AI assistant to provide health information and support.

Health & Wellness Reminders: Automated and customizable reminders for hydration, prenatal vitamins, and sleep.

Diet & Medical Management: Track doctor-prescribed diet plans with support for uploading medical report photos.

Mood Journaling: A dedicated space to log daily feelings and track emotional trends.

Baby Moments: A digital scrapbook to capture and save photos and descriptions of special milestones.

Emergency SOS: Quick-access emergency contact management and SOS functionality for immediate assistance.

Medical Profile: Centralized storage for due dates, blood type, doctor details, and hospital information.

# 🛠️ Tech Stack
Frontend
Framework: React with TypeScript and Vite.

Styling: Tailwind CSS with framer-motion for smooth animations.

Routing: wouter for lightweight navigation.

State Management: TanStack Query (React Query) for efficient data fetching.

Icons: Lucide React.

Backend
Server: Node.js with Express.

Database: MySQL managed via Drizzle ORM.

Authentication: Google OAuth 2.0 via Passport.js.

AI Integration: Google Generative AI (@google/generative-ai).

# 📁 Project Structure
Plaintext
├── client/                # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable UI components (Shadcn UI)
│   │   ├── hooks/         # Custom React hooks (auth, profile, reminders)
│   │   ├── pages/         # Dashboard, Journal, Chat, etc.
│   │   └── lib/           # Utility functions and API clients
├── server/                # Express backend
│   ├── auth.ts            # Authentication logic
│   ├── routes.ts          # API endpoints
│   └── storage.ts         # Database interaction layer
├── shared/                # Shared types and Zod schemas
│   └── schema.ts          # Database table definitions
└── package.json           # Dependencies and scripts


# ⚙️ Getting Started
Prerequisites
Node.js (v18 or higher)

# MySQL Database

Installation
Clone the repository.

Install dependencies:

# Bash
npm install
Set up your environment variables (e.g., database credentials, Google Client ID/Secret).

Push the database schema:

# Bash
npm run db:push
Available Scripts
npm run dev: Starts the development server for both frontend and backend.

npm run build: Compiles the project for production.

npm run start: Runs the production build.

npm run check: Runs TypeScript type checking.

# 📦 Key Dependencies
date-fns: For date formatting and manipulation.

react-hook-form: Efficient form handling with Zod validation.

recharts: Visualizing health and mood trends.

clsx & tailwind-merge: For conditional Tailwind class management.
