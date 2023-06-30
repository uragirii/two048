import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Board from "./Board";
import { theme } from "../constants";

const AppScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.heading}>2048</Text>
        <Text style={styles.subtitle}>
          Join the tiles, get to <Text style={styles.bold}>2048!</Text>
        </Text>
      </View>
      <Board />
      <View style={styles.footer}>
        <Text style={styles.bold}>How to play!</Text>
        <Text style={styles.subtitle}>
          Use your arrow keys to move the tiles. Tiles with the same number
          merge into one when they touch. Add them up to reach 2048!
        </Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF8EF",
    padding: 16,
    paddingTop: 48,
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 64,
    fontWeight: "900",
    color: theme.textPrimary,
    fontFamily: theme.fonts.bold,
  },
  subtitle: {
    fontSize: 18,
    color: theme.textPrimary,
    fontWeight: "400",
    fontFamily: theme.fonts.regular,
  },
  bold: {
    fontSize: 18,
    color: theme.textPrimary,
    fontWeight: "700",
    fontFamily: theme.fonts.bold,
  },
  footer: {
    marginBottom: 48,
  },
});

export default AppScreen;
