# 🗓 Saison — Roadmap

---

## Phase 1 — The Seasonal Gallery *(MVP)*

The core loop: a beautiful, living calendar that tells you what is in season right now, using the new "Botanical Modernism" aesthetic.

### Infrastructure & Data Layer
- [x] Initialise SvelteKit project with Bun as runtime (`bun create svelte@latest`)
  - Ensure Svelte 5 is configured for the modern Runes API (`$state`, `$derived`, `$props`).
- [x] Configure `bun:sqlite` integration in SvelteKit server routes (`+page.server.ts`)
- [x] Set up project structure: `/data/produce/`, `/src/lib/db/`, `/src/lib/tokens/`, `/static/illustrations/`
- [x] Write and document YAML frontmatter schema (`CONTRIBUTING.md`) with the new `featured` and `illustration` fields
- [x] Write `bun run seed` ingestion script to parse Markdown into SQLite
- [x] Add `bun run seed` to `postinstall` so the DB is always fresh on setup

### Design System & "Botanical Modernism"
- [x] Define `tokens.css`: seasonal CSS custom properties for all 4 seasons with per-month palette interpolation
- [x] Define `reset.css` and base typography (serif display + neutral sans)
- [x] Implement the subtle paper texture (CSS-only noise pattern) for the main background and card surfaces
- [x] Build the core component library using Svelte 5 Runes and Snippets:
  - `<ProduceCard />` — curated grid card with SVG illustration, colour strip, soft shadow, and categorical grouping
  - `<TemporalMap />` — SVG 12-month timeline bar
  - `<SeasonWheel />` — the circular month navigator
  - `<CategoryBadge />` — pill for fruit / vegetable / herb / flower

### The Wheel & Layout
- [x] Build `<SeasonWheel />` as an SVG-based circular month selector
- [x] Ensure wheel scales gracefully on mobile displays
- [x] Season-aware palette transition on month change (700ms CSS transition on tokens)
- [x] Keyboard accessible (arrow keys, Enter to select) + touch drag support
- [ ] Screen-reader accessibility with `aria-label` and `aria-current`
- [x] Implement the curated CSS Grid layout: grouped by category, with `featured: true` items spanning 2 columns, and staggered entrance animations.

### Views & Content
- [x] `/` — landing page, defaults to current month, renders category-grouped produce grid
- [x] `/month/[month]` — same view for any month (1–12)
- [x] `/produce/[id]` — detail page with Temporal Map, prose, and botanical illustration hero
- [x] Seed the database with **50 common fruits and vegetables** (northern hemisphere)
- [x] Commission/source basic SVG botanical line drawings for all Phase 1 produce

---

## Phase 2 — The Gardener's Clock & Ecosystem

Add the time dimension and permaculture layering.

- [x] Extend YAML schema with `planting_start`, `planting_end` (sowing logic)
- [x] Build filter views: "What should I plant or tend right now?" *(Implemented via Harvest vs Sow pills on the main grid)*
- [x] Create persistent local state layer so users can track what they have actively planted ("My Garden")
- [x] Integrate `companions` and `avoid` matrices into the schema
- [x] Implement the Ecosystem Constellation grid visualizer showing relationships dynamically
- [ ] Add `zone_offset` logic: UI control to shift all dates by ±N weeks for local climate
- [ ] Add `hemisphere` toggle (northern / southern) — flips month mapping by 6

---

## Phase 3 — PWA & Offline Access

Take the app into the garden natively.
- [ ] PWA manifest + service worker: offline mode for use in the garden
- [ ] Cache current month's data and all detail pages visited

---

## Phase 4 — Community, API & Growth

Open it up.

- [ ] Formalise `CONTRIBUTING.md`: step-by-step guide to adding a new produce entry or SVG illustration via PR
- [ ] Add CI validation: GitHub Action that runs the seed script and checks for schema errors on every PR
- [ ] Prerendering optimization: configure SvelteKit adapter-static for maximum performance where SSR forms are not required
- [ ] Introduce **ElysiaJS** as a standalone public API layer (`/api/v1/`) for third-party access (if a mobile app or integrations are built)
- [ ] Internationalisation (i18n): French and English as first two locales, schema supports `name_fr`
- [ ] Add `region` presets: "Northern France", "Mediterranean", "British Isles", etc. — preconfigured `zone_offset` values

---

## Principles to Maintain Across All Phases

- **Data first**: never ship a UI feature without the data to populate it.
- **Contributor-friendly**: every new schema field must be documented in `CONTRIBUTING.md` before merging.
- **No framework drift**: resist adding React, Tailwind, or a component library. The bespoke CSS is part of the identity. Svelte 5 and vanilla CSS are all you need.
- **Botanical Coherence**: any new view must respect the CSS grid constraints, typography, illustration style, and the seasonal token system.
- **Accessibility is not optional**: every interactive element must be keyboard-navigable and handle `prefers-reduced-motion` before a PR merges.
