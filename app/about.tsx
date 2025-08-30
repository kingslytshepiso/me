import React from "react";
import { ScreenLayout } from "../components/ScreenLayout";
import { ThemeProvider } from "../context/ThemeContext";
import AboutScreen from "../screens/AboutScreen";

export default function AboutPage() {
  return (
    <ThemeProvider>
      <ScreenLayout>
        <AboutScreen />
      </ScreenLayout>
    </ThemeProvider>
  );
}
