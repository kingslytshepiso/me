import React from "react";
import { ScreenLayout } from "../components/ScreenLayout";
import { ThemeProvider } from "../context/ThemeContext";
import ContactScreen from "../screens/ContactScreen";

export default function ContactPage() {
  return (
    <ThemeProvider>
      <ScreenLayout>
        <ContactScreen />
      </ScreenLayout>
    </ThemeProvider>
  );
}
