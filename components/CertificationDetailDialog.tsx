import { Ionicons } from "@expo/vector-icons";
import { AppImage } from "./AppImage";
import React from "react";
import { Linking, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { Colors } from "../constants/Colors";
import { BADGE_SIZE } from "../constants/badgeLayout";
import { useTheme } from "../context/ThemeContext";
import { LINKEDIN_PROFILE_URL } from "../constants/profileLinks";
import {
  Certification,
  getBadgeImageSource,
  getCredentialAction,
} from "../utils/badgeUtils";
import { formatCertDate } from "../utils/formatCertDate";
import { AppDetailDialog } from "./AppDetailDialog";

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
  const { url: credentialUrl, label: credentialLabel } = getCredentialAction(
    cert,
    linkedInUrl
  );

  const handleViewCredential = () => {
    Linking.openURL(credentialUrl);
  };

  return (
    <AppDetailDialog
      visible={visible}
      onDismiss={onDismiss}
      scrimAccessibilityLabel="Close certification details"
      title={cert.name}
      actions={
        <>
          <Button onPress={onDismiss}>Close</Button>
          <Button mode="contained" onPress={handleViewCredential}>
            {credentialLabel}
          </Button>
        </>
      }
    >
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
            <Ionicons name="ribbon-outline" size={48} color={colors.tint} />
          )}
        </View>
        <Text style={[styles.meta, { color: colors.text }]}>{cert.issuer}</Text>
        <Text style={[styles.metaSecondary, { color: colors.text }]}>
          Earned {formatCertDate(cert.earnedDate)}
        </Text>
      </View>
    </AppDetailDialog>
  );
}

const DIALOG_BADGE_SIZE = BADGE_SIZE + 24;

const styles = StyleSheet.create({
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
