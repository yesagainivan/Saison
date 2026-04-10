# Contributing to Saison

We are building an incredible open-source botanical database. Here is how you can help add more produce!

## 1. The Data Schema

Every piece of produce is a Markdown file inside `data/produce/`. The file must contain YAML Frontmatter which strictly adheres to this schema:

```yaml
---
id: string             # Unique identifier (e.g. cherry-tomato)
name: string           # English name
name_fr: string        # (Optional) French name
category: string       # Enum: fruit | vegetable | herb | flower
featured: boolean      # Set to true if it should span 2 columns in the grid
description: string    # A short, romantic, encyclopedic blurb 
season_start: integer  # 1-12 (Month)
season_end: integer    # 1-12 (Month)
planting_start: int    # 1-12 (Month)
planting_end: int      # 1-12 (Month)
harvest_start: int     # 1-12
harvest_end: int       # 1-12
hemisphere: string     # Enum: northern | southern
zone_offset: integer   # Default 0
colors: [string]       # JSON array of 2 hex codes i.e. ["#FFAA00", "#FF0000"]
companions: [string]   # JSON array of companion IDs
avoid: [string]        # JSON array of IDs to avoid planting near
illustration: string   # Name of the SVG file in /static/illustrations/
---

[Any markdown body content goes here to be rendered below the hero block]
```

## 2. Illustrations (SVG strictly)

To maintain the **Botanical Modernism** aesthetic, we only accept cleanly charted `SVG` line drawings.
- **No rasters**: Do not include `.png`, `.webp`, or `.jpg` items.
- **No `<image>` embedded blobs**: Keep SVG paths mathematically explicit inside the `.svg` file. 
- Try to construct your SVG around a `100x100` viewBox with `stroke-width="2"` and `fill="none"` to match the existing line-art encyclopedia style.
