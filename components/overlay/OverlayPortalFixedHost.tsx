import React from "react";
import { Platform, StyleSheet, View, type ViewStyle } from "react-native";
import { Portal } from "react-native-paper";

import { getWebOverlayFixedStyle, OVERLAY_Z_INDEX } from "../../constants/overlay";
import { OverlayFrame } from "./OverlayFrame";
import type { OverlayHostProps } from "./types";

export function OverlayPortalFixedHost({
  visible,
  onDismiss,
  scrimAccessibilityLabel,
  contentStyle,
  scrim,
  scrimEnterDurationMs,
  theme,
  children,
}: OverlayHostProps) {
  const hostStyle: ViewStyle =
    Platform.OS === "web"
      ? (getWebOverlayFixedStyle() as ViewStyle)
      : {
          ...StyleSheet.absoluteFillObject,
          zIndex: OVERLAY_Z_INDEX,
        };

  return (
    <Portal>
      <View
        style={[styles.host, hostStyle]}
        accessibilityViewIsModal
        testID="overlay-portal-fixed-host"
      >
        <OverlayFrame
          onDismiss={onDismiss}
          scrimAccessibilityLabel={scrimAccessibilityLabel}
          theme={theme}
          scrim={scrim}
          scrimEnterDurationMs={scrimEnterDurationMs}
          contentStyle={contentStyle}
        >
          {children}
        </OverlayFrame>
      </View>
    </Portal>
  );
}

const styles = StyleSheet.create({
  host: {
    flex: 1,
  },
});
