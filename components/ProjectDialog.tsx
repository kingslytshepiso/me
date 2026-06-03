import { AppImage } from "./AppImage";
import React from "react";
import {
  ImageSourcePropType,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, Chip, Dialog } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../constants/Colors";
import { useTheme } from "../context/ThemeContext";
import { useDialogLayout } from "../hooks/useDialogLayout";
import { Project } from "../types/project";
import { AppFullScreenOverlay } from "./AppFullScreenOverlay";

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
  const layout = useDialogLayout();

  if (!project) return null;

  const surfaceColor = theme === "dark" ? "#1E1E1E" : "#FFFFFF";

  return (
    <AppFullScreenOverlay
      visible={visible}
      onDismiss={onDismiss}
      scrimAccessibilityLabel="Close project details"
      contentStyle={styles.overlayCenter}
    >
      <View
        style={[
          styles.dialog,
          styles.dialogSurface,
          {
            backgroundColor: surfaceColor,
            maxWidth: layout.maxWidth,
            maxHeight: layout.maxHeight,
            width: layout.width,
          },
        ]}
      >
        <Dialog.Title style={[styles.dialogTitle, { color: colors.text }]}>
          {project.name}
        </Dialog.Title>
        <Dialog.Content style={{ flex: 4, minHeight: 0, padding: 0 }}>
          <ScrollView
            style={{ flex: 1, minHeight: 0 }}
            contentContainerStyle={{
              padding: layout.contentPadding,
              paddingBottom: 24,
            }}
            showsVerticalScrollIndicator={true}
          >
            {/* Image and Description */}
            <View style={{ flexDirection: "row", gap: 16, marginBottom: 24 }}>
              <View
                style={[
                  styles.dialogImageContainer,
                  { width: layout.imageSize, height: layout.imageSize },
                ]}
              >
                {project.image ? (
                  <AppImage
                    source={getImageSource(project.image)}
                    style={styles.dialogImage}
                    contentFit="contain"
                    placeholderKind="logo"
                    recyclingKey={project.image}
                    accessible={true}
                    accessibilityLabel={`${project.name} logo`}
                  />
                ) : (
                  <Icon
                    name="code-braces"
                    size={layout.imageSize * 0.4}
                    color={
                      theme === "dark"
                        ? "rgba(255, 255, 255, 0.3)"
                        : "rgba(0, 0, 0, 0.3)"
                    }
                  />
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.dialogText, { color: colors.text }]}>
                  {" "}
                  {project.description}{" "}
                </Text>
                <Text style={[styles.dialogText, { color: colors.text }]}>
                  {" "}
                  <Text style={{ fontWeight: "bold" }}>Role: </Text>
                  {project.role}{" "}
                </Text>
              </View>
            </View>
            {/* Responsibilities */}
            <View style={{ marginBottom: layout.sectionMargin }}>
              <Text style={[styles.dialogSectionTitle, { color: colors.text }]}>
                Responsibilities
              </Text>
              {project.responsibilities.map(
                (responsibility: string, index: number) => (
                  <Text
                    key={index}
                    style={[styles.dialogText, { color: colors.text }]}
                  >
                    • {responsibility}
                  </Text>
                )
              )}
            </View>
            {/* Tech Stack */}
            <View style={{ marginBottom: layout.sectionMargin }}>
              <Text style={[styles.dialogSectionTitle, { color: colors.text }]}>
                Tech Stack
              </Text>
              <View style={styles.dialogTechStack}>
                {project.tech_stack.map((tech: string, techIndex: number) => (
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
          </ScrollView>
        </Dialog.Content>
        <Dialog.Actions style={styles.dialogActions}>
          {project.website_link && (
            <Button
              mode="contained"
              onPress={() => Linking.openURL(project.website_link!)}
              style={[
                styles.siteButton,
                {
                  backgroundColor: theme === "dark" ? "#4EC9B0" : "#0a7ea4",
                },
              ]}
              labelStyle={styles.buttonLabel}
              icon={({ size, color }) => (
                <Icon name="web" size={20} color="#FFFFFF" />
              )}
            >
              Visit Site
            </Button>
          )}
          {project.github_link && (
            <Button
              mode="contained"
              onPress={() => Linking.openURL(project.github_link!)}
              style={[
                styles.githubButton,
                {
                  backgroundColor: theme === "dark" ? "#2EA043" : "#238636",
                },
              ]}
              labelStyle={styles.buttonLabel}
              icon={({ size, color }) => (
                <Icon name="github" size={20} color="#FFFFFF" />
              )}
            >
              View Repository
            </Button>
          )}
          <Button
            mode="outlined"
            onPress={onDismiss}
            style={[
              styles.closeButton,
              {
                borderColor:
                  theme === "dark"
                    ? "rgba(255, 255, 255, 0.2)"
                    : "rgba(0, 0, 0, 0.2)",
              },
            ]}
            labelStyle={[styles.buttonLabel, { color: colors.text }]}
            icon={({ size, color }) => (
              <Icon name="close" size={20} color={colors.text} />
            )}
          >
            Close
          </Button>
        </Dialog.Actions>
      </View>
    </AppFullScreenOverlay>
  );
};

const styles = StyleSheet.create({
  overlayCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  dialog: {
    flexDirection: "column",
    flex: 1,
    maxHeight: "90%",
  },
  dialogSurface: {
    borderRadius: 12,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  dialogTitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 16,
    paddingHorizontal: 24,
  },
  dialogContent: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 16,
    flexGrow: 1,
  },
  dialogHeader: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  dialogImageContainer: {
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    justifyContent: "center",
    alignItems: "center",
    flexShrink: 0,
  },
  dialogImage: {
    width: "60%",
    height: "60%",
    borderRadius: 8,
  },
  dialogHeaderContent: {
    flex: 1,
  },
  dialogSection: {
    marginBottom: 24,
  },
  dialogSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  dialogText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  dialogTechStack: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  dialogActions: {
    paddingHorizontal: 24,
    paddingBottom: 16,
    paddingTop: 8,
    justifyContent: "flex-end",
    gap: 12,
  },
  githubButton: {
    borderRadius: 6,
    marginRight: 0,
  },
  siteButton: {
    borderRadius: 6,
    marginRight: 0,
  },
  closeButton: {
    borderRadius: 6,
    borderWidth: 1,
  },
  buttonLabel: {
    fontSize: 14,
    fontWeight: "500",
    textTransform: "none",
    paddingHorizontal: 4,
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
