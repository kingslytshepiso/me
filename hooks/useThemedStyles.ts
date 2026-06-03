import { createThemedStyles } from "../constants/Styles";
import { useTheme } from "../context/ThemeContext";

export function useThemedStyles() {
  const { theme } = useTheme();
  return createThemedStyles(theme);
}
