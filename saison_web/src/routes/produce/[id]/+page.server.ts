import type { PageServerLoad, EntryGenerator } from './$types';
import { db } from '$lib/db';
import type { Produce } from '$lib/types';
import { error } from '@sveltejs/kit';

export const entries: EntryGenerator = () => {
	const rows = db.query<{ id: string }, []>('SELECT id FROM produce').all();
	return rows.map((row) => ({ id: row.id }));
};

interface ProduceName {
	id: string;
	name: string;
	name_fr: string | null;
}

export const load: PageServerLoad = ({ params }) => {
	// SvelteKit automatically creates params.id because the folder is [id]
	const produce = db.query<Produce, string>('SELECT * FROM produce WHERE id = ?').get(params.id);

	if (!produce) {
		throw error(404, 'Produce not found');
	}

	// Resolve companion/avoid IDs → {name, name_fr} so the client can display
	// language-aware names without a second round-trip.
	const parseIds = (raw: unknown): string[] => {
		if (!raw) return [];
		try {
			const parsed = JSON.parse(raw as string);
			return Array.isArray(parsed) ? parsed : [];
		} catch {
			return [];
		}
	};

	const allIds = [...new Set([...parseIds(produce.companions), ...parseIds(produce.avoid)])];

	let companionMap: Record<string, { name: string; name_fr: string | null }> = {};

	if (allIds.length > 0) {
		const placeholders = allIds.map(() => '?').join(', ');
		const rows = db
			.query<
				ProduceName,
				string[]
			>(`SELECT id, name, name_fr FROM produce WHERE id IN (${placeholders})`)
			.all(...allIds);

		for (const row of rows) {
			companionMap[row.id] = { name: row.name, name_fr: row.name_fr };
		}
	}

	return {
		produce,
		companionMap
	};
};
