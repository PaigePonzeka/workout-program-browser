# FORGED — Workout Program Browser

A static website for browsing AI-generated monthly workout programs. Built with **Astro**, **Tailwind CSS v4**, and **DaisyUI v5**.

## 🚀 Quick Start

```bash
npm install
npm run dev      # → http://localhost:4321
npm run build    # Production build → dist/
```

## 🤖 AI-Powered Workflow

Workout programs are automatically generated using AI and processed through a dedicated workflow:

1. **Content Generation**: AI generates structured workout programs for each month
2. **File Creation**: The system creates Markdown files in the appropriate directory structure
3. **Auto-Processing**: The static site builder processes these files into optimized web pages
4. **Deployment**: Changes are automatically deployed via GitHub integration

## 📅 Adding a New Month (Manual Process)

While the AI workflow typically handles content creation, you can also add content manually:

1. Create a folder: `src/content/workouts/YYYY-MM/` (e.g., `2026-02` for February 2026)
2. Add `index.md` (type: "month") and `day1.md`, `day2.md`, etc. (type: "day")
3. Push to GitHub — site auto-rebuilds automatically

## 🛠️ Tech Stack

- **Astro 5** — Static site generator with Content Collections
- **Tailwind CSS 4** — Utility-first styling
- **DaisyUI 5** — Component library with custom theme
- **AI Workflow** — Automated content generation and processing
- **Outfit + DM Sans** — Typography (Google Fonts)
- **Cloudflare Pages** — Free hosting (recommended)

## 📚 Documentation

For detailed implementation details, including the AI workflow and content schema, see `docs/IMPLEMENTATION-PLAN.md`.
