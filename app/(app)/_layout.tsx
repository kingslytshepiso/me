import { Stack } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { Header } from "../../components/Header";
import { ThemeProvider, useTheme } from "../../context/ThemeContext";
import { useCustomFonts } from "../../hooks/useFonts";

function AppLayoutContent() {
  const { theme } = useTheme();
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      {/* <Header /> */}
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme === "dark" ? "#000" : "#fff",
          },
          headerTintColor: theme === "dark" ? "#fff" : "#000",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          header: () => <Header />,
          contentStyle: {
            backgroundColor: theme === "dark" ? "#000" : "#fff",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Home",
          }}
        />
        <Stack.Screen
          name="about"
          options={{
            title: "About",
          }}
        />
        <Stack.Screen
          name="projects"
          options={{
            title: "Projects",
          }}
        />
        <Stack.Screen
          name="contact"
          options={{
            title: "Contact",
          }}
        />
      </Stack>
    </>
  );
}

export default function AppLayout() {
  return (
    <ThemeProvider>
      <AppLayoutContent />
    </ThemeProvider>
  );
}
