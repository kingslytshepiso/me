import React from "react";
import {
  Pressable,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

import type { ThemeMode } from "../../context/ThemeContext";
import { OverlayScrim } from "./OverlayScrim";
import type { OverlayScrimKind } from "./types";

interface OverlayFrameProps {
  onDismiss: () => void;
  scrimAccessibilityLabel: string;
  theme: ThemeMode;
  scrim: OverlayScrimKind;
  scrimEnterDurationMs: number;
  contentStyle?: StyleProp<ViewStyle>;
  rootStyle?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

export function OverlayFrame({
  onDismiss,
  scrimAccessibilityLabel,
  theme,
  scrim,
  scrimEnterDurationMs,
  contentStyle,
  rootStyle,
  children,
}: OverlayFrameProps) {
  return (
    <View style={[styles.root, rootStyle]}>
      <OverlayScrim
        theme={theme}
        kind={scrim}
        enterDurationMs={scrimEnterDurationMs}
      />
      <Pressable
        style={styles.dismissTarget}
        onPress={onDismiss}
        accessibilityRole="button"
        accessibilityLabel={scrimAccessibilityLabel}
      />
      <View style={[styles.contentLayer, contentStyle]} pointerEvents="box-none">
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  dismissTarget: {
    ...StyleSheet.absoluteFillObject,
  },
  contentLayer: {
    ...StyleSheet.absoluteFillObject,
  },
});
