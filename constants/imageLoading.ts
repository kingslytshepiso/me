import type { ImageProps } from "expo-image";

export const IMAGE_CACHE_POLICY: NonNullable<ImageProps["cachePolicy"]> =
  "memory-disk";

export const IMAGE_TRANSITION_MS = 300;

export type ImagePlaceholderKind = "photo" | "logo" | "badge";

/** Category blurhashes from representative bundled assets (photo, logo, badge). */
export const BLURHASH_BY_KIND: Record<ImagePlaceholderKind, string> = {
  photo: "LjOzDID%*0?v^*-;x]M{%MRjRPt6",
  logo: "L_HA]7~5-kR,s-s-odbGs-odfjWW",
  badge: "LO72-Lo+I*WmtDfmR#jYO3WRrnoI",
};
