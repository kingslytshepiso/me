import React from "react";

import { Linking, StyleSheet, Text, View } from "react-native";

import { Colors } from "../constants/Colors";

import { SOCIAL_LINKS } from "../constants/profileLinks";

import { useTheme } from "../context/ThemeContext";

import { ContactSocialLinks } from "./ContactSocialLinks";



export function Footer() {

  const { theme } = useTheme();

  const colors = Colors[theme];



  const handleCursorPress = () => {

    Linking.openURL("https://cursor.sh");

  };



  const handleKingslyPress = () => {

    Linking.openURL(SOCIAL_LINKS.github);

  };



  return (

    <View

      style={[

        styles.container,

        {

          backgroundColor: "transparent",

        },

      ]}

    >

      <View style={styles.contentContainer}>

        <Text style={[styles.text, { color: colors.text }]}>

          Built with ❤️ by{" "}

          <Text style={styles.link} onPress={handleKingslyPress}>

            Kingsly

          </Text>{" "}

          using{" "}

          <Text style={styles.link} onPress={handleCursorPress}>

            Cursor

          </Text>

        </Text>



        <ContactSocialLinks variant="footer" />

      </View>

    </View>

  );

}



const styles = StyleSheet.create({

  container: {

    padding: 12,

    borderTopWidth: 1,

    borderTopColor: "rgba(128, 128, 128, 0.2)",

  },

  contentContainer: {

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    gap: 16,

  },

  text: {

    fontSize: 13,

  },

  link: {

    fontWeight: "600",

    textDecorationLine: "underline",

  },

});

