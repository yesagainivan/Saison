import type { Produce } from '$lib/types';

class SearchStore {
	allProduce = $state<Produce[]>([]);
	isOpen = $state(false);

	populate(items: Produce[]) {
		this.allProduce = items;
	}

	open() {
		this.isOpen = true;
	}

	close() {
		this.isOpen = false;
	}

	toggle() {
		this.isOpen = !this.isOpen;
	}
}

export const searchStore = new SearchStore();
