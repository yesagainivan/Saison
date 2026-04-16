import type { LayoutServerLoad } from './$types';
import { db } from '$lib/db';
import type { Produce } from '$lib/types';

export const load: LayoutServerLoad = () => {
	// A lightweight query just for the global search index.
	// We don't need descriptions or companions here to save memory.
	const index = db
		.query(
			'SELECT id, name, name_fr, category, illustration, season_start, season_end FROM produce ORDER BY name ASC'
		)
		.all();

	return {
		searchIndex: index as Produce[]
	};
};
