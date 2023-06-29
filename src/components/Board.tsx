import { View, Text, StyleSheet, useWindowDimensions } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  BOARD_SIZE,
  BOARD_WIDTH_MULTIPLIER,
  MARGIN,
  theme,
} from "../constants";
import BackgroundCell from "./BackgroundCell";
import { useCellSize } from "../hooks";
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from "react-native-reanimated";

const Board = () => {
  const { width } = useWindowDimensions();
  const backgroundCells = useMemo(() => {
    return new Array(BOARD_SIZE * BOARD_SIZE)
      .fill(0)
      .map((_, index) => <BackgroundCell key={index.toString()} />);
  }, []);

  const cellWidth = useCellSize();

  console.log(cellWidth);

  const getCellPosition = (x: number, y: number) => {
    return {
      top: 2 * MARGIN + x * (cellWidth + 2 * MARGIN),
      left: 2 * MARGIN + y * (cellWidth + 2 * MARGIN),
    };
  };
  const top = useSharedValue(10);
  const left = useSharedValue(10);

  useEffect(() => {
    const interval = setInterval(() => {
      const position = getCellPosition(
        Math.floor(Math.random() * BOARD_SIZE),
        Math.floor(Math.random() * BOARD_SIZE)
      );
      top.value = position.top;
      left.value = position.left;
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      top: withTiming(top.value, { duration: 500 }),
      left: withTiming(left.value, { duration: 500 }),
    };
  });

  return (
    <View
      style={[
        styles.container,
        // TODO: add fix for small screens
        {
          width: width * BOARD_WIDTH_MULTIPLIER,
          height: width * BOARD_WIDTH_MULTIPLIER,
        },
      ]}
    >
      {backgroundCells}
      <Animated.View
        style={[
          {
            position: "absolute",
            height: cellWidth,
            width: cellWidth,
            backgroundColor: "red",
            borderRadius: 2,
          },
          animatedStyles,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.backgroundSecondary,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 4,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: MARGIN,
    position: "relative",
  },
});

export default Board;
