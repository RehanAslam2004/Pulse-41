<div align="center">

# PULSE41

**Enterprise Digital Transformation, AI Engineering & Operations Platform**

*TECH • THINK • THRIVE*

[![Framework](https://img.shields.io/badge/Framework-Next.js%2015-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4.0-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Database](https://img.shields.io/badge/Database-Supabase%20PostgreSQL-3ecf8e?style=flat-square&logo=supabase)](https://supabase.com/)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square&logo=vercel)](https://vercel.com/)

</div>

---

## 1. Executive Summary

**Pulse41** is an enterprise technology and digital growth partner combining software engineering, AI-driven automation, secure cloud infrastructure, data intelligence, and managed digital operations. Built for high-growth enterprises, startups, and institutions across the US, EU, UK, and global markets, Pulse41 bridges high-level architectural strategy with production-ready execution.

This repository contains the complete unified production codebase:
- **Public Experience Layer:** High-converting marketing site, interactive pricing engine, dynamic case studies, industry solutions, and real-time consultation booking.
- **Pulse41 Control (Enterprise Admin):** Comprehensive administrative operations platform featuring live revenue analytics, interactive drag-and-drop Kanban pipelines, real-time client inquiries inbox, lead lifecycle management, and role-based governance.

---

## 2. Core Architecture & Technology Stack

| Layer | Technologies & Tools |
| :--- | :--- |
| **Framework** | **Next.js 15 (App Router)** with React Server Components (RSC), dynamic metadata generation, SSG, and optimized Route Handlers |
| **Frontend Runtime** | **React 19**, React DOM 19, TypeScript 5.7 |
| **Styling & Design System** | **Tailwind CSS v4** (`@tailwindcss/postcss`), custom design tokens, modern responsive glassmorphism |
| **Animation & Micro-interactions** | **Framer Motion**, GSAP, CSS hardware-accelerated transitions |
| **Database & Backend** | **Supabase** (Managed PostgreSQL, Row-Level Security, Server-Side SSR Auth & Query Client) |
| **Security & Hardening** | Strict Content Security Policy (CSP), HTTP Strict Transport Security (HSTS), XSS protection, anti-sniffing headers, zero-trust credential isolation |
| **Iconography & Visuals** | **Lucide React**, official bespoke Pulse41 SVG vector artwork |
| **Hosting & CI/CD** | **Vercel** with edge caching, automated SSL, and preview deployments |

---

## 3. Platform Capabilities & Features

### 3.1 Public Marketing & Solutions Engine
- **8 Core Service Practices:** AI & Intelligent Automation, Custom Software Engineering, Cloud & Platform Ops, Cybersecurity & Trust, Data & Intelligence, Product Design, Enterprise Modernization, and Digital Marketing.
- **10 Industry Verticals:** Dedicated solutions tailored for FinTech, HealthTech, Supply Chain, Retail, SaaS, Education, Professional Services, Public Sector, Non-Profit, and Telecom.
- **10 Pulse Platform Suites:** Deep-dive solution showcases including *PulseDesk AI*, *PulseContact*, *PulseDoc AI*, *PulseCore*, *PulseEngine*, *PulseCert*, and *PulseStore*.
- **Interactive Pricing Configurator:** Live estimation calculator allowing clients to model infrastructure tiers, compliance requirements, and implementation timelines.
- **Architect Consultation & Inquiries:** High-touch lead capture forms with immediate validation, routing, and database persistence.
- **SEO & Social Optimization:** Dynamic OpenGraph social card generation, automated `sitemap.xml`, and strict semantic metadata.

### 3.2 Pulse41 Control — Enterprise Admin Platform (`/admin`)
- **Executive Command Center:** Real-time visibility into active pipeline valuation, monthly recurring revenue (MRR), total client volume, and system telemetry.
- **Drag-and-Drop Pipeline Kanban:** Interactive HTML5 drag-and-drop visual pipeline allowing executives to move deals across stages (*Discovery*, *Proposal*, *Negotiation*, *Won*, *Lost*) with instant state updates.
- **Unified Client Inquiries Inbox:** Dedicated inbox capturing all incoming requests from pricing configurators, general contact forms, and architect consultation bookings. Includes search, filter by source, read/unread toggles, and status progression.
- **Lead Creation & Management:** Complete modal-driven lead creation interface with enterprise lead scoring, service categorization, assignment, and status tracking.
- **Organizational Governance:** Manage enterprise accounts, role-based access control (RBAC), quote generation, job applications, and security audit logs.
- **Responsive Admin Sidebar:** Collapsible navigation with brand recognition (full wordmark in expanded mode, compact `≡ 4 1` glyph in collapsed mode).

---

## 4. Repository Structure

```text
Pulse-41/
├── public/                     # Static web assets, favicons, open-graph assets
│   ├── fonts/
│   └── images/
├── src/
│   ├── app/                    # Next.js App Router (Pages, Slugs, API Routes)
│   │   ├── (marketing)/        # Public marketing routes (services, solutions, pricing, etc.)
│   │   ├── admin/              # Pulse41 Control Admin routes (pipeline, leads, inquiries, etc.)
│   │   ├── api/                # Production REST Route Handlers (admin, contact, quotes)
│   │   ├── layout.tsx          # Root layout with font optimization & global providers
│   │   ├── sitemap.ts          # Automated dynamic SEO sitemap generator
│   │   └── robots.ts           # Search engine indexing rules
│   ├── components/             # Reusable UI component library
│   │   ├── admin/              # Admin shell, Kanban, tables, modals, analytics
│   │   ├── brand/              # Official Pulse41 vector logo components
│   │   ├── layout/             # Navigation header, dropdowns, footer
│   │   ├── pages/              # Page-specific modular components
│   │   └── ui/                 # Atomic design tokens, buttons, badges, inputs
│   ├── content/                # Content definitions for services, solutions & case studies
│   └── lib/                    # Shared utilities, Supabase client, design tokens
│       ├── design/tokens.ts    # Central brand color tokens & navigation constants
│       └── supabase/           # Server, client, and admin Supabase singletons
├── supabase/                   # Database migrations, schema DDL & seed scripts
│   ├── schema.sql              # PostgreSQL tables, indexes & RLS policies
│   └── seed.mjs                # Production demo data generator
├── .env.example                # Sample environment configuration template
├── README.md                   # Platform documentation & deployment guide
├── next.config.ts              # Next.js security headers, image optimization & CSP
├── package.json                # Project dependencies & operational scripts
├── tsconfig.json               # Strict TypeScript configuration
└── vercel.json                 # Vercel deployment & caching rules
```

---

## 5. Getting Started (Local Development)

### Prerequisites
- **Node.js:** `v20.x` or `v22.x` (LTS recommended)
- **Package Manager:** `npm` (v10+), `pnpm`, or `yarn`
- **Git**

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/RehanAslam2004/Pulse-41.git
   cd Pulse-41
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a local `.env.local` file by copying the sample template:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Supabase project credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Initialize Database Schema (Optional if using new Supabase project):**
   Execute the migration SQL found in `supabase/schema.sql` via the Supabase SQL Editor, then optionally run the seed script:
   ```bash
   node supabase/seed.mjs
   ```

5. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   The application will be live at `http://localhost:3000`.

---

## 6. Vercel Deployment Guide

This project is optimized for zero-configuration, 1-click deployment on **Vercel**.

### Step-by-Step Deployment:

1. **Push your code to GitHub** (see Git Push section below).
2. Go to the [Vercel Dashboard](https://vercel.com/new) and click **"Add New Project"**.
3. Select your repository: `RehanAslam2004/Pulse-41`.
4. Vercel will automatically detect **Next.js**:
   - **Framework Preset:** `Next.js`
   - **Root Directory:** `./`
   - **Build Command:** `next build` (or default)
   - **Output Directory:** `.next`
5. **Add Environment Variables:**
   Under **Project Settings -> Environment Variables**, add the keys from your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` (set to your Vercel production URL, e.g. `https://pulse-41.vercel.app`)
6. Click **Deploy**. Vercel will compile the application, optimize serverless functions, and generate edge routes.

---

## 7. Security & Governance

- **Credential Isolation:** The `SUPABASE_SERVICE_ROLE_KEY` is strictly accessed within server-only route handlers and never leaked to the client bundle.
- **Strict Headers:** Includes comprehensive Content-Security-Policy (CSP), Strict-Transport-Security (HSTS), X-Frame-Options (`SAMEORIGIN`), and X-Content-Type-Options (`nosniff`).
- **Input Sanitization:** API endpoints validate all incoming payloads before database execution.
- **Admin Access:** Administrative routes are protected by server-validated session tokens and HTTP-only cookies.

---

## 8. Governance & Documentation

- **Production Standards:** All routes, database schemas, and administrative interfaces are engineered to adhere to strict corporate security and performance specifications.
- **Brand Identity:** The official Pulse41 vector artwork and color tokens are embedded as native, scalable SVG primitives within the component system (`src/components/brand/PulseLogo.tsx`).
- **Internal Assets:** Full architectural specifications, audit logs, and master corporate profiles are managed under private organizational compliance governance.

---

## 9. License & Organization

Copyright © 2026 **Pulse41**. All rights reserved.
Unauthorized duplication, distribution, or reverse engineering of proprietary algorithms and visual architecture is strictly prohibited.
