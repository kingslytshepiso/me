import { Ionicons } from "@expo/vector-icons";

import { BlurView } from "expo-blur";

import { useRouter } from "expo-router";

import React, { useState } from "react";

import {

  StyleSheet,

  Text,

  TouchableOpacity,

  View,

  useWindowDimensions,

} from "react-native";

import { BREAKPOINT_SM } from "../constants/layout";

import { Colors } from "../constants/Colors";

import { useTheme } from "../context/ThemeContext";

import { useContentPadding } from "../hooks/useContentPadding";

import {

  HeaderMobileMenu,

  type HeaderNavRoute,

} from "./HeaderMobileMenu";



const HEADER_HEIGHT = 60;



export function Header() {

  const { theme, toggleTheme } = useTheme();

  const colors = Colors[theme];

  const router = useRouter();

  const { width } = useWindowDimensions();

  const contentPadding = useContentPadding();

  const [menuVisible, setMenuVisible] = useState(false);



  const isSmallScreen = width < BREAKPOINT_SM;



  const handleNavigation = (route: HeaderNavRoute) => {

    router.push(route);

    setMenuVisible(false);

  };



  const iconButtonBackground =

    theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)";



  return (

    <View style={[styles.container, { height: HEADER_HEIGHT }]}>

      <BlurView

        intensity={theme === "dark" ? 30 : 50}

        tint={theme === "dark" ? "dark" : "light"}

        style={styles.blurContainer}

      >

        <View

          style={[

            styles.content,

            { paddingHorizontal: contentPadding.horizontal },

          ]}

        >

          <TouchableOpacity

            style={styles.brandContainer}

            onPress={() => router.push("/")}

            accessibilityRole="link"

            accessibilityLabel="Go to home"

          >

            <Text style={[styles.brandText, { color: colors.text }]}>

              kingslyMokgwathi

            </Text>

          </TouchableOpacity>



          {isSmallScreen ? (

            <TouchableOpacity

              onPress={() => setMenuVisible(true)}

              style={[

                styles.menuButton,

                { backgroundColor: iconButtonBackground },

              ]}

              accessibilityRole="button"

              accessibilityLabel="Open menu"

            >

              <Ionicons name="menu" size={24} color={colors.text} />

            </TouchableOpacity>

          ) : (

            <View style={styles.navContainer}>

              <TouchableOpacity

                style={styles.navItem}

                onPress={() => router.push("/about")}

              >

                <Text style={[styles.navText, { color: colors.text }]}>

                  About

                </Text>

              </TouchableOpacity>

              <TouchableOpacity

                style={styles.navItem}

                onPress={() => router.push("/projects")}

              >

                <Text style={[styles.navText, { color: colors.text }]}>

                  Projects

                </Text>

              </TouchableOpacity>

              <TouchableOpacity

                style={styles.navItem}

                onPress={() => router.push("/contact")}

              >

                <Text style={[styles.navText, { color: colors.text }]}>

                  Contact

                </Text>

              </TouchableOpacity>

            </View>

          )}



          {!isSmallScreen && (

            <TouchableOpacity

              onPress={toggleTheme}

              style={[

                styles.themeButton,

                { backgroundColor: iconButtonBackground },

              ]}

              accessibilityLabel="Toggle theme"

              accessibilityRole="button"

            >

              <Ionicons

                name={theme === "dark" ? "sunny" : "moon"}

                size={24}

                color={colors.text}

              />

            </TouchableOpacity>

          )}

        </View>

      </BlurView>



      {isSmallScreen && (

        <HeaderMobileMenu

          visible={menuVisible}

          onDismiss={() => setMenuVisible(false)}

          onNavigate={handleNavigation}

        />

      )}

    </View>

  );

}



const styles = StyleSheet.create({

  container: {

    width: "100%",

    position: "absolute",

    top: 0,

    left: 0,

    right: 0,

    zIndex: 1000,

  },

  blurContainer: {

    flex: 1,

    overflow: "hidden",

    borderBottomWidth: 1,

    borderBottomColor: "rgba(255, 255, 255, 0.1)",

  },

  content: {

    flex: 1,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

  },

  brandContainer: {

    flex: 1,

  },

  brandText: {

    fontSize: 20,

    fontWeight: "700",

    fontFamily: "SpaceMono",

  },

  navContainer: {

    flex: 2,

    flexDirection: "row",

    justifyContent: "center",

    alignItems: "center",

    gap: 24,

  },

  navItem: {

    paddingVertical: 8,

    paddingHorizontal: 12,

  },

  navText: {

    fontSize: 16,

    fontWeight: "500",

  },

  themeButton: {

    padding: 8,

    borderRadius: 20,

    elevation: 2,

    shadowColor: "#000",

    shadowOffset: {

      width: 0,

      height: 2,

    },

    shadowOpacity: 0.1,

    shadowRadius: 4,

  },

  menuButton: {

    padding: 8,

    borderRadius: 20,

  },

});

