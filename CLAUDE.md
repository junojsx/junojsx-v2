# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # start dev server (Vite HMR)
npm run build     # tsc type-check + Vite production build
npm run lint      # ESLint
npm run preview   # serve the production build locally
```

There are no tests configured.

## Architecture

Personal portfolio site — React 19, TypeScript, Vite, Tailwind CSS v4, ShadCN UI (new-york style).

**Routing** (`src/App.tsx`): React Router v7. Two routes — `/` (HomePage) and `/blog` (BlogPage) — both wrapped in a shared `Layout` that renders `Navbar` + `<Outlet>` + footer.

**Pages vs Sections**: Pages live in `src/pages/` and simply compose section components from `src/components/sections/`. `HomePage` stacks: `Home → TechStack → MoreAboutMe → Projects → Contact`. `BlogPage` renders from the blog data.

**Data layer** (`src/data/`): Static TypeScript files — `projects.ts`, `techStack.ts`, `blogPosts.ts`. No API calls. Adding content means editing these files. Blog posts are placeholders (comment in `blogPosts.ts` says "swap for CMS or MDX later").

**UI components** (`src/components/ui/`): ShadCN-generated primitives (Button, Card, Badge, Input, Textarea, Label, Separator). Add new ones via `npx shadcn@latest add <component>`.

**Path alias**: `@/` resolves to `src/` (configured in `vite.config.ts` and all three tsconfigs).

## Styling

Tailwind CSS v4 (CSS-first config — no `tailwind.config.ts` at runtime, everything in `src/index.css`).

**Brand palette** — use these Tailwind utilities directly:

| Utility | Hex |
|---|---|
| `deep-purple` | `#4E3C51` |
| `soft-lavender` | `#B6A5D0` |
| `soft-teal` | `#1A7A74` |
| `warm-gold` | `#E3C16F` |
| `dark-gray` | `#2C2C2C` |
| `light-gray` | `#F5F5F5` |
| `hover-active` | `#3A2D3B` |
| `input-focus` | `#A288BF` |
| `bronze` | `#94632F` |

**Fonts**: `Inter` (sans, body) and `Fraunces` (display/headings) — loaded via `@fontsource` packages, referenced as `font-sans` and `font-display`.

**Accessibility**: WCAG AA is a deliberate design goal. Skip-nav link (`.skip-link`), `#main-content` landmark with `tabIndex={-1}`, and global `:focus-visible` outline are already in place. Maintain these when adding new sections or interactive elements.

## ShadCN

Config in `components.json`. Style: `new-york`, icons: `lucide-react`, CSS variables enabled, no RSC.

## Sanity CMS

Studio lives in `./junojsx/` (scaffolded there — non-standard path). Run it with:

```bash
cd junojsx && npm run dev   # studio at http://localhost:3333
```

Project ID: `n5l953ie`, dataset: `production`. Schema is in `junojsx/schemaTypes/post.ts`.

The React app reads from Sanity via `src/lib/sanityClient.ts` (uses `VITE_SANITY_PROJECT_ID` from `.env`) and `src/lib/queries.ts` (GROQ). `SanityPost` type is in `src/types/index.ts`.
