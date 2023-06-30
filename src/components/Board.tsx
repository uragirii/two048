import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Pressable,
} from "react-native";
import React, { useEffect, useMemo } from "react";
import {
  BOARD_SIZE,
  BOARD_WIDTH_MULTIPLIER,
  MARGIN,
  theme,
} from "../constants";
import BackgroundCell from "./BackgroundCell";
import { useGame, Direction } from "../hooks";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import Cell from "./Cell";
import GameOverScreen from "./GameOverScreen";

const Board = () => {
  const { width } = useWindowDimensions();
  const backgroundCells = useMemo(() => {
    return new Array(BOARD_SIZE * BOARD_SIZE)
      .fill(0)
      .map((_, index) => <BackgroundCell key={index.toString()} />);
  }, []);

  const { logBoard, board, move, startGame, gameOver } = useGame();

  const flingGesture = Gesture.Pan().onEnd((e) => {
    if (gameOver) {
      return;
    }
    const absX = Math.abs(e.translationX);
    const absY = Math.abs(e.translationY);
    let direction: Direction;
    if (absX < absY) {
      if (e.translationY < 0) {
        console.log("UP");
        direction = "up";
      } else {
        direction = "down";
        console.log("DOWN");
      }
    } else {
      if (e.translationX < 0) {
        direction = "left";
        console.log("LEFT");
      } else {
        direction = "right";
        console.log("RIGHT");
      }
    }

    runOnJS(move)(direction);
  });

  useEffect(() => {
    startGame();
    logBoard();
  }, []);

  logBoard();

  const cells = board.map(({ x, y, value, id }) => (
    <Cell x={x} y={y} value={value} key={id} />
  ));

  return (
    <>
      {gameOver && <GameOverScreen onTryAgain={startGame} />}
      <GestureDetector gesture={flingGesture}>
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
          {cells}
        </View>
      </GestureDetector>
    </>
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
