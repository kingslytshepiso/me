import { StyleSheet } from "react-native";

/** Shared centered title + subtitle block for content screens. */
export const screenHeaderStyles = StyleSheet.create({
  header: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    width: "100%",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    width: "100%",
  },
});
