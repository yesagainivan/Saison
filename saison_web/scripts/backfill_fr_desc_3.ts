import fs from 'node:fs/promises';
import path from 'node:path';
import yaml from 'js-yaml';

const translations: Record<string, string> = {
	lettuce:
		"Base croquante et rafraîchissante pour d'innombrables salades, incluant les variétés à couper et les laitues pommées.",
	melon:
		"Fruit d'été sucré et très hydratant, à déguster bien frais lors des journées les plus chaudes.",
	mint: 'Herbe revigorante et parfumée, essentielle pour les thés, les cocktails et les desserts rafraîchissants.',
	mirabelle:
		'Une petite prune dorée et très sucrée de la région de Lorraine, à la saison exceptionnellement courte.',
	okra: 'Ingrédient clé des cuisines du sud, connu pour sa texture unique et sa capacité à épaissir les ragoûts.',
	onion:
		'Légume-bulbe aromatique fondamental, base indispensable des saveurs pour les soupes, ragoûts et rôtis.',
	orange:
		"Agrume éclatant qui apporte une explosion de vitamine C et de soleil durant les mois d'hiver.",
	oregano:
		'Herbe méditerranéenne robuste et parfumée, essentielle pour les pizzas, les tomates et les sauces de pâtes.',
	parsley:
		"L'herbe la plus populaire au monde, offrant une touche de fraîcheur herbacée indispensable à de nombreux plats.",
	parsnip:
		"Plus sucré et plus crémeux que la carotte, le panais est excellent dans les rôtis d'hiver et les soupes veloutées.",
	peas: 'Sucrés et tendres, les petits pois sont meilleurs cueillis jeunes pour une saveur et une texture optimales.',
	potato:
		"L'aliment réconfortant par excellence, incroyablement polyvalent et pilier de nombreuses traditions culinaires.",
	pumpkin:
		"Courge d'automne éclatante, aussi célèbre pour les décorations que pour ses utilisations en potages ou desserts.",
	radish:
		'Croquant et poivré, le radis est un favori du printemps à croissance rapide, idéal à croquer avec du beurre.',
	raspberry:
		'Délicate et intensément parfumée, la framboise est un véritable trésor estival des jardins.',
	rosemary:
		'Herbe ligneuse vivace au puissant arôme rappelant le pin, symbole de la cuisine méditerranéenne.',
	rutabaga:
		"Une racine d'hiver consistante et rustique, croisement naturel entre un navet et un chou.",
	sage: 'Herbe veloutée et aromatique qui se marie parfaitement avec les viandes rôties, les farces et les sauces au beurre.',
	salsify:
		"Également connu sous le nom de 'plante huître', le salsifis possède une saveur douce et délicate.",
	shallot:
		"Prisée par les chefs pour sa saveur d'oignon subtile, sucrée et moins piquante que celle de l'oignon classique."
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
