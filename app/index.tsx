import React from "react";
import { ScreenLayout } from "../components/ScreenLayout";
import { ThemeProvider } from "../context/ThemeContext";
import HomeScreen from "../screens/HomeScreen";

export default function HomePage() {
  return (
    <ThemeProvider>
      <ScreenLayout>
        <HomeScreen />
      </ScreenLayout>
    </ThemeProvider>
  );
}
