import React from "react";
import { PaperProvider } from "react-native-paper";
import { ThemeProvider } from "../../context/ThemeContext";

export function TestProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <PaperProvider>{children}</PaperProvider>
    </ThemeProvider>
  );
}
