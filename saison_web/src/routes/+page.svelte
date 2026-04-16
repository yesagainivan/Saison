<script lang="ts">
  import { getContext } from 'svelte';
  import ProduceCard from '$lib/components/ProduceCard.svelte';
  import SeasonWheel from '$lib/components/SeasonWheel.svelte';
  import { SEASON_LABELS, MONTHS } from '$lib/types';
  import type { Produce } from '$lib/types';
  import type { PageData } from './$types';
  import { garden } from '$lib/stores/garden.svelte';

  import { appSettings } from '$lib/stores/settings.svelte';

  let { data }: { data: PageData } = $props();

  const monthContext = getContext<{ month: number }>('currentMonth');
  const getSeason = getContext<() => string>('currentSeason');

  let currentFilter = $state<'peak' | 'sow' | 'garden'>('peak');

  let filteredProduce = $derived.by(() => {
    const m = appSettings.transformMonth(monthContext.month);
    
    return data.produce.filter((p: Produce) => {
      // My Garden filter ignores the month constraint and shows everything in garden
      if (currentFilter === 'garden') {
        return garden.has(p.id);
      }
      
      // Sowing filter checks planting dates
      if (currentFilter === 'sow') {
        if (p.planting_start == null || p.planting_end == null) return false;
        if (p.planting_start <= p.planting_end) {
          return m >= p.planting_start && m <= p.planting_end;
        } else {
          return m >= p.planting_start || m <= p.planting_end;
        }
      }

      // Default: Peak Harvest filter
      if (p.season_start <= p.season_end) {
        return m >= p.season_start && m <= p.season_end;
      } else {
        return m >= p.season_start || m <= p.season_end;
      }
    });
  });

  // Derived label formatting
  let currentSeasonName = $derived(SEASON_LABELS[getSeason()]);
</script>

<svelte:head>
  <title>Saison - {MONTHS[monthContext.month - 1]}</title>
</svelte:head>

<section class="wheel-section">
  <div class="season-label">{currentSeasonName}</div>
  <SeasonWheel bind:month={monthContext.month} />
</section>

<section class="grid-section">
  <div class="grid-header">
    <div class="header-left">
      <h2 class="grid-title">{MONTHS[monthContext.month - 1]}</h2>
      <div class="filter-pills">
        <button class="pill" class:active={currentFilter === 'peak'} onclick={() => currentFilter = 'peak'}>Harvesting</button>
        <button class="pill" class:active={currentFilter === 'sow'} onclick={() => currentFilter = 'sow'}>Sowing</button>
        <button class="pill" class:active={currentFilter === 'garden'} onclick={() => currentFilter = 'garden'}>My Garden</button>
      </div>
    </div>
    <span class="grid-count">{filteredProduce.length} items</span>
  </div>

  {#if filteredProduce.length === 0}
    <div class="empty-state">
      {#if currentFilter === 'garden'}
        <p>You haven't planted anything yet!</p>
      {:else}
        <p>No produce recorded for this filter in {MONTHS[monthContext.month - 1]}.</p>
      {/if}
    </div>
  {:else}
    <div class="produce-grid">
      {#each filteredProduce as produce, i (produce.id)}
        <ProduceCard {produce} index={i} />
      {/each}
    </div>
  {/if}
</section>

<style>
  .wheel-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
  }

  .season-label {
    font-family: 'DM Serif Display', serif;
    font-size: 13px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--accent);
    transition: color var(--dur) ease;
    margin-bottom: 0.5rem;
  }

  .grid-section {
    padding: 0 1.5rem;
  }

  .grid-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border);
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .grid-title {
    font-family: 'DM Serif Display', serif;
    font-size: 1.5rem;
    color: var(--text);
    transition: color var(--dur) ease;
    margin: 0;
  }

  .filter-pills {
    display: flex;
    gap: 0.5rem;
  }

  .pill {
    appearance: none;
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text-muted);
    border-radius: 100px;
    padding: 0.4rem 1rem;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: all var(--dur) ease;
  }

  .pill:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  .pill.active {
    background: var(--accent);
    color: var(--bg-surface);
    border-color: var(--accent);
  }

  .grid-count {
    font-size: 0.75rem;
    color: var(--text-muted);
    letter-spacing: 0.08em;
    transition: color var(--dur) ease;
  }

  .produce-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
  }

  .empty-state {
    padding: 4rem 1rem;
    text-align: center;
    color: var(--text-muted);
    font-style: italic;
  }

  @media (max-width: 1024px) {
    .produce-grid { grid-template-columns: repeat(3, 1fr); }
  }

  @media (max-width: 768px) {
    .produce-grid { grid-template-columns: repeat(2, 1fr); }
  }

  @media (max-width: 480px) {
    .produce-grid { grid-template-columns: 1fr; }
  }
</style>
