import fs from 'node:fs/promises';
import path from 'node:path';
import yaml from 'js-yaml';

const translations: Record<string, string> = {
	cherry:
		"Le premier des fruits à noyau de l'été. Petit, rond et intensément savoureux, il est aussi prisé pour ses fleurs printanières que pour ses fruits.",
	chervil:
		"Une herbe délicate au goût d'anis, essentielle pour les 'fines herbes' françaises et les garnitures raffinées.",
	chives:
		"Herbe élégante ressemblant à de l'herbe avec un léger goût d'oignon. Parfaite pour les garnitures et les beurres composés.",
	cilantro:
		'Herbe zestée et polarisante, essentielle pour les salsas, les curries et de nombreux plats du monde.',
	corn: "Incontournable de l'été, le maïs sucré s'épanouit avec la chaleur et beaucoup de soleil.",
	cucumber:
		"Rafraîchissant et frais, le concombre est idéal pour les salades d'été et les conserves au vinaigre.",
	currant:
		'Petites baies ressemblant à des bijoux qui poussent en grappes translucides. Parfaites pour les gelées.',
	dill: "Herbe plumeuse à l'arôme distinct, parfaite pour le poisson, les pommes de terre et les cornichons.",
	eggplant:
		'Solanacée veloutée qui absorbe magnifiquement les saveurs une fois cuite, pilier de la ratatouille.',
	endive:
		"Chicorée croquante et légèrement amère, prisée dans les salades d'hiver ou braisée au jambon.",
	fennel:
		"Bulbe aromatique au léger goût d'anis, excellent cru en salade ou braisé avec du poisson.",
	garlic:
		'Bulbe piquant essentiel pour construire des saveurs profondes dans presque toutes les cuisines du monde.',
	grapefruit:
		"Gros agrume rafraîchissant avec un équilibre complexe de douceur, d'acidité et d'amertume.",
	green_bean:
		"Légumineuse estivale essentielle. En France, le 'haricot vert' fin est prisé pour son croquant et sa tendreté.",
	hot_pepper:
		"Ajoute de la chaleur et de l'intensité aux plats, allant du piment doux au piment brûlant.",
	kale: 'Légume-feuille robuste et nutritif qui devient plus sucré après les premières gelées.',
	kiwi: "Petit fruit duveteux à l'intérieur vert éclatant et à la saveur acidulée-sucrée rafraîchissante.",
	kohlrabi:
		'Brassica unique ressemblant à un navet avec une texture croquante et rafraîchissante comme une pomme.',
	leek: 'Une alternative douce et légère aux oignons, pilier des soupes (vichyssoise) et des tartes aux légumes.',
	lemon:
		"Agrume polyvalent apportant une acidité essentielle et un zeste éclatant à la cuisine toute l'année."
};

async function backfill() {
	const produceDir = path.join(process.cwd(), 'data', 'produce');

	for (const [id, descFr] of Object.entries(translations)) {
		const filePath = path.join(produceDir, `${id}.md`);
		try {
			const raw = await fs.readFile(filePath, 'utf-8');
			const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
			if (!match) continue;

			const frontmatter = yaml.load(match[1]) as Record<string, unknown>;
			const body = match[2].trim();

			frontmatter.description = body || frontmatter.description;
			frontmatter.description_fr = descFr;

			const newContent = `---\n${yaml.dump(frontmatter)}---\n`;
			await fs.writeFile(filePath, newContent, 'utf-8');
			console.log(`Updated ${id}`);
		} catch (e) {
			console.error(`Error processing ${id}: ${e.message}`);
		}
	}
}

backfill();
