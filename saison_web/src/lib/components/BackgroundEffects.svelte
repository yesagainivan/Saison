<script lang="ts">
	import { getContext } from 'svelte';

	const getSeason = getContext<() => string>('currentSeason');
	let season = $derived(getSeason());
</script>

<div class="bg-effects-container" aria-hidden="true">
	<!-- Winter Effects -->
	<div class="season-layer" class:active={season === 'winter'}>
		<svg class="winter-flake f-1" viewBox="0 0 24 24">
			<g stroke="currentColor" stroke-width="0.5" stroke-linecap="round">
				<path d="M12 2v20M2 12h20M5 5l14 14M5 19L19 5" />
				<circle cx="12" cy="12" r="3" fill="none" />
			</g>
		</svg>
		<svg class="winter-flake f-2" viewBox="0 0 24 24">
			<g stroke="currentColor" stroke-width="0.4" stroke-linecap="round">
				<path d="M12 4v16M4 12h16M6.5 6.5l11 11M6.5 17.5l11-11" />
			</g>
		</svg>
		<div class="snow-dot d-1"></div>
		<div class="snow-dot d-2"></div>
		<div class="snow-dot d-3"></div>
	</div>

	<!-- Spring Effects -->
	<div class="season-layer" class:active={season === 'spring'}>
		<!-- Sprouting seeds / petals floating up -->
		<svg class="spring-petal p-1" viewBox="0 0 24 24">
			<path
				d="M12,3 C17,3 21,8 20,13 C19,16 16,19 12,21 C8,19 5,16 4,13 C3,8 7,3 12,3 Z"
				fill="currentColor"
			/>
		</svg>
		<svg class="spring-petal p-2" viewBox="0 0 24 24">
			<path
				d="M12,4 C15.5,4 18,7 18,10 C18,13 15,16 12,19 C9,16 6,13 6,10 C6,7 8.5,4 12,4 Z"
				fill="none"
				stroke="currentColor"
				stroke-width="1"
			/>
		</svg>

		<!-- Prominent Minimalist Spring Blossoms -->
		<svg class="spring-blossom b-1" viewBox="0 0 24 24">
			<path d="M12 2 Q15 7 12 12 Q9 7 12 2 Z" fill="currentColor" />
			<path d="M12 22 Q15 17 12 12 Q9 17 12 22 Z" fill="currentColor" />
			<path d="M2 12 Q7 15 12 12 Q7 9 2 12 Z" fill="currentColor" />
			<path d="M22 12 Q17 15 12 12 Q17 9 22 12 Z" fill="currentColor" />
			<circle cx="12" cy="12" r="1.5" fill="var(--bg-surface)" />
		</svg>
		<svg class="spring-blossom b-2" viewBox="0 0 24 24">
			<path d="M12 2 Q15 7 12 12 Q9 7 12 2 Z" fill="currentColor" />
			<path d="M12 22 Q15 17 12 12 Q9 17 12 22 Z" fill="currentColor" />
			<path d="M2 12 Q7 15 12 12 Q7 9 2 12 Z" fill="currentColor" />
			<path d="M22 12 Q17 15 12 12 Q17 9 22 12 Z" fill="currentColor" />
		</svg>

		<div class="spring-pollen pol-1"></div>
		<div class="spring-pollen pol-2"></div>
		<div class="spring-pollen pol-3"></div>
	</div>

	<!-- Summer Effects -->
	<div class="season-layer" class:active={season === 'summer'}>
		<!-- Deep, subtle heat flares -->
		<div class="summer-flare s-1"></div>
		<div class="summer-flare s-2"></div>
		<div class="summer-flare s-3"></div>

		<!-- Sideways drifting glowing elements (fireflies / dust motes) -->
		<div class="summer-dust sd-1"></div>
		<div class="summer-dust sd-2"></div>
		<div class="summer-dust sd-3"></div>
		<div class="summer-dust sd-4"></div>
	</div>

	<!-- Autumn Effects -->
	<div class="season-layer" class:active={season === 'autumn'}>
		<!-- Minimal styled falling leaves -->
		<svg class="autumn-leaf a-1" viewBox="0 0 24 24">
			<path
				d="M12,2 C17,5 20,10 17,17 C15,19 13.5,21 12,23 C10.5,21 9,19 7,17 C4,10 7,5 12,2 Z"
				fill="none"
				stroke="currentColor"
				stroke-width="1"
			/>
			<line x1="12" y1="2" x2="12" y2="18" stroke="currentColor" stroke-width="1" />
		</svg>
		<svg class="autumn-leaf a-2" viewBox="0 0 24 24">
			<path
				d="M12,3 C15,6 18,11 16,16 C14,18 13,20 12,21 C11,20 10,18 8,16 C6,11 9,6 12,3 Z"
				fill="none"
				stroke="currentColor"
				stroke-width="1.2"
			/>
		</svg>
		<svg class="autumn-leaf a-3" viewBox="0 0 24 24">
			<path
				d="M12,4 C14,6.5 16,10 15,14 C13.5,16 12.5,18 12,19 C11.5,18 10.5,16 9,14 C8,10 10,6.5 12,4 Z"
				fill="currentColor"
				opacity="0.6"
			/>
		</svg>
	</div>
