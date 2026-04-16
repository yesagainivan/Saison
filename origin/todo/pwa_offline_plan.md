# Phase 3: The Offline PWA Architecture

To use Saison out in a garden where cellular service is zero, the application must natively store its assets, layouts, and data directly onto the user's mobile device via a Service Worker. 

Based on 2026 best practices for SvelteKit PWA integration (`@vite-pwa/sveltekit`), we must make a foundational architectural shift to facilitate this.

## The Architectural Challenge
Currently, our `bun:sqlite` database is strictly server-side. When you navigate to `/produce/basil`, SvelteKit attempts to hit the Node server to run `SELECT * FROM produce WHERE id=basil`. **If the phone is offline, this network request will fail immediately**, breaking the app.

## Proposed Solution: Static Prerendering
Instead of evaluating the database live on every click, we will instruct SvelteKit to pre-compile the entire application into static HTML files during the build process (`bun run build`). Because our universe is small (1 homepage, 1 ecosystem page, and 50 produce detail pages), this build process will only take ~3 seconds! 

These 52 static HTML files will then be globally cached by the Service Worker, rendering the application 100% immune to network loss!

### 1. Adapter Swap
#### [MODIFY] `svelte.config.js` and `package.json`
- Remove `@sveltejs/adapter-auto`. 
- Install and configure `@sveltejs/adapter-static` with a strict `fallback: 'index.html'` fallback for client routing.

### 2. Global Prerendering
#### [NEW] `src/routes/+layout.server.ts`
- I will enforce global static generation by adding `export const prerender = true;`. This forces SvelteKit to spider through the `bun:sqlite` database at build-time and punch out a persistent HTML file for every single feature.

### 3. PWA Plugin Integration
#### [NEW] `vite.config.ts` PWA injection
- We will install `@vite-pwa/sveltekit` and integrate it. 
- The plugin will automatically construct a `manifest.webmanifest` (allowing users to "Add to Home Screen" on iOS/Android).
- It will automatically generate the Service Worker configuration enforcing an `autoUpdate` strategy.
- I will add a PWA manifest block inside `<svelte:head>` in our global layout.
