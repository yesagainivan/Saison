<script lang="ts">
	import { getContext } from 'svelte';

	let { side = 'left' } = $props<{ side: 'left' | 'right' }>();

	const getSeason = getContext<() => string>('currentSeason');
	let season = $derived(getSeason());
</script>

<div class="flank-wrapper {side}" aria-hidden="true">
	<!-- WINTER -->
	<div class="season-asset" class:active={season === 'winter'}>
		{#if side === 'left'}
			<!-- Bare frosted branch curving inwards -->
			<svg viewBox="0 0 100 300" class="asset-svg">
				<path
					d="M20,300 Q40,180 80,40 M30,230 Q60,170 95,140 M45,130 Q65,80 85,75 M60,200 Q75,180 85,190"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
				/>
				<!-- Frost dot accents -->
				<circle cx="80" cy="40" r="2" fill="currentColor" />
				<circle cx="95" cy="140" r="1.5" fill="currentColor" />
			</svg>
		{:else}
			<!-- Pine sparse structure -->
			<svg viewBox="0 0 100 300" class="asset-svg">
				<path
					d="M80,300 Q60,150 20,30"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
				/>
				<!-- Needles -->
				<line x1="70" y1="230" x2="40" y2="210" stroke="currentColor" stroke-width="1" />
				<line x1="60" y1="180" x2="30" y2="170" stroke="currentColor" stroke-width="1" />
				<line x1="50" y1="130" x2="15" y2="120" stroke="currentColor" stroke-width="1" />
				<line x1="40" y1="80" x2="10" y2="85" stroke="currentColor" stroke-width="1" />
				<circle cx="20" cy="30" r="1.5" fill="currentColor" />
			</svg>
		{/if}
	</div>

	<!-- SPRING -->
	<div class="season-asset" class:active={season === 'spring'}>
		{#if side === 'left'}
			<!-- Branch with subtle buds -->
			<svg viewBox="0 0 100 300" class="asset-svg">
				<path
					d="M10,300 Q30,150 85,30 M30,200 Q60,140 90,110 M40,110 Q60,80 80,70"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
				/>
				<!-- Delicate buds -->
				<circle cx="85" cy="30" r="3" fill="currentColor" />
				<circle cx="90" cy="110" r="2.5" fill="currentColor" />
				<circle cx="80" cy="70" r="2" fill="currentColor" />
				<circle cx="55" cy="165" r="2" fill="currentColor" />
				<circle cx="25" cy="240" r="2" fill="currentColor" />
			</svg>
		{:else}
			<!-- Unfurling fern -->
			<svg viewBox="0 0 100 300" class="asset-svg">
				<!-- Main stem curling at top -->
				<path
					d="M80,300 Q40,150 20,60 C10,30 35,20 40,40 C45,55 35,60 30,55"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
				/>
				<!-- Little shoots -->
				<path
					d="M70,250 Q50,230 40,240 M60,190 Q30,170 20,180 M50,130 Q20,110 15,120 M35,80 Q10,70 10,80"
					fill="none"
					stroke="currentColor"
					stroke-width="1"
					stroke-linecap="round"
				/>
			</svg>
		{/if}
	</div>

	<!-- SUMMER -->
	<div class="season-asset" class:active={season === 'summer'}>
		{#if side === 'left'}
			<!-- Full leafy branch -->
			<svg viewBox="0 0 100 300" class="asset-svg">
				<path
					d="M10,300 Q40,150 90,20 M35,200 Q70,160 95,120 M50,105 Q70,70 90,60"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
				/>
				<!-- Solid geometric leaves -->
				<path
					d="M90,20 C100,20 100,5 90,5 C80,5 80,20 90,20 Z"
					fill="currentColor"
					transform="rotate(45 90 20)"
					opacity="0.6"
				/>
				<path
					d="M95,120 C105,120 105,105 95,105 C85,105 85,120 95,120 Z"
					fill="currentColor"
					transform="rotate(20 95 120)"
					opacity="0.5"
				/>
				<path
					d="M90,60 C100,60 100,45 90,45 C80,45 80,60 90,60 Z"
					fill="currentColor"
					transform="rotate(60 90 60)"
					opacity="0.4"
				/>
				<path
					d="M45,230 C55,230 55,215 45,215 C35,215 35,230 45,230 Z"
					fill="currentColor"
					transform="rotate(-40 45 230)"
					opacity="0.5"
				/>
			</svg>
		{:else}
			<!-- Blooming shrub -->
			<svg viewBox="0 0 100 300" class="asset-svg">
				<path
					d="M80,300 Q50,150 20,40 M60,190 Q30,130 15,110 M40,100 Q15,70 10,60"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
				/>
				<!-- Blooms as large transparent circles -->
				<circle cx="20" cy="40" r="15" fill="currentColor" opacity="0.3" />
				<circle cx="15" cy="110" r="10" fill="currentColor" opacity="0.2" />
				<circle cx="10" cy="60" r="12" fill="currentColor" opacity="0.25" />
				<circle cx="45" cy="160" r="8" fill="currentColor" opacity="0.15" />
			</svg>
		{/if}
	</div>

	<!-- AUTUMN -->
	<div class="season-asset" class:active={season === 'autumn'}>
		{#if side === 'left'}
			<!-- Sparse falling leaves branch -->
			<svg viewBox="0 0 100 300" class="asset-svg">
				<path
					d="M20,300 Q35,160 80,30 M45,180 Q75,130 95,110"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
				/>
				<!-- One attached leaf, a few falling -->
				<path
					d="M80,30 C90,30 90,15 80,15 C70,15 70,30 80,30 Z"
					fill="currentColor"
					transform="rotate(45 80 30)"
					opacity="0.7"
				/>
				<path
					d="M95,110 C105,110 105,95 95,95 C85,95 85,110 95,110 Z"
					fill="currentColor"
					transform="rotate(20 95 110)"
					opacity="0.5"
				/>
				<!-- Falling detached leaves -->
				<path
					d="M60,90 C68,90 68,80 60,80 C52,80 52,90 60,90 Z"
					fill="currentColor"
					transform="rotate(-20 60 90)"
					opacity="0.4"
					class="detached"
				/>
				<path
					d="M30,120 C38,120 38,110 30,110 C22,110 22,120 30,120 Z"
					fill="currentColor"
					transform="rotate(-50 30 120)"
					opacity="0.3"
					class="detached"
				/>
			</svg>
		{:else}
			<!-- Wheat / tall grass strokes -->
			<svg viewBox="0 0 100 300" class="asset-svg">
				<!-- Stalks -->
				<path
					d="M80,300 Q75,150 40,50"
					fill="none"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
				/>
				<path
					d="M60,300 Q50,200 20,80"
					fill="none"
					stroke="currentColor"
					stroke-width="1"
					stroke-linecap="round"
				/>
				<path
					d="M90,300 Q85,250 60,130"
					fill="none"
					stroke="currentColor"
					stroke-width="1"
					stroke-linecap="round"
				/>
				<!-- Granular wheat head clusters -->
				<circle cx="40" cy="50" r="2.5" fill="currentColor" />
				<circle cx="43" cy="58" r="2" fill="currentColor" />
				<circle cx="37" cy="56" r="2" fill="currentColor" />
				<circle cx="20" cy="80" r="2" fill="currentColor" />
				<circle cx="23" cy="88" r="1.5" fill="currentColor" />
			</svg>
		{/if}
	</div>
</div>

<style>
	.flank-wrapper {
		width: 100px; /* Keeps a bounded width for layout */
		height: 300px;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 0.85;
		transform: scaleX(-1); /* Flips illustrations to bloom "outward" from the wheel */
	}

	.season-asset {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		visibility: hidden;
		transition:
			opacity 1s ease,
			visibility 1s ease;
		color: var(--accent); /* Inherits theme color natively */
	}

	.season-asset.active {
		opacity: 1;
		visibility: visible;
	}

	/* Gently sway the plants from the base */
	@keyframes gentle-sway-left {
		0%,
		100% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(3deg);
		}
	}
	@keyframes gentle-sway-right {
		0%,
		100% {
			transform: rotate(0deg);
		}
		50% {
			transform: rotate(-3deg);
		}
	}

	.asset-svg {
		width: 100%;
		height: 100%;
		display: block;
		transform-origin: bottom center;
		will-change: transform;
		overflow: visible; /* Prevents large strokes or leaves from clipping at SVG boundaries */
	}

	.left .asset-svg {
		animation: gentle-sway-left 8s ease-in-out infinite;
	}

	.right .asset-svg {
		animation: gentle-sway-right 9s ease-in-out infinite; /* Slightly async timing */
	}

	/* Falling leaves isolated animation */
	@keyframes drop {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(20px);
		}
	}
	.detached {
		animation: drop 10s ease-in-out infinite;
	}
</style>
