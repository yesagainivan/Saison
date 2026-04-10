<script lang="ts">
  import type { PageData } from './$types';
  import type { Produce } from '$lib/types';
  import CategoryBadge from '$lib/components/CategoryBadge.svelte';

  let { data }: { data: PageData } = $props();
  
  let selected = $state<string | null>(null);

  // Derive companions and avoids for the current selected context
  let activeCompanions = $derived.by(() => {
    if (!selected) return [];
    const p = data.produce.find(x => x.id === selected);
    if (!p || !p.companions) return [];
    try {
        return JSON.parse(p.companions as unknown as string);
    } catch (e) {
        return [];
    }
  });

  let activeAvoids = $derived.by(() => {
    if (!selected) return [];
    const p = data.produce.find(x => x.id === selected);
    if (!p || !p.avoid) return [];
    try {
        return JSON.parse(p.avoid as unknown as string);
    } catch(e) {
        return [];
    }
  });

  function getStatus(id: string) {
    if (!selected) return 'neutral';
    if (id === selected) return 'selected';
    if (activeCompanions.includes(id)) return 'companion';
    if (activeAvoids.includes(id)) return 'avoid';
    return 'dimmed';
  }
</script>

<svelte:head>
  <title>Saison - Ecosystem</title>
</svelte:head>

<section class="ecosystem-view">
  <div class="ecosystem-header">
    <h1 class="page-title">The Ecosystem Map</h1>
    <p class="page-desc">Select a plant to illuminate its natural companions and conflicting neighbours.</p>
  </div>

  <div class="constellation-grid">
    {#each data.produce as produce (produce.id)}
      {@const status = getStatus(produce.id)}
      <button 
        class="eco-node {status}" 
        onclick={() => selected = selected === produce.id ? null : produce.id}
      >
        <div class="node-icon">
          {#if produce.illustration}
            <img src="/illustrations/{produce.illustration}" alt="{produce.name}" />
          {/if}
        </div>
        <span class="node-name">{produce.name}</span>
        <div class="node-badge">
           <CategoryBadge category={produce.category} />
        </div>
      </button>
    {/each}
  </div>
</section>

<style>
  .ecosystem-view {
    padding: 3rem 1.5rem;
  }

  .ecosystem-header {
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

  .constellation-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1.5rem;
  }

  .eco-node {
    appearance: none;
    background: var(--bg-surface);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  
  .eco-node:hover {
    border-color: var(--text-muted);
  }

  .node-icon {
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .node-icon img {
    max-width: 100%;
    max-height: 100%;
    mix-blend-mode: multiply;
  }

  .node-name {
    font-family: 'DM Serif Display', serif;
    font-size: 1.25rem;
    color: var(--text);
    transition: color 0.4s ease;
  }

  /* Interactive States */
  .eco-node.dimmed {
    opacity: 0.2;
    transform: scale(0.95);
    filter: grayscale(1);
  }

  .eco-node.selected {
    border-color: var(--text);
    box-shadow: 0 8px 24px rgba(0,0,0,0.1);
    transform: scale(1.05);
    z-index: 10;
  }

  .eco-node.companion {
    border-color: #4CAF50;
    background: rgba(76, 175, 80, 0.05);
  }

  .eco-node.companion .node-name {
    color: #2E7D32;
  }

  .eco-node.avoid {
    border-color: #F44336;
    background: rgba(244, 67, 54, 0.05);
  }

  .eco-node.avoid .node-name {
    color: #C62828;
  }
</style>
