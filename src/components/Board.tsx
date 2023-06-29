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

const Board = () => {
  const { width } = useWindowDimensions();
  const backgroundCells = useMemo(() => {
    return new Array(BOARD_SIZE * BOARD_SIZE)
      .fill(0)
      .map((_, index) => <BackgroundCell key={index.toString()} />);
  }, []);

  const cellWidth = useCellSize();

  const getCellPosition = (x: number, y: number) => {
    return {
      top: 2 * MARGIN + x * (cellWidth + 2 * MARGIN),
      left: 2 * MARGIN + y * (cellWidth + 2 * MARGIN),
    };
  };
  const [{ x, y }, setRandomPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setRandomPos({
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
      });
    }, 750);

    return () => clearInterval(interval);
  }, []);

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
      <View
        style={{
          position: "absolute",
          height: cellWidth,
          width: cellWidth,
          backgroundColor: "red",
          ...getCellPosition(x, y),
          borderRadius: 2,
        }}
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
