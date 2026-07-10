import React from "react";
import { ScrollView, Text, StyleSheet, SafeAreaView } from "react-native";
import TriageForm from "../components/triageForm";
import { colors } from "../theme";
import { useTriage } from "../context/TriageContext";

export default function TriageScreen() {
  const { records, pendingCount, syncing, addTriage } = useTriage();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Triage Intake</Text>
        <TriageForm onSubmit={addTriage} />

        <Text style={styles.subheading}>
          Saved ({records.length}) · Pending sync: {pendingCount}
          {syncing ? " · syncing…" : ""}
        </Text>
        {/* {records.map((r) => (
          <Text key={r.id} style={styles.item}>
            {r.patientName} — P{r.priority} — {r.status} — {r.isSynced ? 'synced' : 'pending'}
          </Text>
        ))} */}
        {records.map((r) => (
          <Text key={r.id} style={styles.item}>
            {r.patientName} — P{r.priority} — {r.status} —{" "}
            <Text style={r.isSynced ? styles.synced : styles.pending}>
              {r.isSynced ? "synced" : "pending"}
            </Text>
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  container: { padding: 16 },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 16,
    paddingTop: 16,
  },
  subheading: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.muted,
    marginTop: 24,
    marginBottom: 8,
  },
  item: { fontSize: 14, color: colors.text, marginBottom: 4 },
  pending: {
  color: "#d97706",
  fontWeight: "700",
},

synced: {
  color: colors.muted,
  fontWeight: "400",
},
});
