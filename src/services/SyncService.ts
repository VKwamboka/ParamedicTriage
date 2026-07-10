import { getPendingTriage, markAsSynced } from '../repository/TriageRepository';
import { postTriageRecord } from './mockupapi';

export async function syncPendingRecords(): Promise<void> {
  console.log("Starting sync...");

  try {
    const pending = await getPendingTriage();

    console.log(`Found ${pending.length} pending record(s)`);

    if (pending.length === 0) {
      console.log("No records to sync");
      return;
    }

    for (const record of pending) {
      try {
        console.log(`Syncing ${record.id}`);

        await postTriageRecord(record);

        await markAsSynced(record.id);

        console.log(`Synced ${record.id}`);

      } catch (error) {
        console.log(`Failed syncing ${record.id}. Will retry later.`);
      }
    }

    console.log("Sync completed");

  } catch (error) {
    console.log("Sync error:", error);
  }
}