import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import { Colors } from "../constants/Colors";
import { useTheme } from "../context/ThemeContext";

interface NavMenuSectionProps {
  title: string;
  children: React.ReactNode;
  solidSurface?: boolean;
}

function getSectionBorderColor(theme: "light" | "dark") {
  return theme === "dark"
    ? "rgba(255, 255, 255, 0.1)"
    : "rgba(0, 0, 0, 0.1)";
}

export function NavMenuSection({
  title,
  children,
  solidSurface = false,
}: NavMenuSectionProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const borderColor = getSectionBorderColor(theme);

  const bodyBackground =
    solidSurface && Platform.OS === "web"
      ? theme === "dark"
        ? "rgba(255, 255, 255, 0.03)"
        : "rgba(0, 0, 0, 0.02)"
      : "transparent";

  return (
    <View style={styles.section}>
      <Text
        style={[styles.title, { color: colors.icon }]}
        accessibilityRole="header"
      >
        {title}
      </Text>
      <View
        style={[
          styles.body,
          {
            borderColor,
            backgroundColor: bodyBackground,
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 0.6,
    textTransform: "uppercase",
    marginBottom: 8,
    marginLeft: 4,
  },
  body: {
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
});
