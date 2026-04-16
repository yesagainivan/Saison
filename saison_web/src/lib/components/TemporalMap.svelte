<script lang="ts">
	import { SHORT_MONTHS } from '$lib/types';
	import { appSettings } from '$lib/stores/settings.svelte';

	let { seasonStart, seasonEnd }: { seasonStart: number; seasonEnd: number } = $props();

	const isMonthInSeason = (calendarMonth: number) => {
		const m = appSettings.transformMonth(calendarMonth);

		if (seasonStart <= seasonEnd) {
			return m >= seasonStart && m <= seasonEnd;
		} else {
			// Wraps around the year
			return m >= seasonStart || m <= seasonEnd;
		}
	};
</script>

<div class="temporal-map">
	{#each SHORT_MONTHS as month, i (month)}
		{@const monthNum = i + 1}
		{@const inSeason = isMonthInSeason(monthNum)}

		<div class="month-tick" class:active={inSeason}>
			<span class="month-label text-xs">{month.charAt(0)}</span>
			<div class="bar"></div>
		</div>
	{/each}
</div>

<style>
	.temporal-map {
		display: flex;
		gap: 2px;
		width: 100%;
		margin: 1.5rem 0;
	}

	.month-tick {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 4px;
	}

	.month-label {
		font-size: 10px;
		color: var(--text-muted);
		font-weight: 500;
	}

	.bar {
		width: 100%;
		height: 12px;
		background-color: var(--border);
		transition: background-color var(--dur) ease;
		border-radius: 2px;
	}

	.month-tick.active .bar {
		background-color: var(--accent);
	}

	.month-tick.active .month-label {
		color: var(--text);
	}
</style>
