import React from "react";
import { ScreenLayout } from "../components/ScreenLayout";
import { ThemeProvider } from "../context/ThemeContext";
import ProjectsScreen from "../screens/ProjectsScreen";

export default function ProjectsPage() {
  return (
    <ThemeProvider>
      <ScreenLayout>
        <ProjectsScreen />
      </ScreenLayout>
    </ThemeProvider>
  );
}
