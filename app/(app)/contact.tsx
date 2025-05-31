import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "../../components/ScreenContainer";
import { Colors } from "../../constants/Colors";
import { useTheme } from "../../context/ThemeContext";

export default function Contact() {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <ScreenContainer gradientType="accent">
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>Contact Me</Text>
        <Text style={[styles.text, { color: colors.text }]}>
          Feel free to reach out! I&apos;m always open to discussing new
          projects, creative ideas, or opportunities to be part of your vision.
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
