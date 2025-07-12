import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Card, Chip } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../constants/Colors";
import { useTheme } from "../context/ThemeContext";
import { Project } from "../types/project";

interface ProjectCardProps {
  project: Project;
  onPress: (project: Project) => void;
  width: number | `${number}%`;
  minWidth?: number;
  getImageSource: (imagePath: string) => ImageSourcePropType | undefined;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onPress,
  width,
  minWidth,
  getImageSource,
}) => {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <Card
      style={[
        styles.projectCard,
        {
          backgroundColor:
            theme === "dark"
              ? "rgba(255, 255, 255, 0.05)"
              : "rgba(0, 0, 0, 0.02)",
          borderColor:
            theme === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)",
          width,
          minWidth: minWidth || 280,
        },
      ]}
      onPress={() => onPress(project)}
      accessible={true}
      accessibilityLabel={`Project: ${project.name} at ${project.company}`}
      accessibilityHint="Double tap to view project details"
    >
      <Card.Content style={styles.cardContent}>
        <View style={styles.imageContainer}>
          {project.image ? (
            <Image
              source={getImageSource(project.image)}
              style={styles.projectImage}
              resizeMode="contain"
              accessible={true}
              accessibilityLabel={`${project.name} logo`}
            />
          ) : (
            <Icon
              name="code-braces"
              size={40}
              color={
                theme === "dark"
                  ? "rgba(255, 255, 255, 0.3)"
                  : "rgba(0, 0, 0, 0.3)"
              }
            />
          )}
        </View>
        <View style={styles.cardTextContent}>
          <Text style={[styles.projectName, { color: colors.text }]}>
            {project.name}
          </Text>
          <Text style={[styles.companyName, { color: colors.text }]}>
            {project.company}
          </Text>
          <View style={styles.techStack}>
            {project.tech_stack
              .slice(0, 3)
              .map((tech: string, techIndex: number) => (
                <Chip
                  key={techIndex}
                  style={[
                    styles.techChip,
                    {
                      backgroundColor:
                        theme === "dark"
                          ? "rgba(255, 255, 255, 0.1)"
                          : "rgba(0, 0, 0, 0.05)",
                    },
                  ]}
                  textStyle={[styles.techChipText, { color: colors.text }]}
                >
                  {tech}
                </Chip>
              ))}
            {project.tech_stack.length > 3 && (
              <Chip
                style={[
                  styles.techChip,
                  {
                    backgroundColor:
                      theme === "dark"
                        ? "rgba(255, 255, 255, 0.1)"
                        : "rgba(0, 0, 0, 0.05)",
                  },
                ]}
                textStyle={[styles.techChipText, { color: colors.text }]}
              >
                +{project.tech_stack.length - 3}
              </Chip>
            )}
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  projectCard: {
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardContent: {
    padding: 12,
  },
  imageContainer: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 12,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  projectImage: {
    width: "60%",
    height: "60%",
  },
  cardTextContent: {
    alignItems: "center",
  },
  projectName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  companyName: {
    fontSize: 12,
    opacity: 0.8,
    marginBottom: 8,
    textAlign: "center",
  },
  techStack: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    justifyContent: "center",
  },
  techChip: {
    height: 24,
    marginBottom: 4,
  },
  techChipText: {
    fontSize: 11,
    lineHeight: 14,
  },
});
