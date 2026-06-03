import { Platform } from "react-native";

export const CONTACT_FAB_SESSION_DISMISS_KEY = "@me/contact-fab-dismissed";

export const CONTACT_FAB_APPEAR_DELAY_MS = 10_000;

let nativeSessionDismissed = false;

export function isSessionDismissed(): boolean {
  if (Platform.OS === "web") {
    if (typeof sessionStorage === "undefined") return false;
    return sessionStorage.getItem(CONTACT_FAB_SESSION_DISMISS_KEY) === "1";
  }
  return nativeSessionDismissed;
}

export function setSessionDismissed(): void {
  if (Platform.OS === "web") {
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem(CONTACT_FAB_SESSION_DISMISS_KEY, "1");
    }
    return;
  }
  nativeSessionDismissed = true;
}

export function clearSessionDismissForTests(): void {
  nativeSessionDismissed = false;
  if (typeof sessionStorage !== "undefined") {
    sessionStorage.removeItem(CONTACT_FAB_SESSION_DISMISS_KEY);
  }
}
