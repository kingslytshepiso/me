import React from "react";

import {
  OVERLAY_DEFAULT_SCRIM_ENTER_MS,
} from "../constants/overlay";
import { useTheme } from "../context/ThemeContext";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";
import { OverlayModalHost } from "./overlay/OverlayModalHost";
import { OverlayPortalFixedHost } from "./overlay/OverlayPortalFixedHost";
import type { AppFullScreenOverlayProps } from "./overlay/types";

export type {
  AppFullScreenOverlayProps,
  OverlayHostKind,
  OverlayScrimKind,
} from "./overlay/types";

export function AppFullScreenOverlay({
  visible,
  onDismiss,
  children,
  scrimAccessibilityLabel = "Close",
  contentStyle,
  host = "modal",
  scrim = "blur",
  scrimEnterDurationMs = OVERLAY_DEFAULT_SCRIM_ENTER_MS,
}: AppFullScreenOverlayProps) {
  const { theme } = useTheme();
  useLockBodyScroll(visible);

  if (!visible) {
    return null;
  }

  const hostProps = {
    visible: true,
    onDismiss,
    scrimAccessibilityLabel,
    contentStyle,
    scrim,
    scrimEnterDurationMs,
    theme,
    children,
  };

  if (host === "portalFixed") {
    return <OverlayPortalFixedHost {...hostProps} />;
  }

  return <OverlayModalHost {...hostProps} />;
}
