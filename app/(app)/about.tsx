import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "../../components/ScreenContainer";
import { Colors } from "../../constants/Colors";
import { useTheme } from "../../context/ThemeContext";

export default function About() {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <ScreenContainer gradientType="primary">
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>About Me</Text>
        <Text style={[styles.text, { color: colors.text }]}>
          Welcome to my portfolio! I&apos;m a passionate developer focused on
          creating innovative solutions and building great user experiences.
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
