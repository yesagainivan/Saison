import fs from 'node:fs/promises';
import path from 'node:path';
import yaml from 'js-yaml';

const translations: Record<string, string> = {
	sorrel:
		'Une plante acidulée au goût marqué de citron, prisée pour sa fraîcheur et son acidité revigorante dans les sauces et les soupes.',
	spinach:
		"Légume-feuille hautement nutritif qui s'épanouit par temps frais et se consomme aussi bien cru que cuit.",
	strawberry:
		"La reine des baies de l'été, sucrée, parfumée et emblématique des premiers beaux jours.",
	sweet_potato:
		'Légume-racine tropical à la chair orange douce et polyvalente, parfait pour les rôtis ou les purées.',
	swiss_chard:
		'Magnifique légume-feuille aux côtes colorées et charnues, cousin de la betterave, dont on consomme tout.',
	tarragon:
		"Herbe aromatique au profil distinct de saveur anisée, pilier de la sauce béarnaise et du poulet à l'estragon.",
	thyme:
		'Herbe de cuisine essentielle aux feuilles minuscules mais très puissantes, indispensable pour les bouquets garnis.',
	tomato:
		"Le cœur du jardin d'été, incroyablement polyvalent, savoureux et décliné en une multitude de variétés.",
	turnip:
		"Légume-racine terreux et rustique qui devient délicieusement sucré et fondant lorsqu'il est cueilli jeune.",
	watermelon:
		'Rafraîchissante, hydratante et sucrée, elle est le symbole ultime des pique-niques de plein été.',
	white_asparagus:
		"Prisée pour sa saveur délicate et sa texture fine, elle est cultivée à l'abri de la lumière pour rester blanche.",
	zucchini:
		"Courge d'été à croissance rapide, extrêmement polyvalente en cuisine et souvent très abondante au potager.",
	persimmon:
		"Un fruit d'hiver sucré comme le miel qui ressemble à une tomate orange translucide. À déguster très mûr.",
	pomegranate:
		"Un fruit décoratif rempli de graines rubis juteuses, apportant une touche de couleur et d'acidité en fin d'automne.",
	romanesco:
		'Un chou visuellement époustouflant avec ses fleurs en spirales fractales et son goût de noisette.',
	red_cabbage:
		"Dense et éclatant, le chou rouge est un brassica incontournable de l'hiver, délicieux en salade ou braisé.",
	butternut:
		"Une courge d'hiver en forme de cloche, appréciée pour sa chair orange veloutée et son goût de beurre noisette.",
	potimarron:
		'Très prisé pour sa chair dense au goût de châtaigne. Sa peau fine peut se consommer une fois cuite.',
	green_bean:
		'Légumineuse estivale essentielle. Le haricot vert fin est un classique des potagers français pour sa tendreté.',
	pear: 'Un fruit élégant en forme de cloche avec une texture fondante et beurrée à maturité, excellent cru ou poché.',
	plum: 'Un groupe diversifié de fruits à noyau à la peau lisse et à la chair sucrée, de la quetsche à la reine-claude.'
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
