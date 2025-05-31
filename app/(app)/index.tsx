import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScreenContainer } from "../../components/ScreenContainer";
import { Colors } from "../../constants/Colors";
import { useTheme } from "../../context/ThemeContext";

const profileInfo = {
  contact: {
    email: "kingsly.mokgwathi@gmail.com",
    phone: "+27 71 123 4567",
    location: "South Africa",
  },
  stack: ["React Native", "TypeScript", "Node.js", "Python", "AWS"],
  interests: [
    "Mobile Development",
    "Web Development",
    "Cloud Computing",
    "UI/UX Design",
  ],
};

export default function HomeScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];

  const renderJsonValue = (value: any, isString = true) => {
    if (Array.isArray(value)) {
      return (
        <View style={styles.arrayContainer}>
          <Text
            style={[
              styles.bracket,
              { color: theme === "dark" ? "#D4D4D4" : "#000000" },
            ]}
          >
            [
          </Text>
          {value.map((item, index) => (
            <View key={index} style={styles.arrayItem}>
              <Text
                style={[
                  styles.string,
                  { color: theme === "dark" ? "#CE9178" : "#A31515" },
                ]}
              >
                &quot;{item}&quot;
              </Text>
              {index < value.length - 1 && (
                <Text
                  style={[
                    styles.comma,
                    { color: theme === "dark" ? "#D4D4D4" : "#000000" },
                  ]}
                >
                  ,
                </Text>
              )}
            </View>
          ))}
          <Text
            style={[
              styles.bracket,
              { color: theme === "dark" ? "#D4D4D4" : "#000000" },
            ]}
          >
            ]
          </Text>
        </View>
      );
    }
    return (
      <Text
        style={[
          styles.string,
          { color: theme === "dark" ? "#CE9178" : "#A31515" },
        ]}
      >
        {isString ? `&quot;${value}&quot;` : value}
      </Text>
    );
  };

  return (
    <ScreenContainer gradientType="primary">
      <View style={styles.container}>
        <View style={styles.contentWrapper}>
          <View style={styles.greetingSection}>
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
              },
            ]}
          >
            <Text
              style={[
                styles.comment,
                { color: theme === "dark" ? "#6A9955" : "#008000" },
              ]}
            >
              {`// Contact & Skills`}
            </Text>
            <Text
              style={[
                styles.bracket,
                { color: theme === "dark" ? "#D4D4D4" : "#000000" },
              ]}
            >{`{`}</Text>

            <View style={styles.jsonLine}>
              <Text
                style={[
                  styles.key,
                  { color: theme === "dark" ? "#9CDCFE" : "#0000FF" },
                ]}
              >
                &nbsp;&nbsp;&quot;contact&quot;
              </Text>
              <Text
                style={[
                  styles.colon,
                  { color: theme === "dark" ? "#D4D4D4" : "#000000" },
                ]}
              >
                :{" "}
              </Text>
              <Text
                style={[
                  styles.bracket,
                  { color: theme === "dark" ? "#D4D4D4" : "#000000" },
                ]}
              >{`{`}</Text>
            </View>

            <View style={[styles.jsonLine, styles.nestedLine]}>
              <Text
                style={[
                  styles.key,
                  { color: theme === "dark" ? "#9CDCFE" : "#0000FF" },
                ]}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;email&quot;
              </Text>
              <Text
                style={[
                  styles.colon,
                  { color: theme === "dark" ? "#D4D4D4" : "#000000" },
                ]}
              >
                :{" "}
              </Text>
              {renderJsonValue(profileInfo.contact.email)}
              <Text
                style={[
                  styles.comma,
                  { color: theme === "dark" ? "#D4D4D4" : "#000000" },
                ]}
              >
                ,
              </Text>
            </View>

            <View style={[styles.jsonLine, styles.nestedLine]}>
              <Text
                style={[
                  styles.key,
                  { color: theme === "dark" ? "#9CDCFE" : "#0000FF" },
                ]}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;phone&quot;
              </Text>
              <Text
                style={[
                  styles.colon,
                  { color: theme === "dark" ? "#D4D4D4" : "#000000" },
                ]}
              >
                :{" "}
              </Text>
              {renderJsonValue(profileInfo.contact.phone)}
              <Text
                style={[
                  styles.comma,
                  { color: theme === "dark" ? "#D4D4D4" : "#000000" },
                ]}
              >
                ,
              </Text>
            </View>

            <View style={[styles.jsonLine, styles.nestedLine]}>
              <Text
                style={[
                  styles.key,
                  { color: theme === "dark" ? "#9CDCFE" : "#0000FF" },
                ]}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&quot;location&quot;
              </Text>
              <Text
                style={[
                  styles.colon,
                  { color: theme === "dark" ? "#D4D4D4" : "#000000" },
                ]}
              >
                :{" "}
              </Text>
              {renderJsonValue(profileInfo.contact.location)}
            </View>

            <View style={styles.jsonLine}>
              <Text
                style={[
                  styles.bracket,
                  { color: theme === "dark" ? "#D4D4D4" : "#000000" },
                ]}
              >
                &nbsp;&nbsp;{`}`}
              </Text>
              <Text
                style={[
                  styles.comma,
                  { color: theme === "dark" ? "#D4D4D4" : "#000000" },
                ]}
              >
                ,
              </Text>
            </View>

            <View style={styles.jsonLine}>
              <Text
                style={[
                  styles.key,
                  { color: theme === "dark" ? "#9CDCFE" : "#0000FF" },
                ]}
              >
                &nbsp;&nbsp;&quot;stack&quot;
              </Text>
              <Text
                style={[
                  styles.colon,
                  { color: theme === "dark" ? "#D4D4D4" : "#000000" },
                ]}
              >
                :{" "}
              </Text>
              {renderJsonValue(profileInfo.stack)}
              <Text
                style={[
                  styles.comma,
                  { color: theme === "dark" ? "#D4D4D4" : "#000000" },
                ]}
              >
                ,
              </Text>
            </View>

            <View style={styles.jsonLine}>
              <Text
                style={[
                  styles.key,
                  { color: theme === "dark" ? "#9CDCFE" : "#0000FF" },
                ]}
              >
                &nbsp;&nbsp;&quot;interests&quot;
              </Text>
              <Text
                style={[
                  styles.colon,
                  { color: theme === "dark" ? "#D4D4D4" : "#000000" },
                ]}
              >
                :{" "}
              </Text>
              {renderJsonValue(profileInfo.interests)}
            </View>

            <Text
              style={[
                styles.bracket,
                { color: theme === "dark" ? "#D4D4D4" : "#000000" },
              ]}
            >{`}`}</Text>
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
    flexDirection: "row",
    gap: 24,
    paddingHorizontal: 24,
  },
  greetingSection: {
    flex: 1,
    justifyContent: "center",
    paddingRight: 24,
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
    justifyContent: "center",
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
  comment: {
    fontSize: 12,
    fontFamily: "SpaceMono",
    marginBottom: 8,
    opacity: 0.8,
  },
  jsonLine: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 1,
  },
  nestedLine: {
    marginLeft: 6,
  },
  key: {
    fontSize: 12,
    fontFamily: "SpaceMono",
  },
  string: {
    fontSize: 12,
    fontFamily: "SpaceMono",
  },
  bracket: {
    fontSize: 12,
    fontFamily: "SpaceMono",
  },
  colon: {
    fontSize: 12,
    fontFamily: "SpaceMono",
  },
  comma: {
    fontSize: 12,
    fontFamily: "SpaceMono",
  },
  arrayContainer: {
    marginLeft: 1,
  },
  arrayItem: {
    flexDirection: "row",
    marginLeft: 8,
  },
});
