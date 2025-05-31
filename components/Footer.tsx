import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
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

  const handleSocialPress = (url: string) => {
    Linking.openURL(url);
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

      <View style={styles.socialContainer}>
        <TouchableOpacity
          style={styles.socialButton}
          onPress={() =>
            handleSocialPress("https://github.com/kingslytshepiso")
          }
        >
          <Ionicons name="logo-github" size={24} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialButton}
          onPress={() =>
            handleSocialPress("https://twitter.com/kingslytshepiso")
          }
        >
          <Ionicons name="logo-twitter" size={24} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.socialButton}
          onPress={() =>
            handleSocialPress("www.linkedin.com/in/kingsly-m-062a7bb8")
          }
        >
          <Ionicons name="logo-linkedin" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>
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
    marginBottom: 12,
  },
  link: {
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  socialButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "rgba(128, 128, 128, 0.1)",
  },
});
