export type Status = "Pending" | "In-Transit";
export type Priority = 1 | 2 | 3 | 4 | 5;

export interface Triage {
  id: string;
  patientName: string;
  condition: string;
  priority: number;
  status: Status;
  isSynced: boolean;
  createdAt: string;
}
