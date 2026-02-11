# CLAUDE.md — Project Intelligence

> This file provides context and instructions for AI assistants (Claude, Copilot, Cursor, etc.) working on this codebase. Read this first before making any changes.

## 📖 Essential Reading

**Before doing ANY work on this project, read these files:**

1. **`docs/IMPLEMENTATION-PLAN.md`** — Full project spec: architecture, template wireframes, content schema, phase breakdown, hosting and AI pipeline details. This is the source of truth for what the project should look like and how it should behave.

2. **`docs/progress.md`** — Current implementation status. Check this to understand what's done, what's in progress, and what's next. **You must update this file after completing any task.**

3. **`src/content.config.ts`** — Content Collection schema. All Markdown frontmatter must conform to this Zod schema.

## 🏗️ Project Overview

**FORGED** is a static website for browsing AI-generated monthly workout programs. Workouts are stored as Markdown files in `src/content/workouts/`, organized by month and day.

- **Framework**: Astro 5 (static output, Content Collections, file-based routing)
- **Styling**: Tailwind CSS v4 + DaisyUI v5 (custom "gym" and "gymdark" themes)
- **Typography**: Outfit (headings) + DM Sans (body) via Google Fonts
- **Content**: Markdown with YAML frontmatter, validated by Zod schema
- **Hosting target**: Cloudflare Pages (free tier)

## 📁 Project Structure

```
workout-program-browser/
├── CLAUDE.md                  ← YOU ARE HERE
├── docs/
│   ├── IMPLEMENTATION-PLAN.md ← Full project spec (read first)
│   └── progress.md            ← Status tracking (update after every task)
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
│       ├── feb-2026/
│       │   ├── index.md       ← Month overview (type: "month")
│       │   ├── day1.md        ← Day workout (type: "day")
│       │   └── ...
│       └── mar-2026/
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
- **Month folders** use lowercase kebab-case: `feb-2026`, `mar-2026`, etc.
- **Day files** are lowercase: `day1.md`, `day2.md`, etc. (sequential, no gaps)
- **Month index** is always `index.md` with `type: "month"` in frontmatter
- **Day files** always have `type: "day"` and a sequential `dayNumber`
- All frontmatter fields must match the Zod schema in `src/content.config.ts`
- Day URLs resolve to `/workouts/{month-slug}/day{N}` (e.g., `/workouts/feb-2026/day1`)

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

## 🚀 Implementation Phases

See `docs/IMPLEMENTATION-PLAN.md` for full details. Summary:

| Phase | Status | Description |
|-------|--------|-------------|
| **Phase 1** | ✅ Complete | Site structure, 3 templates, components, theme, sample content |
| **Phase 2** | 🔲 Not started | Deploy to Cloudflare Pages, custom domain |
| **Phase 3** | 🔲 Not started | n8n + AI pipeline: auto-generate workouts → commit to GitHub → email alert |

Check `docs/progress.md` for granular task-level status.
