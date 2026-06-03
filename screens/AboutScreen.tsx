import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { ExperienceTimeline } from "../components/ExperienceTimeline";
import { ProfileHeroCard } from "../components/ProfileHeroCard";
import { ScreenContainer } from "../components/ScreenContainer";
import { SkillChipGroup } from "../components/SkillChipGroup";
import { Colors } from "../constants/Colors";
import {
  EDUCATION,
  EXPERIENCE,
  JOURNEY,
  OBJECTIVE,
  SKILLS,
} from "../constants/profile";
import { useTheme } from "../context/ThemeContext";

function SectionBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
      {children}
    </View>
  );
}

export default function AboutScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];

  return (
    <ScreenContainer gradientType="accent">
      <View style={styles.container}>
        <ProfileHeroCard />

        <SectionBlock title="My Journey">
          {JOURNEY.map((paragraph, index) => (
            <Text
              key={index}
              style={[styles.bodyText, { color: colors.text }]}
            >
              {paragraph}
            </Text>
          ))}
        </SectionBlock>

        <SectionBlock title="What I Do">
          <Text style={[styles.bodyText, { color: colors.text }]}>
            {OBJECTIVE}
          </Text>
        </SectionBlock>

        <SectionBlock title="Career Path">
          <ExperienceTimeline entries={EXPERIENCE} />
        </SectionBlock>

        <SectionBlock title="Education">
          {EDUCATION.map((entry) => (
            <View key={entry.year} style={styles.educationRow}>
              <Text style={[styles.educationYear, { color: "#4EC9B0" }]}>
                {entry.year}
              </Text>
              <View style={styles.educationDetails}>
                <Text style={[styles.educationQual, { color: colors.text }]}>
                  {entry.qualification}
                </Text>
                <Text
                  style={[styles.educationInst, { color: colors.text }]}
                >
                  {entry.institution}
                </Text>
              </View>
            </View>
          ))}
        </SectionBlock>

        <SectionBlock title="Skills">
          <SkillChipGroup title="Technical" skills={SKILLS.hard} />
          <SkillChipGroup title="Focus Areas" skills={SKILLS.focus} />
        </SectionBlock>

        <View style={styles.ctaRow}>
          <Button
            mode="contained"
            onPress={() => router.push("/projects")}
            style={styles.ctaButton}
            labelStyle={styles.ctaLabel}
          >
            View Projects
          </Button>
          <Button
            mode="outlined"
            onPress={() => router.push("/contact")}
            style={[
              styles.ctaButton,
              styles.ctaOutlined,
              {
                borderColor:
                  theme === "dark"
                    ? "rgba(255, 255, 255, 0.2)"
                    : "rgba(0, 0, 0, 0.2)",
              },
            ]}
            labelStyle={[styles.ctaLabel, { color: colors.text }]}
          >
            Contact Me
          </Button>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 32,
    paddingBottom: 16,
  },
  section: {
    width: "100%",
    maxWidth: 900,
    alignSelf: "center",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    fontFamily: "SpaceMono",
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 12,
  },
  educationRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
    alignItems: "flex-start",
  },
  educationYear: {
    fontSize: 14,
    fontWeight: "600",
    minWidth: 44,
  },
  educationDetails: {
    flex: 1,
    gap: 2,
  },
  educationQual: {
    fontSize: 15,
    fontWeight: "600",
  },
  educationInst: {
    fontSize: 14,
    opacity: 0.85,
  },
  ctaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "center",
    marginTop: 8,
  },
  ctaButton: {
    borderRadius: 8,
    minWidth: 140,
  },
  ctaOutlined: {
    borderWidth: 1,
  },
  ctaLabel: {
    fontSize: 14,
    textTransform: "none",
  },
});
