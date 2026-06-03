import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";
import { Colors } from "../constants/Colors";
import { BADGE_SIZE } from "../constants/badgeLayout";
import { useTheme } from "../context/ThemeContext";
import {
  Certification,
  getBadgeImageSource,
  isPlaceholderCredentialUrl,
} from "../utils/badgeUtils";
import { formatCertDate } from "../utils/formatCertDate";

interface CertificationDetailDialogProps {
  cert: Certification | null;
  visible: boolean;
  onDismiss: () => void;
}

export function CertificationDetailDialog({
  cert,
  visible,
  onDismiss,
}: CertificationDetailDialogProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];

  if (!cert) return null;

  const imageSource = getBadgeImageSource(cert);
  const canOpenCredential = !isPlaceholderCredentialUrl(cert.credentialUrl);

  const handleViewCredential = () => {
    if (canOpenCredential) {
      Linking.openURL(cert.credentialUrl);
    }
  };

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={[
          styles.dialog,
          { backgroundColor: theme === "dark" ? "#1E1E1E" : "#FFFFFF" },
        ]}
      >
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
                <Image
                  source={imageSource}
                  style={styles.badgeImage}
                  resizeMode="contain"
                  accessibilityIgnoresInvertColors
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
            {!canOpenCredential && (
              <Text style={[styles.helper, { color: colors.text }]}>
                Credential link coming soon.
              </Text>
            )}
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Close</Button>
          <Button
            mode="contained"
            onPress={handleViewCredential}
            disabled={!canOpenCredential}
          >
            View credential
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const DIALOG_BADGE_SIZE = BADGE_SIZE + 24;

const styles = StyleSheet.create({
  dialog: {
    maxWidth: 400,
    alignSelf: "center",
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
  helper: {
    fontSize: 13,
    opacity: 0.7,
    textAlign: "center",
    fontStyle: "italic",
  },
});
