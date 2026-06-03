import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import {
  ContactChannel,
  SOCIAL_CONTACT_CHANNELS,
} from "../constants/contactChannels";
import { Colors } from "../constants/Colors";
import { useTheme } from "../context/ThemeContext";
import { openContactChannel } from "../utils/openContactChannel";

export type ContactSocialLinksVariant = "footer" | "contact" | "fab" | "header";

interface ContactSocialLinksProps {
  variant?: ContactSocialLinksVariant;
  channels?: ContactChannel[];
  onChannelPress?: (channel: ContactChannel) => void;
}

const VARIANT_ICON_SIZE: Record<ContactSocialLinksVariant, number> = {
  footer: 20,
  contact: 24,
  fab: 22,
  header: 22,
};

const VARIANT_BUTTON_PADDING: Record<ContactSocialLinksVariant, number> = {
  footer: 6,
  contact: 12,
  fab: 10,
  header: 10,
};

export function ContactSocialLinks({
  variant = "contact",
  channels = SOCIAL_CONTACT_CHANNELS,
  onChannelPress,
}: ContactSocialLinksProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const iconSize = VARIANT_ICON_SIZE[variant];
  const buttonPadding = VARIANT_BUTTON_PADDING[variant];

  const handlePress = async (channel: ContactChannel) => {
    onChannelPress?.(channel);
    await openContactChannel(channel);
  };

  const buttonBackground =
    variant === "fab" || variant === "header"
      ? "transparent"
      : theme === "dark"
        ? "rgba(255, 255, 255, 0.05)"
        : "rgba(0, 0, 0, 0.02)";

  return (
    <View
      style={[
        styles.container,
        variant === "footer" && styles.footerContainer,
        variant === "fab" && styles.fabContainer,
        variant === "header" && styles.headerContainer,
      ]}
      accessibilityRole="toolbar"
      accessibilityLabel="Social links"
    >
      {channels.map((channel) => (
        <TouchableOpacity
          key={channel.id}
          style={[
            styles.button,
            {
              padding: buttonPadding,
              backgroundColor: buttonBackground,
            },
          ]}
          onPress={() => handlePress(channel)}
          accessibilityRole="button"
          accessibilityLabel={channel.accessibilityLabel}
          accessibilityHint={channel.accessibilityHint}
        >
          <Ionicons name={channel.icon} size={iconSize} color={colors.text} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  footerContainer: {
    gap: 8,
  },
  fabContainer: {
    gap: 8,
  },
  headerContainer: {
    gap: 12,
    flexWrap: "wrap",
  },
});
