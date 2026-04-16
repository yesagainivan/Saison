<script lang="ts">
  import { appSettings } from '$lib/stores/settings.svelte';

  const setHemi = (h: 'northern' | 'southern') => appSettings.setHemisphere(h);
  const setShift = (s: number) => appSettings.setClimateShift(s);
</script>

<svelte:head>
  <title>Saison - Settings</title>
</svelte:head>

<section class="settings-view">
  <div class="settings-header">
    <h1 class="page-title">Configuration</h1>
    <p class="page-desc">Shift the botanical calendar to perfectly match your locality.</p>
  </div>

  <div class="settings-group">
    <h3 class="group-title">Hemisphere</h3>
    <div class="option-cards">
      <button class="option-card" class:selected={appSettings.hemisphere === 'northern'} onclick={() => setHemi('northern')}>
        <h4>Northern</h4>
        <p>Jan–Feb acts as Winter. Jul–Aug acts as Summer.</p>
      </button>
      <button class="option-card" class:selected={appSettings.hemisphere === 'southern'} onclick={() => setHemi('southern')}>
        <h4>Southern</h4>
        <p>Jan–Feb acts as Summer. Jul–Aug acts as Winter.</p>
      </button>
    </div>
  </div>

  <div class="settings-group">
    <h3 class="group-title">Microclimate Shift</h3>
    <p class="group-info">Dial the calendar back or forwards if your local spring starts earlier or later than standard temperate zones.</p>
    <div class="option-cards">
      <button class="option-card" class:selected={appSettings.climateShift === -1} onclick={() => setShift(-1)}>
        <h4>Colder / Later (-1 Month)</h4>
      </button>
      <button class="option-card" class:selected={appSettings.climateShift === 0} onclick={() => setShift(0)}>
        <h4>Standard Temperate (Zone 7)</h4>
      </button>
      <button class="option-card" class:selected={appSettings.climateShift === 1} onclick={() => setShift(1)}>
        <h4>Warmer / Earlier (+1 Month)</h4>
      </button>
    </div>
  </div>
</section>

<style>
  .settings-view {
    padding: 3rem 1.5rem;
    max-width: 800px;
    margin: 0 auto;
  }

  .settings-header {
    margin-bottom: 4rem;
    text-align: center;
  }

  .page-title {
    font-size: 2.5rem;
    color: var(--text);
  }

  .page-desc {
    color: var(--text-muted);
    font-size: 1.125rem;
  }

  .settings-group {
    margin-bottom: 3.5rem;
  }

  .group-title {
    font-family: 'DM Serif Display', serif;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: var(--text);
  }

  .group-info {
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-bottom: 1.5rem;
  }

  .option-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .option-card {
    appearance: none;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 1.5rem;
    text-align: left;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .option-card h4 {
    margin: 0 0 0.5rem 0;
    font-size: 1.1rem;
    color: var(--text);
  }

  .option-card p {
    margin: 0;
    font-size: 0.85rem;
    color: var(--text-muted);
    line-height: 1.4;
  }

  .option-card:hover {
    border-color: var(--text-muted);
  }

  .option-card.selected {
    border-color: var(--accent);
    background: var(--bg-card);
  }
  
  .option-card.selected h4 {
    color: var(--accent);
  }
</style>
