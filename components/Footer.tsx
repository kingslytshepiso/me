import React from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import { Colors } from "../constants/Colors";
import { useTheme } from "../context/ThemeContext";

export function Footer() {
  const { theme } = useTheme();
  const colors = Colors[theme];

  const handleCursorPress = () => {
    Linking.openURL("https://cursor.sh");
  };

  const handleKingslyPress = () => {
    Linking.openURL("https://github.com/kingslytshepiso");
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            theme === "dark"
              ? "rgba(0, 0, 0, 0.3)"
              : "rgba(255, 255, 255, 0.3)",
        },
      ]}
    >
      <Text style={[styles.text, { color: colors.text }]}>
        Built with ❤️ by{" "}
        <Text style={styles.link} onPress={handleKingslyPress}>
          Kingsly
        </Text>{" "}
        and{" "}
        <Text style={styles.link} onPress={handleCursorPress}>
          Cursor
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(128, 128, 128, 0.2)",
  },
  text: {
    fontSize: 14,
    textAlign: "center",
  },
  link: {
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});
