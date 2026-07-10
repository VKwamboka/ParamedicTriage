import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { colors, priorityColors } from "../theme";
import { Priority, Status } from "../models/Triage";
import styles from "../stylesheet/triageform.styles";

interface Props {
  onSubmit: (data: {
    patientName: string;
    condition: string;
    priority: Priority;
    status: Status;
  }) => void;
}

const PRIORITIES: Priority[] = [1, 2, 3, 4, 5];
const STATUSES: Status[] = ["Pending", "In-Transit"];


export default function TriageForm({ onSubmit }: Props) {
  const [patientName, setPatientName] = useState("");
  const [condition, setCondition] = useState("");
  const [priority, setPriority] = useState<Priority>(1);
  const [status, setStatus] = useState<Status>("Pending");
  const [error, setError] = useState("");

  const isValid =
    patientName.trim() !== "" &&
    condition.trim() !== "";

  const isCritical = priority === 1 || priority === 2;
  const handleSubmit = () => {
    if (!isValid) {
      setError("Please fill in all fields");
      return;
    }
    setError("");
    onSubmit({
      patientName: patientName.trim(),
      condition: condition.trim(),
      priority,
      status,
    });
    setPatientName("");
    setCondition("");
    setPriority(1);
    setStatus("Pending");
  };
  return (
    <View style={[styles.container, isCritical && styles.criticalBorder]}>
      <Text style={styles.label}>Patient Name</Text>
      <TextInput
        style={styles.input}
        value={patientName}
        onChangeText={setPatientName}
        placeholder="e.g. John Doe"
        placeholderTextColor={colors.muted}
      />

      <Text style={styles.label}>Condition Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={condition}
        onChangeText={setCondition}
        placeholder="e.g. Chest pain, difficulty breathing"
        placeholderTextColor={colors.muted}
        multiline
      />

      <Text style={styles.label}>Priority Level</Text>
      <View style={styles.row}>
        {PRIORITIES.map((p) => {
          const selected = priority === p;
          return (
            <Pressable
              key={p}
              onPress={() => setPriority(p)}
              style={[
                styles.priorityBtn,
                { borderColor: priorityColors[p] },
                selected && { backgroundColor: priorityColors[p] },
              ]}
            >
              <Text
                style={[
                  styles.priorityText,
                  selected && styles.priorityTextSelected,
                ]}
              >
                {p}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.label}>Status</Text>
      <View style={styles.row}>
        {STATUSES.map((s) => (
          <Pressable
            key={s}
            onPress={() => setStatus(s)}
            style={[styles.statusBtn, status === s && styles.statusBtnSelected]}
          >
            <Text
              style={[
                styles.statusText,
                status === s && styles.statusTextSelected,
              ]}
            >
              {s}
            </Text>
          </Pressable>
        ))}
      </View>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <Pressable disabled={!isValid} style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit Triage</Text>
      </Pressable>
    </View>
  );
}
