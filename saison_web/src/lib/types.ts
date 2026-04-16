export interface Produce {
	id: string;
	name: string;
	name_fr: string | null;
	category: 'fruit' | 'vegetable' | 'herb' | 'flower';
	featured: boolean;
	description: string | null;
	description_fr: string | null;
	season_start: number;
	season_end: number;
	planting_start: number | null;
	planting_end: number | null;
	harvest_start: number | null;
	harvest_end: number | null;
	hemisphere: 'northern' | 'southern';
	zone_offset: number;
	colors: string[] | null;
	companions: string[] | null;
	avoid: string[] | null;
	illustration: string | null;
}

export const MONTHS = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

export const MONTHS_FR = [
	'Janvier',
	'Février',
	'Mars',
	'Avril',
	'Mai',
	'Juin',
	'Juillet',
	'Août',
	'Septembre',
	'Octobre',
	'Novembre',
	'Décembre'
];

export const SHORT_MONTHS = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec'
];

export const SHORT_MONTHS_FR = [
	'Jan',
	'Fév',
	'Mar',
	'Avr',
	'Mai',
	'Juin',
	'Juil',
	'Août',
	'Sep',
	'Oct',
	'Nov',
	'Déc'
];

export const SEASONS: Record<string, number[]> = {
	winter: [12, 1, 2],
	spring: [3, 4, 5],
	summer: [6, 7, 8],
	autumn: [9, 10, 11]
};

export function getSeasonForMonth(month: number): string {
	for (const [season, months] of Object.entries(SEASONS)) {
		if (months.includes(month)) return season;
	}
	return 'winter';
}

export const SEASON_LABELS: Record<string, Record<string, string>> = {
	winter: { en: 'Winter', fr: 'Hiver' },
	spring: { en: 'Spring', fr: 'Printemps' },
	summer: { en: 'Summer', fr: 'Été' },
	autumn: { en: 'Autumn', fr: 'Automne' }
};

export const CATEGORY_LABELS: Record<string, Record<string, string>> = {
	fruit: { en: 'Fruit', fr: 'Fruits' },
	vegetable: { en: 'Vegetable', fr: 'Légumes' },
	herb: { en: 'Herb', fr: 'Herbes & Aromates' },
	flower: { en: 'Flower', fr: 'Fleurs' }
};
