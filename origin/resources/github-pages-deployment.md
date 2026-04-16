# Modern GitHub Pages Deployment via GitHub Actions

This document outlines the modern strategy for deploying a web application (like a Vite or React app) to GitHub Pages.

> [!info] Modern Approach
> Historically, GitHub Pages deployments relied on pushing built assets to a special `gh-pages` branch. The modern approach uses GitHub Actions with dedicated `configure-pages`, `upload-pages-artifact`, and `deploy-pages` actions. This avoids cluttering your repository with compiled code and handles the deployment securely via tokenless OIDC authentication directly to the GitHub Pages environments.

## Benefits of the Modern Approach
- **No `gh-pages` branch required**: Your repository stays clean.
- **Better Security**: Uses `permissions: pages: write` and `id-token: write` instead of Personal Access Tokens (PATs).
- **Native Environment Support**: Natively integrates with GitHub Environments.
- **Faster**: Skips the git commit/push step entirely; simply uploads a tarball artifact.
- **Concurrency Control**: Built-in mechanisms to cancel outdated in-progress deployments.

## Prerequisites
1. Ensure your repository has GitHub Pages enabled and its source is set to **GitHub Actions** (Repository Settings > Pages > Source > GitHub Actions).
2. If using Vite, configure your `base` path in `vite.config.ts` if deploying to a project site (e.g., `base: '/repo-name/'`).

## The Workflow File

Below is a reference deployment workflow. You can place this file in `.github/workflows/deploy.yml`.

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ] # Or your default branch
  workflow_dispatch:   # Allows manual triggering

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      # --- Choose exactly ONE package manager setup below ---

      # Option A: using npm (Node.js)
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
          # Update path to your package-lock.json if it is in a subdirectory
          cache-dependency-path: package-lock.json 

      - name: Install dependencies (npm)
        run: npm ci

      - name: Build project (npm)
        run: npm run build

      # Option B: using Bun
      # - name: Setup Bun
      #   uses: oven-sh/setup-bun@v1
      #   with:
      #     bun-version: latest
      #
      # - name: Install dependencies (Bun)
      #   run: bun install
      #
      # - name: Build project (Bun)
      #   run: bun run build

      # ----------------------------------------------------

      - name: Setup Pages
        uses: actions/configure-pages@v4


      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          # Path to the build output directory (e.g., './dist' for Vite, './build' for CRA)
          path: './dist' 

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## How to Adapt for Your Project
,
1. **Working Directory**: If your frontend code is nested inside a subfolder (e.g., `frontend/`), add `working-directory: frontend` to the `npm ci` and `npm run build` steps, and update the `cache-dependency-path` and `path` for the artifact respectively.
2. **Environment Variables**: Add necessary secrets to the `env` section of the build step if your project requires environment variables during the build phase (e.g., Supabase keys).
3. **Build Command/Output Path**: Ensure `run: npm run build` matches your package.json scripts and `path: './dist'` points precisely to where your bundler outputs the static files.
