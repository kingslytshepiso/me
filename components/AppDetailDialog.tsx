import React from "react";
import { ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";
import { Dialog } from "react-native-paper";
import {
  DETAIL_DIALOG_MAX_HEIGHT_RATIO,
  DETAIL_DIALOG_MAX_WIDTH_COMPACT,
  detailDialogStyles,
} from "../constants/detailDialog";
import { Colors } from "../constants/Colors";
import { useTheme } from "../context/ThemeContext";
import { AppFullScreenOverlay } from "./AppFullScreenOverlay";

interface AppDetailDialogProps {
  visible: boolean;
  onDismiss: () => void;
  scrimAccessibilityLabel: string;
  title: string;
  actions: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: number;
  scrollable?: boolean;
}

export function AppDetailDialog({
  visible,
  onDismiss,
  scrimAccessibilityLabel,
  title,
  actions,
  children,
  maxWidth = DETAIL_DIALOG_MAX_WIDTH_COMPACT,
  scrollable = false,
}: AppDetailDialogProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const { height } = useWindowDimensions();
  const surfaceColor = theme === "dark" ? "#1E1E1E" : "#FFFFFF";

  return (
    <AppFullScreenOverlay
      visible={visible}
      onDismiss={onDismiss}
      scrimAccessibilityLabel={scrimAccessibilityLabel}
      contentStyle={detailDialogStyles.overlayCenter}
    >
      <View
        style={[
          detailDialogStyles.dialogSurface,
          styles.surface,
          {
            backgroundColor: surfaceColor,
            maxWidth,
            maxHeight: height * DETAIL_DIALOG_MAX_HEIGHT_RATIO,
          },
        ]}
      >
        <Dialog.Title style={[detailDialogStyles.title, { color: colors.text }]}>
          {title}
        </Dialog.Title>
        {scrollable ? (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={detailDialogStyles.scrollContent}
            showsVerticalScrollIndicator
          >
            {children}
          </ScrollView>
        ) : (
          <Dialog.Content style={detailDialogStyles.content}>
            {children}
          </Dialog.Content>
        )}
        <Dialog.Actions style={detailDialogStyles.actions}>{actions}</Dialog.Actions>
      </View>
    </AppFullScreenOverlay>
  );
}

const styles = StyleSheet.create({
  surface: {
    flexDirection: "column",
  },
  scrollView: {
    flexShrink: 1,
  },
});
