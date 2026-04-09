import { Database } from "bun:sqlite";
import path from "node:path";

// Initialize the Database instance
// In production/deployment you may want to configure this path differently
const dbPath = path.resolve(process.cwd(), "db.sqlite");
export const db = new Database(dbPath);

// Enable WAL mode for better performance
db.exec("PRAGMA journal_mode = WAL;");
