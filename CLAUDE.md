# CLAUDE.md — Project Intelligence

> This file provides context and instructions for AI assistants (Claude, Copilot, Cursor, etc.) working on this codebase. Read this first before making any changes.

## 📖 Essential Reading

**Before doing ANY work on this project, read these files:**

1. **`docs/IMPLEMENTATION-PLAN.md`** — Full project spec: architecture, template wireframes, content schema, phase breakdown, hosting and AI pipeline details. This is the source of truth for what the project should look like and how it should behave.

2. **`docs/progress.md`** — Current implementation status. Check this to understand what's done, what's in progress, and what's next. **You must update this file after completing any task.**

3. **`src/content.config.ts`** — Content Collection schema. All Markdown frontmatter must conform to this Zod schema.

## 🏗️ Project Overview

**FORGED** is an end-to-end system for generating and browsing AI-created monthly workout programs. An n8n automation pipeline uses AI to generate CrossFit-style programs as structured JSON, converts them to Markdown, and commits them to GitHub. Cloudflare Pages auto-deploys on push, and users browse workouts on their phone at the gym.

- **Framework**: Astro 5 (static output, Content Collections, file-based routing)
- **Styling**: Tailwind CSS v4 + DaisyUI v5 (custom "gym" and "gymdark" themes)
- **Typography**: Outfit (headings) + DM Sans (body) via Google Fonts
- **Content**: Markdown with YAML frontmatter, validated by Zod schema
- **Hosting**: Cloudflare Pages (auto-deploys on git push)
- **AI Pipeline**: n8n workflow using GPT-4.1 to generate programs monthly

## 📁 Project Structure

```
workout-program-browser/
├── CLAUDE.md                  ← YOU ARE HERE
├── docs/
│   ├── IMPLEMENTATION-PLAN.md ← Full project spec (read first)
│   └── progress.md            ← Status tracking (update after every task)
├── reference/
│   ├── prompt.md              ← AI prompt reference/notes
│   └── n8n-workflow/
│       └── Forged - Workout Generator.json ← n8n pipeline definition
├── src/
│   ├── content.config.ts      ← Content Collection schema
│   ├── styles/global.css      ← Tailwind + DaisyUI themes + fonts
│   ├── layouts/
│   │   └── BaseLayout.astro   ← HTML shell, nav, breadcrumbs, footer
│   ├── components/
│   │   ├── MonthCard.astro    ← Program card (home page)
│   │   ├── DayCard.astro      ← Workout day card (month page)
│   │   ├── DayNav.astro       ← Prev/Next navigation (day page)
│   │   └── TableOfContents.astro ← Jump-to-section (day page)
│   ├── pages/
│   │   ├── index.astro        ← Home (hero + program list)
│   │   └── workouts/[month]/
│   │       ├── index.astro    ← Month overview
│   │       └── [day].astro    ← Individual workout day
│   └── content/workouts/      ← ALL WORKOUT CONTENT LIVES HERE
│       ├── frostbite-forge/
│       │   ├── index.md       ← Program overview (monthSlug, startDate, featured)
│       │   ├── polar-press-party.md  ← Day workout (dayNumber: 0)
│       │   └── ...
│       └── galactic-gains/
│           └── ...
├── astro.config.mjs
├── tailwind.config.mjs        ← (if created)
├── package.json
└── tsconfig.json              ← @/ alias maps to src/
```

## 🔧 Key Commands

```bash
npm install          # Install dependencies
npm run dev          # Dev server → http://localhost:4321
npm run build        # Production build → dist/
npm run preview      # Preview production build locally
```

## 📝 Rules & Conventions

### Content Rules
- **Month folders** use kebab-case program names: `frostbite-forge`, `galactic-gains`, etc.
- **Day files** use kebab-case workout names: `polar-press-party.md`, `glacial-gains.md`, etc.
- **Month index** is always `index.md` with `monthSlug` matching the folder name
- **`monthSlug`** frontmatter = program slug (kebab-case program name, not a date)
- **`startDate`** frontmatter = program start date in `YYYY-MM-DD` format
- **`featured: true`** — only one program should have this at a time; controls the homepage hero CTA
- **`dayNumber`** frontmatter = 0-indexed day ordering within the program
- All frontmatter fields must match the Zod schema in `src/content.config.ts`
- Day URLs resolve to `/workouts/{program-slug}/{workout-slug}` (e.g., `/workouts/frostbite-forge/polar-press-party`)

