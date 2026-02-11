# FORGED — Workout Program Browser

A static website for browsing AI-generated monthly workout programs. Built with **Astro**, **Tailwind CSS v4**, and **DaisyUI v5**.

## Quick Start

```bash
npm install
npm run dev      # → http://localhost:4321
npm run build    # Production build → dist/
```

## Adding a New Month

1. Create a folder: `src/content/workouts/YYYY-MM/` (e.g., `2026-02` for February 2026)
2. Add `index.md` (type: "month") and `day1.md`, `day2.md`, etc. (type: "day")
3. Push to GitHub — site auto-rebuilds

See `docs/IMPLEMENTATION-PLAN.md` for full documentation.

## Tech Stack

- **Astro 5** — Static site generator with Content Collections
- **Tailwind CSS 4** — Utility-first styling
- **DaisyUI 5** — Component library with custom theme
- **Outfit + DM Sans** — Typography (Google Fonts)
- **Cloudflare Pages** — Free hosting (recommended)
