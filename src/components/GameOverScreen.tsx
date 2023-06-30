import { Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { theme } from "../constants";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

interface Props {
  onTryAgain: () => void;
}

const GameOverScreen = ({ onTryAgain }: Props) => {
  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={[StyleSheet.absoluteFill, styles.container]}
    >
      <Text style={styles.heading}>Game Over!</Text>
      <Pressable style={styles.button} onPress={onTryAgain}>
        <Text style={styles.btnText}>Start again</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: `${theme.backgroundPrimary}b4`,
    zIndex: 10,
  },
  heading: {
    fontFamily: theme.fonts.bold,
    fontSize: 58,
    color: theme.textPrimary,
  },
  button: {
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: theme.textPrimary,
    marginTop: 18,
  },
  btnText: {
    color: theme.backgroundPrimary,
    fontFamily: theme.fonts.regular,
    lineHeight: 16,
  },
});

export default GameOverScreen;
