import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ContactDirectLinks } from "../components/ContactDirectLinks";
import { ContactSocialLinks } from "../components/ContactSocialLinks";
import { ScreenContainer } from "../components/ScreenContainer";
import { Colors } from "../constants/Colors";
import { PROFILE } from "../constants/profile";
import { screenHeaderStyles } from "../constants/screenHeader";
import { useTheme } from "../context/ThemeContext";

export default function ContactScreen() {
  const { theme } = useTheme();
  const colors = Colors[theme];

  const locationBackground =
    theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)";

  return (
    <ScreenContainer gradientType="primary">
      <View style={styles.container}>
        <View style={screenHeaderStyles.header}>
          <Text
            style={[screenHeaderStyles.title, { color: colors.text }]}
          >
            Contact Me
          </Text>
          <Text
            style={[
              screenHeaderStyles.subtitle,
              styles.subtitle,
              { color: colors.text },
            ]}
          >
            Feel free to reach out! I&apos;m always open to discussing new
            projects, creative ideas, or opportunities to be part of your
            vision.
          </Text>
        </View>

        <View style={styles.contactContainer}>
          <ContactDirectLinks />

          <View
            style={[styles.locationItem, { backgroundColor: locationBackground }]}
            accessibilityRole="text"
            accessibilityLabel={`Location ${PROFILE.contact.locationShort}`}
          >
            <Ionicons name="location-outline" size={24} color={colors.text} />
            <Text style={[styles.locationText, { color: colors.text }]}>
              {PROFILE.contact.locationShort}
            </Text>
          </View>
        </View>

        <ContactSocialLinks variant="contact" />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  subtitle: {
    marginBottom: 40,
  },
  contactContainer: {
    width: "100%",
    gap: 16,
    marginBottom: 40,
  },
  locationItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  locationText: {
    fontSize: 16,
  },
});
