<script lang="ts">
	import { getContext } from 'svelte';
	import ProduceCard from '$lib/components/ProduceCard.svelte';
	import SeasonWheel from '$lib/components/SeasonWheel.svelte';
	import FlankIllustration from '$lib/components/FlankIllustration.svelte';
	import { SEASON_LABELS, MONTHS, MONTHS_FR } from '$lib/types';
	import type { Produce } from '$lib/types';
	import type { PageData } from './$types';
	import { garden } from '$lib/stores/garden.svelte';
	import { t } from '$lib/i18n';

	import { appSettings } from '$lib/stores/settings.svelte';
	import { ui } from '$lib/stores/ui.svelte';

	let { data }: { data: PageData } = $props();

	const monthContext = getContext<{ month: number }>('currentMonth');
	const getSeason = getContext<() => string>('currentSeason');

	let filteredProduce = $derived.by(() => {
		const m = appSettings.transformMonth(monthContext.month);

		return data.produce.filter((p: Produce) => {
			// My Garden filter ignores the month constraint and shows everything in garden
			if (ui.gridFilter === 'garden') {
				return garden.has(p.id);
			}

			// Sowing filter checks planting dates
			if (ui.gridFilter === 'sow') {
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
	let currentSeasonName = $derived(SEASON_LABELS[getSeason()][appSettings.language]);
	let currentMonthName = $derived(
		appSettings.language === 'fr'
			? MONTHS_FR[monthContext.month - 1]
			: MONTHS[monthContext.month - 1]
	);
</script>

<svelte:head>
	<title>Saison - {currentMonthName}</title>
</svelte:head>

<section class="hero-section">
	<div class="flank-container left">
		<FlankIllustration side="left" />
	</div>

	<div class="wheel-section">
		<div class="season-label">{currentSeasonName}</div>
		<SeasonWheel bind:month={monthContext.month} />
	</div>

	<div class="flank-container right">
		<FlankIllustration side="right" />
	</div>
</section>

<section class="grid-section">
	<div class="grid-header">
		<div class="header-left">
			<h2 class="grid-title">{currentMonthName}</h2>
			<div class="filter-pills">
				<button
					class="pill"
					class:active={ui.gridFilter === 'peak'}
					onclick={() => (ui.gridFilter = 'peak')}>{t('harvesting')}</button
				>
				<button
					class="pill"
					class:active={ui.gridFilter === 'sow'}
					onclick={() => (ui.gridFilter = 'sow')}>{t('sowing')}</button
				>
				<button
					class="pill"
					class:active={ui.gridFilter === 'garden'}
					onclick={() => (ui.gridFilter = 'garden')}>{t('my_garden')}</button
				>
			</div>
		</div>
		<span class="grid-count">{filteredProduce.length} {t('items')}</span>
	</div>

	{#if filteredProduce.length === 0}
		<div class="empty-state">
			{#if ui.gridFilter === 'garden'}
				<p>{t('empty_garden')}</p>
			{:else}
				<p>{t('no_produce')} {currentMonthName}.</p>
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
	.hero-section {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1rem;
		padding: 2rem 0;
		max-width: 900px; /* Constrain the flanking illustrations nicely */
		margin: 0 auto;
	}

	.flank-container {
		display: none; /* Safely hide on smaller mobile screens */
	}

	@media (min-width: 768px) {
		.flank-container {
			display: flex;
			flex: 1;
		}
		.flank-container.left {
			justify-content: flex-end;
		}
		.flank-container.right {
			justify-content: flex-start;
		}
	}

	.wheel-section {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex-shrink: 0;
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
		.produce-grid {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	@media (max-width: 768px) {
		.produce-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (max-width: 480px) {
		.produce-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
