import { useEffect } from "react";
import { Platform } from "react-native";

/**
 * Initializes Vercel Web Analytics on web deployments only.
 *
 * SPA caveat: Expo Router client-side navigations may not appear as separate
 * page views on the Hobby plan (custom events require Pro). Initial loads still
 * capture referrers, geography, device, and entry paths.
 */
export function WebAnalytics() {
  useEffect(() => {
    if (Platform.OS !== "web") return;

    import("@vercel/analytics").then(({ inject }) => {
      inject();
    });
  }, []);

  return null;
}
