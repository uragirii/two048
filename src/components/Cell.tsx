import { Text, StyleSheet } from "react-native";
import React, { useEffect, useRef } from "react";
import { useCellSize } from "../hooks";
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  FadeOut,
  FadeIn,
} from "react-native-reanimated";
import {
  CELL_COLORS,
  CELL_NUMBER_COLORS,
  CELL_NUMBER_FONT_SIZE,
  MARGIN,
  theme,
} from "../constants";

interface Props {
  x: number;
  y: number;
  value: number;
}

const Cell = ({ x, y, value }: Props) => {
  const cellWidth = useCellSize();
  const prevValue = useRef(value);

  const getCellPosition = (x: number, y: number) => {
    return {
      top: 2 * MARGIN + x * (cellWidth + 2 * MARGIN),
      left: 2 * MARGIN + y * (cellWidth + 2 * MARGIN),
    };
  };

  const top = useSharedValue(getCellPosition(x, y).top);
  const left = useSharedValue(getCellPosition(x, y).left);

  useEffect(() => {
    const position = getCellPosition(x, y);
    top.value = position.top;
    left.value = position.left;
  }, [x, y]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      top: withTiming(top.value, { duration: 100 }),
      left: withTiming(left.value, { duration: 100 }),
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: cellWidth,
          height: cellWidth,
          backgroundColor: CELL_COLORS[value],
        },
        animatedStyles,
      ]}
      entering={FadeIn}
      exiting={FadeOut}
    >
      <Text
        style={{
          color: CELL_NUMBER_COLORS[value],
          fontSize: CELL_NUMBER_FONT_SIZE[value],
          fontFamily: theme.fonts.bold,
          lineHeight: 1.25 * CELL_NUMBER_FONT_SIZE[value],
        }}
      >
        {value}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "red",
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Cell;
