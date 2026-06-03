import { Ionicons } from "@expo/vector-icons";
import { AppImage } from "./AppImage";
import React from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { Button } from "react-native-paper";
import { BREAKPOINT_MD } from "../constants/layout";
import { Colors } from "../constants/Colors";
import { PROFILE } from "../constants/profile";
import {
  BRIDGED_PLATFORMS_URL,
  LINKEDIN_PROFILE_URL,
} from "../constants/profileLinks";
import { useTheme } from "../context/ThemeContext";

const profileImage = require("../assets/images/profile-picture.jpg");

export function ProfileHeroCard() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const { width } = useWindowDimensions();
  const isDesktop = width >= BREAKPOINT_MD;

  const cardBackground =
    theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)";
  const cardBorder =
    theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)";

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${PROFILE.contact.email}`);
  };

  const handlePhonePress = () => {
    Linking.openURL(`tel:${PROFILE.contact.phoneTel}`);
  };

  const handleBridgedPress = () => {
    Linking.openURL(BRIDGED_PLATFORMS_URL);
  };

  const handleLinkedInPress = () => {
    Linking.openURL(LINKEDIN_PROFILE_URL);
  };

  return (
    <View
      style={[
        styles.card,
        {
          flexDirection: isDesktop ? "row" : "column",
          backgroundColor: cardBackground,
          borderColor: cardBorder,
        },
      ]}
    >
      <View
        style={[
          styles.photoSection,
          { alignItems: isDesktop ? "flex-start" : "center" },
        ]}
      >
        <AppImage
          source={profileImage}
          style={styles.photo}
          contentFit="cover"
          placeholderKind="photo"
          priority="high"
          accessible
          accessibilityLabel="Profile photo of Kingsly Mokgwathi"
        />
      </View>

      <View style={styles.identitySection}>
        <Text style={[styles.name, { color: colors.text }]}>
          {PROFILE.name}
        </Text>
        <Text style={[styles.title, { color: "#569CD6" }]}>
          {PROFILE.title}
        </Text>
        <Text style={[styles.headline, { color: colors.text }]}>
          {PROFILE.headline}
        </Text>

        <View style={styles.contactRow}>
          <TouchableOpacity
            style={styles.contactItem}
            onPress={handleEmailPress}
            accessibilityRole="link"
            accessibilityLabel={`Email ${PROFILE.contact.email}`}
          >
            <Ionicons name="mail-outline" size={18} color={colors.text} />
            <Text style={[styles.contactText, { color: colors.text }]}>
              {PROFILE.contact.email}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.contactItem}
            onPress={handlePhonePress}
            accessibilityRole="link"
            accessibilityLabel={`Phone ${PROFILE.contact.phone}`}
          >
            <Ionicons name="call-outline" size={18} color={colors.text} />
            <Text style={[styles.contactText, { color: colors.text }]}>
              {PROFILE.contact.phone}
            </Text>
          </TouchableOpacity>

          <View style={styles.contactItem}>
            <Ionicons name="location-outline" size={18} color={colors.text} />
            <Text style={[styles.contactText, { color: colors.text }]}>
              {PROFILE.contact.location}
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          <Button
            mode="contained"
            onPress={handleBridgedPress}
            style={styles.primaryButton}
            labelStyle={styles.buttonLabel}
            icon={({ size, color }) => (
              <Ionicons name="globe-outline" size={18} color={color} />
            )}
            accessibilityLabel="Visit Bridged Platforms website"
          >
            Bridged Platforms
          </Button>
          <Button
            mode="outlined"
            onPress={handleLinkedInPress}
            style={[styles.secondaryButton, { borderColor: cardBorder }]}
            labelStyle={[styles.buttonLabel, { color: colors.text }]}
            icon={({ size, color }) => (
              <Ionicons name="logo-linkedin" size={18} color={color} />
            )}
            accessibilityLabel="Visit LinkedIn profile"
          >
            LinkedIn
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 24,
    gap: 24,
    width: "100%",
    maxWidth: 900,
    alignSelf: "center",
  },
  photoSection: {
    flexShrink: 0,
  },
  photo: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: "rgba(78, 201, 176, 0.5)",
  },
  identitySection: {
    flex: 1,
    gap: 8,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    fontFamily: "SpaceMono",
  },
  title: {
    fontSize: 18,
    fontFamily: "SpaceMono",
  },
  headline: {
    fontSize: 13,
    lineHeight: 20,
    opacity: 0.85,
    marginBottom: 8,
  },
  contactRow: {
    gap: 10,
    marginTop: 4,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  contactText: {
    fontSize: 14,
    flexShrink: 1,
  },
  actions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 12,
  },
  primaryButton: {
    borderRadius: 8,
    backgroundColor: "#4EC9B0",
  },
  secondaryButton: {
    borderRadius: 8,
    borderWidth: 1,
  },
  buttonLabel: {
    fontSize: 14,
    textTransform: "none",
  },
});
