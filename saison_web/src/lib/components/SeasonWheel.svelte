<script lang="ts">
	import { MONTHS, SHORT_MONTHS, MONTHS_FR, SHORT_MONTHS_FR } from '$lib/types';
	import { appSettings } from '$lib/stores/settings.svelte';

	// Accept the selected month as a two-way bound prop, default to current month
	let { month = $bindable(new Date().getMonth() + 1) } = $props();

	let currentMonthValue = $state(month);
	let targetRotation = $state(-(month - 1) * 30);

	$effect(() => {
		if (month !== currentMonthValue) {
			let diff = month - currentMonthValue;
			if (diff > 6) diff -= 12;
			if (diff < -6) diff += 12;
			targetRotation -= diff * 30;
			currentMonthValue = month;
		}
	});

	const setMonth = (m: number) => {
		let newM = m;
		while (newM < 1) newM += 12;
		while (newM > 12) newM -= 12;
		month = newM;
	};
</script>

<div class="wheel-wrap">
	<div class="wheel-outer">
		<svg class="wheel-svg" viewBox="-160 -160 320 320">
			<!-- Elegant background orbit ring -->
			<circle class="orbit-path" cx="0" cy="0" r="115" />

			<!-- Rotating dial group containing all months -->
			<g class="dial" style="transform: rotate({targetRotation}deg);">
				{#each Array.from({ length: 12 }, (_, i) => i) as i}
					{@const isActive = i + 1 === currentMonthValue}
					{@const angle = i * 30}
					<!-- svelte-ignore a11y_click_events_have_key_events -->
					<g
						class="month-node"
						class:active={isActive}
						style="transform: rotate({angle}deg) translateY(-115px);"
						onclick={() => setMonth(i + 1)}
						role="button"
						tabindex="0"
						aria-label={appSettings.language === 'fr' ? MONTHS_FR[i] : MONTHS[i]}
					>
						<!-- Interactive invisible hit area -->
						<circle class="hit-area" cx="0" cy="0" r="24" />

						<!-- The active circle outline, appears conditionally via CSS -->
						<circle class="active-ring" cx="0" cy="0" r="14" />

						<!-- The central dot for the month -->
						<circle class="month-dot" cx="0" cy="0" r="3" />

						<!-- Month abbreviation text placed radially -->
						<text class="month-text" x="0" y="-24" text-anchor="middle" dominant-baseline="central">
							{appSettings.language === 'fr' ? SHORT_MONTHS_FR[i] : SHORT_MONTHS[i]}
						</text>
					</g>
				{/each}
			</g>
		</svg>

		<div class="wheel-center-label">
			<span class="wcl-month">
				{appSettings.language === 'fr' ? MONTHS_FR[month - 1] : MONTHS[month - 1]}
			</span>
		</div>
	</div>

	<div class="wheel-controls">
		<button class="wheel-btn" onclick={() => setMonth(month - 1)} aria-label="Previous month">
			<svg
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"><path d="m15 18-6-6 6-6" /></svg
			>
		</button>
		<button class="wheel-btn" onclick={() => setMonth(month + 1)} aria-label="Next month">
			<svg
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg
			>
		</button>
	</div>
</div>

<style>
	.wheel-wrap {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 1.5rem 1rem 0.5rem;
		position: relative;
	}

	.wheel-outer {
		position: relative;
		width: clamp(220px, 80vw, 300px);
		height: clamp(220px, 80vw, 300px);
	}

	.wheel-svg {
		width: 100%;
		height: 100%;
		overflow: visible;
	}

	.orbit-path {
		fill: none;
		stroke: var(--border);
		stroke-width: 1px;
		stroke-dasharray: 2 6;
		opacity: 0.7;
	}

	.dial {
		/* transform-box: fill-box ensures transform-origin is computed in SVG geometry
		   space (the element's own bounding box), NOT CSS layout space.
		   Without this, iOS Safari may compute the rotation origin incorrectly
		   for SVG <g> elements, forcing a CPU-side compositing fallback. */
		transform-box: fill-box;
		transform-origin: 50% 50%;
		/* Own duration — faster and crisper than the 700ms seasonal --dur.
		   At 30fps (Low Power Mode) a 320ms transition still gets ~10 frames,
		   which reads as smooth. 700ms at 30fps with drops looks sluggish. */
		transition: transform 320ms cubic-bezier(0.4, 0, 0.2, 1);
		/* Promote to GPU layer so the transition runs on the compositor thread,
		   unaffected by Low Power Mode's main-thread throttling. */
		will-change: transform;
	}

	.month-node {
		cursor: pointer;
		outline: none;
	}

	.hit-area {
		fill: transparent;
	}

	/* The styling of dots and text */
	.month-dot {
		fill: var(--text-muted);
		transition:
			fill var(--dur) ease,
			r var(--dur) ease;
	}

	.month-text {
		font-size: 11px;
		fill: var(--text-muted);
		font-weight: 500;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		pointer-events: none;
		opacity: 0.6;
		transition:
			fill var(--dur) ease,
			opacity var(--dur) ease,
			font-weight var(--dur) ease;
	}

	.active-ring {
		fill: var(--bg-surface);
		stroke: var(--accent);
		stroke-width: 1px;
		stroke-dasharray: 2 4;
		opacity: 0;
		transform: scale(0.5);
		transition:
			opacity var(--dur) ease,
			transform var(--dur) cubic-bezier(0.34, 1.56, 0.64, 1);
		transform-origin: 0 0;
	}

	/* Active month styling overrides */
	.month-node:hover .month-text {
		opacity: 1;
	}

	.month-node:hover .month-dot {
		fill: var(--accent);
	}

	.month-node.active .month-dot {
		fill: var(--accent);
		r: 4;
	}

	.month-node.active .month-text {
		fill: var(--accent);
		opacity: 1;
		font-weight: 700;
	}

	.month-node.active .active-ring {
		opacity: 1;
		transform: scale(1);
	}

	/* Static center label */
	.wheel-center-label {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		pointer-events: none;
	}

	.wcl-month {
		font-family: 'DM Serif Display', serif;
		font-size: clamp(22px, 6vw, 32px);
		line-height: 1;
		color: var(--text);
		transition: color var(--dur) ease;
		display: block;
	}

	.wheel-controls {
		display: flex;
		gap: 3rem;
		margin-top: 0.5rem;
	}

	.wheel-btn {
		background: var(--bg-surface);
		border: 1px solid var(--border);
		color: var(--text-muted);
		border-radius: 50%;
		width: 44px;
		height: 44px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);
		transition: all 0.3s ease;
	}

	.wheel-btn:hover {
		background-color: var(--bg-card);
		border-color: var(--accent);
		color: var(--accent);
		transform: translateY(-1px);
		box-shadow: 0 6px 16px rgba(0, 0, 0, 0.04);
	}

	.wheel-btn:active {
		transform: translateY(1px);
	}
</style>
