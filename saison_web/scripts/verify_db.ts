import { Database } from 'bun:sqlite';
const db = new Database('db.sqlite');
const items = db
	.prepare("SELECT id, name, name_fr FROM produce WHERE id IN ('shallot', 'carrot', 'mirabelle')")
	.all();
console.log(JSON.stringify(items, null, 2));
