# FORGED — Workout Program Browser
## Implementation Plan & Technical Specification

---

## Table of Contents

1. [Project Summary](#1-project-summary)
2. [Technology Stack](#2-technology-stack)
3. [Phase 1: Site Structure & Templates (Current)](#3-phase-1-site-structure--templates)
4. [Phase 2: Hosting & Deployment](#4-phase-2-hosting--deployment)
5. [Phase 3: AI Content Generation Pipeline](#5-phase-3-ai-content-generation-pipeline)
6. [File Structure Reference](#6-file-structure-reference)
7. [Content Schema Reference](#7-content-schema-reference)
8. [Template Specifications](#8-template-specifications)
9. [Customization Guide](#9-customization-guide)

---

## 1. Project Summary

**FORGED** is a static website that serves AI-generated monthly workout programs stored as Markdown files in a GitHub repository. Users browse by month, then by day, with each workout rendered as a clean, mobile-responsive page optimized for reading at the gym.

### Core Principles
- **Static-first**: Pure HTML output, zero client-side JavaScript by default — fast on any device
- **Content as code**: Workouts are Markdown files in Git, version-controlled and diffable
- **Mobile-optimized**: Every design decision prioritizes readability on a phone in a gym
- **AI-ready**: Folder structure and frontmatter schema designed for automated content generation
- **Free to host**: Built specifically for free-tier static hosting platforms

---

## 2. Technology Stack

| Layer | Technology | Version | Why |
|-------|-----------|---------|-----|
| **Framework** | Astro | 5.7+ | Content Collections, zero-JS output, file-based routing |
| **Styling** | Tailwind CSS | 4.1+ | Utility-first, mobile-responsive, works with DaisyUI |
| **Components** | DaisyUI | 5.5+ | Semantic component classes (btn, card, badge, etc.), built-in theming |
| **Typography** | Outfit + DM Sans | (Google Fonts) | Outfit for headings (bold, geometric), DM Sans for body (clean, readable) |
| **Content** | Markdown + Frontmatter | — | Simple to write manually or generate via AI |
| **Hosting** | Cloudflare Pages | Free tier | Unlimited bandwidth, global CDN, auto-deploy from Git |
| **Source control** | GitHub | Free | Repository for both code and content |
| **Automation** | n8n | Self-hosted or cloud | AI workflow: generate → format → commit to GitHub |

---

## 3. Phase 1: Site Structure & Templates

**Status: ✅ Complete — Included in this deliverable**

### What's Built

The project is a fully functional Astro site with 3 page templates, reusable components, a custom DaisyUI theme, and 7 sample workout Markdown files across 2 months.

### 3.1 Home Page (`/`)

**File**: `src/pages/index.astro`

**Renders:**
```
┌─────────────────────────────────────────┐
│  NAVBAR (sticky)     [Home] [Programs]  │
├─────────────────────────────────────────┤
│                                         │
│  [New] Feb 2026 programming is live     │
│                                         │
│  Your training.                         │
│  Programmed.                ← Hero H1   │
│                                         │
│  Structured monthly workout programs... │
│                                         │
│  [Start Current Program] [Browse All]   │
│                                         │
│  2 Programs  |  7 Workouts  |  100% Free│
│                                         │
├─────────────────────────────────────────┤
│  ALL PROGRAMS                           │
│                                         │
│  ┌──────────────────┐ ┌──────────────┐  │
│  │ ★ Latest         │ │              │  │
│  │ Feb 2026 —       │ │ Mar 2026 —   │  │
│  │ Hypertrophy Block│ │ Strength     │  │
│  │                  │ │ Foundation   │  │
│  │ Hypertrophy      │ │              │  │
│  │ 4 days | PPL+FB  │ │ Strength     │  │
│  │              →   │ │ 3 days | ULF │  │
│  └──────────────────┘ └──────────────┘  │
│                                         │
├─────────────────────────────────────────┤
│  FOOTER  © 2026 FORGED                  │
└─────────────────────────────────────────┘
```

**Key features:**
- Hero section with gradient background and dot pattern texture
- Pill badge showing the latest featured program
- CTA buttons linking to the featured month
- Stats strip (program count, workout count, free)
- Program cards ordered newest-first with phase badges and metadata
- Responsive: stacks to single column on mobile

**Data source:** Queries all content entries with `type: "month"`, sorts by `startDate` descending.

---

### 3.2 Month Overview Page (`/workouts/[month]/`)

**File**: `src/pages/workouts/[month]/index.astro`

**Renders:**
```
┌─────────────────────────────────────────┐
│  NAVBAR                                 │
├─────────────────────────────────────────┤
│  Home > February 2026         ← Crumbs │
├─────────────────────────────────────────┤
│                                         │
│  [Hypertrophy] [Push/Pull/Legs] [4 day] │
│                                         │
│  February 2026 — Hypertrophy Block      │
│  Build lean muscle mass with...         │
│                                         │
│  ── WORKOUT SCHEDULE ──                 │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │ [1] Push Day — Chest,Shoulders  │    │
│  │     Push | 65 min | intermediate│    │
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │ [2] Pull Day — Back, Biceps     │    │
│  │     Pull | 60 min | intermediate│    │
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │ [3] Leg Day — Quads, Hams       │    │
│  │     Legs | 70 min | intermediate│    │
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │ [4] Full Body — Compound Power  │    │
│  │     Full | 55 min | intermediate│    │
│  └─────────────────────────────────┘    │
│                                         │
│  ── PROGRAM DETAILS ──                  │
│  (Rendered Markdown from index.md)      │
│  - Program Overview                     │
│  - Training Split table                 │
│  - Key Principles                       │
│  - Nutrition Notes                      │
│                                         │
├─────────────────────────────────────────┤
│  FOOTER                                 │
└─────────────────────────────────────────┘
```

**Key features:**
- Phase/split/days badges in header
- Day cards in a 2-column grid (mobile: 1 column)
- Each card shows: day number, title, focus, duration, difficulty, muscle groups
- Below the schedule: full rendered Markdown from the month's `index.md`
- Cards link to individual day pages

**Data source:** Filters content by month folder slug, separates `type: "month"` (index) from `type: "day"` entries, sorts days by `dayNumber`.

---

### 3.3 Workout Day Page (`/workouts/[month]/[day]`)

**File**: `src/pages/workouts/[month]/[day].astro`

**Renders:**
```
┌─────────────────────────────────────────┐
│  NAVBAR                                 │
├─────────────────────────────────────────┤
│  Home > February 2026 > Day 1  ← Crumbs│
├─────────────────────────────────────────┤
│                                         │
│  [1]  Day 1                             │
│       Push Day — Chest, Shoulders       │
│                                         │
│  [Push] [65 min] [intermediate]         │
│                                         │
│  EQUIPMENT NEEDED                       │
│  [barbell] [dumbbells] [cable] [bench]  │
│                                         │
│  JUMP TO SECTION                        │
│  [Warm-Up] [Main Work] [Cooldown]       │
│                                         │
│  ──────────────────────────────────     │
│  ## Warm-Up (8 min)                     │
│  - Band pull-aparts: 2 × 15            │
│  - Arm circles: 30 sec each            │
│  ...                                    │
│  ──────────────────────────────────     │
│  ## Main Work                           │
│                                         │
│  ### A1. Barbell Bench Press            │
│  ┌──────┬──────┬────────┬─────┐         │
│  │ Sets │ Reps │ Rest   │ RPE │         │
│  ├──────┼──────┼────────┼─────┤         │
│  │ 4    │ 6-8  │ 2-3min │ 7-8 │         │
│  └──────┴──────┴────────┴─────┘         │
│  Cues: Retract shoulder blades...       │
│  ...                                    │
│  ──────────────────────────────────     │
│  ## Cooldown (5 min)                    │
│  ...                                    │
│                                         │
│  ┌──────────────┐ ┌──────────────┐      │
│  │ ← Previous   │ │ Next →       │      │
│  │ Back to Month│ │ Day 2: Pull  │      │
│  └──────────────┘ └──────────────┘      │
│                                         │
├─────────────────────────────────────────┤
│  FOOTER                                 │
└─────────────────────────────────────────┘
```

**Key features:**
- Large day number badge + title header
- Frontmatter metadata displayed as badges (focus, duration, difficulty)
- Equipment list in a highlighted card
- **Jump-to-section** navigation — renders clickable badges from `h2`/`h3` headings
- Full workout content rendered from Markdown with styled prose
- Exercise tables auto-styled via Tailwind Typography plugin
- **Prev/Next day navigation** at the bottom
- All sections have `scroll-margin-top` for sticky nav offset
- Max-width constrained to `3xl` (768px) for comfortable reading

**Data source:** Individual content entry rendered via `entry.render()`. Sibling days queried for prev/next navigation.

---

### 3.4 Shared Components

| Component | File | Used In | Purpose |
|-----------|------|---------|---------|
| **BaseLayout** | `layouts/BaseLayout.astro` | All pages | HTML shell, sticky nav, breadcrumbs, footer, theme toggle |
| **MonthCard** | `components/MonthCard.astro` | Home page | Card for each month program with phase badge, meta |
| **DayCard** | `components/DayCard.astro` | Month page | Card for each day with number, title, tags |
| **DayNav** | `components/DayNav.astro` | Day page | Prev/Next workout navigation |
| **TableOfContents** | `components/TableOfContents.astro` | Day page | Jump-to-section badges from headings |

### 3.5 Theming

Two custom DaisyUI themes are defined in `src/styles/global.css`:

- **`gym`** (light, default): Warm off-white base, coral/orange primary, slate blue secondary, teal accent
- **`gymdark`** (dark, auto): Deep slate base, brighter coral primary, same accent family

Theme toggle in the navbar uses `data-theme` attribute switching with `localStorage` persistence.

### 3.6 What to Tweak

| Want to change... | Edit this file | Look for... |
|---|---|---|
| Colors | `src/styles/global.css` | `@plugin "daisyui/theme"` blocks |
| Fonts | `src/styles/global.css` | Google Fonts import + `font-family` rules |
| Nav links | `src/layouts/BaseLayout.astro` | `<ul class="menu">` section |
| Hero text | `src/pages/index.astro` | `<h1>` and `<p>` in hero section |
| Card layout | `src/components/MonthCard.astro` | The whole component |
| Day page prose styling | `src/pages/workouts/[month]/[day].astro` | `prose-*` classes on `<article>` |
| Content schema | `src/content.config.ts` | Zod schema definition |

---

## 4. Phase 2: Hosting & Deployment

### 4.1 Recommended: Cloudflare Pages (Free)

**Why Cloudflare Pages:**
- Unlimited bandwidth (no other free platform offers this)
- 500 builds/month on free tier (more than enough)
- Global CDN with 300+ edge locations
- Automatic builds on every `git push`
- Free SSL and custom domains
- Zero configuration for Astro static output

**Setup Steps:**

1. **Push to GitHub**
   ```bash
   cd workout-program-browser
   git init
   git add .
   git commit -m "Initial commit — Astro + DaisyUI workout browser"
   git remote add origin https://github.com/YOUR_USERNAME/workout-program-browser.git
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com) → Workers & Pages → Create
   - Select "Pages" → Connect to Git → Authorize GitHub
   - Select your repository
   - Build settings:
     - **Framework preset**: Astro
     - **Build command**: `npm run build`
     - **Build output directory**: `dist`
   - Click "Save and Deploy"

3. **Custom Domain (optional)**
   - In Cloudflare Pages → Custom domains → Add domain
   - Follow DNS instructions (easiest if domain is already on Cloudflare)

**After setup, the workflow is:**
```
Edit/add Markdown files → git push → Cloudflare auto-builds → Site live in ~30 sec
```

### 4.2 Alternative: Netlify (Free)

If you prefer Netlify's UI/DX:
- 100GB bandwidth/month (free tier)
- Deploy previews on every pull request
- Same Git-based workflow
- Setup: [app.netlify.com](https://app.netlify.com) → New site from Git → Same build settings

### 4.3 Alternative: GitHub Pages (Free)

Simplest option, everything stays in GitHub:
- Add a GitHub Action for building (`.github/workflows/deploy.yml`)
- 100GB bandwidth/month
- Site at `username.github.io/repo-name`

---

## 5. Phase 3: AI Content Generation Pipeline

### 5.1 Architecture

```
┌──────────────┐     ┌───────────────┐     ┌──────────────┐     ┌──────────┐
│  n8n Trigger │────▶│  AI Generation│────▶│  Format &    │────▶│  GitHub  │
│  (Schedule   │     │  (Claude API) │     │  Split into  │     │  Commit  │
│   or Manual) │     │               │     │  MD files    │     │          │
└──────────────┘     └───────────────┘     └──────────────┘     └──────────┘
                                                                      │
                                                                      ▼
                                                               ┌──────────┐
                                                               │Cloudflare│
                                                               │  Pages   │
                                                               │  (auto   │
                                                               │  build)  │
                                                               └──────────┘
                                                                      │
                                                                      ▼
                                                               ┌──────────┐
                                                               │  Email   │
                                                               │  Alert   │
                                                               │ (optional)│
                                                               └──────────┘
```

### 5.2 n8n Workflow Design

**Nodes:**

1. **Schedule Trigger** — Runs on the 25th of each month (or manual)
2. **Set Variables** — Next month name, slug, training phase, user preferences
3. **AI Agent Node (Claude/GPT)**
   - System prompt with programming methodology, periodization principles, exercise database
   - Generates full month of workouts as structured JSON
4. **Code Node — Format to Markdown**
   - Parses AI JSON output
   - Creates `index.md` with month frontmatter and overview
   - Creates `Day1.md` through `DayN.md` with proper frontmatter
5. **GitHub Node — Create/Update Files**
   - Creates new folder `src/content/workouts/{month-slug}/`
   - Commits all files with message "Add {Month Year} programming"
   - Optionally: updates `featured: true` on new month, `featured: false` on old
6. **Email Node (optional)** — Sends notification that new programming is live

### 5.3 AI Prompt Design (Starter)

The AI prompt should specify:
- Training split (e.g., PPL, Upper/Lower, Full Body)
- Phase (Hypertrophy, Strength, Power, Endurance, Deload)
- Number of training days
- Available equipment
- Difficulty level
- Required frontmatter fields and format
- Markdown structure conventions (H2 for sections, H3 for exercises, tables for sets/reps)

**Example prompt structure:**
```
You are an expert strength and conditioning coach. Generate a complete
{phase} training program for {month} {year}.

Output format: JSON with this structure:
{
  "month": { ...frontmatter fields... , "content": "markdown string" },
  "days": [
    { ...frontmatter fields..., "content": "markdown string" },
    ...
  ]
}

Requirements:
- {totalDays} training days
- Split: {split}
- Equipment: {equipment list}
- Each day must include: Warm-Up, Main Work, Cooldown
- Exercises use tables with Sets, Reps, Rest, RPE columns
- Include coaching cues for each exercise
- Progressive overload from week to week
...
```

### 5.4 Homepage Updates for Featured Content

When the AI pipeline runs, it should:
1. Set `featured: true` on the new month's `index.md`
2. Set `featured: false` on any previously featured month
3. The homepage template already reads the `featured` flag to show the "Latest" badge and power the hero CTA

### 5.5 n8n Hosting Options

| Option | Cost | Pros |
|--------|------|------|
| n8n Cloud (free tier) | $0 | No setup, 5 workflows, limited executions |
| Self-hosted on a VPS | ~$5/mo | Full control, unlimited workflows |
| Self-hosted on Oracle Free Tier | $0 | Free ARM VM forever, enough for n8n |

---

## 6. File Structure Reference

```
workout-program-browser/
├── astro.config.mjs              ← Astro config (Tailwind vite plugin, MDX)
├── tsconfig.json                 ← TypeScript config with @/ alias
├── package.json                  ← Dependencies
│
├── public/
│   └── favicon.svg               ← Site favicon
│
├── src/
│   ├── content.config.ts         ← Content Collection schema (Zod)
│   │
│   ├── styles/
│   │   └── global.css            ← Tailwind + DaisyUI themes + fonts
│   │
│   ├── layouts/
│   │   └── BaseLayout.astro      ← HTML shell, nav, breadcrumbs, footer
│   │
│   ├── components/
│   │   ├── MonthCard.astro       ← Program card (home page)
│   │   ├── DayCard.astro         ← Workout day card (month page)
│   │   ├── DayNav.astro          ← Prev/Next navigation (day page)
│   │   └── TableOfContents.astro ← Jump-to-section badges (day page)
│   │
│   ├── pages/
│   │   ├── index.astro           ← Home page (hero + program list)
│   │   └── workouts/
│   │       └── [month]/
│   │           ├── index.astro   ← Month overview (schedule + details)
│   │           └── [day].astro   ← Individual workout day
│   │
│   └── content/
│       └── workouts/             ← CONTENT LIVES HERE
│           ├── feb-2026/
│           │   ├── index.md      ← Month overview
│           │   ├── day1.md       ← Day 1 workout
│           │   ├── day2.md       ← Day 2 workout
│           │   ├── day3.md       ← Day 3 workout
│           │   └── day4.md       ← Day 4 workout
│           └── mar-2026/
│               ├── index.md
│               ├── day1.md
│               ├── day2.md
│               └── day3.md
```

---

## 7. Content Schema Reference

### Month Index File (`index.md`)

```yaml
---
title: "February 2026 — Hypertrophy Block"  # Display title
type: "month"                                 # Must be "month"
month: "February 2026"                        # Human-readable month
monthSlug: "feb-2026"                         # URL slug (must match folder name)
totalDays: 4                                  # Number of day files
phase: "Hypertrophy"                          # Training phase
goal: "Build lean muscle mass..."             # One-line description
split: "Push / Pull / Legs / Full Body"       # Training split
startDate: "2026-02-01"                       # For sorting (YYYY-MM-DD)
featured: true                                # Show as "Latest" on homepage
---

Markdown content for the month overview...
```

### Day File (`day1.md`)

```yaml
---
title: "Push Day — Chest, Shoulders & Triceps"  # Display title
type: "day"                                       # Must be "day"
dayNumber: 1                                      # Sequential number
focus: "Push — Chest, Shoulders, Triceps"         # Short focus description
duration: "65 min"                                # Estimated duration
equipment: ["barbell", "dumbbells", "cable"]       # Required equipment
difficulty: "intermediate"                         # beginner | intermediate | advanced
muscleGroups: ["chest", "shoulders", "triceps"]   # Target muscles
---

Markdown content for the workout...
```

### Adding a New Month

1. Create folder: `src/content/workouts/{month-slug}/`
2. Add `index.md` with `type: "month"` frontmatter
3. Add `day1.md` through `dayN.md` with `type: "day"` frontmatter
4. Build or push to Git — pages are auto-generated

---

## 8. Template Specifications

### Design System

| Element | Specification |
|---------|--------------|
| **Heading font** | Outfit (Google Fonts) — weights 300–800 |
| **Body font** | DM Sans (Google Fonts) — weights 300–700 |
| **Primary color** | Warm coral/orange `oklch(0.65 0.2 25)` |
| **Secondary color** | Deep slate blue `oklch(0.45 0.05 250)` |
| **Accent color** | Bright teal `oklch(0.72 0.15 180)` |
| **Max content width** | `max-w-5xl` (1024px) for listings, `max-w-3xl` (768px) for reading |
| **Card style** | `bg-base-200` with `border-base-300`, hover: primary border glow |
| **Badge style** | DaisyUI badges with `badge-outline` for metadata |
| **Responsive breakpoints** | Mobile-first; `sm:` (640px), `md:` (768px), `lg:` (1024px) |

### Navigation Pattern
- Sticky navbar with blur backdrop
- Logo + text on left, menu links center (hidden on mobile), theme toggle + hamburger on right
- Breadcrumbs below navbar on inner pages
- Prev/Next day navigation at bottom of workout pages

### Mobile Considerations
- All cards stack to full-width below `sm:`
- Font sizes scale down appropriately
- Touch-friendly tap targets (44px minimum)
- Jump-to-section badges for quick navigation during workouts
- Equipment list prominently displayed before workout starts

---

## 9. Customization Guide

### Running Locally

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/workout-program-browser.git
cd workout-program-browser

# Install dependencies
npm install

# Start dev server
npm run dev
# → http://localhost:4321

# Build for production
npm run build

# Preview production build
npm run preview
```

### Adding Content Manually

1. Create a new month folder in `src/content/workouts/`
2. Follow the frontmatter schema from Section 7
3. Write workout content in standard Markdown
4. `npm run dev` to preview, `git push` to deploy

### Changing the Theme

Edit the `@plugin "daisyui/theme"` blocks in `src/styles/global.css`. DaisyUI uses OKLCH color space. Use [oklch.com](https://oklch.com) to pick colors.

### Changing Fonts

1. Pick fonts from [Google Fonts](https://fonts.google.com)
2. Update the `@import url(...)` in `global.css`
3. Update the `font-family` rules for `html` and headings

---

*This document and the accompanying source code represent the complete Phase 1 deliverable. Phase 2 (hosting) and Phase 3 (AI generation) can proceed independently.*
