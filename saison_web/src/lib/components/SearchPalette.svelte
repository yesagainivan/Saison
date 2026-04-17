<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { searchStore } from '$lib/stores/search.svelte';
	import { appSettings } from '$lib/stores/settings.svelte';
	import { t } from '$lib/i18n';
	import { resolve, asset } from '$app/paths';
	import CategoryBadge from './CategoryBadge.svelte';

	let query = $state('');
	let inputRef = $state<HTMLInputElement | null>(null);
	let selectedIndex = $state(0);

	// Derived filtered results
	let results = $derived.by(() => {
		const q = query.toLowerCase().trim();
		if (!q) return [];

		return searchStore.allProduce.filter((p) => {
			if (p.name.toLowerCase().includes(q)) return true;
			if (p.name_fr?.toLowerCase().includes(q)) return true;
			if (p.category.toLowerCase().includes(q)) return true;
			return false;
		});
	});

	// Reset selection when results change
	$effect(() => {
		if (query) selectedIndex = 0;
	});

	// Focus input when palette opens
	$effect(() => {
		if (searchStore.isOpen) {
			query = '';
			selectedIndex = 0;
			// Tick delay to ensure DOM is ready
			setTimeout(() => inputRef?.focus(), 50);
		}
	});

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			searchStore.close();
			return;
		}

		if (results.length === 0) return;

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			selectedIndex = (selectedIndex + 1) % results.length;
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			selectedIndex = (selectedIndex - 1 + results.length) % results.length;
		} else if (e.key === 'Enter') {
			e.preventDefault();
			navigateTo(results[selectedIndex].id);
		}
	}

	function navigateTo(id: string) {
		searchStore.close();
		window.location.href = resolve(`/produce/${id}`);
	}
</script>

<svelte:window
	onkeydown={(e) => {
		// Global shortcut: Cmd+K or Ctrl+K
		if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
			e.preventDefault();
			searchStore.toggle();
		}
	}}
/>

{#if searchStore.isOpen}
	<div class="backdrop" in:fade={{ duration: 150 }} out:fade={{ duration: 100 }}>
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div class="backdrop-click" onclick={() => searchStore.close()}></div>

		<div class="palette" in:fly={{ y: 8, duration: 250, easing: cubicOut }}>
			<div class="search-header">
				{@render SearchIcon()}
				<input
					bind:this={inputRef}
					bind:value={query}
					onkeydown={handleKeydown}
					placeholder={t('search_placeholder')}
					autocomplete="off"
					spellcheck="false"
				/>
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<button class="close-btn" onclick={() => searchStore.close()}>
					{@render EscIcon()}
				</button>
			</div>

			{#if query.trim() !== ''}
				<div class="results-container">
					{#if results.length === 0}
						<div class="no-results">
							{t('no_results')} "{query}"
						</div>
					{:else}
						<ul class="results-list" role="listbox">
							{#each results as p, i (p.id)}
								{@const isFr = appSettings.language === 'fr'}
								{@const primary = isFr && p.name_fr ? p.name_fr : p.name}
								{@const secondary = isFr ? p.name : p.name_fr}
								<!-- svelte-ignore a11y_click_events_have_key_events -->
								<li
									class="result-item"
									role="option"
									aria-selected={i === selectedIndex}
									class:selected={i === selectedIndex}
									onclick={() => navigateTo(p.id)}
									onmousemove={() => (selectedIndex = i)}
								>
									<div class="r-illus">
										{#if p.illustration}
											<img src={asset(`/illustrations/${p.illustration}`)} alt="" />
										{:else}
											<div class="r-placeholder"></div>
										{/if}
									</div>
									<div class="r-text">
										<span class="r-primary">{primary}</span>
										{#if secondary}
											<span class="r-secondary">{secondary}</span>
										{/if}
									</div>
									<div class="r-meta">
										<CategoryBadge category={p.category} />
									</div>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			{/if}
		</div>
	</div>
{/if}

{#snippet SearchIcon()}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		class="s-icon"
	>
		<circle cx="11" cy="11" r="8"></circle>
		<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
	</svg>
{/snippet}

{#snippet EscIcon()}
	<kbd class="esc-kbd">ESC</kbd>
{/snippet}

<style>
	.backdrop {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 1000;
		display: flex;
		justify-content: center;
		align-items: flex-start;
		padding-top: 12vh;
	}

	.backdrop-click {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(46, 53, 64, 0.4);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
	}

	.palette {
		position: relative;
		width: 90%;
		max-width: 580px;
		background: var(--bg-surface);
		border: 1px solid var(--border);
		border-radius: 12px;
		box-shadow: 0 16px 40px rgba(0, 0, 0, 0.15);
		overflow: hidden;
		display: flex;
		flex-direction: column;
		max-height: 70vh;
	}

	.search-header {
		display: flex;
		align-items: center;
		padding: 1rem 1.25rem;
		border-bottom: 1px solid var(--border);
		gap: 1rem;
	}

	:global(.s-icon) {
		color: var(--text-muted);
		opacity: 0.7;
	}

	input {
		flex: 1;
		appearance: none;
		border: none;
		background: transparent;
		font-family: inherit;
		font-size: 1.125rem;
		color: var(--text);
		outline: none;
	}

	input::placeholder {
		color: var(--text-muted);
		opacity: 0.5;
	}

	.close-btn {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		display: flex;
		align-items: center;
	}

	.esc-kbd {
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		font-size: 10px;
		color: var(--text-muted);
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: 4px;
		padding: 2px 6px;
	}

	.results-container {
		overflow-y: auto;
		padding: 0.5rem 0;
	}

	.no-results {
		padding: 3rem 2rem;
		text-align: center;
		color: var(--text-muted);
		font-style: italic;
	}

	.results-list {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.result-item {
		display: flex;
		align-items: center;
		padding: 0.75rem 1.25rem;
		gap: 1rem;
		cursor: pointer;
		transition: background-color 0.1s ease;
	}

	.result-item.selected {
		background-color: var(--bg-card);
	}

	.r-illus {
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.r-illus img {
		max-width: 100%;
		max-height: 100%;
		mix-blend-mode: multiply;
	}

	.r-text {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.r-primary {
		color: var(--text);
		font-weight: 500;
		line-height: 1.2;
	}

	.r-secondary {
		color: var(--text-muted);
		font-size: 0.8rem;
		font-style: italic;
		line-height: 1.2;
	}

	.r-meta {
		display: flex;
		align-items: center;
		/* Using global transform scale because the badge component is a bit big for a list */
		transform: scale(0.85);
		transform-origin: right center;
	}
</style>
