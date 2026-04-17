<script lang="ts">
	import '../app.css';
	import { getSeasonForMonth } from '$lib/types';
	import { setContext } from 'svelte';
	import { page } from '$app/state';
	import { appSettings } from '$lib/stores/settings.svelte';
	import { t } from '$lib/i18n';
	import { resolve } from '$app/paths';
	import SearchPalette from '$lib/components/SearchPalette.svelte';
	import BackgroundEffects from '$lib/components/BackgroundEffects.svelte';
	import { searchStore } from '$lib/stores/search.svelte';
	import { browser } from '$app/environment';

	let { data, children } = $props();

	// Populate global search index once on startup
	$effect(() => {
		if (data.searchIndex) {
			searchStore.populate(data.searchIndex);
		}
	});

	let initialMonth = (browser && Number(page.url.searchParams.get('month'))) || new Date().getMonth() + 1;
	let currentMonth = $state(initialMonth);

	// Sync back to URL or just let it stay local, local is fine for the wheel since it's an app-like experience
	let currentSeason = $derived(getSeasonForMonth(appSettings.transformMonth(currentMonth)));

	$effect(() => {
		if (typeof document !== 'undefined') {
			document.body.setAttribute('data-season', currentSeason);
		}
	});

	// Provide to children
	setContext('currentMonth', {
		get month() {
			return currentMonth;
		},
		set month(v) {
			currentMonth = v;
		}
	});
	setContext('currentSeason', () => currentSeason);

	// Derived active states for tabs
	let isDialActive = $derived(page.url.pathname === '/' || page.url.pathname.startsWith('/produce'));
	let isEcoActive = $derived(page.url.pathname === '/ecosystem');
	let isSettingsActive = $derived(page.url.pathname === '/settings');
</script>

<header class="s-header">
	<div class="s-logo-group">
		<div class="s-logo">Sa<em>i</em>son</div>
		<div class="s-tagline">{t('tagline')}</div>
	</div>
	<!-- Desktop nav only -->
	<nav class="s-nav s-nav--desktop">
		<a
			href={resolve('/')}
			class="nav-link"
			class:active={isDialActive}
			>{t('dial')}</a
		>
		<a
			href={resolve('/ecosystem')}
			class="nav-link"
			class:active={isEcoActive}>{t('ecosystem')}</a
		>
		<a href={resolve('/settings')} class="nav-link" class:active={isSettingsActive}
			>{t('settings')}</a
		>
		<button
			class="nav-icon-btn"
			onclick={() => searchStore.open()}
			aria-label={t('search')}
			title="{t('search')} (⌘K)"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<circle cx="11" cy="11" r="8"></circle>
				<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
			</svg>
			<kbd class="shortcut-hint">⌘K</kbd>
		</button>
	</nav>
</header>

<BackgroundEffects />

<main>
	{@render children()}
</main>

<!-- Mobile bottom tab bar -->
<nav class="s-nav--mobile" aria-label="Main navigation">
	<a href={resolve('/')} class="tab-item" class:active={isDialActive}>
		<!-- Dial / Wheel icon -->
		<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
			<circle cx="12" cy="12" r="10"/>
			<circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/>
			<line x1="12" y1="12" x2="12" y2="5"/>
		</svg>
		<span class="tab-label">{t('dial')}</span>
	</a>

	<a href={resolve('/ecosystem')} class="tab-item" class:active={isEcoActive}>
		<!-- Leaf / Ecosystem icon -->
		<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
			<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/>
			<path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
		</svg>
		<span class="tab-label">{t('ecosystem')}</span>
	</a>

	<button class="tab-item tab-search" onclick={() => searchStore.open()} aria-label={t('search')}>
		<!-- Search icon -->
		<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
			<circle cx="11" cy="11" r="8"/>
			<line x1="21" y1="21" x2="16.65" y2="16.65"/>
		</svg>
		<span class="tab-label">{t('search')}</span>
	</button>

	<a href={resolve('/settings')} class="tab-item" class:active={isSettingsActive}>
		<!-- Settings / sliders icon -->
		<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
			<line x1="4" y1="6" x2="20" y2="6"/>
			<line x1="4" y1="12" x2="20" y2="12"/>
			<line x1="4" y1="18" x2="20" y2="18"/>
			<circle cx="8" cy="6" r="2" fill="var(--bg)" stroke="currentColor"/>
			<circle cx="16" cy="12" r="2" fill="var(--bg)" stroke="currentColor"/>
			<circle cx="10" cy="18" r="2" fill="var(--bg)" stroke="currentColor"/>
		</svg>
		<span class="tab-label">{t('settings')}</span>
	</a>
