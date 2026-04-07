# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server (Turbopack) at localhost:3000
npm run build    # Production build
npm run start    # Serve production build
npm run lint     # ESLint (flat config, ESLint 9)
```

Playwright is installed for testing (`npx playwright test`), but there is no test suite yet.

## Architecture

**Fluxel** is a Serbian web agency landing page (`fluxel.rs`) built with Next.js 16.2.1, React 19, and Tailwind CSS 4.

### Key structure

- **`app/page.tsx`** (~1400 lines) — The entire landing page as a single `"use client"` component. Contains all sections (hero, services, pricing, contact form, footer), animation helpers (`FadeIn`, `SlideIn`, `ScaleIn`, `MagneticWrap`), a floating CTA, and inline SVG social icons. All content is in Serbian.
- **`app/layout.tsx`** — Root layout. Sets `lang="sr"`, dark bg, and SEO metadata for `fluxel.rs`.
- **`app/globals.css`** — Design system via CSS variables. Fonts: Archivo (headings) and Space Grotesk (body) loaded from Google Fonts. Uses shadcn-style token naming (`--primary`, `--card`, etc.).
- **`components/ui/ethereal-beams-hero.tsx`** — 3D WebGL hero background using Three.js (`@react-three/fiber` + `@react-three/drei`) with custom shader material extension. Dynamically imported with `ssr: false`.
- **`components/ui/button.tsx`, `badge.tsx`, `card.tsx`** — shadcn/ui-style components using `class-variance-authority`.
- **`lib/utils.ts`** — `cn()` utility (clsx + tailwind-merge).
- **`app/instagram/page.tsx`** — Instagram post template generator with export functionality.

### Key patterns

- **Framer Motion everywhere**: All scroll animations use `whileInView` with `viewport={{ once: true }}`. Custom easing: `[0.16, 1, 0.3, 1]` and `naturalEase = [0.22, 1, 0.36, 1]`.
- **Brand color**: `cyan-400` (#22d3ee) is the primary accent throughout.
- **Path alias**: `@/*` maps to project root.
- **No API routes or server components** — the main page is entirely client-rendered.
