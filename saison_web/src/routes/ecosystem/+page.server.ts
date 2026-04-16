import type { PageServerLoad } from './$types';
import { db } from '$lib/db';
import type { Produce } from '$lib/types';

export const load: PageServerLoad = () => {
	// Return all produce
	const results = db.query('SELECT * FROM produce ORDER BY name ASC').all();
	return { produce: results as Produce[] };
};
