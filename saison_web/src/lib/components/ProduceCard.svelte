<script lang="ts">
	import type { Produce } from '$lib/types';
	import CategoryBadge from './CategoryBadge.svelte';
	import { resolve, asset } from '$app/paths';
	import { appSettings } from '$lib/stores/settings.svelte';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	let { produce, index = 0 }: { produce: Produce; index?: number } = $props();

	// Parse JSON color string safely
	let swatches = $derived.by(() => {
		if (!produce.colors) return ['#cccccc'];
		try {
			return JSON.parse(produce.colors as unknown as string);
		} catch {
			return ['#cccccc'];
		}
	});
</script>

<a
	href={resolve(`/produce/${produce.id}`)}
	class="produce-card"
	class:featured={produce.featured}
	in:fly={{ y: 12, duration: 320, delay: Math.min(index, 6) * 35, easing: cubicOut }}
>
	<!-- Vertical color accent strip (desktop) / left border (mobile) -->
	<div class="swatch-strip" style="background: {swatches[0]}"></div>

	<div class="card-content">
		<div class="card-header">
			<h3 class="card-name">
				{appSettings.language === 'fr' && produce.name_fr ? produce.name_fr : produce.name}
			</h3>
			{#if produce.name_fr && appSettings.language !== 'fr'}
				<span class="card-fr">{produce.name_fr}</span>
			{:else if appSettings.language === 'fr' && produce.name}
				<span class="card-fr">{produce.name}</span>
			{/if}
		</div>

		<div class="card-illustration">
			{#if produce.illustration}
				<img
					src={asset(`/illustrations/${produce.illustration}`)}
					alt="Illustration of {produce.name}"
				/>
			{:else}
				<div class="placeholder"></div>
			{/if}
		</div>

		<div class="card-footer">
			<CategoryBadge category={produce.category} />
		</div>
	</div>
</a>

<style>
	.produce-card {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: 8px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		text-decoration: none;
		position: relative;
		transition:
			background-color var(--dur) ease,
			border-color var(--dur) ease,
			transform 0.2s ease,
			box-shadow 0.2s ease;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
	}

	.produce-card:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.06);
	}

	.produce-card.featured {
		grid-column: span 2;
	}

	@media (max-width: 600px) {
		.produce-card.featured {
			grid-column: span 1;
		}
	}

	/* ── Swatch strip (horizontal bar on desktop, left accent bar on mobile) ── */
	.swatch-strip {
		height: 5px;
		width: 100%;
		flex-shrink: 0;
		transition: background-color var(--dur) ease;
	}

	/* ── Card content ── */
	.card-content {
		padding: 0.875rem;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		gap: 0.5rem;
	}

	.card-header {
		display: flex;
		flex-direction: column;
		gap: 0.125rem;
	}

	.card-name {
		font-family: 'DM Serif Display', serif;
		font-size: 1.25rem;
		line-height: 1.1;
		color: var(--text);
		margin: 0;
	}

	.card-fr {
		font-size: 0.7rem;
		font-style: italic;
		color: var(--text-muted);
	}

	.card-illustration {
		padding: 1rem 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-grow: 1;
	}

	.card-illustration img {
		max-width: 60px;
		height: auto;
		opacity: 0.85;
		mix-blend-mode: multiply;
	}

	.card-footer {
		display: flex;
		justify-content: flex-start;
		margin-top: auto;
	}

	/* ─────────────────────────────────────────────────
	   Mobile: compact horizontal card (≤ 639px)
	   ───────────────────────────────────────────────── */
	@media (max-width: 639px) {
		.produce-card {
			flex-direction: row;
			align-items: stretch;
			border-radius: 10px;
			min-height: 72px;
		}

		.produce-card:hover {
			transform: none;
			box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
		}

		/* Left accent bar instead of top strip */
		.swatch-strip {
			width: 4px;
			height: auto;
			flex-shrink: 0;
		}

		.card-content {
			flex-direction: row;
			align-items: center;
			padding: 0.625rem 0.75rem;
			gap: 0.625rem;
			flex-grow: 1;
		}

		.card-header {
			flex: 1;
			min-width: 0;
		}

		.card-name {
			font-size: 0.9rem;
			line-height: 1.2;
			/* Prevent long names overflowing */
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.card-fr {
			font-size: 0.65rem;
		}

		/* Tiny illustration on the right */
		.card-illustration {
			padding: 0;
			flex-grow: 0;
			flex-shrink: 0;
			width: 40px;
			height: 40px;
			order: 1;
		}

		.card-illustration img {
			max-width: 36px;
			max-height: 36px;
		}

		/* Move badge below the name, within the header column */
		.card-footer {
			margin-top: 0.25rem;
		}
	}
</style>
