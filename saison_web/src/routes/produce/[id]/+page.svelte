<script lang="ts">
	import type { PageData } from './$types';
	import CategoryBadge from '$lib/components/CategoryBadge.svelte';
	import TemporalMap from '$lib/components/TemporalMap.svelte';
	import { getSeasonForMonth } from '$lib/types';
	import { garden } from '$lib/stores/garden.svelte';

	let { data }: { data: PageData } = $props();
	let produce = $derived(data.produce);

	let swatches = $derived.by(() => {
		if (!produce.colors) return ['#cccccc'];
		try {
			return JSON.parse(produce.colors as unknown as string);
		} catch (e) {
			return ['#cccccc'];
		}
	});

	// Calculate if it's featured
	const isSown = $derived(produce.planting_start != null);

	let companions = $derived.by(() => {
		if (!produce.companions) return [];
		try {
			return JSON.parse(produce.companions as unknown as string) as string[];
		} catch (e) {
			return [];
		}
	});

	let avoid = $derived.by(() => {
		if (!produce.avoid) return [];
		try {
			return JSON.parse(produce.avoid as unknown as string) as string[];
		} catch (e) {
			return [];
		}
	});
</script>

<svelte:head>
	<title>Saison - {produce.name}</title>
</svelte:head>

<div class="top-actions">
	<button
		class="back-link"
		aria-label="Go back"
		onclick={() =>
			window.history.length > 2 ? window.history.back() : (window.location.href = '/')}
	>
		← Back
	</button>
</div>

<article class="detail-view">
	<div class="swatch-strip" style="background: {swatches[0]}"></div>
	<header class="detail-header">
		<div class="header-text">
			<CategoryBadge category={produce.category} />
			<h1 class="produce-name">{produce.name}</h1>
			{#if produce.name_fr}
				<h2 class="produce-fr">{produce.name_fr}</h2>
			{/if}
		</div>
		<div class="header-actions">
			<button
				class="garden-btn"
				class:planted={garden.has(produce.id)}
				onclick={() =>
					garden.has(produce.id) ? garden.remove(produce.id) : garden.add(produce.id)}
			>
				{garden.has(produce.id) ? '✓ In Your Garden' : '+ Plant in Garden'}
			</button>
		</div>
	</header>

	<div class="detail-layout">
		<div class="column illustration-col">
			<div class="illustration-wrap">
				{#if produce.illustration}
					<img src="/illustrations/{produce.illustration}" alt={produce.name} />
				{:else}
					<div class="placeholder">No illustration available</div>
				{/if}
			</div>
		</div>
		<div class="column content-col">
			<div class="description prose">
				<p>{produce.description}</p>
			</div>

			<div class="season-block">
				<h3 class="section-title">Peak Harvest</h3>
				<TemporalMap seasonStart={produce.season_start} seasonEnd={produce.season_end} />
			</div>

			{#if isSown}
				<div class="season-block">
					<h3 class="section-title">Planting Window</h3>
					<TemporalMap seasonStart={produce.planting_start!} seasonEnd={produce.planting_end!} />
				</div>
			{/if}

			<div class="meta-data">
				<div class="meta-item">
					<span class="meta-label">Hemisphere</span>
					<span class="meta-value">{produce.hemisphere}</span>
				</div>
				{#if companions.length > 0}
					<div class="meta-item">
						<span class="meta-label">Companions</span>
						<span class="meta-value">{companions.join(', ')}</span>
					</div>
				{/if}
				{#if avoid.length > 0}
					<div class="meta-item">
						<span class="meta-label">Avoid Planting With</span>
						<span class="meta-value">{avoid.join(', ')}</span>
					</div>
				{/if}
			</div>
		</div>
	</div>
</article>

<style>
	.detail-view {
		max-width: 900px;
		margin: 0 auto;
		background: var(--bg-surface);
		border: 1px solid var(--border);
		border-radius: 12px;
		overflow: hidden;
		/* margin-top: 2rem; */
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
	}

	.swatch-strip {
		height: 8px;
		width: 100%;
	}

	.detail-header {
		padding: 3rem 3rem 1.5rem;
		border-bottom: 1px solid var(--border);
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
	}

	.garden-btn {
		appearance: none;
		background: transparent;
		border: 1px solid var(--accent);
		color: var(--accent);
		padding: 0.5rem 1rem;
		border-radius: 4px;
		font-family: inherit;
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		cursor: pointer;
		transition: all var(--dur) ease;
	}

	.garden-btn:hover {
		background: var(--bg-card);
	}

	.garden-btn.planted {
		background: var(--accent);
		color: var(--bg-surface);
	}

	.produce-name {
		font-size: 3rem;
		margin: 1rem 0 0.25rem;
		color: var(--text);
	}

	.produce-fr {
		font-family: 'DM Sans', sans-serif;
		font-style: italic;
		font-weight: 300;
		font-size: 1.25rem;
		color: var(--text-muted);
		margin: 0;
	}

	.detail-layout {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 3rem;
		padding: 3rem;
	}

	.illustration-col {
		display: flex;
		justify-content: center;
		align-items: flex-start;
	}

	.illustration-wrap {
		width: 100%;
		display: flex;
		justify-content: center;
	}

	.illustration-wrap img {
		width: 100%;
		height: auto;
		max-height: 400px;
		mix-blend-mode: multiply;
	}

	.content-col {
		display: flex;
		flex-direction: column;
		gap: 2.5rem;
	}

	.prose {
		font-size: 1.125rem;
		line-height: 1.6;
		color: var(--text);
	}

	.prose p {
		margin: 0;
	}

	.section-title {
		font-family: 'DM Serif Display', serif;
		font-size: 1.25rem;
		margin: 0 0 0.5rem 0;
		color: var(--text);
	}

	.meta-data {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		padding-top: 1.5rem;
		border-top: 1px solid var(--border);
	}

	.meta-item {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.meta-label {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--text-muted);
	}

	.meta-value {
		font-size: 1rem;
		color: var(--text);
	}

	.top-actions {
		max-width: 900px;
		margin: 0 auto;
		padding: 1rem 0 1rem;
		display: flex;
		justify-content: flex-start;
	}

	.back-link {
		cursor: pointer;
		background: transparent;
		display: inline-block;
		padding: 0.5rem 1.2rem;
		border: 1px solid var(--border);
		border-radius: 8px;
		font-size: 0.875rem;
		color: var(--text-muted);
		transition: all 0.2s;
	}

	.back-link:hover {
		background-color: var(--bg-surface);
		color: var(--text);
	}

	@media (max-width: 768px) {
		.detail-layout {
			grid-template-columns: 1fr;
			padding: 2rem;
		}

		.detail-header {
			padding: 2rem 2rem 1rem;
		}

		.back-nav {
			padding: 1rem 2rem 2rem;
		}
	}
</style>
