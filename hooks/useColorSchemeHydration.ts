import { useEffect, useState } from "react";
import { Platform } from "react-native";

/** Web needs a hydration pass before system color scheme is reliable. */
export function useColorSchemeHydration(): boolean {
  const [hasHydrated, setHasHydrated] = useState(Platform.OS !== "web");

  useEffect(() => {
    if (Platform.OS === "web") {
      setHasHydrated(true);
    }
  }, []);

  return hasHydrated;
}
