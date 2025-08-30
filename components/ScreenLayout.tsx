import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "../constants/Colors";
import { useTheme } from "../context/ThemeContext";
import { Header } from "./Header";

interface ScreenLayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
  headerStyle?: any;
  contentStyle?: any;
}

export function ScreenLayout({
  children,
  showHeader = true,
  headerStyle,
  contentStyle,
}: ScreenLayoutProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {showHeader && (
        <View style={[styles.headerContainer, headerStyle]}>
          <Header />
        </View>
      )}
      <View style={[styles.content, contentStyle]}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  content: {
    flex: 1,
    // paddingTop: 60, // Account for header height
  },
});
