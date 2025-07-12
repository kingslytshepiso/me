import { useMemo } from "react";
import { useWindowDimensions } from "react-native";

export const useResponsiveLayout = () => {
  const { width } = useWindowDimensions();

  const layout = useMemo(() => {
    // Calculate number of columns based on screen width
    const getColumnCount = () => {
      if (width >= 1536) return 4; // 2xl
      if (width >= 1280) return 3; // xl
      if (width >= 1024) return 3; // lg
      if (width >= 768) return 2; // md
      return 1; // sm and below
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
      maxCardWidth: width >= 768 ? 300 : "100%",
      minCardWidth: 280, // Minimum width to prevent cards from becoming too small
    };
  }, [width]);

  return layout;
};
