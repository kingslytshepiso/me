import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useCallback, useEffect, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  ContactChannel,
  DIRECT_CONTACT_CHANNELS,
  SOCIAL_CONTACT_CHANNELS,
} from "../constants/contactChannels";
import { Colors } from "../constants/Colors";
import { useTheme } from "../context/ThemeContext";
import { useContactFabVisibility } from "../hooks/useContactFabVisibility";
import { openContactChannel } from "../utils/openContactChannel";
import { AppFullScreenOverlay } from "./AppFullScreenOverlay";
import { ContactSocialLinks } from "./ContactSocialLinks";

const SPRING_CONFIG = { damping: 18, stiffness: 220 };
const FAB_ACCENT = "#569CD6";

function getMenuBorderColor(theme: "light" | "dark") {
  return theme === "dark"
    ? "rgba(255, 255, 255, 0.1)"
    : "rgba(0, 0, 0, 0.1)";
}

function FabMenuPanel({
  theme,
  backgroundColor,
  animatedStyle,
  borderColor,
  children,
}: {
  theme: "light" | "dark";
  backgroundColor: string;
  animatedStyle: StyleProp<ViewStyle>;
  borderColor: string;
  children: React.ReactNode;
}) {
  const panelContent = (
    <View style={styles.menuPanelContent}>{children}</View>
  );

  if (Platform.OS === "web") {
    return (
      <Animated.View
        style={[
          styles.menuPanel,
          { backgroundColor, borderColor },
          animatedStyle,
        ]}
        pointerEvents="auto"
      >
        {panelContent}
      </Animated.View>
    );
  }

  return (
    <Animated.View
      style={[styles.menuPanel, { borderColor }, animatedStyle]}
      pointerEvents="auto"
    >
      <BlurView
        intensity={theme === "dark" ? 30 : 50}
        tint={theme === "dark" ? "dark" : "light"}
        style={styles.menuPanelBlur}
      >
        {panelContent}
      </BlurView>
    </Animated.View>
  );
}

