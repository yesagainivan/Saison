import { appSettings } from './stores/settings.svelte';

export const UI_STRINGS = {
	tagline: {
		en: 'Seasonal produce guide',
		fr: 'Guide des produits de saison'
	},
	dial: {
		en: 'Dial',
		fr: 'Le Cadran'
	},
	ecosystem: {
		en: 'Ecosystem',
		fr: "L'Écosystème"
	},
	ecosystem_title: {
		en: 'The Ecosystem Map',
		fr: "La Carte de l'Écosystème"
	},
	ecosystem_desc: {
		en: 'Select a plant to illuminate its natural companions and conflicting neighbours.',
		fr: 'Sélectionnez une plante pour éclairer ses compagnons naturels et ses voisins conflictuels.'
	},
	settings: {
		en: 'Settings',
		fr: 'Réglages'
	},
	harvesting: {
		en: 'Harvesting',
		fr: 'Récolte'
	},
	sowing: {
		en: 'Sowing',
		fr: 'Plantation'
	},
	my_garden: {
		en: 'My Garden',
		fr: 'Mon Jardin'
	},
	peak_harvest: {
		en: 'Peak Harvest',
		fr: 'Récolte Optimale'
	},
	planting_window: {
		en: 'Planting Window',
		fr: 'Période de Plantation'
	},
	back: {
		en: 'Back',
		fr: 'Retour'
	},
	companions: {
		en: 'Companions',
		fr: 'Compagnons'
	},
	avoid: {
		en: 'Avoid Planting With',
		fr: 'Éviter de planter avec'
	},
	items: {
		en: 'items',
		fr: 'produits'
	},
	empty_garden: {
		en: "You haven't planted anything yet!",
		fr: "Vous n'avez encore rien planté !"
	},
	no_produce: {
		en: 'No produce recorded for this filter in',
		fr: 'Aucun produit enregistré pour ce filtre en'
	},
	hemisphere: {
		en: 'Hemisphere',
		fr: 'Hémisphère'
	},
	northern: {
		en: 'Northern',
		fr: 'Nord'
	},
	southern: {
		en: 'Southern',
		fr: 'Sud'
	},
	language: {
		en: 'Language',
		fr: 'Langue'
	},
	climate_shift: {
		en: 'Microclimate Shift',
		fr: 'Décalage Microclimat'
	},
	configuration: {
		en: 'Configuration',
		fr: 'Configuration'
	},
	settings_desc: {
		en: 'Shift the botanical calendar to perfectly match your locality.',
		fr: "Ajustez le calendrier botanique pour qu'il corresponde parfaitement à votre localité."
	},
	northern_desc: {
		en: 'Jan–Feb acts as Winter. Jul–Aug acts as Summer.',
		fr: "Jan–Fév correspond à l'Hiver. Juil–Août à l'Été."
	},
	southern_desc: {
		en: 'Jan–Feb acts as Summer. Jul–Aug acts as Winter.',
		fr: "Jan–Fév correspond à l'Été. Juil–Août à l'Hiver."
	},
	shift_info: {
		en: 'Dial the calendar back or forwards if your local spring starts earlier or later than standard temperate zones.',
		fr: 'Avancez ou reculez le calendrier si votre printemps local commence plus tôt ou plus tard que dans les zones tempérées standards.'
	},
	shift_colder: {
		en: 'Colder / Later (-1 Month)',
		fr: 'Plus froid / Tardif (-1 Mois)'
	},
	shift_standard: {
		en: 'Standard Temperate (Zone 7)',
		fr: 'Tempéré Standard (Zone 7)'
	},
	shift_warmer: {
		en: 'Warmer / Earlier (+1 Month)',
		fr: 'Plus chaud / Précoce (+1 Mois)'
	},
	english: {
		en: 'English',
		fr: 'Anglais'
	},
	french: {
		en: 'French',
		fr: 'Français'
	}
};

export function t(key: keyof typeof UI_STRINGS): string {
	const lang = appSettings.language;
	return UI_STRINGS[key][lang] || UI_STRINGS[key]['en'];
}
