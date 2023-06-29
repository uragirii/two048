import { useWindowDimensions } from "react-native";
import { BOARD_SIZE, BOARD_WIDTH_MULTIPLIER, MARGIN } from "../constants";

export const useCellSize = () => {
  const { width } = useWindowDimensions();

  const boardWidth = width * BOARD_WIDTH_MULTIPLIER;

  const cellWidth = (boardWidth - 2 * MARGIN) / BOARD_SIZE - 2 * MARGIN;

  return cellWidth;
};
