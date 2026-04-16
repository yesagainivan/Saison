import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	const m = parseInt(params.month);
	if (!isNaN(m) && m >= 1 && m <= 12) {
		throw redirect(302, `/?month=${m}`);
	}
	throw redirect(302, '/');
};
