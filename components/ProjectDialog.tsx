import { AppImage } from "./AppImage";
import React from "react";
import {
  ImageSourcePropType,
  Linking,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, Chip } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../constants/Colors";
import { DETAIL_DIALOG_MAX_WIDTH_WIDE } from "../constants/detailDialog";
import { useTheme } from "../context/ThemeContext";
import { Project } from "../types/project";
import { AppDetailDialog } from "./AppDetailDialog";

const LOGO_SIZE = 64;
const SECTION_MARGIN = 16;

interface ProjectDialogProps {
  project: Project | null;
  visible: boolean;
  onDismiss: () => void;
  getImageSource: (imagePath: string) => ImageSourcePropType | undefined;
}

export const ProjectDialog: React.FC<ProjectDialogProps> = ({
  project,
  visible,
  onDismiss,
  getImageSource,
}) => {
  const { theme } = useTheme();
  const colors = Colors[theme];

  if (!project) return null;

  return (
    <AppDetailDialog
      visible={visible}
      onDismiss={onDismiss}
      scrimAccessibilityLabel="Close project details"
      title={project.name}
      maxWidth={DETAIL_DIALOG_MAX_WIDTH_WIDE}
      scrollable
      actions={
        <>
          <Button onPress={onDismiss}>Close</Button>
          {project.website_link && (
            <Button
              mode="contained"
              onPress={() => Linking.openURL(project.website_link!)}
            >
              Visit Site
            </Button>
          )}
          {project.github_link && (
            <Button
              mode="contained"
              onPress={() => Linking.openURL(project.github_link!)}
            >
              View Repository
            </Button>
          )}
        </>
      }
    >
      <View style={styles.heroRow}>
        <View style={styles.logoFrame}>
          {project.image ? (
            <AppImage
              source={getImageSource(project.image)}
              style={styles.logoImage}
              contentFit="contain"
              placeholderKind="logo"
              recyclingKey={project.image}
              accessible
              accessibilityLabel={`${project.name} logo`}
            />
          ) : (
            <Icon
              name="code-braces"
              size={LOGO_SIZE * 0.4}
              color={
                theme === "dark"
                  ? "rgba(255, 255, 255, 0.3)"
                  : "rgba(0, 0, 0, 0.3)"
              }
            />
          )}
        </View>
        <View style={styles.heroContent}>
          <Text style={[styles.description, { color: colors.text }]}>
            {project.description}
          </Text>
          <Text style={[styles.meta, { color: colors.text }]}>
            <Text style={styles.metaLabel}>Role: </Text>
            {project.role}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Responsibilities
        </Text>
        {project.responsibilities.map((responsibility, index) => (
          <Text key={index} style={[styles.bodyText, { color: colors.text }]}>
            • {responsibility}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Tech Stack
        </Text>
        <View style={styles.techStack}>
          {project.tech_stack.map((tech, techIndex) => (
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
        </View>
      </View>
    </AppDetailDialog>
  );
};

const styles = StyleSheet.create({
  heroRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: SECTION_MARGIN,
  },
  logoFrame: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  logoImage: {
    width: "60%",
    height: "60%",
    borderRadius: 8,
  },
  heroContent: {
    flex: 1,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  meta: {
    fontSize: 14,
    lineHeight: 20,
  },
  metaLabel: {
    fontWeight: "600",
  },
  section: {
    marginBottom: SECTION_MARGIN,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  techStack: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
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