</nav>

<SearchPalette />

<style>
	.s-header {
		padding: 1rem 1.25rem 0;
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		border-bottom: 1px solid var(--border);
		padding-bottom: 0.875rem;
		transition: border-color var(--dur) ease;
		position: relative;
		z-index: 10;
	}

	.s-logo-group {
		display: flex;
		align-items: baseline;
		gap: 1rem;
	}

	/* Desktop nav */
	.s-nav--desktop {
		display: none;
		gap: 1.5rem;
	}

	@media (min-width: 640px) {
		.s-header {
			padding: 1.5rem 1.5rem 0;
			padding-bottom: 1rem;
		}

		.s-nav--desktop {
			display: flex;
			align-items: center;
		}
	}

	.nav-link {
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		color: var(--text-muted);
		transition: color 0.2s ease;
	}

	.nav-link:hover,
	.nav-link.active {
		color: var(--text);
	}

	.nav-icon-btn {
		background: none;
		border: none;
		color: var(--text-muted);
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 0;
		transition: color 0.2s ease;
	}

	.nav-icon-btn:hover {
		color: var(--text);
	}

	.shortcut-hint {
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		font-size: 10px;
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: 4px;
		padding: 2px 4px;
		color: var(--text-muted);
		display: none;
	}

	@media (min-width: 768px) {
		.shortcut-hint {
			display: inline-block;
		}
	}

	.s-logo {
		font-family: 'DM Serif Display', serif;
		font-size: 22px;
		letter-spacing: -0.02em;
		color: var(--text);
		transition: color var(--dur) ease;
	}

	.s-logo em {
		font-style: italic;
		color: var(--accent);
		transition: color var(--dur) ease;
	}

	.s-tagline {
		font-size: 11px;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--text-muted);
		transition: color var(--dur) ease;
		/* Hide tagline on very small phones to save space */
		display: none;
	}

	@media (min-width: 400px) {
		.s-tagline {
			display: block;
		}
	}

	main {
		max-width: 1200px;
		margin: 0 auto;
		/* Add bottom clearance for the mobile tab bar + safe area */
		padding-bottom: calc(72px + env(safe-area-inset-bottom, 0px));
		position: relative;
		z-index: 1;
	}

	@media (min-width: 640px) {
		main {
			padding-bottom: 4rem;
		}
	}

	/* ─── Mobile bottom tab bar ─── */
	.s-nav--mobile {
		display: flex;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 100;
		background: var(--bg-surface);
		border-top: 1px solid var(--border);
		/* Extend into the home indicator safe area */
		padding-bottom: env(safe-area-inset-bottom, 0px);
		transition:
			background-color var(--dur) ease,
			border-color var(--dur) ease;
		/* Frosted glass feel */
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
	}

	/* Only show on mobile */
	@media (min-width: 640px) {
		.s-nav--mobile {
			display: none;
		}
	}

	.tab-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 3px;
		padding: 10px 4px 8px;
		color: var(--text-muted);
		text-decoration: none;
		background: none;
		border: none;
		cursor: pointer;
		transition: color 0.18s ease;
		-webkit-tap-highlight-color: transparent;
		position: relative;
	}

	.tab-item::before {
		content: '';
		position: absolute;
		top: 6px;
		left: 50%;
		transform: translateX(-50%) scaleX(0);
		width: 28px;
		height: 3px;
		border-radius: 2px;
		background: var(--accent);
		transition:
			transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1),
			background-color var(--dur) ease;
	}

	.tab-item.active::before {
		transform: translateX(-50%) scaleX(1);
	}

	.tab-item.active {
		color: var(--accent);
	}

	.tab-item:hover {
		color: var(--text);
	}

	.tab-label {
		font-size: 9.5px;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		font-weight: 500;
		line-height: 1;
	}

	/* Search tab has a subtle highlight pill */
	.tab-search {
		position: relative;
	}
</style>
