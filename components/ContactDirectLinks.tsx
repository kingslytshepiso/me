import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import {
  ContactChannel,
  DIRECT_CONTACT_CHANNELS,
} from "../constants/contactChannels";
import { Colors } from "../constants/Colors";
import { useTheme } from "../context/ThemeContext";
import { openContactChannel } from "../utils/openContactChannel";

interface ContactDirectLinksProps {
  channels?: ContactChannel[];
}

export function ContactDirectLinks({
  channels = DIRECT_CONTACT_CHANNELS,
}: ContactDirectLinksProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];

  const itemBackground =
    theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)";

  return (
    <View style={styles.container} accessibilityRole="list">
      {channels.map((channel) => (
        <TouchableOpacity
          key={channel.id}
          style={[styles.item, { backgroundColor: itemBackground }]}
          onPress={() => openContactChannel(channel)}
          accessibilityRole="button"
          accessibilityLabel={channel.accessibilityLabel}
          accessibilityHint={channel.accessibilityHint}
        >
          <Ionicons name={channel.icon} size={24} color={colors.text} />
          <Text style={[styles.text, { color: colors.text }]}>
            {channel.displayText}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 16,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  text: {
    fontSize: 16,
  },
});
