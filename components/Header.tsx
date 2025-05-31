import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Colors } from "../constants/Colors";
import { useTheme } from "../context/ThemeContext";

const HEADER_HEIGHT = 60;

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const colors = Colors[theme];

  return (
    <View style={[styles.container, { height: HEADER_HEIGHT }]}>
      <View style={styles.content}>
        <TouchableOpacity
          onPress={toggleTheme}
          style={[
            styles.themeButton,
            {
              backgroundColor:
                theme === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.05)",
            },
          ]}
          accessibilityLabel="Toggle theme"
        >
          <Ionicons
            name={theme === "dark" ? "sunny" : "moon"}
            size={24}
            color={colors.text}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
  },
  themeButton: {
    padding: 8,
    borderRadius: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
