import { Triage } from '../models/Triage';

const FAILURE_RATE = 0.35;

export async function postTriageRecord(record: Triage): Promise<{ success: true }> {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (Math.random() < FAILURE_RATE) {
    throw new Error('Network request failed (simulated)');
  }
  return { success: true };
}