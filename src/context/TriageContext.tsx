import React, { createContext, useContext, useEffect, useReducer, useCallback } from "react";
import NetInfo from "@react-native-community/netinfo";
import { Triage } from "../models/Triage";
import { initDatabase } from "../services/DatabaseService";
import { insertTriage, getAllTriage, NewTriageInput } from "../repository/TriageRepository";
import { syncPendingRecords } from "../services/SyncService";
import { startConnectivityListener, startAppStateListener } from "../services/ConnectivityService";

type State = { records: Triage[]; syncing: boolean; lastSyncError: string | null };

type Action =
  | { type: "SET_RECORDS"; payload: Triage[] }
  | { type: "SYNC_START" }
  | { type: "SYNC_DONE"; error: string | null };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_RECORDS":
      return { ...state, records: action.payload };
    case "SYNC_START":
      return { ...state, syncing: true, lastSyncError: null };
    case "SYNC_DONE":
      return { ...state, syncing: false, lastSyncError: action.error };
  }
}

interface ContextValue extends State {
  pendingCount: number;
  addTriage: (data: NewTriageInput) => Promise<void>;
}

const TriageContext = createContext<ContextValue | undefined>(undefined);

export function TriageProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { records: [], syncing: false, lastSyncError: null });

  const refresh = useCallback(async () => {
    dispatch({ type: "SET_RECORDS", payload: await getAllTriage() });
  }, []);

  const runSync = useCallback(async () => {
    dispatch({ type: "SYNC_START" });
    try {
      await syncPendingRecords();
      await refresh();
      dispatch({ type: "SYNC_DONE", error: null });
    } catch (err: any) {
      dispatch({ type: "SYNC_DONE", error: err?.message ?? "Sync failed" });
    }
  }, [refresh]);

  const addTriage = useCallback(
    async (data: NewTriageInput) => {
      await insertTriage(data);
      await refresh();
      const net = await NetInfo.fetch();
      if (net.isConnected) runSync();
    },
    [refresh, runSync]
  );

  useEffect(() => {
    initDatabase().then(refresh);

    const netSub = startConnectivityListener(refresh);
    const appStateSub = startAppStateListener(refresh);

    return () => {
      netSub.remove();
      appStateSub.remove();
    };
  }, [refresh]);

  const pendingCount = state.records.filter(r => !r.isSynced).length;

  return (
    <TriageContext.Provider value={{ ...state, pendingCount, addTriage }}>
      {children}
    </TriageContext.Provider>
  );
}

export function useTriage() {
  const ctx = useContext(TriageContext);
  if (!ctx) throw new Error("useTriage must be used within TriageProvider");
  return ctx;
}