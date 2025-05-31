import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useCustomFonts } from "../hooks/useFonts";

interface FontLoaderProps {
  children: React.ReactNode;
}

export function FontLoader({ children }: FontLoaderProps) {
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
}
