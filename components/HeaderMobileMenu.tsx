import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React, { useCallback } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  ContactChannel,
  DIRECT_CONTACT_CHANNELS,
  SOCIAL_CONTACT_CHANNELS,
} from "../constants/contactChannels";
import { Colors } from "../constants/Colors";
import { useTheme } from "../context/ThemeContext";
import { openContactChannel } from "../utils/openContactChannel";
import { AppFullScreenOverlay } from "./AppFullScreenOverlay";
import { ContactSocialLinks } from "./ContactSocialLinks";
import { NavMenuSection } from "./NavMenuSection";

export type HeaderNavRoute = "/" | "/about" | "/projects" | "/contact";

interface NavItem {
  route: HeaderNavRoute;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
}

const NAV_ITEMS: NavItem[] = [
  { route: "/", label: "Home", icon: "home-outline" },
  { route: "/about", label: "About", icon: "person-outline" },
  { route: "/projects", label: "Projects", icon: "folder-outline" },
  { route: "/contact", label: "Contact", icon: "mail-outline" },
];

interface HeaderMobileMenuProps {
  visible: boolean;
  onDismiss: () => void;
  onNavigate: (route: HeaderNavRoute) => void;
}

function MenuRow({
  icon,
  label,
  onPress,
  colors,
  accessibilityLabel,
  accessibilityHint,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  colors: (typeof Colors)["light"];
  accessibilityLabel: string;
  accessibilityHint?: string;
}) {
  return (
    <TouchableOpacity
      style={styles.menuRow}
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
    >
      <Ionicons name={icon} size={22} color={colors.text} />
      <Text style={[styles.menuRowLabel, { color: colors.text }]}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color={colors.icon} />
    </TouchableOpacity>
  );
}

function MenuPanelSurface({
  children,
  theme,
  backgroundColor,
}: {
  children: React.ReactNode;
  theme: "light" | "dark";
  backgroundColor: string;
}) {
  if (Platform.OS === "web") {
    return (
      <View style={[styles.panelInner, { backgroundColor }]}>
        {children}
      </View>
    );
  }

  return (
    <BlurView
      intensity={theme === "dark" ? 30 : 50}
      tint={theme === "dark" ? "dark" : "light"}
      style={styles.panelBlur}
    >
      <View style={styles.panelInner}>{children}</View>
    </BlurView>
  );
}