export function FloatingContactFab() {
  const { theme } = useTheme();
  const colors = Colors[theme];
  const insets = useSafeAreaInsets();
  const { visibility, dismissForSession, isExpandedAllowed } =
    useContactFabVisibility();

  const [isExpanded, setIsExpanded] = useState(false);
  const expanded = useSharedValue(0);
  const entrance = useSharedValue(0);

  const menuBorderColor = getMenuBorderColor(theme);
  const fabPosition = {
    bottom: insets.bottom + 20,
    right: insets.right + 20,
  };

  useEffect(() => {
    if (visibility === "visible") {
      entrance.value = withSpring(1, SPRING_CONFIG);
    } else {
      entrance.value = 0;
    }
  }, [visibility, entrance]);

  useEffect(() => {
    if (!isExpandedAllowed) {
      setIsExpanded(false);
      expanded.value = withSpring(0, SPRING_CONFIG);
    }
  }, [isExpandedAllowed, expanded]);

  const toggleExpanded = useCallback(() => {
    setIsExpanded((prev) => {
      const next = !prev;
      expanded.value = withSpring(next ? 1 : 0, SPRING_CONFIG);
      return next;
    });
  }, [expanded]);

  const collapse = useCallback(() => {
    setIsExpanded(false);
    expanded.value = withSpring(0, SPRING_CONFIG);
  }, [expanded]);

  const handleChannelPress = useCallback(
    async (channel: ContactChannel) => {
      await openContactChannel(channel);
      collapse();
    },
    [collapse]
  );

  const handleDismiss = useCallback(() => {
    collapse();
    dismissForSession();
  }, [collapse, dismissForSession]);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: entrance.value,
    transform: [{ scale: interpolate(entrance.value, [0, 1], [0.5, 1]) }],
  }));

  const mainFabStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${interpolate(expanded.value, [0, 1], [0, 45])}deg` },
    ],
  }));

  const menuPanelStyle = useAnimatedStyle(() => ({
    opacity: interpolate(expanded.value, [0, 1], [0, 1]),
    transform: [
      {
        translateY: interpolate(expanded.value, [0, 1], [12, 0]),
      },
      {
        scale: interpolate(expanded.value, [0, 1], [0.92, 1]),
      },
    ],
  }));

  if (visibility !== "visible") {
    return null;
  }

  const fabControls = (
    <>
      {isExpanded && (
        <FabMenuPanel
          theme={theme}
          backgroundColor={colors.background}
          borderColor={menuBorderColor}
          animatedStyle={menuPanelStyle}
        >
          <TouchableOpacity
            style={styles.menuRow}
            onPress={handleDismiss}
            accessibilityRole="button"
            accessibilityLabel="Dismiss contact button for this visit"
            accessibilityHint="Hides the contact button until your next visit"
          >
            <Ionicons name="close" size={20} color={colors.text} />
            <Text style={[styles.menuRowLabel, { color: colors.text }]}>
              Hide for now
            </Text>
          </TouchableOpacity>

          <View
            style={[styles.divider, { backgroundColor: menuBorderColor }]}
          />

          {DIRECT_CONTACT_CHANNELS.map((channel) => (
            <TouchableOpacity
              key={channel.id}
              style={styles.menuRow}
              onPress={() => handleChannelPress(channel)}
              accessibilityRole="button"
              accessibilityLabel={channel.accessibilityLabel}
              accessibilityHint={channel.accessibilityHint}
            >
              <Ionicons name={channel.icon} size={22} color={colors.text} />
              <Text style={[styles.menuRowLabel, { color: colors.text }]}>
                {channel.displayText}
              </Text>
            </TouchableOpacity>
          ))}

          <View
            style={[styles.divider, { backgroundColor: menuBorderColor }]}
          />

          <ContactSocialLinks
            variant="fab"
            channels={SOCIAL_CONTACT_CHANNELS}
            onChannelPress={() => collapse()}
          />
        </FabMenuPanel>
      )}

      <Animated.View style={mainFabStyle}>
        <TouchableOpacity
          style={[styles.mainFab, { backgroundColor: FAB_ACCENT }]}
          onPress={toggleExpanded}
          accessibilityRole="button"
          accessibilityLabel="Contact options"
          accessibilityHint={
            isExpanded
              ? "Collapse contact options"
              : "Expand contact options"
          }
          accessibilityState={{ expanded: isExpanded }}
        >
          <Ionicons
            name={isExpanded ? "close" : "chatbubble-ellipses"}
            size={26}
            color="#fff"
          />
        </TouchableOpacity>
      </Animated.View>
    </>
  );

  return (
    <>
      <AppFullScreenOverlay
        visible={isExpanded}
        onDismiss={collapse}
        scrimAccessibilityLabel="Close contact menu"
      >
        <View style={styles.overlayContent} pointerEvents="box-none">
          <Animated.View
            style={[styles.fabRoot, fabPosition, containerStyle]}
            pointerEvents="box-none"
          >
            {fabControls}
          </Animated.View>
        </View>
      </AppFullScreenOverlay>

      {!isExpanded && (
        <Animated.View
          style={[styles.fabRoot, fabPosition, containerStyle]}
          pointerEvents="box-none"
        >
          {fabControls}
        </Animated.View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  overlayContent: {
    flex: 1,
  },
  fabRoot: {
    position: "absolute",
    zIndex: 999,
    alignItems: "flex-end",
    gap: 12,
  },
  menuPanel: {
    minWidth: 220,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 4,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  menuPanelBlur: {
    overflow: "hidden",
  },
  menuPanelContent: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
    paddingHorizontal: 4,
  },
  menuRowLabel: {
    fontSize: 15,
    flex: 1,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 4,
  },
  mainFab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});
