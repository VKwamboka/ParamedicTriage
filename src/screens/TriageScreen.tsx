
import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, SafeAreaView } from 'react-native';
import TriageForm from '../components/triageForm';
import { Triage } from '../models/Triage';
import { colors } from '../theme';
import { initDatabase } from '../services/DatabaseService';
import { insertTriage, getAllTriage, NewTriageInput } from '../repository/TriageRepository';
import { startConnectivityListener } from '../services/ConnectivityService';




export default function TriageScreen() {
  const [records, setRecords] = useState<Triage[]>([]);

  useEffect(() => {
    initDatabase().then(refresh);
  }, []);

  const refresh = async () => {
    setRecords(await getAllTriage());
  };

  const handleSubmit = async (data: NewTriageInput) => {
    await insertTriage(data);
    await refresh();
  };

  useEffect(() => {

    initDatabase().then(refresh);

    const unsubscribe =
        startConnectivityListener(refresh);


    return () => {
        unsubscribe();
    };

}, []);

  return (

    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Triage Intake</Text>
        <TriageForm onSubmit={handleSubmit} />

        <Text style={styles.subheading}>Saved ({records.length})</Text>
        {records.map((r) => (
          <Text key={r.id} style={styles.item}>
            {r.patientName} — P{r.priority} — {r.status} — {r.isSynced ? 'synced' : 'pending'}
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  container: { padding: 16 },
  heading: { fontSize: 22, fontWeight: '700', color: colors.text, marginBottom: 16 },
  subheading: { fontSize: 16, fontWeight: '600', color: colors.text, marginTop: 24, marginBottom: 8 },
  item: { fontSize: 14, color: colors.muted, marginBottom: 4 },
});