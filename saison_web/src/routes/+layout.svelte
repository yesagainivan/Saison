<script lang="ts">
	import '../app.css';
	import { getSeasonForMonth } from '$lib/types';
	import { setContext } from 'svelte';
	import { page } from '$app/state';
	import { appSettings } from '$lib/stores/settings.svelte';
	import { t } from '$lib/i18n';
	import { resolve } from '$app/paths';

	let { children } = $props();

	let initialMonth = Number(page.url.searchParams.get('month')) || new Date().getMonth() + 1;
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
</script>

<header class="s-header">
	<div class="s-logo-group">
		<div class="s-logo">Sa<em>i</em>son</div>
		<div class="s-tagline">{t('tagline')}</div>
	</div>
	<nav class="s-nav">
		<a
			href={resolve('/')}
			class="nav-link"
			class:active={page.url.pathname === '/' || page.url.pathname.startsWith('/produce')}
			>{t('dial')}</a
		>
		<a
			href={resolve('/ecosystem')}
			class="nav-link"
			class:active={page.url.pathname === '/ecosystem'}>{t('ecosystem')}</a
		>
		<a href={resolve('/settings')} class="nav-link" class:active={page.url.pathname === '/settings'}
			>{t('settings')}</a
		>
	</nav>
</header>

<main>
	{@render children()}
</main>

<style>
	.s-header {
		padding: 1.5rem 1.5rem 0;
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		border-bottom: 1px solid var(--border);
		padding-bottom: 1rem;
		transition: border-color var(--dur) ease;
	}

	.s-logo-group {
		display: flex;
		align-items: baseline;
		gap: 1rem;
	}

	.s-nav {
		display: flex;
		gap: 1.5rem;
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
	}

	main {
		max-width: 1200px;
		margin: 0 auto;
		padding-bottom: 4rem;
	}
</style>
