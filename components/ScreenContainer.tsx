import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, StyleSheet, View, ViewStyle } from "react-native";
import { Colors } from "../constants/Colors";
import { useTheme } from "../context/ThemeContext";
import { Footer } from "./Footer";

interface ScreenContainerProps {
  children: React.ReactNode;
  style?: ViewStyle;
  scrollable?: boolean;
  showFooter?: boolean;
  gradientType?: "primary" | "secondary" | "accent";
}

const HEADER_HEIGHT = 60;

export function ScreenContainer({
  children,
  style,
  scrollable = true,
  showFooter = true,
  gradientType = "primary",
}: ScreenContainerProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];

  const gradientColors = colors.gradients[gradientType];

  const containerStyle = [styles.container, style];

  const renderContent = () => (
    <LinearGradient
      colors={gradientColors}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View
        style={[styles.contentContainer, { paddingTop: HEADER_HEIGHT + 16 }]}
      >
        <View style={styles.mainContent}>{children}</View>
        {showFooter && <Footer />}
      </View>
    </LinearGradient>
  );

  if (scrollable) {
    return (
      <ScrollView
        style={containerStyle}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderContent()}
      </ScrollView>
    );
  }

  return <View style={containerStyle}>{renderContent()}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  mainContent: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
