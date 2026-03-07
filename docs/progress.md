# FORGED — Progress Tracker

> This file tracks the implementation status of the Workout Program Browser.
> Updated after each completed task. See `IMPLEMENTATION-PLAN.md` for full spec.

---

## Current Status

**Active Phase**: Phase 1 — Site Structure & Templates
**Last Updated**: 2026-03-06
**Pipeline Status**: Exercise diversity + seasonal theming pipeline added
**Build Status**: ✅ Passing (20 pages generated)

---

## Phase 1: Site Structure & Templates ✅

### Completed

- [x] Initialize Astro 5 project with TypeScript strict mode — _2026-02-09_
- [x] Install and configure Tailwind CSS v4 + DaisyUI v5 — _2026-02-09_
- [x] Define Content Collection schema (`src/content.config.ts`) — _2026-02-09_
- [x] Create custom DaisyUI themes: `gym` (light) and `gymdark` (dark) — _2026-02-09_
- [x] Set up Google Fonts: Outfit (headings) + DM Sans (body) — _2026-02-09_
- [x] Build `BaseLayout.astro` with sticky nav, breadcrumbs, footer, theme toggle — _2026-02-09_
- [x] Build `MonthCard.astro` component (home page program cards) — _2026-02-09_
- [x] Build `DayCard.astro` component (month page workout cards) — _2026-02-09_
- [x] Build `DayNav.astro` component (prev/next workout navigation) — _2026-02-09_
- [x] Build `TableOfContents.astro` component (jump-to-section badges) — _2026-02-09_
- [x] Build Home page: hero section, stats strip, program listing grid — _2026-02-09_
- [x] Build Month Overview page: header, day cards grid, rendered program details — _2026-02-09_
- [x] Build Workout Day page: metadata badges, equipment list, TOC, prose content, prev/next nav — _2026-02-09_
- [x] Create sample content: Feb 2026 (4 days, Hypertrophy) — _2026-02-09_
- [x] Create sample content: Mar 2026 (3 days, Strength) — _2026-02-09_
- [x] Verify production build passes (10 pages, 0 errors) — _2026-02-09_
- [x] Create `CLAUDE.md` project intelligence file — _2026-02-09_
- [x] Create `docs/IMPLEMENTATION-PLAN.md` full specification — _2026-02-09_
- [x] Create `docs/progress.md` status tracker — _2026-02-09_
- [x] Add 404 page with fitness-themed messaging — _2026-02-09_

### Remaining

- [ ] Visual QA in browser (desktop + mobile)
- [ ] Lighthouse performance audit
- [ ] Test dark mode across all pages

---

## Phase 2: Hosting & Deployment 🔲

### Up Next

- [ ] Create GitHub repository
- [ ] Push codebase to GitHub
- [ ] Connect repository to Cloudflare Pages
- [ ] Configure build settings (command: `npm run build`, output: `dist`)
- [ ] Verify automatic deployment on push
- [ ] Set up custom domain (optional)
- [ ] Verify SSL/HTTPS
- [ ] Test deployed site on mobile device

### Stretch Goals

- [ ] Add `robots.txt` and `sitemap.xml`
- [ ] Set up Cloudflare Web Analytics (free, privacy-friendly)
- [ ] Configure cache headers for static assets
- [ ] Add Open Graph meta tags for social sharing

---

## Phase 3: AI Content Generation Pipeline 🔲

### Up Next

- [ ] Design AI system prompt for workout generation
- [ ] Test prompt manually with Claude to iterate on output quality
- [ ] Define JSON output schema for AI response
- [ ] Build n8n workflow: Schedule Trigger → AI Node → Code Node → GitHub Node
- [ ] Create Code Node logic: parse AI JSON → format Markdown files with frontmatter
- [ ] Configure GitHub Node: create folder, commit files, push
- [ ] Test end-to-end: trigger workflow → new month appears on site
- [ ] Add email notification node (optional)

### Homepage Enhancements for Phase 3

