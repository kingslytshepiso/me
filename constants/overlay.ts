/** Pattern guide: https://gist.github.com/kingslytshepiso/756c0930b3c7ae3a25a158b036676c58 */
import type { ThemeMode } from "../context/ThemeContext";

export const OVERLAY_BLUR_INTENSITY = { dark: 30, light: 50 } as const;

export const OVERLAY_MODAL_ANIMATION = "none" as const;

export const OVERLAY_DEFAULT_SCRIM_ENTER_MS = 0;

export const OVERLAY_OPTIONAL_SCRIM_ENTER_MS = 150;

export const OVERLAY_DIM_SCRIM = {
  dark: "rgba(0, 0, 0, 0.52)",
  light: "rgba(0, 0, 0, 0.38)",
} as const;

export const OVERLAY_Z_INDEX = 10000;

export const OVERLAY_WEB_BLUR_PX = 24;

/** Optional light tint on web when backdrop-filter needs contrast */
export const OVERLAY_WEB_TINT = {
  dark: "rgba(0, 0, 0, 0.08)",
  light: "rgba(255, 255, 255, 0.08)",
} as const;

export function getOverlayBlurProps(theme: ThemeMode) {
  return {
    intensity: OVERLAY_BLUR_INTENSITY[theme],
    tint: theme === "dark" ? ("dark" as const) : ("light" as const),
  };
}

export function getWebOverlayFixedStyle(): Record<string, string | number> {
  return {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100vw",
    height: "100dvh",
    zIndex: OVERLAY_Z_INDEX,
  };
}
