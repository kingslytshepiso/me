import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";
import { ExperienceEntry } from "../constants/profile";
import { useTheme } from "../context/ThemeContext";

interface ExperienceTimelineProps {
  entries: ExperienceEntry[];
}

export function ExperienceTimeline({ entries }: ExperienceTimelineProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];

  const pillBackground =
    theme === "dark" ? "rgba(78, 201, 176, 0.15)" : "rgba(78, 201, 176, 0.2)";
  const lineColor =
    theme === "dark" ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.1)";

  return (
    <View style={styles.container} accessibilityRole="list">
      {entries.map((entry, index) => (
        <View
          key={`${entry.company}-${entry.period}`}
          style={styles.entryRow}
          accessibilityRole="listitem"
          accessibilityLabel={`${entry.role} at ${entry.company}, ${entry.period}. ${entry.highlight}`}
        >
          <View style={styles.timelineColumn}>
            <View
              style={[styles.dot, { backgroundColor: "#4EC9B0", borderColor: lineColor }]}
            />
            {index < entries.length - 1 && (
              <View style={[styles.line, { backgroundColor: lineColor }]} />
            )}
          </View>

          <View style={styles.contentColumn}>
            <View
              style={[styles.periodPill, { backgroundColor: pillBackground }]}
            >
              <Text style={[styles.periodText, { color: "#4EC9B0" }]}>
                {entry.period}
              </Text>
            </View>
            <Text style={[styles.role, { color: colors.text }]}>
              {entry.role}
            </Text>
            <Text style={[styles.company, { color: colors.text }]}>
              {entry.company}
            </Text>
            <Text style={[styles.highlight, { color: colors.text }]}>
              {entry.highlight}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxWidth: 700,
    alignSelf: "center",
  },
  entryRow: {
    flexDirection: "row",
    gap: 16,
    minHeight: 100,
  },
  timelineColumn: {
    width: 20,
    alignItems: "center",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    marginTop: 6,
  },
  line: {
    flex: 1,
    width: 2,
    marginTop: 4,
    marginBottom: -4,
  },
  contentColumn: {
    flex: 1,
    paddingBottom: 24,
  },
  periodPill: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 6,
  },
  periodText: {
    fontSize: 12,
    fontWeight: "600",
  },
  role: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  company: {
    fontSize: 14,
    opacity: 0.85,
    marginBottom: 6,
  },
  highlight: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.9,
  },
});
