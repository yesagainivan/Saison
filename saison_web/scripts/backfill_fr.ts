import fs from "node:fs/promises";
import path from "node:path";

const items: Record<string, string> = {
  artichoke: "Artichaut",
  asparagus: "Asperge",
  basil: "Basilic",
  beans: "Haricots",
  beetroot: "Betterave",
  bell_pepper: "Poivron",
  blackberry: "Mûre",
  blueberry: "Myrtille",
  broccoli: "Brocoli",
  brussels_sprout: "Chou de Bruxelles",
  cabbage: "Chou",
  cauliflower: "Chou-fleur",
  celery: "Céleri",
  chives: "Ciboulette",
  cilantro: "Coriandre",
  corn: "Maïs",
  cucumber: "Concombre",
  dill: "Aneth",
  eggplant: "Aubergine",
  fennel: "Fenouil",
  garlic: "Ail",
  hot_pepper: "Piment",
  kale: "Chou frisé",
  kohlrabi: "Chou-rave",
  leek: "Poireau",
  lettuce: "Laitue",
  melon: "Melon",
  mint: "Menthe",
  okra: "Gombo",
  onion: "Oignon",
  oregano: "Origan",
  parsley: "Persil",
  parsnip: "Panais",
  peas: "Petits pois",
  potato: "Pomme de terre",
  pumpkin: "Citrouille",
  radish: "Radis",
  raspberry: "Framboise",
  rosemary: "Romarin",
  rutabaga: "Rutabaga",
  sage: "Sauge",
  spinach: "Épinards",
  strawberry: "Fraise",
  sweet_potato: "Patate douce",
  thyme: "Thym",
  tomato: "Tomate",
  turnip: "Navet",
  watermelon: "Pastèque",
  zucchini: "Courgette"
};

async function backfill() {
  const produceDir = path.join(process.cwd(), "data", "produce");
  
  for (const [id, trans] of Object.entries(items)) {
    const filePath = path.join(produceDir, `${id}.md`);
    try {
      let content = await fs.readFile(filePath, "utf-8");
      
      // If it has the broken line from the previous sed attempt, fix it
      if (content.includes(`name_fr: ${trans}category:`)) {
         content = content.replace(`name_fr: ${trans}category:`, `name_fr: ${trans}\ncategory:`);
         console.log(`Fixed broken newline for ${id}`);
      } else if (!content.includes("name_fr:")) {
        // Normal insertion
        content = content.replace(/name: (.*)\n/, `name: $1\nname_fr: ${trans}\n`);
        console.log(`Updated ${id} with ${trans}`);
      } else {
        console.log(`Skipping ${id}: already has name_fr`);
      }
      
      await fs.writeFile(filePath, content, "utf-8");
    } catch (e) {
      console.warn(`Could not update ${id}: ${e.message}`);
    }
  }
}

backfill();
