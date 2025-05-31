import { StyleSheet } from "react-native";
import { Colors } from "./Colors";

export const createThemedStyles = (colorScheme: "light" | "dark") => {
  const colors = Colors[colorScheme];

  return StyleSheet.create({
    // Layout
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    centered: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
    },
    spaceBetween: {
      justifyContent: "space-between",
    },

    // Spacing
    padding: {
      padding: 16,
    },
    paddingHorizontal: {
      paddingHorizontal: 16,
    },
    paddingVertical: {
      paddingVertical: 16,
    },
    margin: {
      margin: 16,
    },
    marginHorizontal: {
      marginHorizontal: 16,
    },
    marginVertical: {
      marginVertical: 16,
    },

    // Typography
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: "600",
      color: colors.text,
      marginBottom: 4,
    },
    body: {
      fontSize: 16,
      color: colors.text,
    },
    caption: {
      fontSize: 14,
      color: colors.icon,
    },

    // Cards
    card: {
      backgroundColor: colorScheme === "dark" ? "#1C1C1E" : "#FFFFFF",
      borderRadius: 12,
      padding: 16,
      marginVertical: 8,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },

    // Buttons
    button: {
      backgroundColor: colors.tint,
      padding: 12,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "600",
    },

    // Links
    link: {
      color: colors.tint,
      textDecorationLine: "underline",
    },

    // Dividers
    divider: {
      height: 1,
      backgroundColor: colorScheme === "dark" ? "#2C2C2E" : "#E5E5EA",
      marginVertical: 16,
    },
  });
};

// Export a default light theme for immediate use
export const defaultStyles = createThemedStyles("light");
