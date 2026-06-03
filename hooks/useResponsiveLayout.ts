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
    const cardWidth = `${100 / columnCount}%` as const;

    return {
      columnCount,
      cardWidth,
      maxCardWidth: width >= BREAKPOINT_SM ? 300 : "100%",
      minCardWidth: columnCount === 1 ? 0 : 280,
    };
  }, [width]);

  return layout;
};