</div>

<style>
	.bg-effects-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 0; /* Kept above body background but behind main content */
		pointer-events: none; /* Ignore all interactions */
		overflow: hidden;
	}

	.season-layer {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		visibility: hidden;
		transition:
			opacity 1.5s ease,
			visibility 1.5s ease;
		color: var(--accent); /* Drives SVG stroke/fill globally per active layer */
	}

	.season-layer.active {
		opacity: 0.35; /* Increased opacity so it is clearly visible */
		visibility: visible;
	}

	/* ======== WINTER ======== */
	@keyframes winter-fall {
		0% {
			transform: translateY(-5vh) rotate(0deg);
		}
		100% {
			transform: translateY(120vh) rotate(360deg);
		}
	}
	@keyframes sway-x {
		0%,
		100% {
			transform: translateX(0);
		}
		50% {
			transform: translateX(4vw);
		}
	}

	.winter-flake {
		position: absolute;
		width: 48px;
		height: 48px;
		animation:
			winter-fall 30s linear infinite,
			sway-x 8s ease-in-out infinite;
		/* will-change omitted — animations are slow enough the browser handles these fine */
	}
	.f-1 {
		left: 10%;
		top: -10%;
		animation-duration: 40s, 12s;
	}
	.f-2 {
		left: 80%;
		top: -20%;
		animation-duration: 35s, 10s;
		animation-delay:
			-10s,
			-3s;
		width: 64px;
		height: 64px;
	}

	.snow-dot {
		position: absolute;
		background-color: var(--accent);
		border-radius: 50%;
		animation:
			winter-fall 25s linear infinite,
			sway-x 6s ease-in-out infinite;
	}
	.d-1 {
		left: 30%;
		top: -5%;
		width: 6px;
		height: 6px;
		animation-duration: 20s, 7s;
	}
	.d-2 {
		left: 70%;
		top: -15%;
		width: 4px;
		height: 4px;
		animation-duration: 28s, 9s;
		animation-delay:
			-5s,
			-2s;
	}
	.d-3 {
		left: 50%;
		top: -20%;
		width: 8px;
		height: 8px;
		animation-duration: 22s, 8s;
		animation-delay:
			-15s,
			-4s;
		opacity: 0.5;
	}

	/* ======== SPRING ======== */
	@keyframes spring-rise {
		0% {
			transform: translateY(10vh) rotate(0deg) scale(0.8);
		}
		100% {
			transform: translateY(-120vh) rotate(180deg) scale(1);
		}
	}
	@keyframes gentle-sway {
		0%,
		100% {
			transform: translateX(-2vw);
		}
		50% {
			transform: translateX(2vw);
		}
	}

	.spring-petal {
		position: absolute;
		width: 48px;
		height: 48px;
		animation:
			spring-rise 25s linear infinite,
			gentle-sway 9s ease-in-out infinite;
	}
	.p-1 {
		left: 15%;
		bottom: -10%;
		animation-duration: 25s, 8s;
	}
	.p-2 {
		left: 85%;
		bottom: -5%;
		animation-duration: 30s, 11s;
		animation-delay:
			-10s,
			-5s;
		width: 64px;
		height: 64px;
	}

	.spring-blossom {
		position: absolute;
		width: 56px;
		height: 56px;
		animation:
			spring-rise 22s linear infinite,
			gentle-sway 10s ease-in-out infinite;
	}
	.b-1 {
		left: 45%;
		bottom: -15%;
		transform-origin: center;
		animation-duration: 28s, 7s;
	}
	.b-2 {
		left: 70%;
		bottom: -20%;
		width: 40px;
		height: 40px;
		animation-duration: 35s, 9s;
		animation-delay:
			-15s,
			-4s;
	}

	.spring-pollen {
		position: absolute;
		background-color: var(--accent);
		border-radius: 50%;
		animation:
			spring-rise 30s linear infinite,
			gentle-sway 6s ease-in-out infinite;
		opacity: 0.8;
	}
	.pol-1 {
		left: 35%;
		width: 6px;
		height: 6px;
		animation-duration: 20s, 6s;
		animation-delay: -5s;
	}
	.pol-2 {
		left: 60%;
		width: 5px;
		height: 5px;
		animation-duration: 28s, 8s;
		animation-delay: -12s;
	}
	.pol-3 {
		left: 85%;
		width: 8px;
		height: 8px;
		animation-duration: 18s, 7s;
		animation-delay: -2s;
	}

	/* ======== SUMMER ======== */
	@keyframes summer-flare-pulse {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.05;
		}
		50% {
			transform: scale(1.1);
			opacity: 0.25;
		} /* Moderated opacity to avoid washing out UI */
	}
	@keyframes summer-drift {
		0% {
			transform: translate(0, 0);
		}
		100% {
			transform: translate(10vw, -10vh);
		}
	}
	@keyframes summer-drift-x {
		0% {
			transform: translate3d(0, 0, 0);
		}
		100% {
			transform: translate3d(130vw, -15vh, 0);
		}
	}

	/*
	 * Summer flares: blur is on a STATIC child so it is painted once.
	 * Only opacity + transform animate on the outer shell — compositor-only.
	 */
	.summer-flare {
		position: absolute;
		border-radius: 50%;
		/* Animate only compositor-friendly properties */
		animation:
			summer-flare-pulse 10s ease-in-out infinite alternate,
			summer-drift 20s ease-in-out infinite alternate;
		will-change: transform, opacity;
	}
	/* The blurred blob lives here — static, never animated */
	.summer-flare::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 50%;
		background-color: var(--accent);
		filter: blur(40px);
	}
	.s-1 {
		top: 10%;
		right: 10%;
		width: 30vw;
		height: 30vw;
		animation-duration: 12s, 30s;
	}
	.s-2 {
		bottom: 10%;
		left: 5%;
		width: 20vw;
		height: 20vw;
		animation-duration: 9s, 25s;
		animation-delay:
			-3s,
			-5s;
	}
	.s-3 {
		top: 40%;
		left: 40%;
		width: 15vw;
		height: 15vw;
		animation-duration: 15s, 35s;
		animation-delay:
			-7s,
			-12s;
	}

	@keyframes summer-dust-fade {
		0%,
		100% {
			opacity: 0.1;
		}
		50% {
			opacity: 0.8;
		}
	}

	.summer-dust {
		position: absolute;
		width: 5px;
		height: 5px;
		background-color: var(--accent);
		border-radius: 50%;
		/* All three animations use only transform/opacity — compositor-thread safe */
		animation:
			summer-drift-x 35s linear infinite,
			summer-dust-fade 4s ease-in-out infinite alternate;
		will-change: transform, opacity;
		box-shadow: 0 0 10px 2px var(--accent);
	}
	.sd-1 {
		top: 30%;
		left: -10vw;
		animation-duration: 35s, 10s, 3s;
	}
	.sd-2 {
		top: 60%;
		left: -10vw;
		animation-duration: 40s, 12s, 4s;
		animation-delay:
			-10s,
			-3s,
			-1s;
		width: 3px;
		height: 3px;
	}
	.sd-3 {
		top: 80%;
		left: -10vw;
		animation-duration: 25s, 8s, 5s;
		animation-delay:
			-5s,
			-7s,
			-2s;
		width: 6px;
		height: 6px;
	}
	.sd-4 {
		top: 20%;
		left: -10vw;
		animation-duration: 30s, 9s, 3.5s;
		animation-delay:
			-20s,
			-2s,
			0s;
		width: 4px;
		height: 4px;
	}

	/* ======== AUTUMN ======== */
	/* Single keyframe handles both fall + sway — no transform conflict */
	@keyframes autumn-fall {
		0% {
			transform: translate3d(-4vw, -10vh, 0) rotate(-20deg);
		}
		33% {
			transform: translate3d(4vw, 33vh, 0) rotate(60deg);
		}
		66% {
			transform: translate3d(-3vw, 77vh, 0) rotate(110deg);
		}
		100% {
			transform: translate3d(4vw, 120vh, 0) rotate(160deg);
		}
	}

	.autumn-leaf {
		position: absolute;
		width: 40px;
		height: 40px;
		animation: autumn-fall 20s linear infinite;
		transform-origin: center;
	}
	.a-1 {
		left: 20%;
		animation-duration: 18s, 5s;
	}
	.a-2 {
		left: 60%;
		top: -15%;
		animation-duration: 22s, 7s;
		animation-delay:
			-5s,
			-2s;
		width: 32px;
		height: 32px;
	}
	.a-3 {
		left: 85%;
		top: -30%;
		animation-duration: 16s, 4s;
		animation-delay:
			-8s,
			-1s;
		width: 48px;
		height: 48px;
	}
</style>
