import { StyleSheet } from "react-native";

export const Typography = {
  fonts: {
    regular: "Inter_400Regular",
    medium: "Inter_500Medium",
    semiBold: "Inter_600SemiBold",
    bold: "Inter_700Bold",
    heading: "PlayfairDisplay_700Bold",
  },
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    "2xl": 24,
    "3xl": 30,
    "4xl": 36,
    "5xl": 48,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const createTypographyStyles = () =>
  StyleSheet.create({
    // Headings
    h1: {
      fontFamily: Typography.fonts.heading,
      fontSize: Typography.sizes["4xl"],
      lineHeight: Typography.sizes["4xl"] * Typography.lineHeights.tight,
    },
    h2: {
      fontFamily: Typography.fonts.heading,
      fontSize: Typography.sizes["3xl"],
      lineHeight: Typography.sizes["3xl"] * Typography.lineHeights.tight,
    },
    h3: {
      fontFamily: Typography.fonts.heading,
      fontSize: Typography.sizes["2xl"],
      lineHeight: Typography.sizes["2xl"] * Typography.lineHeights.tight,
    },
    h4: {
      fontFamily: Typography.fonts.heading,
      fontSize: Typography.sizes.xl,
      lineHeight: Typography.sizes.xl * Typography.lineHeights.tight,
    },

    // Body text
    body1: {
      fontFamily: Typography.fonts.regular,
      fontSize: Typography.sizes.base,
      lineHeight: Typography.sizes.base * Typography.lineHeights.normal,
    },
    body2: {
      fontFamily: Typography.fonts.regular,
      fontSize: Typography.sizes.sm,
      lineHeight: Typography.sizes.sm * Typography.lineHeights.normal,
    },

    // Special text styles
    caption: {
      fontFamily: Typography.fonts.regular,
      fontSize: Typography.sizes.xs,
      lineHeight: Typography.sizes.xs * Typography.lineHeights.normal,
    },
    button: {
      fontFamily: Typography.fonts.semiBold,
      fontSize: Typography.sizes.base,
      lineHeight: Typography.sizes.base * Typography.lineHeights.normal,
    },
    link: {
      fontFamily: Typography.fonts.medium,
      fontSize: Typography.sizes.base,
      lineHeight: Typography.sizes.base * Typography.lineHeights.normal,
      textDecorationLine: "underline",
    },
  });
