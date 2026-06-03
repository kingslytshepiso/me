import { Ionicons } from "@expo/vector-icons";
import React, { useCallback, useMemo } from "react";
import {
  Image,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { Colors } from "../constants/Colors";
import {
  BADGE_HOVER_SCALE,
  BADGE_SIZE,
  type BadgeTooltipAlign,
} from "../constants/badgeLayout";
import { useTheme } from "../context/ThemeContext";
import {
  Certification,
  getBadgeImageSource,
} from "../utils/badgeUtils";
import { formatCertDate } from "../utils/formatCertDate";
import { CertificationTooltip } from "./CertificationTooltip";

interface CertificationBadgeProps {
  cert: Certification;
  onPress: (cert: Certification) => void;
  tooltipAlign?: BadgeTooltipAlign;
}

export function CertificationBadge({
  cert,
  onPress,
  tooltipAlign = "center",
}: CertificationBadgeProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const scale = useSharedValue(1);
  const isWeb = Platform.OS === "web";
  const imageSource = getBadgeImageSource(cert);

  const accessibilityHint = useMemo(
    () =>
      `${cert.issuer} · ${formatCertDate(cert.earnedDate)}. Tap for details.`,
    [cert.issuer, cert.earnedDate]
  );

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    shadowOpacity: isWeb
      ? interpolate(scale.value, [1, BADGE_HOVER_SCALE], [0, 0.3])
      : 0,
    shadowRadius: isWeb ? 6 : 0,
    shadowOffset: { width: 0, height: 2 },
    elevation: isWeb ? 0 : interpolate(scale.value, [1, BADGE_HOVER_SCALE], [0, 4]),
  }));

  const handleHoverChange = useCallback(
    (hovered: boolean) => {
      if (!isWeb) return;
      scale.value = withSpring(hovered ? BADGE_HOVER_SCALE : 1, {
        damping: 14,
        stiffness: 200,
      });
    },
    [isWeb, scale]
  );

  const handlePress = () => {
    onPress(cert);
  };

  const webClassName =
    Platform.OS === "web" ? "certBadgeItem" : undefined;

  return (
    <CertificationTooltip
      title={cert.name}
      className={webClassName}
      onHoverChange={handleHoverChange}
      tooltipAlign={tooltipAlign}
    >
      <Pressable
        onPress={handlePress}
        style={styles.badgeButton}
        accessibilityRole="button"
        accessibilityLabel={cert.name}
        accessibilityHint={accessibilityHint}
      >
        <Animated.View style={[styles.badgeInner, animatedStyle]}>
          {imageSource ? (
            <Image
              source={imageSource}
              style={styles.badgeImage}
              resizeMode="contain"
              accessibilityIgnoresInvertColors
            />
          ) : (
            <View
              style={[
                styles.iconFallback,
                {
                  backgroundColor:
                    theme === "dark"
                      ? "rgba(255, 255, 255, 0.08)"
                      : "rgba(0, 0, 0, 0.05)",
                },
              ]}
            >
              <Ionicons
                name="ribbon-outline"
                size={28}
                color={colors.tint}
              />
            </View>
          )}
        </Animated.View>
      </Pressable>
    </CertificationTooltip>
  );
}

const styles = StyleSheet.create({
  badgeButton: {
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: 8,
  },
  badgeInner: {
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: 8,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  badgeImage: {
    width: BADGE_SIZE,
    height: BADGE_SIZE,
  },
  iconFallback: {
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
