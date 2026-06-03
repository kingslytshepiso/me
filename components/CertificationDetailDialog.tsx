import { Ionicons } from "@expo/vector-icons";
import { AppImage } from "./AppImage";
import React from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import { Button, Dialog } from "react-native-paper";
import { Colors } from "../constants/Colors";
import { BADGE_SIZE } from "../constants/badgeLayout";
import { useTheme } from "../context/ThemeContext";
import { LINKEDIN_PROFILE_URL } from "../constants/profileLinks";
import { Certification, getBadgeImageSource } from "../utils/badgeUtils";
import { formatCertDate } from "../utils/formatCertDate";
import { AppFullScreenOverlay } from "./AppFullScreenOverlay";

interface CertificationDetailDialogProps {
  cert: Certification | null;
  visible: boolean;
  onDismiss: () => void;
  linkedInUrl?: string;
}

export function CertificationDetailDialog({
  cert,
  visible,
  onDismiss,
  linkedInUrl = LINKEDIN_PROFILE_URL,
}: CertificationDetailDialogProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];

  if (!cert) return null;

  const imageSource = getBadgeImageSource(cert);
  const surfaceColor = theme === "dark" ? "#1E1E1E" : "#FFFFFF";

  const handleViewLinkedIn = () => {
    Linking.openURL(linkedInUrl);
  };

  return (
    <AppFullScreenOverlay
      visible={visible}
      onDismiss={onDismiss}
      scrimAccessibilityLabel="Close certification details"
      contentStyle={styles.overlayCenter}
    >
      <View style={[styles.dialogSurface, { backgroundColor: surfaceColor }]}>
        <Dialog.Title style={[styles.title, { color: colors.text }]}>
          {cert.name}
        </Dialog.Title>
        <Dialog.Content>
          <View style={styles.content}>
            <View
              style={[
                styles.badgeFrame,
                {
                  backgroundColor:
                    theme === "dark"
                      ? "rgba(255, 255, 255, 0.06)"
                      : "rgba(0, 0, 0, 0.04)",
                },
              ]}
            >
              {imageSource ? (
                <AppImage
                  source={imageSource}
                  style={styles.badgeImage}
                  contentFit="contain"
                  placeholderKind="badge"
                  recyclingKey={cert.id}
                />
              ) : (
                <Ionicons
                  name="ribbon-outline"
                  size={48}
                  color={colors.tint}
                />
              )}
            </View>
            <Text style={[styles.meta, { color: colors.text }]}>
              {cert.issuer}
            </Text>
            <Text style={[styles.metaSecondary, { color: colors.text }]}>
              Earned {formatCertDate(cert.earnedDate)}
            </Text>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Close</Button>
          <Button mode="contained" onPress={handleViewLinkedIn}>
            View on LinkedIn
          </Button>
        </Dialog.Actions>
      </View>
    </AppFullScreenOverlay>
  );
}

const DIALOG_BADGE_SIZE = BADGE_SIZE + 24;

const styles = StyleSheet.create({
  overlayCenter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  dialogSurface: {
    maxWidth: 400,
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 18,
    lineHeight: 24,
  },
  content: {
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
  },
  badgeFrame: {
    width: DIALOG_BADGE_SIZE,
    height: DIALOG_BADGE_SIZE,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  badgeImage: {
    width: DIALOG_BADGE_SIZE,
    height: DIALOG_BADGE_SIZE,
  },
  meta: {
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  metaSecondary: {
    fontSize: 14,
    opacity: 0.85,
    textAlign: "center",
  },
});
