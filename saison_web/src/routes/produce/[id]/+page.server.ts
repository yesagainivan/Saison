import type { PageServerLoad } from './$types';
import { db } from '$lib/db';
import type { Produce } from '$lib/types';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = ({ params }) => {
	// SvelteKit automatically creates params.id because the folder is [id]
	const produce = db.query<Produce, string>('SELECT * FROM produce WHERE id = ?').get(params.id);

	if (!produce) {
		throw error(404, 'Produce not found');
	}

	return {
		produce
	};
};
