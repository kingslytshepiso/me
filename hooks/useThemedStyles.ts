import { createThemedStyles } from "../constants/Styles";
import { useColorScheme } from "./useColorScheme";

export function useThemedStyles() {
  const colorScheme = useColorScheme() ?? "light";
  return createThemedStyles(colorScheme as "light" | "dark");
}
