<script lang="ts">
	import type { Produce } from '$lib/types';
	import { CATEGORY_LABELS } from '$lib/types';
	import { appSettings } from '$lib/stores/settings.svelte';

	let { category }: { category: Produce['category'] } = $props();
</script>

<span class="category-badge {category}">
	{CATEGORY_LABELS[category][appSettings.language]}
</span>

<style>
	.category-badge {
		display: inline-block;
		padding: 2px 6px;
		font-size: 10px;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--text-muted);
		border: 1px solid var(--border);
		border-radius: 4px;
		transition:
			color var(--dur) ease,
			border-color var(--dur) ease;
	}
</style>
