import * as SQLite from 'expo-sqlite';

let dbInstance: SQLite.SQLiteDatabase | null = null;

async function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync('triage.db');
  }
  return dbInstance;
}

export async function initDatabase(): Promise<void> {
  const db = await getDb();
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS triage (
      id TEXT PRIMARY KEY NOT NULL,
      patientName TEXT NOT NULL,
      condition TEXT NOT NULL,
      priority INTEGER NOT NULL,
      status TEXT NOT NULL,
      isSynced INTEGER NOT NULL DEFAULT 0,
      createdAt TEXT NOT NULL
    );
  `);
}

export default getDb;