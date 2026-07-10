import { syncPendingRecords } from './SyncService';
import * as repo from '../repository/TriageRepository';
import * as api from './mockupapi';
import { Triage } from '../models/Triage';

// jest.mock('../repository/TriageRepository');
// jest.mock('./mockupapi');

jest.mock("../repository/TriageRepository", () => ({
  getPendingTriage: jest.fn(),
  markAsSynced: jest.fn(),
}));

jest.mock("./mockupapi", () => ({
  postTriageRecord: jest.fn(),
}));

const mockedRepo = repo as jest.Mocked<typeof repo>;
const mockedApi = api as jest.Mocked<typeof api>;

function makeRecord(overrides: Partial<Triage> = {}): Triage {
  return {
    id: '1', patientName: 'Jane Doe', condition: 'Fracture', priority: 3,
    status: 'Pending', isSynced: false, createdAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('syncPendingRecords', () => {
  beforeEach(() => jest.clearAllMocks());

  it('marks a record synced when the API call succeeds', async () => {
    const record = makeRecord();
    mockedRepo.getPendingTriage.mockResolvedValue([record]);
    mockedApi.postTriageRecord.mockResolvedValue({ success: true });

    await syncPendingRecords();

    expect(mockedApi.postTriageRecord).toHaveBeenCalledWith(record);
    expect(mockedRepo.markAsSynced).toHaveBeenCalledWith(record.id);
  });

  it('leaves a record unsynced when the API call fails', async () => {
    const record = makeRecord();
    mockedRepo.getPendingTriage.mockResolvedValue([record]);
    mockedApi.postTriageRecord.mockRejectedValue(new Error('Network error'));

    await syncPendingRecords();

    expect(mockedRepo.markAsSynced).not.toHaveBeenCalled();
  });

  it('processes multiple pending records independently', async () => {
    const ok = makeRecord({ id: 'a' });
    const fail = makeRecord({ id: 'b' });
    mockedRepo.getPendingTriage.mockResolvedValue([ok, fail]);
    mockedApi.postTriageRecord
      .mockResolvedValueOnce({ success: true })
      .mockRejectedValueOnce(new Error('fail'));

    await syncPendingRecords();

    expect(mockedRepo.markAsSynced).toHaveBeenCalledTimes(1);
    expect(mockedRepo.markAsSynced).toHaveBeenCalledWith('a');
  });
});