import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../constants/Colors";
import { useTheme } from "../context/ThemeContext";

const HEADER_HEIGHT = 60;

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const colors = Colors[theme];
  const router = useRouter();

  return (
    <View style={[styles.container, { height: HEADER_HEIGHT }]}>
      <View style={styles.content}>
        {/* Brand */}
        <TouchableOpacity
          style={styles.brandContainer}
          onPress={() => router.push("/")}
        >
          <Text style={[styles.brandText, { color: colors.text }]}>
            kingslyMokgwathi
          </Text>
        </TouchableOpacity>

        {/* Navigation Tabs */}
        <View style={styles.navContainer}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("/about")}
          >
            <Text style={[styles.navText, { color: colors.text }]}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("/projects")}
          >
            <Text style={[styles.navText, { color: colors.text }]}>
              Projects
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("/contact")}
          >
            <Text style={[styles.navText, { color: colors.text }]}>
              Contact
            </Text>
          </TouchableOpacity>
        </View>

        {/* Theme Toggle */}
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
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  brandContainer: {
    flex: 1,
  },
  brandText: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "SpaceMono",
  },
  navContainer: {
    flex: 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  navItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  navText: {
    fontSize: 16,
    fontWeight: "500",
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
