import React, { useCallback, useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ProjectCard } from "../../components/ProjectCard";
import { ProjectDialog } from "../../components/ProjectDialog";
import { ScreenContainer } from "../../components/ScreenContainer";
import { Colors } from "../../constants/Colors";
import { useTheme } from "../../context/ThemeContext";
import projectsData from "../../data/projects.json";
import { useResponsiveLayout } from "../../hooks/useResponsiveLayout";
import { Project } from "../../types/project";
import { getImageSource } from "../../utils/imageUtils";

export default function Projects() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const { cardWidth, maxCardWidth, minCardWidth } = useResponsiveLayout();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Memoize projects data to prevent unnecessary re-renders
  const projects = useMemo(() => projectsData.projects, []);

  const handleProjectPress = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleDismiss = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <ScreenContainer gradientType="secondary">
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>My Projects</Text>
        <Text style={[styles.text, { color: colors.text }]}>
          Here you&apos;ll find a collection of my work, including web
          applications, mobile apps, and other software projects.
        </Text>

        <View
          style={[styles.gridContainer, { gap: 16, minWidth: minCardWidth }]}
        >
          {projects.map((project, index) => (
            <ProjectCard
              key={`${project.name}-${index}`}
              project={project}
              onPress={handleProjectPress}
              width={cardWidth}
              minWidth={minCardWidth}
              getImageSource={getImageSource}
            />
          ))}
        </View>

        <ProjectDialog
          project={selectedProject}
          visible={selectedProject !== null}
          onDismiss={handleDismiss}
          getImageSource={getImageSource}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "flex-start",
    alignContent: "flex-start",
  },
});
