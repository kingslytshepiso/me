import { usePathname } from "expo-router";
import { useCallback, useEffect, useState } from "react";

import {
  CONTACT_FAB_APPEAR_DELAY_MS,
  isSessionDismissed,
  setSessionDismissed,
} from "../utils/contactFabStorage";

export type ContactFabVisibilityState =
  | "loading"
  | "hidden"
  | "waiting"
  | "visible";

export function useContactFabVisibility() {
  const pathname = usePathname();
  const [visibility, setVisibility] = useState<ContactFabVisibilityState>("loading");
  const [sessionDismissed, setSessionDismissedState] = useState(false);

  const isContactRoute =
    pathname === "/contact" || pathname.endsWith("/contact");

  const refreshBlockers = useCallback(async () => {
    if (isContactRoute || isSessionDismissed() || sessionDismissed) {
      return { blocked: true as const };
    }
    return { blocked: false as const };
  }, [isContactRoute, sessionDismissed]);

  useEffect(() => {
    let cancelled = false;
    let appearTimer: ReturnType<typeof setTimeout> | undefined;

    (async () => {
      const { blocked } = await refreshBlockers();
      if (cancelled) return;

      if (blocked) {
        setVisibility("hidden");
        return;
      }

      setVisibility("waiting");

      appearTimer = setTimeout(() => {
        if (cancelled) return;
        void refreshBlockers().then(({ blocked: blockedAgain }) => {
          if (cancelled) return;
          setVisibility(blockedAgain ? "hidden" : "visible");
        });
      }, CONTACT_FAB_APPEAR_DELAY_MS);
    })();

    return () => {
      cancelled = true;
      if (appearTimer) clearTimeout(appearTimer);
    };
  }, [refreshBlockers]);

  const dismissForSession = useCallback(() => {
    setSessionDismissed();
    setSessionDismissedState(true);
    setVisibility("hidden");
  }, []);

  return {
    visibility,
    dismissForSession,
    isExpandedAllowed: visibility === "visible",
  };
}
