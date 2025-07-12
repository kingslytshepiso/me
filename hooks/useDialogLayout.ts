import { useMemo } from "react";
import { useWindowDimensions } from "react-native";

export const useDialogLayout = () => {
  const { width, height } = useWindowDimensions();

  const dialogLayout = useMemo(() => {
    // Calculate dialog dimensions based on screen size
    const isSmallScreen = height < 600;
    const isMediumScreen = height >= 600 && height < 800;
    const isLargeScreen = height >= 800;

    // Calculate content height (dialog height minus title and actions)
    const titleHeight = 60; // Approximate title height
    const actionsHeight = 80; // Approximate actions height
    const padding = 32; // Total padding
    const contentMaxHeight =
      height * (isSmallScreen ? 0.85 : isMediumScreen ? 0.8 : 0.75) -
      titleHeight -
      actionsHeight -
      padding;

    return {
      // Dialog container styles
      maxHeight: isSmallScreen
        ? height * 0.85
        : isMediumScreen
        ? height * 0.8
        : height * 0.75,
      maxWidth: 600,
      width: "90%" as const,

      // Content area styles
      contentMaxHeight: Math.max(contentMaxHeight, 200), // Minimum 200px height

      // Responsive adjustments
      isSmallScreen,
      isMediumScreen,
      isLargeScreen,

      // Padding adjustments
      contentPadding: isSmallScreen ? 16 : 24,
      sectionMargin: isSmallScreen ? 16 : 24,

      // Image size adjustments
      imageSize: isSmallScreen ? 80 : isMediumScreen ? 100 : 120,
    };
  }, [width, height]);

  return dialogLayout;
};
