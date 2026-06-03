import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "../components/ScreenContainer";
import { Colors } from "../constants/Colors";
import { screenHeaderStyles } from "../constants/screenHeader";
import { useTheme } from "../context/ThemeContext";

export default function AboutScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <ScreenContainer gradientType="primary">
      <View style={styles.container}>
        <View style={screenHeaderStyles.header}>
          <Text
            style={[screenHeaderStyles.title, { color: colors.text }]}
          >
            About Me
          </Text>
          <Text
            style={[screenHeaderStyles.subtitle, { color: colors.text }]}
          >
            Welcome to my portfolio! I&apos;m a passionate developer focused on
            creating innovative solutions and building great user experiences.
          </Text>
        </View>
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
});
