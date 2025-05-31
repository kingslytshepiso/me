import React, { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { Button, Card, Chip, Dialog, Portal } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { ScreenContainer } from "../../components/ScreenContainer";
import { Colors } from "../../constants/Colors";
import { useTheme } from "../../context/ThemeContext";
import projectsData from "../../data/projects.json";

// Import images
const images: Record<string, ImageSourcePropType> = {
  "ioco.png": require("../../assets/images/logos/ioco.png"),
  "1-crown-b.jpg": require("../../assets/images/logos/1-crown-b.jpg"),
  "pp.png": require("../../assets/images/logos/pp.png"),
};

interface Project {
  name: string;
  company: string;
  description: string;
  tech_stack: string[];
  role: string;
  responsibilities: string[];
  image?: string;
  github_link?: string | null;
}

export default function Projects() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const { width } = useWindowDimensions();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Calculate number of columns based on screen width
  const getColumnCount = () => {
    if (width >= 1536) return 4; // 2xl
    if (width >= 1280) return 3; // xl
    if (width >= 1024) return 3; // lg
    if (width >= 768) return 2; // md
    return 1; // sm and below
  };

  const columnCount = getColumnCount();

  const handleProjectPress = (project: Project) => {
    setSelectedProject(project);
  };

  const handleDismiss = () => {
    setSelectedProject(null);
  };

  const getImageSource = (
    imagePath: string
  ): ImageSourcePropType | undefined => {
    const imageName = imagePath.split("/").pop();
    return imageName ? images[imageName] : undefined;
  };

  return (
    <ScreenContainer gradientType="secondary">
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>My Projects</Text>
        <Text style={[styles.text, { color: colors.text }]}>
          Here you&apos;ll find a collection of my work, including web
          applications, mobile apps, and other software projects.
        </Text>

        <View style={[styles.gridContainer, { gap: 16 }]}>
          {projectsData.projects.map((project, index) => (
            <Card
              key={index}
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
                  width: `${100 / columnCount}%`,
                  marginRight: index % columnCount !== columnCount - 1 ? 16 : 0,
                },
              ]}
              onPress={() => handleProjectPress(project)}
            >
              <Card.Content style={styles.cardContent}>
                {project.image && (
                  <View style={styles.imageContainer}>
                    <Image
                      source={getImageSource(project.image)}
                      style={styles.projectImage}
                      resizeMode="contain"
                    />
                  </View>
                )}
                <View style={styles.cardTextContent}>
                  <Text style={[styles.projectName, { color: colors.text }]}>
                    {project.name}
                  </Text>
                  <Text style={[styles.companyName, { color: colors.text }]}>
                    {project.company}
                  </Text>
                  <View style={styles.techStack}>
                    {project.tech_stack.slice(0, 3).map((tech, techIndex) => (
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
                        textStyle={[
                          styles.techChipText,
                          { color: colors.text },
                        ]}
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
                        textStyle={[
                          styles.techChipText,
                          { color: colors.text },
                        ]}
                      >
                        +{project.tech_stack.length - 3}
                      </Chip>
                    )}
                  </View>
                </View>
              </Card.Content>
            </Card>
          ))}
        </View>

        <Portal>
          <Dialog
            visible={selectedProject !== null}
            onDismiss={handleDismiss}
            style={[
              styles.dialog,
              {
                backgroundColor: theme === "dark" ? "#1E1E1E" : "#FFFFFF",
                maxWidth: 600,
                width: "90%",
                alignSelf: "center",
                marginTop: "auto",
                marginBottom: "auto",
              },
            ]}
          >
            {selectedProject && (
              <>
                <Dialog.Title
                  style={[styles.dialogTitle, { color: colors.text }]}
                >
                  {selectedProject.name}
                </Dialog.Title>
                <Dialog.Content style={styles.dialogContent}>
                  <View style={styles.dialogHeader}>
                    {selectedProject.image && (
                      <View style={styles.dialogImageContainer}>
                        <Image
                          source={getImageSource(selectedProject.image)}
                          style={styles.dialogImage}
                          resizeMode="contain"
                        />
                      </View>
                    )}
                    <View style={styles.dialogHeaderContent}>
                      <Text style={[styles.dialogText, { color: colors.text }]}>
                        {selectedProject.description}
                      </Text>
                      <Text style={[styles.dialogText, { color: colors.text }]}>
                        <Text style={{ fontWeight: "bold" }}>Role: </Text>
                        {selectedProject.role}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.dialogSection}>
                    <Text
                      style={[
                        styles.dialogSectionTitle,
                        { color: colors.text },
                      ]}
                    >
                      Responsibilities
                    </Text>
                    {selectedProject.responsibilities.map(
                      (responsibility, index) => (
                        <Text
                          key={index}
                          style={[styles.dialogText, { color: colors.text }]}
                        >
                          • {responsibility}
                        </Text>
                      )
                    )}
                  </View>

                  <View style={styles.dialogSection}>
                    <Text
                      style={[
                        styles.dialogSectionTitle,
                        { color: colors.text },
                      ]}
                    >
                      Tech Stack
                    </Text>
                    <View style={styles.dialogTechStack}>
                      {selectedProject.tech_stack.map((tech, techIndex) => (
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
                          textStyle={[
                            styles.techChipText,
                            { color: colors.text },
                          ]}
                        >
                          {tech}
                        </Chip>
                      ))}
                    </View>
                  </View>
                </Dialog.Content>
                <Dialog.Actions style={styles.dialogActions}>
                  {selectedProject.github_link && (
                    <Button
                      mode="contained"
                      onPress={() => {
                        if (selectedProject.github_link) {
                          window.open(selectedProject.github_link, "_blank");
                        }
                      }}
                      style={[
                        styles.githubButton,
                        {
                          backgroundColor:
                            theme === "dark" ? "#2EA043" : "#238636",
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
                    onPress={handleDismiss}
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
              </>
            )}
          </Dialog>
        </Portal>
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
    justifyContent: "flex-start",
  },
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
  dialog: {
    borderRadius: 12,
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
  },
  dialogHeader: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  dialogImageContainer: {
    width: 120,
    height: 120,
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
});
