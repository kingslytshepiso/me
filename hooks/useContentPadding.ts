import { useMemo } from "react";
import { useWindowDimensions } from "react-native";

import { getContentPadding } from "@/constants/layout";

export function useContentPadding() {
  const { width } = useWindowDimensions();
  return useMemo(() => getContentPadding(width), [width]);
}