- [ ] Auto-update `featured: true` flag on newest month
- [ ] Add "Latest Program" hero section that dynamically shows current month
- [ ] Consider adding a "Coming Soon" preview for next month

### Stretch Goals

- [ ] Add exercise demonstration links (YouTube/image URLs in frontmatter)
- [ ] Build a rest timer React island component
- [ ] Add PWA manifest for offline gym use
- [ ] Implement workout completion tracking (localStorage)
- [ ] Add search across all exercises
- [ ] Print-friendly CSS for individual day pages
- [ ] Dark mode auto-detection (prefers-color-scheme)

---

## Decisions Log

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-02-09 | Chose Astro over Next.js | Content-first, zero JS by default, Content Collections perfect for Markdown workouts |
| 2026-02-09 | Chose DaisyUI v5 over plain Tailwind | Semantic component classes speed up development; built-in theming system |
| 2026-02-09 | Chose Cloudflare Pages over Netlify | Unlimited free bandwidth vs 100GB cap; faster global CDN |
| 2026-02-09 | Custom themes over built-in DaisyUI themes | Needed warm, energetic palette (coral/teal) that doesn't exist in defaults |
| 2026-02-09 | Outfit + DM Sans fonts | Outfit is bold/geometric for headings (gym energy), DM Sans is clean/readable for body text at the gym |
| 2026-02-09 | Max-width `3xl` for day pages | Optimized for reading on phones; long lines are hard to read while exercising |
| 2026-02-09 | `@/` import alias | Prevents broken relative imports in deeply nested dynamic routes like `[month]/[day].astro` |

---

## Changelog

### 2026-03-06 — Exercise Diversity & Seasonal Theming Pipeline

- Added 5 new n8n workflow nodes to pre-process inputs before the main GPT-4.1 workout generation call:
  - **Generate Theme** (GPT-4.1-mini): Picks a holiday/seasonal theme for the current month (e.g., "March Madness", "Summer Solstice")
  - **Fetch Exercise Catalogue** (HTTP Request): Fetches 800+ exercises from free-exercise-db (public domain JSON)
  - **Filter Exercises** (Code): Filters catalogue by available equipment (barbell, dumbbell, bodyweight, kettlebells, bands)
  - **Select Exercises** (GPT-4.1-mini): AI curates specific strength lifts for push/pull/leg days from the catalogue
  - **Prepare Prompt Context** (Code): Extracts theme and exercise selections into clean JSON for the main prompt
- Modified main GPT-4.1 prompt:
  - Replaced generic theme guidance with injected seasonal theme as a Hard Rule
  - Added "Prescribed Exercises" section — primary strength lifts are now mandated per day type
  - Strengthened Gymnastics & Accessibility Rule — no more "rotate between" soft language
- Workflow flow: `Set Mode → Generate Theme + Fetch Catalogue (parallel) → Filter → Select → Prepare Context → Message a model`
- Updated `reference/prompt.md` to document the full pipeline, exercise pools, and theme injection mechanism
- **Decision**: Used free-exercise-db static JSON over wger.de API (simpler single HTTP call, all data included with names)
- **Decision**: GPT-4.1-mini for theme and exercise selection (cheap, fast, sufficient for simple curation tasks)
- **Decision**: Strength lifts only for AI prescription; conditioning/metcon movements stay in main prompt's creative control

### 2026-03-06 — Staging Environment for n8n Workflow

- Added `test-workouts` content collection with shared schema (`src/content.config.ts`)
- Created `src/content/test-workouts/` folder for test-generated programs
- Built 3 new test route pages under `src/pages/test/`: listing, month overview, and day detail
- Test programs are completely isolated from production — hidden from homepage, accessible at `/test/`
- Updated n8n workflow (`reference/n8n-workflow/Forged - Workout Generator.json`):
  - Added Manual Trigger with staging/production mode dropdown
  - Added Set Mode node to determine content path (`src/content/workouts` vs `src/content/test-workouts`)
  - Updated all GitHub commit nodes to use dynamic content path
  - Added "Should Send Email?" IF node to skip mailer in staging mode
  - Code in JavaScript1 now conditionally sets `featured: true` only in production mode
