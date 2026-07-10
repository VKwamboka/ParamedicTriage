import * as Crypto from 'expo-crypto';
import getDb from '../services/DatabaseService';
import { Triage, Status } from '../models/Triage';

export type NewTriageInput = {
  patientName: string;
  condition: string;
  priority: number;
  status: Status;
};

export async function insertTriage(input: NewTriageInput): Promise<Triage> {
  const record: Triage = {
    id: Crypto.randomUUID(),
    ...input,
    isSynced: false,
    createdAt: new Date().toISOString(),
  };

  const db = await getDb();
  await db.runAsync(
    `INSERT INTO triage (id, patientName, condition, priority, status, isSynced, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?);`,
    [record.id, record.patientName, record.condition, record.priority, record.status, 0, record.createdAt]
  );

  return record;
}

export async function getAllTriage(): Promise<Triage[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<any>(`SELECT * FROM triage ORDER BY createdAt DESC;`);
  return rows.map(rowToTriage);
}

export async function getPendingTriage(): Promise<Triage[]> {
  const db = await getDb();
  const rows = await db.getAllAsync<any>(`SELECT * FROM triage WHERE isSynced = 0;`);
  return rows.map(rowToTriage);
}

export async function markAsSynced(id: string): Promise<void> {
  const db = await getDb();
  await db.runAsync(`UPDATE triage SET isSynced = 1 WHERE id = ?;`, [id]);
}

function rowToTriage(row: any): Triage {
  return {
    id: row.id,
    patientName: row.patientName,
    condition: row.condition,
    priority: row.priority,
    status: row.status,
    isSynced: !!row.isSynced,
    createdAt: row.createdAt,
  };
}