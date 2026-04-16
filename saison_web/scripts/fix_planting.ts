import fs from 'node:fs/promises';
import path from 'node:path';

const updates = {
	orange: { start: 3, end: 5 },
	lemon: { start: 3, end: 5 },
	grapefruit: { start: 3, end: 5 },
	banana: { start: 4, end: 6 },
	avocado: { start: 4, end: 5 },
	kiwi: { start: 3, end: 4 },
	persimmon: { start: 11, end: 12 }, // Persimmon/Pomegranate are hardy, usually Nov-Dec or late winter
	pomegranate: { start: 11, end: 12 }
};

async function fixPlanting() {
	const produceDir = path.join(process.cwd(), 'data', 'produce');

	for (const [id, times] of Object.entries(updates)) {
		const filePath = path.join(produceDir, `${id}.md`);
		try {
			let content = await fs.readFile(filePath, 'utf-8');

			// Insert before hemisphere or whatever is next
			const newLines = `planting_start: ${times.start}\nplanting_end: ${times.end}\n`;

			if (!content.includes('planting_start:')) {
				content = content.replace('hemisphere: northern', `${newLines}hemisphere: northern`);
				console.log(`Updated ${id} with planting window ${times.start}-${times.end}`);
				await fs.writeFile(filePath, content, 'utf-8');
			}
		} catch (e) {
			console.error(`Failed to update ${id}: ${e.message}`);
		}
	}
}

fixPlanting();
