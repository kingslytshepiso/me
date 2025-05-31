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
          backgroundColor: "transparent",
        },
      ]}
    >
      <View style={styles.contentContainer}>
        <Text style={[styles.text, { color: colors.text }]}>
          Built with ❤️ by{" "}
          <Text style={styles.link} onPress={handleKingslyPress}>
            Kingsly
          </Text>{" "}
          using{" "}
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
            <Ionicons name="logo-github" size={20} color={colors.text} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialButton}
            onPress={() =>
              handleSocialPress("https://twitter.com/kingslytshepiso")
            }
          >
            <Ionicons name="logo-twitter" size={20} color={colors.text} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.socialButton}
            onPress={() =>
              handleSocialPress("www.linkedin.com/in/kingsly-m-062a7bb8")
            }
          >
            <Ionicons name="logo-linkedin" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(128, 128, 128, 0.2)",
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  text: {
    fontSize: 13,
  },
  link: {
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  socialContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  socialButton: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: "rgba(128, 128, 128, 0.1)",
  },
});
