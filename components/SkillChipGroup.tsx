import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Chip } from "react-native-paper";
import { Colors } from "../constants/Colors";
import { useTheme } from "../context/ThemeContext";

interface SkillChipGroupProps {
  title: string;
  skills: readonly string[];
}

export function SkillChipGroup({ title, skills }: SkillChipGroupProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];

  const chipBackground =
    theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)";

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <View style={styles.chipRow}>
        {skills.map((skill) => (
          <Chip
            key={skill}
            style={[styles.chip, { backgroundColor: chipBackground }]}
            textStyle={[styles.chipText, { color: colors.text }]}
          >
            {skill}
          </Chip>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 700,
    alignSelf: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    height: 28,
  },
  chipText: {
    fontSize: 12,
    lineHeight: 16,
  },
});
