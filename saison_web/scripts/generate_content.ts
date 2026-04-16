import * as fs from 'fs';
import * as path from 'path';

const PRODUCE_DATA = [
	{
		id: 'carrot',
		name: 'Carrot',
		cat: 'vegetable',
		sStart: 6,
		sEnd: 11,
		pStart: 3,
		pEnd: 7,
		colors: ['#E67E22', '#D35400'],
		comp: ['onion', 'lettuce', 'rosemary', 'tomato'],
		avoid: ['dill', 'parsnip'],
		desc: 'A sweet, crunchy root vegetable packed with beta-carotene. Cultivated for its robust taproot.'
	},
	{
		id: 'onion',
		name: 'Onion',
		cat: 'vegetable',
		sStart: 6,
		sEnd: 9,
		pStart: 3,
		pEnd: 5,
		colors: ['#F1C40F', '#F39C12'],
		comp: ['carrot', 'beetroot', 'cabbage', 'lettuce'],
		avoid: ['beans', 'peas', 'asparagus'],
		desc: 'The ubiquitous culinary bulb. Offers a pungent aroma and forms the base of countless recipes globally.'
	},
	{
		id: 'garlic',
		name: 'Garlic',
		cat: 'herb',
		sStart: 6,
		sEnd: 8,
		pStart: 9,
		pEnd: 11,
		colors: ['#F5F5DC', '#E0E0D1'],
		comp: ['tomato', 'carrot', 'eggplant', 'cabbage'],
		avoid: ['beans', 'peas', 'parsley'],
		desc: 'A highly aromatic bulb related to the onion, widely used for its distinct flavour and alleged medicinal properties.'
	},
	{
		id: 'radish',
		name: 'Radish',
		cat: 'vegetable',
		sStart: 4,
		sEnd: 10,
		pStart: 3,
		pEnd: 9,
		colors: ['#E74C3C', '#C0392B'],
		comp: ['beans', 'carrot', 'cucumber', 'lettuce'],
		avoid: ['hyssop'],
		desc: 'A fast-growing, edible root vegetable known for its crisp texture and peppery, sharp bite.'
	},
	{
		id: 'beetroot',
		name: 'Beetroot',
		cat: 'vegetable',
		sStart: 6,
		sEnd: 11,
		pStart: 4,
		pEnd: 7,
		colors: ['#8E44AD', '#5B2C6F'],
		comp: ['onion', 'lettuce', 'cabbage'],
		avoid: ['mustard', 'beans'],
		desc: 'An earthy, vibrant taproot portion of the beet plant. Known for its intense garnet colour and sweet profile.'
	},
	{
		id: 'potato',
		name: 'Potato',
		cat: 'vegetable',
		sStart: 7,
		sEnd: 10,
		pStart: 3,
		pEnd: 5,
		colors: ['#D4AC0D', '#B9770E'],
		comp: ['corn', 'cabbage', 'beans'],
		avoid: ['tomato', 'cucumber', 'pumpkin', 'squash'],
		desc: 'A versatile starchy tuber deeply integrated into global dietary staples. Highly productive.'
	},
	{
		id: 'sweet_potato',
		name: 'Sweet Potato',
		cat: 'vegetable',
		sStart: 9,
		sEnd: 11,
		pStart: 5,
		pEnd: 6,
		colors: ['#E67E22', '#CA6F1E'],
		comp: ['thyme', 'oregano'],
		avoid: ['squash'],
		desc: 'A sweet-tasting, large starchy root vegetable distinct from the common potato. Thrives in warmer weather.'
	},
	{
		id: 'spinach',
		name: 'Spinach',
		cat: 'vegetable',
		sStart: 4,
		sEnd: 11,
		pStart: 3,
		pEnd: 9,
		colors: ['#27AE60', '#1E8449'],
		comp: ['strawberry', 'cabbage', 'eggplant'],
		avoid: [],
		desc: 'A dark leafy green loaded with iron and nutrients. Best grown in cooler shoulders of the season.'
	},
	{
		id: 'lettuce',
		name: 'Lettuce',
		cat: 'vegetable',
		sStart: 5,
		sEnd: 10,
		pStart: 3,
		pEnd: 8,
		colors: ['#A2D9CE', '#76D7C4'],
		comp: ['carrot', 'onion', 'strawberry', 'radish'],
		avoid: ['cabbage', 'celery', 'parsley'],
		desc: 'The foundation of the modern salad. A delicate, crisp leafy green available in countless varietals.'
	},
	{
		id: 'cabbage',
		name: 'Cabbage',
		cat: 'vegetable',
		sStart: 7,
		sEnd: 12,
		pStart: 4,
		pEnd: 6,
		colors: ['#A9DFBF', '#7DCEA0'],
		comp: ['onion', 'potato', 'beetroot', 'spinach'],
		avoid: ['strawberry', 'tomato'],
		desc: 'A dense, leafy biennial plant grown for its tight vegetative heads. Exceptionally cold hardy.'
	},
	{
		id: 'broccoli',
		name: 'Broccoli',
		cat: 'vegetable',
		sStart: 6,
		sEnd: 11,
		pStart: 4,
		pEnd: 7,
		colors: ['#2ECC71', '#28B463'],
		comp: ['potato', 'onion', 'rosemary'],
		avoid: ['tomato', 'strawberry'],
		desc: 'An edible green plant in the cabbage family whose large flowering head is eaten as a vegetable.'
	},
	{
		id: 'cauliflower',
		name: 'Cauliflower',
		cat: 'vegetable',
		sStart: 7,
		sEnd: 11,
		pStart: 5,
		pEnd: 7,
		colors: ['#FDFEFE', '#F0F3F4'],
		comp: ['beans', 'onion', 'celery'],
		avoid: ['tomato', 'strawberry'],
		desc: 'A structurally beautiful cruciferous vegetable forming a white floral head.'
	},
	{
		id: 'brussels_sprout',
		name: 'Brussels Sprout',
		cat: 'vegetable',
		sStart: 9,
		sEnd: 12,
		pStart: 5,
		pEnd: 6,
		colors: ['#52BE80', '#27AE60'],
		comp: ['potato', 'onion'],
		avoid: ['tomato', 'strawberry'],
		desc: 'Tiny cabbages growing proudly on an elongated, sturdy stalk. Peaks after a light frost.'
	},
	{
		id: 'corn',
		name: 'Corn',
		cat: 'vegetable',
		sStart: 7,
		sEnd: 9,
		pStart: 5,
		pEnd: 6,
		colors: ['#F4D03F', '#F1C40F'],
		comp: ['beans', 'pumpkin', 'potato', 'zucchini'],
		avoid: ['tomato', 'celery'],
		desc: "A tall cereal grass producing golden kernels. The structural anchor of the 'Three Sisters' guild."
	},
	{
		id: 'cucumber',
		name: 'Cucumber',
		cat: 'vegetable',
		sStart: 7,
		sEnd: 9,
		pStart: 5,
		pEnd: 6,
		colors: ['#7DCEA0', '#52BE80'],
		comp: ['corn', 'beans', 'radish'],
		avoid: ['potato', 'sage'],
		desc: 'A creeping vine plant bringing forth cylindrical, deeply hydrating fruits.'
	},
	{
		id: 'zucchini',
		name: 'Zucchini',
		cat: 'vegetable',
		sStart: 7,
		sEnd: 9,
		pStart: 5,
		pEnd: 6,
		colors: ['#229954', '#196F3D'],
		comp: ['corn', 'beans', 'pumpkin'],
		avoid: ['potato'],
		desc: 'A highly prolific summer squash boasting dark green skin and a mild, versatile flavour.'
	},
	{
		id: 'eggplant',
		name: 'Eggplant',
		cat: 'vegetable',
		sStart: 7,
		sEnd: 9,
		pStart: 5,
		pEnd: 6,
		colors: ['#5B2C6F', '#4A235A'],
		comp: ['beans', 'spinach', 'thyme'],
		avoid: [],
		desc: 'A heat-loving nightshade notable for its deep purple, glossy skin and spongy flesh.'
	},
	{
		id: 'bell_pepper',
		name: 'Bell Pepper',
		cat: 'vegetable',
		sStart: 7,
		sEnd: 10,
		pStart: 5,
		pEnd: 6,
		colors: ['#E74C3C', '#F1C40F'],
		comp: ['basil', 'onion', 'spinach', 'carrot'],
		avoid: ['beans'],
		desc: 'Mild, sweet capsicum fruits known for brightening up culinary visual palettes.'
	},
	{
		id: 'hot_pepper',
		name: 'Hot Pepper',
		cat: 'vegetable',
		sStart: 8,
		sEnd: 10,
		pStart: 5,
		pEnd: 6,
		colors: ['#C0392B', '#922B21'],
		comp: ['basil', 'onion', 'carrot'],
		avoid: ['beans'],
		desc: 'Fiery capsicums packed with capsaicin, injecting intense heat into any dish.'
	},
	{
		id: 'peas',
		name: 'Peas',
		cat: 'vegetable',
		sStart: 5,
		sEnd: 7,
		pStart: 3,
		pEnd: 5,
		colors: ['#58D68D', '#2ECC71'],
		comp: ['carrot', 'cucumber', 'corn', 'radish'],
		avoid: ['onion', 'garlic'],
		desc: 'Small spherical seeds grown within pods. They actively fix nitrogen into the surrounding soil.'
	},
	{
		id: 'beans',
		name: 'Beans',
		cat: 'vegetable',
		sStart: 7,
		sEnd: 9,
		pStart: 5,
		pEnd: 7,
		colors: ['#52BE80', '#27AE60'],
		comp: ['corn', 'pumpkin', 'cucumber', 'eggplant', 'potato'],
		avoid: ['onion', 'garlic', 'beetroot'],
		desc: 'Versatile legumes that can be grown as pole climbers or low bushes. Excellent nitrogen fixers.'
	},
	{
		id: 'celery',
		name: 'Celery',
		cat: 'vegetable',
		sStart: 8,
		sEnd: 10,
		pStart: 4,
		pEnd: 5,
		colors: ['#A9DFBF', '#7DCEA0'],
		comp: ['leek', 'tomato', 'cabbage'],
		avoid: ['corn'],
		desc: 'A marshland plant cultivated for its crisp, fibrous stalks.'
	},
	{
		id: 'leek',
		name: 'Leek',
		cat: 'vegetable',
		sStart: 9,
		sEnd: 12,
		pStart: 4,
		pEnd: 6,
		colors: ['#EDF7F2', '#A9DFBF'],
		comp: ['carrot', 'celery', 'onion'],
		avoid: ['beans', 'peas'],
		desc: 'A broader, mild relative of the onion forming a thick cylindrical stalk.'
	},
	{
		id: 'mint',
		name: 'Mint',
		cat: 'herb',
		sStart: 5,
		sEnd: 10,
		pStart: 4,
		pEnd: 6,
		colors: ['#2ECC71', '#1D8348'],
		comp: ['tomato', 'cabbage'],
		avoid: ['parsley'],
		desc: 'A tremendously aggressive and fragrant herb used to cool logic and beverages alike.'
	},
	{
		id: 'rosemary',
		name: 'Rosemary',
		cat: 'herb',
		sStart: 1,
		sEnd: 12,
		pStart: 4,
		pEnd: 6,
		colors: ['#5F6A6A', '#797D7F'],
		comp: ['cabbage', 'beans', 'carrot'],
		avoid: [],
		desc: 'A woody, perennial herb with fragrant, evergreen, needle-like leaves.'
	},
	{
		id: 'thyme',
		name: 'Thyme',
		cat: 'herb',
		sStart: 5,
		sEnd: 10,
		pStart: 4,
		pEnd: 6,
		colors: ['#7DCEA0', '#52BE80'],
		comp: ['eggplant', 'potato', 'rosemary', 'tomato'],
		avoid: [],
		desc: 'A delicate, aromatic herb forming dense carpets of flavourful foliage.'
	},
	{
		id: 'oregano',
		name: 'Oregano',
		cat: 'herb',
		sStart: 6,
		sEnd: 10,
		pStart: 4,
		pEnd: 6,
		colors: ['#A3E4D7', '#76D7C4'],
		comp: ['tomato', 'basil', 'beans', 'carrot'],
		avoid: [],
		desc: 'A staple culinary herb with a bold, earthy pungency prominent in Mediterranean diets.'
	},
	{
		id: 'parsley',
		name: 'Parsley',
		cat: 'herb',
		sStart: 6,
		sEnd: 11,
		pStart: 4,
		pEnd: 6,
		colors: ['#28B463', '#239B56'],
		comp: ['tomato', 'asparagus', 'carrot'],
		avoid: ['lettuce'],
		desc: 'A bright, fresh-tasting biennial plant frequently used as a garnish or flavor enhancer.'
	},
	{
		id: 'cilantro',
		name: 'Cilantro',
		cat: 'herb',
		sStart: 5,
		sEnd: 9,
		pStart: 4,
		pEnd: 7,
		colors: ['#ADEFD1', '#00203F'],
		comp: ['beans', 'tomato'],
		avoid: ['fennel'],
		desc: 'Every piece of this leafy annual is thoroughly edible. Imparts a bright, citrusy (or soapy) taste.'
	},
	{
		id: 'sage',
		name: 'Sage',
		cat: 'herb',
		sStart: 5,
		sEnd: 10,
		pStart: 4,
		pEnd: 6,
		colors: ['#85929E', '#5D6D7E'],
		comp: ['rosemary', 'cabbage', 'carrot'],
		avoid: ['cucumber'],
		desc: 'An evergreen subshrub with greyish leaves and distinct herbaceous, pine flavour.'
	},
	{
		id: 'dill',
		name: 'Dill',
		cat: 'herb',
		sStart: 6,
		sEnd: 9,
		pStart: 4,
		pEnd: 6,
		colors: ['#D4E157', '#AED581'],
		comp: ['cabbage', 'onion', 'lettuce'],
		avoid: ['carrot', 'tomato'],
		desc: 'An annual herb boasting incredibly fine, wispy foliage and distinct aromatic qualities.'
	},
	{
		id: 'chives',
		name: 'Chives',
		cat: 'herb',
		sStart: 5,
		sEnd: 9,
		pStart: 3,
		pEnd: 5,
		colors: ['#E1BEE7', '#CE93D8'],
		comp: ['carrot', 'tomato', 'rosemary'],
		avoid: ['beans', 'peas'],
		desc: 'A visually striking flowering herb lending a sharp onion/garlic accent.'
	},
	{
		id: 'strawberry',
		name: 'Strawberry',
		cat: 'fruit',
		sStart: 5,
		sEnd: 7,
		pStart: 3,
		pEnd: 4,
		colors: ['#E74C3C', '#C0392B'],
		comp: ['spinach', 'lettuce', 'onion'],
		avoid: ['cabbage', 'broccoli', 'cauliflower'],
		desc: 'An extensively cultivated red heart fruit appreciated for its phenomenal aroma and sweetness.'
	},
	{
		id: 'blueberry',
		name: 'Blueberry',
		cat: 'fruit',
		sStart: 7,
		sEnd: 8,
		pStart: 3,
		pEnd: 4,
		colors: ['#2874A6', '#1B4F72'],
		comp: ['thyme'],
		avoid: ['tomato'],
		desc: 'Dark indigo spheres of sweetness requiring highly acidic soils to thrive.'
	},
	{
		id: 'raspberry',
		name: 'Raspberry',
		cat: 'fruit',
		sStart: 7,
		sEnd: 9,
		pStart: 3,
		pEnd: 4,
		colors: ['#E91E63', '#C2185B'],
		comp: ['garlic', 'chives'],
		avoid: ['potato', 'tomato', 'eggplant'],
		desc: 'An aggregate fruit radiating brilliant colour and complex, tarty notes on thorny canes.'
	},
	{
		id: 'blackberry',
		name: 'Blackberry',
		cat: 'fruit',
		sStart: 7,
		sEnd: 9,
		pStart: 3,
		pEnd: 4,
		colors: ['#17202A', '#2C3E50'],
		comp: ['mint'],
		avoid: [],
		desc: 'A bramble fruit demanding space and respect, delivering intense, dark jammy flavors.'
	},
	{
		id: 'melon',
		name: 'Melon',
		cat: 'fruit',
		sStart: 7,
		sEnd: 9,
		pStart: 5,
		pEnd: 6,
		colors: ['#F5B041', '#EB984E'],
		comp: ['corn'],
		avoid: ['potato'],
		desc: 'A heavy, sweet vining fruit heavily dependent upon hot summer sunlight.'
	},
	{
		id: 'watermelon',
		name: 'Watermelon',
		cat: 'fruit',
		sStart: 7,
		sEnd: 9,
		pStart: 5,
		pEnd: 6,
		colors: ['#2ECC71', '#E74C3C'],
		comp: ['corn', 'radish'],
		avoid: ['potato', 'zucchini'],
		desc: 'An iconic, heavily hydrating summer staple wrapped in a striped green rind.'
	},
	{
		id: 'artichoke',
		name: 'Artichoke',
		cat: 'vegetable',
		sStart: 5,
		sEnd: 6,
		pStart: 2,
		pEnd: 4,
		colors: ['#7DCEA0', '#A9DFBF'],
		comp: ['peas', 'cabbage'],
		avoid: [],
		desc: 'A striking, sculptural thistle cultivated prominently as a delicacy.'
	},
	{
		id: 'fennel',
		name: 'Fennel',
		cat: 'herb',
		sStart: 6,
		sEnd: 10,
		pStart: 4,
		pEnd: 6,
		colors: ['#D4E157', '#AED581'],
		comp: [],
		avoid: ['tomato', 'beans', 'coriander', 'kohlrabi'],
		desc: 'A highly aromatic, anise-flavoured herb. A notoriously terrible companion for most garden vegetables.'
	},
	{
		id: 'turnip',
		name: 'Turnip',
		cat: 'vegetable',
		sStart: 9,
		sEnd: 11,
		pStart: 8,
		pEnd: 9,
		colors: ['#F5EEF8', '#D2B4DE'],
		comp: ['peas'],
		avoid: ['potato'],
		desc: 'A hardy root vegetable famous for seeing agrarian populations through harsh winters.'
	},
	{
		id: 'parsnip',
		name: 'Parsnip',
		cat: 'vegetable',
		sStart: 10,
		sEnd: 2,
		pStart: 4,
		pEnd: 5,
		colors: ['#FCF3CF', '#F9E79F'],
		comp: ['onion', 'peas', 'potato'],
		avoid: ['carrot', 'celery'],
		desc: 'A pale, sweet taproot closely related to the carrot. Sweetens significantly post-frost.'
	},
	{
		id: 'rutabaga',
		name: 'Rutabaga',
		cat: 'vegetable',
		sStart: 10,
		sEnd: 12,
		pStart: 6,
		pEnd: 7,
		colors: ['#F7DC6F', '#F1C40F'],
		comp: ['peas'],
		avoid: [],
		desc: 'A dense root cross between a cabbage and a turnip. Excels in roasting.'
	},
	{
		id: 'kohlrabi',
		name: 'Kohlrabi',
		cat: 'vegetable',
		sStart: 6,
		sEnd: 10,
		pStart: 4,
		pEnd: 5,
		colors: ['#A9DFBF', '#8E44AD'],
		comp: ['onion', 'beetroot'],
		avoid: ['tomato', 'strawberry', 'fennel'],
		desc: 'A bulbous, swollen cabbage stem displaying peculiar, alien-like architecture and crisp flesh.'
	},
	{
		id: 'okra',
		name: 'Okra',
		cat: 'vegetable',
		sStart: 7,
		sEnd: 9,
		pStart: 5,
		pEnd: 6,
		colors: ['#2ECC71', '#27AE60'],
		comp: ['sweet_potato', 'melon', 'cucumber'],
		avoid: [],
		desc: 'A heat-loving mallow producing edible green seed pods prominent in Creole stews.'
	}
];

const DIR = path.join(process.cwd(), 'data', 'produce');

async function run() {
	console.log(`Generating ${PRODUCE_DATA.length} pieces of perfect botanical data...`);

	for (const item of PRODUCE_DATA) {
		const output = `---
id: ${item.id}
name: ${item.name}
category: ${item.cat}
featured: false
season_start: ${item.sStart}
season_end: ${item.sEnd}
planting_start: ${item.pStart}
planting_end: ${item.pEnd}
hemisphere: northern
colors: ${JSON.stringify(item.colors)}
companions: ${JSON.stringify(item.comp)}
avoid: ${JSON.stringify(item.avoid)}
illustration: default.svg
---

${item.desc}
`;

		fs.writeFileSync(path.join(DIR, `${item.id}.md`), output, 'utf-8');
	}

	console.log('✅ Wrote all markdown items to /data/produce');
}

run();
