# Thanvanth AT — Portfolio

Cinematic portfolio for **Thanvanth AT — Game Developer + AI Engineer**.
Next.js (App Router) · React · TypeScript · Tailwind CSS 4 · Framer Motion · GSAP ScrollTrigger · React Three Fiber.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (static)
npm run lint && npm run typecheck && npm run format:check
```

## Before deploying

Edit `data/site.ts`:

- `url`: the deployed domain (used for canonical URLs, OG image and sitemap)

Project facts (status, engine, technologies) live in `data/projects.ts`. They are written conservatively, so update them as projects move along.

## Writing a blog post

Add an entry to `data/posts.ts`: a unique `slug`, an ISO `date`, `tags`, an `excerpt` and a `body` made of typed
blocks (`p`, `h2`, `h3`, `list`, `quote`, `code`, `callout`; see `PostBlock` in `lib/types.ts`). Posts are sorted by
date automatically and appear on `/blog`, the home page "Writing" section, the sitemap and the RSS feed.
Set `draft: true` to hide a post while you work on it.

## Structure

```
app/                 routes: home, /projects/[slug] case studies, /blog + /blog/[slug] posts,
                     /blog/feed.xml (RSS), OG image, sitemap, robots
components/
  layout/            Navbar, Footer, Loader, CursorInteraction, PageTransition
  sections/          Hero (+ HeroScene WebGL), About, Experience, ProjectShowcase, GameDev,
                     Unreal, AI, FreshcoFeature, BrainverseFeature, Skills/TechStack, Process, Contact
  blog/              PostCard, PostBody (renders typed post blocks), BlogIndex (tag filter)
  projects/          GameProject, AIProject, ProjectModal, ProjectMeta, CaseStudy
  visuals/           procedural SVG key art, Blueprint graph, scanner demo, adaptive mini-game
  ui/                RevealText, WordReveal, MagneticButton, Pipeline, Marquee, ...
data/                all portfolio content (typed)
lib/                 types, hooks, utils, GSAP registration
styles/globals.css   design tokens (Tailwind @theme) and global styles
legacy/              the previous single-file template, kept for reference
```

## Design notes

- **Type:** Archivo in condensed (`wdth 62`) and wide cuts for display, Inter Tight for body, JetBrains Mono for metadata.
- **Color:** ink, off-white and steel. Each project brings its own accent/atmosphere (`atmosphere` in `data/projects.ts`).
- **Key art:** project visuals are procedural SVG (`components/visuals/ProjectVisual.tsx`), so there are no heavy image downloads. To use real captures, put them in `/public` and swap them in with `next/image`.
- **Motion:** everything respects `prefers-reduced-motion`. The WebGL hero loads after first paint, pauses when it is off-screen, and runs lighter on mobile. GSAP loads lazily and only pins the Game Dev sequence on desktop.
- **Cursor:** desktop only. Add `data-cursor="hover|view|drag|explore"` (and optionally `data-cursor-label`) to any element.
