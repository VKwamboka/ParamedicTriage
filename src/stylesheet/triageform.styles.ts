import { StyleSheet } from "react-native";
import { colors } from "../theme";

export default StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.bg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },

  criticalBorder: { borderColor: "#DC2626", borderWidth: 2 },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.muted,
    marginTop: 14,
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.surface,
  },

  textArea: { minHeight: 70, textAlignVertical: "top" },

  row: { flexDirection: "row", gap: 8 },

  priorityBtn: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },

  priorityText: { fontWeight: "700", fontSize: 16, color: colors.text },

  priorityTextSelected: { color: colors.white },

  statusBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    backgroundColor: colors.white,
  },

  statusBtnSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  statusText: { fontWeight: "600", color: colors.text },

  statusTextSelected: { color: colors.white },

  error: { color: "#DC2626", marginTop: 10, fontSize: 13 },

  submitBtn: {
    marginTop: 20,
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  
  submitText: { color: colors.white, fontWeight: "700", fontSize: 16 },

  helperText: {
  fontSize: 12,
  color: colors.warning,
  marginBottom: 8,
  marginTop: 12,
},

submitBtnDisabled: {
  opacity: 0.5,
},
});


