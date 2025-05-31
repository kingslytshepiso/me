import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScreenContainer } from "../../components/ScreenContainer";
import { Colors } from "../../constants/Colors";
import { useTheme } from "../../context/ThemeContext";

const contactInfo = {
  email: "kingslytshepiso@gmail.com",
  phone: "+27 76 076 8257",
  location: "South Africa",
};

const socialLinks = {
  github: "https://github.com/kingslytshepiso",
  twitter: "https://twitter.com/kingslytshepiso",
  linkedin: "www.linkedin.com/in/kingsly-m-062a7bb8",
};

export default function Contact() {
  const { theme } = useTheme();
  const colors = Colors[theme];

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${contactInfo.email}`);
  };

  const handlePhonePress = () => {
    Linking.openURL(`tel:${contactInfo.phone}`);
  };

  const handleSocialPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScreenContainer gradientType="primary">
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>Contact Me</Text>
        <Text style={[styles.text, { color: colors.text }]}>
          Feel free to reach out! I&apos;m always open to discussing new
          projects, creative ideas, or opportunities to be part of your vision.
        </Text>

        <View style={styles.contactContainer}>
          <TouchableOpacity
            style={[
              styles.contactItem,
              {
                backgroundColor:
                  theme === "dark"
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.02)",
              },
            ]}
            onPress={handleEmailPress}
          >
            <Ionicons name="mail-outline" size={24} color={colors.text} />
            <Text style={[styles.contactText, { color: colors.text }]}>
              {contactInfo.email}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.contactItem,
              {
                backgroundColor:
                  theme === "dark"
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.02)",
              },
            ]}
            onPress={handlePhonePress}
          >
            <Ionicons name="call-outline" size={24} color={colors.text} />
            <Text style={[styles.contactText, { color: colors.text }]}>
              {contactInfo.phone}
            </Text>
          </TouchableOpacity>

          <View
            style={[
              styles.contactItem,
              {
                backgroundColor:
                  theme === "dark"
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.02)",
              },
            ]}
          >
            <Ionicons name="location-outline" size={24} color={colors.text} />
            <Text style={[styles.contactText, { color: colors.text }]}>
              {contactInfo.location}
            </Text>
          </View>
        </View>

        <View style={styles.socialContainer}>
          <TouchableOpacity
            style={[
              styles.socialButton,
              {
                backgroundColor:
                  theme === "dark"
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.02)",
              },
            ]}
            onPress={() => handleSocialPress(socialLinks.github)}
          >
            <Ionicons name="logo-github" size={24} color={colors.text} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.socialButton,
              {
                backgroundColor:
                  theme === "dark"
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.02)",
              },
            ]}
            onPress={() => handleSocialPress(socialLinks.twitter)}
          >
            <Ionicons name="logo-twitter" size={24} color={colors.text} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.socialButton,
              {
                backgroundColor:
                  theme === "dark"
                    ? "rgba(255, 255, 255, 0.05)"
                    : "rgba(0, 0, 0, 0.02)",
              },
            ]}
            onPress={() => handleSocialPress(socialLinks.linkedin)}
          >
            <Ionicons name="logo-linkedin" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
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
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 40,
  },
  contactContainer: {
    width: "100%",
    gap: 16,
    marginBottom: 40,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  contactText: {
    fontSize: 16,
  },
  socialContainer: {
    flexDirection: "row",
    gap: 16,
  },
  socialButton: {
    padding: 12,
    borderRadius: 12,
  },
});
