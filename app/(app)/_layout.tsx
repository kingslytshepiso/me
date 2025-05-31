import { Stack } from "expo-router";
import React from "react";
import { Header } from "../../components/Header";
import { ThemeProvider, useTheme } from "../../context/ThemeContext";

function AppLayoutContent() {
  const { theme } = useTheme();

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
