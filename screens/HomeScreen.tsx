import React from "react";
import ReactJsonPretty from "react-json-pretty";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { CertificationBadgeStrip } from "../components/CertificationBadgeStrip";
import { ScreenContainer } from "../components/ScreenContainer";
import { BREAKPOINT_MD } from "../constants/layout";
import { Colors } from "../constants/Colors";
import { useTheme } from "../context/ThemeContext";
import { useContentPadding } from "../hooks/useContentPadding";

const profileInfo = {
  contact: {
    email: "kingslytshepiso@gmail.com",
    phone: "+27 76 076 8257",
    location: "Midrand, Gauteng",
  },
  stack: [
    "Java Spring Boot",
    "React",
    "React Native",
    "AWS",
    "Azure",
    "Python",
  ],
  interests: [
    "AI Engineering",
    "Cloud Architecture",
    "API Development",
    "Mobile",
  ],
};

export default function HomeScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const { width } = useWindowDimensions();
  const contentPadding = useContentPadding();
  const isDesktop = width >= BREAKPOINT_MD;

  const jsonPrettyTheme = {
    main: `background:transparent;color:${colors.text};line-height:1.7;padding:12px 12px;`,
    error: "color:#D32F2F;",
    key: `color:${colors.tint};`,
    string: "color:#4EC9B0;",
    value: `color:${colors.text};`,
    boolean: "color:#569CD6;",
    null: "color:#9CDCFE;",
    bracket: `color:${colors.text};`,
  };

  return (
    <ScreenContainer gradientType="primary">
      <View style={styles.container}>
        <View
          style={[
            styles.contentWrapper,
            {
              flexDirection: isDesktop ? "row" : "column",
              paddingHorizontal: isDesktop ? contentPadding.horizontal : 0,
            },
          ]}
        >
          <View
            style={[
              styles.greetingSection,
              {
                paddingRight: isDesktop ? 24 : 0,
                marginBottom: isDesktop ? 0 : 32,
              },
            ]}
          >
            <Text style={[styles.greeting, { color: colors.text }]}>
              Hi there! 👋
            </Text>
            <Text style={[styles.greeting, { color: colors.text }]}>
              I&apos;m
            </Text>
            <Text style={[styles.name, { color: "#4EC9B0" }]}>
              Kingsly Mokgwathi
            </Text>
            <Text style={[styles.role, { color: "#569CD6" }]}>
              Full Stack Developer
            </Text>
            <CertificationBadgeStrip />
            <View style={styles.introContainer}>
              <Text style={[styles.intro, { color: colors.text }]}>
                Full-stack developer building scalable applications with Java
                Spring Boot, React, and AWS/Azure. I ship AI-powered solutions
                and modernize legacy systems—currently evolving Droppa&apos;s
                platform while delivering high-impact work across cloud, APIs,
                and mobile.
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.jsonWrapper,
              {
                backgroundColor:
                  theme === "dark"
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.02)",
                borderColor:
                  theme === "dark"
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.1)",
                width: isDesktop ? "auto" : "100%",
                minWidth: 320,
                maxWidth: 600,
                minHeight: 200,
                alignSelf: "center",
              },
            ]}
          >
            <ReactJsonPretty data={profileInfo} theme={jsonPrettyTheme} />
          </View>
        </View>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrapper: {
    flex: 1,
    gap: 24,
  },
  greetingSection: {
    flex: 1,
    // justifyContent: "center",
  },
  greeting: {
    fontSize: 24,
    marginBottom: 8,
    fontFamily: "SpaceMono",
  },
  name: {
    fontSize: 48,
    fontWeight: "bold",
    marginBottom: 12,
    fontFamily: "SpaceMono",
  },
  role: {
    fontSize: 24,
    marginBottom: 8,
    fontFamily: "SpaceMono",
  },
  introContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(128, 128, 128, 0.2)",
  },
  intro: {
    fontSize: 16,
    lineHeight: 28,
  },
  jsonWrapper: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
  },
});
