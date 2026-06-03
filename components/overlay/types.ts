import type React from "react";
import type { StyleProp, ViewStyle } from "react-native";

export type OverlayHostKind = "modal" | "portalFixed";

export type OverlayScrimKind = "blur" | "dim";

export interface OverlayHostProps {
  visible: boolean;
  onDismiss: () => void;
  scrimAccessibilityLabel: string;
  contentStyle?: StyleProp<ViewStyle>;
  scrim: OverlayScrimKind;
  scrimEnterDurationMs: number;
  theme: "light" | "dark";
  children?: React.ReactNode;
}

export interface AppFullScreenOverlayProps {
  visible: boolean;
  onDismiss: () => void;
  children?: React.ReactNode;
  scrimAccessibilityLabel?: string;
  contentStyle?: StyleProp<ViewStyle>;
  host?: OverlayHostKind;
  scrim?: OverlayScrimKind;
  scrimEnterDurationMs?: number;
}