export function HeaderMobileMenu({
  visible,
  onDismiss,
  onNavigate,
}: HeaderMobileMenuProps) {
  const { theme, toggleTheme, isDark } = useTheme();
  const colors = Colors[theme];
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const panelWidth = Math.min(320, width * 0.88);
  const solidSurface = Platform.OS === "web";

  const handleNavigate = useCallback(
    (route: HeaderNavRoute) => {
      onNavigate(route);
      onDismiss();
    },
    [onNavigate, onDismiss]
  );

  const handleContactPress = useCallback(
    async (channel: ContactChannel) => {
      await openContactChannel(channel);
      onDismiss();
    },
    [onDismiss]
  );

  const themeLabel = isDark ? "Dark mode" : "Light mode";
  const themeAccessibilityLabel = isDark
    ? "Dark mode enabled, switch to light mode"
    : "Light mode enabled, switch to dark mode";

  return (
    <AppFullScreenOverlay
      visible={visible}
      onDismiss={onDismiss}
      scrimAccessibilityLabel="Close menu"
      contentStyle={styles.menuOverlayContent}
    >
      <View
        style={[
          styles.panel,
          {
            width: panelWidth,
            paddingTop: insets.top + 12,
            paddingBottom: insets.bottom + 16,
          },
        ]}
      >
        <MenuPanelSurface theme={theme} backgroundColor={colors.background}>
          <View style={styles.panelHeader}>
            <Text style={[styles.panelTitle, { color: colors.text }]}>
              Menu
            </Text>
            <TouchableOpacity
              onPress={onDismiss}
              style={styles.closeButton}
              accessibilityRole="button"
              accessibilityLabel="Close menu"
            >
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <NavMenuSection title="Navigate" solidSurface={solidSurface}>
              {NAV_ITEMS.map((item, index) => (
                <View key={item.route}>
                  {index > 0 && (
                    <View
                      style={[
                        styles.rowDivider,
                        {
                          backgroundColor:
                            theme === "dark"
                              ? "rgba(255, 255, 255, 0.08)"
                              : "rgba(0, 0, 0, 0.06)",
                        },
                      ]}
                    />
                  )}
                  <MenuRow
                    icon={item.icon}
                    label={item.label}
                    onPress={() => handleNavigate(item.route)}
                    colors={colors}
                    accessibilityLabel={`Go to ${item.label}`}
                  />
                </View>
              ))}
            </NavMenuSection>

            <NavMenuSection title="Contact me" solidSurface={solidSurface}>
              {DIRECT_CONTACT_CHANNELS.map((channel, index) => (
                <View key={channel.id}>
                  {index > 0 && (
                    <View
                      style={[
                        styles.rowDivider,
                        {
                          backgroundColor:
                            theme === "dark"
                              ? "rgba(255, 255, 255, 0.08)"
                              : "rgba(0, 0, 0, 0.06)",
                        },
                      ]}
                    />
                  )}
                  <MenuRow
                    icon={channel.icon}
                    label={channel.displayText ?? channel.id}
                    onPress={() => handleContactPress(channel)}
                    colors={colors}
                    accessibilityLabel={channel.accessibilityLabel}
                    accessibilityHint={channel.accessibilityHint}
                  />
                </View>
              ))}
              <View
                style={[
                  styles.rowDivider,
                  {
                    backgroundColor:
                      theme === "dark"
                        ? "rgba(255, 255, 255, 0.08)"
                        : "rgba(0, 0, 0, 0.06)",
                  },
                ]}
              />
              <View style={styles.socialRow}>
                <ContactSocialLinks
                  variant="header"
                  channels={SOCIAL_CONTACT_CHANNELS}
                  onChannelPress={() => onDismiss()}
                />
              </View>
            </NavMenuSection>

            <NavMenuSection title="Appearance" solidSurface={solidSurface}>
              <View style={styles.themeRow}>
                <Ionicons
                  name={isDark ? "moon" : "sunny"}
                  size={22}
                  color={colors.text}
                />
                <Text
                  style={[
                    styles.menuRowLabel,
                    styles.themeLabel,
                    { color: colors.text },
                  ]}
                >
                  {themeLabel}
                </Text>
                <Switch
                  value={isDark}
                  onValueChange={toggleTheme}
                  accessibilityLabel={themeAccessibilityLabel}
                  trackColor={{
                    false: "rgba(128, 128, 128, 0.4)",
                    true: "#569CD6",
                  }}
                  thumbColor={
                    Platform.OS === "android" ? colors.background : undefined
                  }
                />
              </View>
            </NavMenuSection>
          </ScrollView>
        </MenuPanelSurface>
      </View>
    </AppFullScreenOverlay>
  );
}

const styles = StyleSheet.create({
  menuOverlayContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  panel: {
    height: "100%",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 16,
  },
  panelBlur: {
    flex: 1,
    overflow: "hidden",
  },
  panelInner: {
    flex: 1,
    paddingHorizontal: 16,
  },
  panelHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    paddingBottom: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(128, 128, 128, 0.3)",
  },
  panelTitle: {
    fontSize: 20,
    fontWeight: "700",
    fontFamily: "SpaceMono",
  },
  closeButton: {
    padding: 4,
  },
  scrollContent: {
    paddingBottom: 8,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  menuRowLabel: {
    fontSize: 16,
    flex: 1,
  },
  rowDivider: {
    height: StyleSheet.hairlineWidth,
    marginHorizontal: 12,
  },
  socialRow: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "flex-start",
  },
  themeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
  },
  themeLabel: {
    flex: 1,
  },
});
