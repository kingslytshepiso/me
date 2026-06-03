import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";

const THEME_STORAGE_KEY = "@me/theme-preference";

export type ThemeMode = "light" | "dark";
export type ThemePreference = ThemeMode | "system";

type ThemeContextType = {
  theme: ThemeMode;
  isDark: boolean;
  isReady: boolean;
  preference: ThemePreference;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function resolveTheme(
  preference: ThemePreference,
  systemScheme: "light" | "dark" | null | undefined
): ThemeMode {
  if (preference === "system") {
    return systemScheme === "dark" ? "dark" : "light";
  }
  return preference;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useSystemColorScheme();
  const [preference, setPreference] = useState<ThemePreference>("system");
  const [isReady, setIsReady] = useState(() => process.env.JEST_WORKER_ID !== undefined);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const stored = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (!cancelled && stored) {
          if (stored === "light" || stored === "dark" || stored === "system") {
            setPreference(stored);
          }
        }
      } catch (error) {
        console.warn("Failed to load theme preference:", error);
      } finally {
        if (!cancelled) {
          setIsReady(true);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const theme = useMemo(
    () => resolveTheme(preference, systemColorScheme),
    [preference, systemColorScheme]
  );

  const toggleTheme = useCallback(() => {
    setPreference((prev) => {
      const current = resolveTheme(prev, systemColorScheme);
      const next: ThemeMode = current === "light" ? "dark" : "light";
      AsyncStorage.setItem(THEME_STORAGE_KEY, next).catch((error) => {
        console.warn("Failed to save theme preference:", error);
      });
      return next;
    });
  }, [systemColorScheme]);

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === "dark",
      isReady,
      preference,
      toggleTheme,
    }),
    [theme, isReady, preference, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
