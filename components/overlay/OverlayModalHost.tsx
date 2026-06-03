import React from "react";
import { Modal, Platform, type ViewStyle } from "react-native";
import { Portal } from "react-native-paper";

import {
  getWebOverlayFixedStyle,
  OVERLAY_MODAL_ANIMATION,
} from "../../constants/overlay";
import { OverlayFrame } from "./OverlayFrame";
import type { OverlayHostProps } from "./types";

export function OverlayModalHost({
  visible,
  onDismiss,
  scrimAccessibilityLabel,
  contentStyle,
  scrim,
  scrimEnterDurationMs,
  theme,
  children,
}: OverlayHostProps) {
  const webFixed =
    Platform.OS === "web" ? (getWebOverlayFixedStyle() as ViewStyle) : undefined;

  return (
    <Portal>
      <Modal
        visible={visible}
        transparent
        animationType={OVERLAY_MODAL_ANIMATION}
        onRequestClose={onDismiss}
        accessibilityViewIsModal
        testID="overlay-modal-host"
      >
        <OverlayFrame
          onDismiss={onDismiss}
          scrimAccessibilityLabel={scrimAccessibilityLabel}
          theme={theme}
          scrim={scrim}
          scrimEnterDurationMs={scrimEnterDurationMs}
          contentStyle={contentStyle}
          rootStyle={webFixed}
        >
          {children}
        </OverlayFrame>
      </Modal>
    </Portal>
  );
}
