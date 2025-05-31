import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Divider, Menu } from "react-native-paper";
import { Colors } from "../constants/Colors";
import { useTheme } from "../context/ThemeContext";

const HEADER_HEIGHT = 60;
const BREAKPOINT = 768;

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const colors = Colors[theme];
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [menuVisible, setMenuVisible] = useState(false);

  const isSmallScreen = width < BREAKPOINT;

  const handleNavigation = (route: "/projects" | "/contact") => {
    router.push(route);
    setMenuVisible(false);
  };

  return (
    <View style={[styles.container, { height: HEADER_HEIGHT }]}>
      <BlurView
        intensity={theme === "dark" ? 30 : 50}
        tint={theme === "dark" ? "dark" : "light"}
        style={styles.blurContainer}
      >
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

          {/* Navigation Tabs or Menu */}
          {isSmallScreen ? (
            <Menu
              visible={menuVisible}
              onDismiss={() => setMenuVisible(false)}
              anchor={
                <TouchableOpacity
                  onPress={() => setMenuVisible(true)}
                  style={[
                    styles.menuButton,
                    {
                      backgroundColor:
                        theme === "dark"
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(0, 0, 0, 0.05)",
                    },
                  ]}
                >
                  <Ionicons name="menu" size={24} color={colors.text} />
                </TouchableOpacity>
              }
              contentStyle={{
                backgroundColor: theme === "dark" ? "#1a1a1a" : "#ffffff",
              }}
            >
              <Menu.Item
                onPress={() => handleNavigation("/projects")}
                title="Projects"
                titleStyle={{ color: colors.text }}
              />
              <Divider />
              <Menu.Item
                onPress={() => handleNavigation("/contact")}
                title="Contact"
                titleStyle={{ color: colors.text }}
              />
            </Menu>
          ) : (
            <View style={styles.navContainer}>
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
          )}

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
      </BlurView>
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
  blurContainer: {
    flex: 1,
    overflow: "hidden",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
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
  menuButton: {
    padding: 8,
    borderRadius: 20,
    marginRight: 8,
  },
});
