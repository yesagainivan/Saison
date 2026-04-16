import { Database } from 'bun:sqlite';
import fs from 'node:fs/promises';
import path from 'node:path';
import yaml from 'js-yaml';

const db = new Database('db.sqlite');

export function initDb() {
	db.run(`
    CREATE TABLE IF NOT EXISTS produce (
      id             TEXT PRIMARY KEY,
      name           TEXT NOT NULL,
      name_fr        TEXT,
      category       TEXT CHECK(category IN ('fruit','vegetable','herb','flower')),
      featured       INTEGER DEFAULT 0,
      description    TEXT,
      description_fr TEXT,
      season_start   INTEGER NOT NULL,
      season_end     INTEGER NOT NULL,
      planting_start INTEGER,
      planting_end   INTEGER,
      harvest_start  INTEGER,
      harvest_end    INTEGER,
      hemisphere     TEXT DEFAULT 'northern',
      zone_offset    INTEGER DEFAULT 0,
      colors         TEXT,
      companions     TEXT,
      avoid          TEXT,
      illustration   TEXT
    );
  `);

	// Ensure description_fr exists for existing databases
	try {
		db.run(`ALTER TABLE produce ADD COLUMN description_fr TEXT`);
	} catch {
		// Column likely already exists
	}

	db.run(`CREATE INDEX IF NOT EXISTS idx_season ON produce(season_start, season_end);`);
	db.run(`CREATE INDEX IF NOT EXISTS idx_category ON produce(category);`);
}

async function seed() {
	initDb();

	// Clear existing items in case of re-seed
	db.run(`DELETE FROM produce`);

	const produceDir = path.join(process.cwd(), 'data', 'produce');

	let files;
	try {
		files = await fs.readdir(produceDir);
	} catch {
		console.log("No data/produce directory found or it's empty.");
		return;
	}

	const mdFiles = files.filter((f) => f.endsWith('.md'));

	const insertStmt = db.prepare(`
    INSERT INTO produce (
      id, name, name_fr, category, featured, description, description_fr,
      season_start, season_end, planting_start, planting_end,
      harvest_start, harvest_end, hemisphere, zone_offset,
      colors, companions, avoid, illustration
    ) VALUES (
      $id, $name, $name_fr, $category, $featured, $description, $description_fr,
      $season_start, $season_end, $planting_start, $planting_end,
      $harvest_start, $harvest_end, $hemisphere, $zone_offset,
      $colors, $companions, $avoid, $illustration
    )
  `);

	const insertMany = db.transaction((items: Record<string, unknown>[]) => {
		for (const item of items) {
			insertStmt.run(item);
		}
	});

	const itemsToInsert = [];

	for (const file of mdFiles) {
		const raw = await fs.readFile(path.join(produceDir, file), 'utf-8');
		const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
		if (!match) {
			console.warn(`Skipping ${file}: Invalid frontmatter format.`);
			continue;
		}

		const frontmatter = yaml.load(match[1]) as Record<string, unknown>;
		const body = match[2].trim();

		itemsToInsert.push({
			$id: frontmatter.id,
			$name: frontmatter.name,
			$name_fr: frontmatter.name_fr || null,
			$category: frontmatter.category,
			$featured: frontmatter.featured ? 1 : 0,
			$description: frontmatter.description || body || null,
			$description_fr: frontmatter.description_fr || null,
			$season_start: frontmatter.season_start,
			$season_end: frontmatter.season_end,
			$planting_start: frontmatter.planting_start || null,
			$planting_end: frontmatter.planting_end || null,
			$harvest_start: frontmatter.harvest_start || null,
			$harvest_end: frontmatter.harvest_end || null,
			$hemisphere: frontmatter.hemisphere || 'northern',
			$zone_offset: frontmatter.zone_offset || 0,
			$colors: frontmatter.colors ? JSON.stringify(frontmatter.colors) : null,
			$companions: frontmatter.companions ? JSON.stringify(frontmatter.companions) : null,
			$avoid: frontmatter.avoid ? JSON.stringify(frontmatter.avoid) : null,
			$illustration: frontmatter.illustration || null
		});
	}

	insertMany(itemsToInsert);
	console.log(`Seeded ${itemsToInsert.length} items successfully.`);
}

seed().catch((err) => {
	console.error('Seed failed:', err);
	process.exit(1);
});
