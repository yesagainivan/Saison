import fs from 'node:fs/promises';
import path from 'node:path';
import yaml from 'js-yaml';

const translations: Record<string, string> = {
	apple:
		"Le fruit du verger par excellence, allant de l'acidulé au doux comme le miel. Très polyvalent et capable de se conserver longtemps au frais.",
	apricot:
		"Veloutés et parfumés, les abricots sont des fruits à noyau qui s'épanouissent dans des endroits abrités et ensoleillés.",
	artichoke:
		'Un légume unique ressemblant à un chardon, prisé pour son cœur tendre et la base charnue de ses feuilles.',
	asparagus:
		"Des tiges élégantes qui annoncent l'arrivée du printemps. À déguster dès qu'elles sont récoltées pour une saveur optimale.",
	avocado:
		"Crémeux et riche en graisses saines, l'avocat est un fruit unique souvent servi dans des plats salés.",
	banana: "Disponible toute l'année, la banane est une source fiable d'énergie et de potassium.",
	basil:
		"Herbe d'été parfumée, essentielle pour le pesto, les salades caprese et de nombreux plats méditerranéens.",
	beans:
		'Légumineuses polyvalentes qui peuvent être consommées fraîches (en gousses) ou séchées pour des ragoûts consistants.',
	beetroot: 'Terreuse et sucrée, la betterave est magnifique rôtie, en salade ou même en jus.',
	bell_pepper:
		"Coloré et sucré, le poivron ajoute du croquant et de la douceur à n'importe quel plat, cru ou cuit.",
	blackberry: "Baies sauvages juteuses récoltées sur des ronces épineuses à la fin de l'été.",
	blueberry: 'Baies riches en antioxydants avec un profil de saveur sucré-acidulé délicat.',
	broccoli:
		'Brassica nutritif avec des fleurs denses ressemblant à de petits arbres, riche en vitamines.',
	brussels_sprout:
		"Choux miniatures qui développent leur douceur caractéristique après les premières gelées de l'automne.",
	butternut:
		"Une courge d'hiver en forme de cloche avec une peau beige lisse et une chair orange très sucrée.",
	cabbage:
		'Légume-feuille polyvalent utilisé dans les potées, les soupes et les fermentations comme la choucroute.',
	cardoon:
		'Un légume spectaculaire du terroir, ressemblant à un chardon géant, dont on consomme les côtes charnues.',
	carrot: 'Un légume-racine sucré et croquant, riche en bêta-carotène et indispensable en cuisine.',
	cauliflower: 'Un brassica polyvalent aux fleurs blanches denses, aussi délicieux rôti que cru.',
	celery:
		'Branches croquantes essentielles pour les fonds de sauce, les soupes et les jus rafraîchissants.'
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
