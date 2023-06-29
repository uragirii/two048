import { Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useCellSize } from "../hooks";
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
} from "react-native-reanimated";
import { MARGIN } from "../constants";

interface Props {
  x: number;
  y: number;
  value: number;
}

const Cell = ({ x, y, value }: Props) => {
  const cellWidth = useCellSize();

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
      top: withTiming(top.value, { duration: 500 }),
      left: withTiming(left.value, { duration: 500 }),
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { width: cellWidth, height: cellWidth },
        animatedStyles,
      ]}
    >
      <Text>{value}</Text>
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
