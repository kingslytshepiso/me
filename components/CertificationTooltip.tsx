import React, { useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { Tooltip } from "react-native-paper";
import { Colors } from "../constants/Colors";
import {
  BADGE_SIZE,
  BADGE_TOOLTIP_GAP,
  BADGE_TOOLTIP_MAX_WIDTH,
  type BadgeTooltipAlign,
} from "../constants/badgeLayout";
import { useTheme } from "../context/ThemeContext";

interface CertificationTooltipProps {
  title: string;
  children: React.ReactElement;
  style?: StyleProp<ViewStyle>;
  className?: string;
  onHoverChange?: (hovered: boolean) => void;
  /** Web only: shifts tooltip so first/last items are not clipped horizontally */
  tooltipAlign?: BadgeTooltipAlign;
}

const TOOLTIP_TOP = BADGE_SIZE + BADGE_TOOLTIP_GAP;
const WRAPPER_WIDTH = BADGE_SIZE + 4;
const CENTERED_TOOLTIP_LEFT = (WRAPPER_WIDTH - BADGE_TOOLTIP_MAX_WIDTH) / 2;

function getTooltipLayoutStyle(
  align: BadgeTooltipAlign = "center"
): ViewStyle {
  switch (align) {
    case "start":
      return {
        left: 0,
        right: undefined,
        width: BADGE_TOOLTIP_MAX_WIDTH,
        maxWidth: BADGE_TOOLTIP_MAX_WIDTH,
      };
    case "end":
      return {
        left: undefined,
        right: 0,
        width: BADGE_TOOLTIP_MAX_WIDTH,
        maxWidth: BADGE_TOOLTIP_MAX_WIDTH,
      };
    default:
      return {
        left: CENTERED_TOOLTIP_LEFT,
        right: undefined,
        width: BADGE_TOOLTIP_MAX_WIDTH,
        maxWidth: BADGE_TOOLTIP_MAX_WIDTH,
      };
  }
}

export function CertificationTooltip({
  title,
  children,
  style,
  className,
  onHoverChange,
  tooltipAlign = "center",
}: CertificationTooltipProps) {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const [hovered, setHovered] = useState(false);

  const setHover = (value: boolean) => {
    setHovered(value);
    onHoverChange?.(value);
  };

  if (Platform.OS !== "web") {
    return (
      <Tooltip title={title} enterTouchDelay={400}>
        {children}
      </Tooltip>
    );
  }

  const webPointerProps = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
  } as Record<string, unknown>;

  return (
    <View
      testID="certification-tooltip-wrapper"
      style={[styles.webWrapper, style]}
      className={className}
      accessibilityLabel={title}
      {...webPointerProps}
    >
      <View style={styles.badgeSlot}>{children}</View>
      {hovered && (
        <View
          style={[
            styles.webTooltip,
            getTooltipLayoutStyle(tooltipAlign),
            {
              backgroundColor:
                theme === "dark"
                  ? "rgba(30, 30, 30, 0.95)"
                  : "rgba(255, 255, 255, 0.98)",
              borderColor:
                theme === "dark"
                  ? "rgba(255, 255, 255, 0.15)"
                  : "rgba(0, 0, 0, 0.1)",
            },
          ]}
          pointerEvents="none"
        >
          <Text
            style={[styles.webTooltipTitle, { color: colors.text }]}
            numberOfLines={2}
          >
            {title}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  webWrapper: {
    position: "relative",
    width: BADGE_SIZE + 4,
    paddingHorizontal: 2,
    overflow: "visible",
    zIndex: 1,
  },
  badgeSlot: {
    width: BADGE_SIZE,
    height: BADGE_SIZE,
    zIndex: 2,
  },
  webTooltip: {
    position: "absolute",
    top: TOOLTIP_TOP,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    zIndex: 9999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 12,
  },
  webTooltipTitle: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
    textAlign: "center",
  },
});
