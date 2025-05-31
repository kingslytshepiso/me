import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "../../components/ScreenContainer";
import { Colors } from "../../constants/Colors";
import { useTheme } from "../../context/ThemeContext";

export default function Projects() {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <ScreenContainer gradientType="secondary">
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>My Projects</Text>
        <Text style={[styles.text, { color: colors.text }]}>
          Here you&apos;ll find a collection of my work, including web
          applications, mobile apps, and other software projects.
        </Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
});