- **Decision**: Separate content folder approach over branch-based or flag-based staging — cleanest isolation with zero impact on production pages
- Build verified: 35+ pages, 0 errors

### 2026-02-21 — Replace Pull-Ups with Beginner-Friendly Alternatives

- Replaced pull-up exercises in 3 workout files with beginner-accessible movements (DB rows, lat pull-downs, inverted barbell rows)
- `glacial-grip-and-rip.md`: scap pull-ups → band pull-aparts (warm-up); weighted pull-ups → single-arm DB rows (strength); pull-ups → banded lat pull-downs (metcon); updated coaching notes and week progressions
- `snow-plow-pulls.md`: weighted pull-ups → lat pull-down close grip (strength); updated coaching notes
- `snowdrift-sled-pull.md`: pull-ups EMOM → inverted barbell rows; updated scaling, coaching notes, and week progression
- Updated n8n AI prompt: pull-ups removed from Strength examples, added `### Gymnastics & Accessibility Rule` section prohibiting gymnastics movements as primary exercises and specifying beginner-friendly pulling alternatives
- Build verified: 20 pages, 0 errors; only remaining "pull-up" reference is the cool-down lat stretch (appropriate)

### 2026-02-21 — Name-Based URL Slugs (Programs + Days)

- Migrated 3 program folders from date-based names (`2026-02`, `2026-02-18`, `2026-02-19`) to program-name slugs (`frostbite-fat-loss-fiesta`, `frostbite-furnace`, `frostbite-forge`)
- Renamed 15 day files from `day0.md`/`day1.md` etc. to workout-name slugs (e.g., `polar-press-party.md`)
- Added `startDate`, `featured`, and `dayNumber` fields to Zod schema (`src/content.config.ts`)
- Updated all frontmatter: `monthSlug` now matches folder name (not a date), added `startDate`, set `featured: true` only on `frostbite-forge`
- Fixed formatting bug in day files (added newline after closing `---`)
- Removed stale `slug: "undefined"` field from `frostbite-forge/polar-press-party.md`
- Updated `index.astro`: sorts by `startDate`, detects featured via `featured` flag
- Updated `[month]/index.astro`: day filtering by `dayNumber` frontmatter, name-based day URLs, `datePublished` from `startDate`
- Updated `[month]/[day].astro`: `getStaticPaths` uses file slugs, all nav URLs are name-based
- Updated `MonthCard.astro`: switched to `getUrl()` helper
- Updated `CLAUDE.md`: naming conventions now reflect name-based slug system
- Updated `reference/n8n-workflow/Forged - Workout Generator.json`: added `programming.slug` and `workout.slug` to AI prompt, updated JS code (slugify + `dayNumber`), added `List Existing Programs` and `Resolve Unique Slug` nodes for collision detection, updated GitHub file paths to use slugs
- **Decision**: Programs sorted by `startDate` (newest first) instead of `monthSlug` string compare
- **Decision**: Day ordering driven by `dayNumber` frontmatter field (0-indexed), not filename pattern

### 2026-02-09 — Initial Build (Phase 1 Complete)

- Scaffolded Astro 5 project with TypeScript, Tailwind CSS v4, DaisyUI v5
- Built all 3 page templates (Home, Month Overview, Workout Day) with full responsive design
- Created 5 reusable components (BaseLayout, MonthCard, DayCard, DayNav, TableOfContents)
- Defined custom light/dark DaisyUI themes with warm coral/teal palette
- Added 7 sample workout Markdown files across 2 months (Feb + Mar 2026)
- Verified clean production build: 10 pages, 0 errors, ~2.6s build time
- Created project documentation: CLAUDE.md, IMPLEMENTATION-PLAN.md, progress.md
- **Added custom 404 page** with fitness-themed messaging, dumbbell icons, and motivational copy
