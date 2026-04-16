import { browser } from '$app/environment';

class GardenStore {
	planted = $state<string[]>([]);

	constructor() {
		if (browser) {
			const raw = localStorage.getItem('saison_garden');
			if (raw) {
				try {
					this.planted = JSON.parse(raw);
				} catch {
					// Ignore invalid JSON
				}
			}
		}
	}

	private sync() {
		if (browser) {
			localStorage.setItem('saison_garden', JSON.stringify(this.planted));
		}
	}

	add(id: string) {
		if (!this.planted.includes(id)) {
			this.planted.push(id);
			this.sync();
		}
	}

	remove(id: string) {
		const index = this.planted.indexOf(id);
		if (index > -1) {
			this.planted.splice(index, 1);
			this.sync();
		}
	}

	has(id: string) {
		return this.planted.includes(id);
	}
}

export const garden = new GardenStore();
