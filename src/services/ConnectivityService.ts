import NetInfo from "@react-native-community/netinfo";
import { AppState, AppStateStatus } from "react-native";
import { syncPendingRecords } from "./SyncService";

export function startConnectivityListener(onSyncComplete?: () => void) {
  return NetInfo.addEventListener(state => {
    if (state.isConnected) {
      syncPendingRecords().then(() => {
        if (onSyncComplete) onSyncComplete();
      });
    }
  });
}

// catches the case where connectivity returned while the app was backgrounded
export function startAppStateListener(onSyncComplete?: () => void) {
  const handleChange = (next: AppStateStatus) => {
    if (next === "active") {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          syncPendingRecords().then(() => {
            if (onSyncComplete) onSyncComplete();
          });
        }
      });
    }
  };

  return AppState.addEventListener("change", handleChange);
}