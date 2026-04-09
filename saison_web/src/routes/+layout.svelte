<script lang="ts">
  import '../app.css';
  import { getSeasonForMonth } from '$lib/types';
  import { setContext } from 'svelte';

  let { children } = $props();

  // Create global month state using runes
  let currentMonth = $state(new Date().getMonth() + 1);
  let currentSeason = $derived(getSeasonForMonth(currentMonth));
  
  $effect(() => {
    if (typeof document !== 'undefined') {
      document.body.setAttribute('data-season', currentSeason);
    }
  });

  // Provide to children
  setContext('currentMonth', {
    get month() { return currentMonth; },
    set month(v) { currentMonth = v; }
  });
  setContext('currentSeason', () => currentSeason);
</script>

<header class="s-header">
  <div class="s-logo">Sa<em>i</em>son</div>
  <div class="s-tagline">Seasonal produce guide</div>
</header>

<main>
  {@render children()}
</main>

<style>
  .s-header {
    padding: 1.5rem 1.5rem 0;
    display: flex;
    align-items: baseline;
    gap: 1rem;
    border-bottom: 1px solid var(--border);
    padding-bottom: 1rem;
    transition: border-color var(--dur) ease;
  }
  
  .s-logo {
    font-family: 'DM Serif Display', serif;
    font-size: 22px;
    letter-spacing: -0.02em;
    color: var(--text);
    transition: color var(--dur) ease;
  }
  
  .s-logo em {
    font-style: italic;
    color: var(--accent);
    transition: color var(--dur) ease;
  }
  
  .s-tagline {
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-muted);
    transition: color var(--dur) ease;
  }

  main {
    max-width: 1200px;
    margin: 0 auto;
    padding-bottom: 4rem;
  }
</style>
