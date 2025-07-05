import React from "react";
import ReactJsonPretty from "react-json-pretty";
import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { ScreenContainer } from "../../components/ScreenContainer";
import { Colors } from "../../constants/Colors";
import { useTheme } from "../../context/ThemeContext";

const profileInfo = {
  contact: {
    email: "kingslytshepiso@gmail.com",
    phone: "+27 76 076 8257",
    location: "South Africa",
  },
  stack: ["React", "Javascript/TypeScript", "Java", "AWS"],
  interests: ["Application Development", "UI/UX Design", "Testing", "AI/ML"],
};

export default function HomeScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;

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
            <View style={styles.introContainer}>
              <Text style={[styles.intro, { color: colors.text }]}>
                I build innovative solutions and create great user experiences.
                Passionate about turning ideas into reality through code.
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
    padding: 12,
  },
  contentWrapper: {
    flex: 1,
    gap: 24,
    paddingHorizontal: 24,
  },
  greetingSection: {
    flex: 1,
    justifyContent: "center",
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
    marginBottom: 24,
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
