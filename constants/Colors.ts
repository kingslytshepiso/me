/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
    gradients: {
      primary: ["#f0f4ff", "#e6e9ff", "#f5f7ff"] as const,
      secondary: ["#fff5f5", "#fff0f0", "#fff8f8"] as const,
      accent: ["#f0fff4", "#e6fff0", "#f0fff8"] as const,
    },
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
    gradients: {
      primary: ["#151718", "#151718", "rgba(100, 100, 100, 0.3)"] as const,
      secondary: ["#151718", "#1a1a1a", "#1a1a2d"] as const,
      accent: ["#1a1a2d", "#2d1a1a", "#1a1a1a"] as const,
    },
  },
};
