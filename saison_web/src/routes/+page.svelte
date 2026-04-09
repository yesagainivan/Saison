<script lang="ts">
  import { getContext } from 'svelte';
  import ProduceCard from '$lib/components/ProduceCard.svelte';
  import SeasonWheel from '$lib/components/SeasonWheel.svelte';
  import { SEASON_LABELS, MONTHS } from '$lib/types';
  import type { Produce } from '$lib/types';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const monthContext = getContext<{ month: number }>('currentMonth');
  const getSeason = getContext<() => string>('currentSeason');

  // Filter produce down to what is in season THIS month
  let inSeasonProduce = $derived.by(() => {
    const m = monthContext.month;
    return data.produce.filter((p: Produce) => {
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
    <h2 class="grid-title">In season — {MONTHS[monthContext.month - 1]}</h2>
    <span class="grid-count">{inSeasonProduce.length} items</span>
  </div>

  {#if inSeasonProduce.length === 0}
    <div class="empty-state">
      <p>No produce recorded for this month yet.</p>
    </div>
  {:else}
    <div class="produce-grid">
      {#each inSeasonProduce as produce, i (produce.id)}
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
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 1.5rem;
  }

  .grid-title {
    font-family: 'DM Serif Display', serif;
    font-size: 1.5rem;
    color: var(--text);
    transition: color var(--dur) ease;
    margin: 0;
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
