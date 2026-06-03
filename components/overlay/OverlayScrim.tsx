import { BlurView } from "expo-blur";
import React, { useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import {
  getOverlayBlurProps,
  OVERLAY_DIM_SCRIM,
  OVERLAY_WEB_BLUR_PX,
  OVERLAY_WEB_TINT,
} from "../../constants/overlay";
import type { ThemeMode } from "../../context/ThemeContext";
import type { OverlayScrimKind } from "./types";

interface OverlayScrimProps {
  theme: ThemeMode;
  kind: OverlayScrimKind;
  enterDurationMs: number;
}

function WebBlurScrim({ theme }: { theme: ThemeMode }) {
  return (
    <>
      <View
        style={[
          styles.scrim,
          { backgroundColor: OVERLAY_WEB_TINT[theme] },
        ]}
        pointerEvents="none"
      />
      <View
        // @ts-expect-error className supported on web
        className="app-overlay-web-blur"
        style={[styles.scrim, styles.webBlurScrim]}
        pointerEvents="none"
      />
    </>
  );
}

function DimScrim({ theme }: { theme: ThemeMode }) {
  return (
    <View
      style={[styles.scrim, { backgroundColor: OVERLAY_DIM_SCRIM[theme] }]}
      pointerEvents="none"
    />
  );
}

function BlurScrim({ theme }: { theme: ThemeMode }) {
  if (Platform.OS === "web") {
    return <WebBlurScrim theme={theme} />;
  }

  const blurProps = getOverlayBlurProps(theme);
  return (
    <BlurView
      intensity={blurProps.intensity}
      tint={blurProps.tint}
      style={styles.scrim}
    />
  );
}

export function OverlayScrim({ theme, kind, enterDurationMs }: OverlayScrimProps) {
  const opacity = useSharedValue(enterDurationMs > 0 ? 0 : 1);

  useEffect(() => {
    if (enterDurationMs <= 0) {
      opacity.value = 1;
      return;
    }
    opacity.value = withTiming(1, { duration: enterDurationMs });
  }, [enterDurationMs, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const scrim =
    kind === "dim" ? (
      <DimScrim theme={theme} />
    ) : (
      <BlurScrim theme={theme} />
    );

  if (enterDurationMs <= 0) {
    return scrim;
  }

  return (
    <Animated.View style={[styles.scrimWrapper, animatedStyle]} pointerEvents="none">
      {scrim}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  scrimWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
  },
  webBlurScrim: Platform.select({
    web: {
      backdropFilter: `blur(${OVERLAY_WEB_BLUR_PX}px)`,
      WebkitBackdropFilter: `blur(${OVERLAY_WEB_BLUR_PX}px)`,
    },
    default: {},
  }),
});
