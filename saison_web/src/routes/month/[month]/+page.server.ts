import { redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';
import type { PageServerLoad, EntryGenerator } from './$types';

export const entries: EntryGenerator = () => {
	return Array.from({ length: 12 }, (_, i) => ({ month: String(i + 1) }));
};

export const load: PageServerLoad = ({ params }) => {
	const m = parseInt(params.month);
	if (!isNaN(m) && m >= 1 && m <= 12) {
		throw redirect(302, resolve(`/?month=${m}`));
	}
	throw redirect(302, resolve('/'));
};