### Code Rules
- Use `@/` import alias for `src/` paths (configured in tsconfig.json)
- Astro components use `.astro` extension
- Interactive islands (if any) use React `.tsx` files
- DaisyUI class names preferred over raw Tailwind where a component exists (e.g., `btn` not custom button styles)
- Theme colors via DaisyUI semantic names (`primary`, `base-200`, etc.) — never hardcode hex/oklch in components
- All pages must use `BaseLayout.astro` and pass `breadcrumbs` prop for inner pages

### Styling Rules
- Heading font: `font-family: 'Outfit', sans-serif` — applied via `style` attribute or CSS
- Body font: `font-family: 'DM Sans', sans-serif` — set on `html` in global.css
- Prose/article content uses Tailwind Typography plugin classes (`prose`, `prose-sm`, etc.)
- Mobile-first: base styles are mobile, `sm:` / `md:` / `lg:` for larger screens
- Max content widths: `max-w-5xl` for listings, `max-w-3xl` for reading (day pages)

### Progress Tracking
- **After completing any task**, update `docs/progress.md`:
  - Move items from "In Progress" or "Up Next" to "Completed"
  - Add a dated entry to the changelog at the bottom
  - Note any decisions made or blockers discovered
- Keep entries concise — one line per item, with date

## ⚠️ Common Pitfalls

1. **DaisyUI v5 uses `@plugin` syntax**, not `require()` in a tailwind config. Themes are defined in CSS via `@plugin "daisyui/theme" { ... }`.
2. **Astro Content Collections** require the schema file at `src/content.config.ts` (not inside a `content/` subfolder in Astro 5).
3. **Dynamic route imports** — use `@/layouts/BaseLayout.astro` not relative paths like `../../` which break in nested `[month]/[day].astro` routes.
4. **Theme toggle** uses `data-theme` attribute on `<html>`, stored in `localStorage`. Both `gym` (light) and `gymdark` (dark) must be defined in global.css.
5. **The `featured` flag** on month index files controls which program shows as "Latest" on the homepage and powers the hero CTA. Only one month should have `featured: true` at a time.

## 🤖 AI Content Pipeline (n8n)

The n8n workflow at `reference/n8n-workflow/Forged - Workout Generator.json` automates monthly program generation:

1. **Schedule Trigger** — Fires monthly
2. **GPT-4.1 API Call** — Sends a detailed system prompt requesting a CrossFit-style, 4-week, 4-5 day/week program as structured JSON. Includes themed naming, scaling options, week-over-week progression, equipment constraints, and accessibility rules (no gymnastics movements as primary exercises)
3. **Parse Response** — Extracts JSON from API output
4. **Convert to Markdown** — Transforms JSON into `index.md` (program overview) + individual day `.md` files with proper frontmatter and slug-based filenames
5. **Slug Collision Check** — Lists existing program folders on GitHub, appends `-2`, `-3` etc. if slug already exists
6. **Commit to GitHub** — Creates files via GitHub API (index.md first, then each day file)
7. **Trigger Mailer** — Calls a separate "Forged - Mailer" n8n workflow to send email notification

Once committed, Cloudflare Pages auto-builds and the new program appears on the site.

## 🚀 Implementation Phases

See `docs/IMPLEMENTATION-PLAN.md` for full details. Summary:

| Phase | Status | Description |
|-------|--------|-------------|
| **Phase 1** | ✅ Complete | Site structure, 3 templates, components, theme, sample content |
| **Phase 2** | 🔲 Not started | Deploy to Cloudflare Pages, custom domain |
| **Phase 3** | ✅ Complete | n8n + AI pipeline: auto-generate workouts → commit to GitHub → email alert |

Check `docs/progress.md` for granular task-level status.
