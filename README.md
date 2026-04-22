# 🌿 Saison

> _"Ce que la terre donne, elle le donne à son heure."_

**Saison** is an open-source, seasonal produce discovery and gardening guide. It is designed to connect people to the natural rhythm of the earth — through what they eat and what they grow. It operates as a living calendar: the interface shifts with the seasons, the colours breathe with the months, and every interaction feels grounded.

## 🎨 Botanical Modernism

Saison relies on a bespoke design language we call "Botanical Modernism". It merges the structural clarity of modernist design (CSS Grids, strict typographic hierarchy) with the visual warmth of classical botanical illustrations.

- Seasonal colour transitions drive the UI.
- All visual elements run on highly-optimized, GPU-accelerated CSS animations.
- 100% custom SVG illustration library.

## 🚀 Tech Stack

Built for extreme performance, offline-capability, and minimal overhead.

- **Framework**: SvelteKit (Svelte 5 Runes)
- **Runtime & Tooling**: Bun (Lightning fast package manager & test runner)
- **Database**: SQLite (via `bun:sqlite` with local-first `.md` seed architecture)
- **Styling**: Vanilla CSS Variables (No Tailwind, fully bespoke theming)

## 🛠 Getting Started

To get the app running locally, make sure you have [Bun](https://bun.sh/) installed.

```sh
# 1. Install dependencies
bun install

# 2. Seed the database
# This reads the YAML frontmatter in `/data/produce` and builds your local SQLite database
bun run db:seed

# 3. Start the development server
bun run dev --open
```

## 📚 Contributing

Saison thrives as a collaborative encyclopedia. Adding new seasonal produce, herbs, or flowers is as simple as creating a single `.md` file! We don't require you to write UI code or migrations.

Please see our [CONTRIBUTING.md](CONTRIBUTING.md) for the exact YAML schema and guidelines on adding SVG illustrations.

## 📝 License

MIT License. Open source, forever.
