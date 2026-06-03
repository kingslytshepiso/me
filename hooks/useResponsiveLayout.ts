import { useMemo } from "react";
import { useWindowDimensions } from "react-native";

import {
  BREAKPOINT_LG,
  BREAKPOINT_MD,
  BREAKPOINT_SM,
  BREAKPOINT_XL,
} from "@/constants/layout";

export const useResponsiveLayout = () => {
  const { width } = useWindowDimensions();

  const layout = useMemo(() => {
    const getColumnCount = () => {
      if (width >= BREAKPOINT_XL) return 4;
      if (width >= BREAKPOINT_LG) return 3;
      if (width >= BREAKPOINT_MD) return 3;
      if (width >= BREAKPOINT_SM) return 2;
      return 1;
    };

    const columnCount = getColumnCount();

    // Calculate card width to ensure minimum 2 items per row
    const getCardWidth = () => {
      const maxCardsPerRow = Math.max(2, columnCount); // Ensure minimum 2 cards per row
      return `${100 / maxCardsPerRow}%` as const;
    };

    return {
      columnCount,
      cardWidth: getCardWidth(),
      maxCardWidth: width >= BREAKPOINT_SM ? 300 : "100%",
      minCardWidth: 280, // Minimum width to prevent cards from becoming too small
    };
  }, [width]);

  return layout;
};
