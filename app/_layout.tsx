import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from "react-native-paper";
import "react-native-reanimated";

import { Colors } from "@/constants/Colors";
import {
  ThemeProvider as AppThemeProvider,
  useTheme,
} from "@/context/ThemeContext";
import { useColorSchemeHydration } from "@/hooks/useColorSchemeHydration";
import { useAppFonts } from "@/hooks/useFonts";
import { FloatingContactFab } from "@/components/FloatingContactFab";
import { WebAnalytics } from "@/components/WebAnalytics";

SplashScreen.preventAutoHideAsync();

if (typeof window !== "undefined") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports -- web-only global CSS
  require("./global.css");
}

function RootLayoutInner() {
  const { isDark, isReady } = useTheme();
  const hasHydrated = useColorSchemeHydration();
  const [fontsLoaded, fontError] = useAppFonts();

  const appReady =
    fontsLoaded && !fontError && hasHydrated && isReady;

  useEffect(() => {
    if (appReady) {
      SplashScreen.hideAsync().catch((error) => {
        console.warn("Failed to hide splash screen:", error);
      });
    }
  }, [appReady]);

  useEffect(() => {
    if (!isReady) return;
    SystemUI.setBackgroundColorAsync(
      Colors[isDark ? "dark" : "light"].background
    ).catch((error) => {
      console.warn("Failed to set system UI background:", error);
    });
  }, [isDark, isReady]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if (!hasHydrated) {
    return null;
  }

  if (fontError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error loading fonts</Text>
        <ActivityIndicator style={styles.spinner} />
      </View>
    );
  }

  if (!isReady) {
    return null;
  }

  const paperTheme = isDark ? MD3DarkTheme : MD3LightTheme;
  const navigationTheme = isDark ? DarkTheme : DefaultTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationThemeProvider value={navigationTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="about" />
          <Stack.Screen name="projects" />
          <Stack.Screen name="contact" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style={isDark ? "light" : "dark"} />
        <FloatingContactFab />
      </NavigationThemeProvider>
    </PaperProvider>
  );
}

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <WebAnalytics />
      <RootLayoutInner />
    </AppThemeProvider>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    marginBottom: 16,
  },
  spinner: {
    marginTop: 8,
  },
});
