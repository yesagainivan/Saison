<script lang="ts">
	import type { Produce } from '$lib/types';
	import CategoryBadge from './CategoryBadge.svelte';
	import { resolve, asset } from '$app/paths';
	import { appSettings } from '$lib/stores/settings.svelte';

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
	style="animation-delay: {index * 40}ms"
>
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
		animation: cardIn 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both;
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

	.swatch-strip {
		height: 6px;
		width: 100%;
		transition: background-color var(--dur) ease;
	}

	.card-content {
		padding: 1rem;
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

	@keyframes cardIn {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
