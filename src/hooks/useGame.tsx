import { useCallback } from "react";
import { BOARD_SIZE } from "../constants";
import { useForceRender } from "./useForceRender";

export class BoardFilledError extends Error {
  constructor() {
    super();
    this.message = "Board is filled and cannot spawn more cells";
    this.name = "BoardFilledError";
  }
}

const BOARD: number[][] = new Array(BOARD_SIZE)
  .fill(0)
  .map(() => new Array(BOARD_SIZE).fill(0));

let highestPower = 1;

const logBoard = () => {
  console.log(" ====LOG====");
  BOARD.forEach((line, index) => {
    const lineWithSpaces = line.map((cell) =>
      cell === 0 ? " " : cell.toString()
    );
    console.log(index + 1, "|" + lineWithSpaces.join("|") + "|");
  });
};

const isBoardFilled = () =>
  !BOARD.some((row) => row.some((cell) => cell === 0));

const nextPosition = (): { x: number; y: number } => {
  if (isBoardFilled()) {
    throw new BoardFilledError();
  }

  const randomX = Math.floor(Math.random() * BOARD_SIZE);
  const randomY = Math.floor(Math.random() * BOARD_SIZE);

  if (BOARD[randomX][randomY] === 0) {
    return { x: randomX, y: randomY };
  }

  return nextPosition();
};
const nextNumber = () =>
  Math.pow(2, Math.floor(Math.random() * highestPower) + 1);

const spawnCell = () => {
  try {
    const { x, y } = nextPosition();
    const cellNum = nextNumber();

    BOARD[x][y] = cellNum;
  } catch (err) {
    if (err instanceof BoardFilledError) {
      throw new BoardFilledError();
    } else {
      throw err;
    }
  }
};

const startGame = () => {
  console.log("Start Game");
  highestPower = 1;

  BOARD.forEach((_, index) => (BOARD[index] = new Array(BOARD_SIZE).fill(0)));

  // To start, assign numbers at random places
  spawnCell();
  spawnCell();
};

export type Direction = "up" | "down" | "left" | "right";

const move = (direction: Direction) => {
  if (direction === "left") {
    BOARD.forEach((line, x) => {
      let emptyIndex = -1;
      const combinedIndices: number[] = [];
      for (let y = 0; y < BOARD_SIZE; ++y) {
        if (BOARD[x][y] === 0) {
          continue;
        } else {
          if (combinedIndices.includes(emptyIndex)) {
            emptyIndex++;
            BOARD[x][emptyIndex] = BOARD[x][y];
            BOARD[x][y] = 0;
          } else if (BOARD[x][emptyIndex] === BOARD[x][y]) {
            BOARD[x][emptyIndex] = BOARD[x][y] * 2;
            if (BOARD[x][y] === Math.pow(2, highestPower)) {
              highestPower++;
            }
            combinedIndices.push(emptyIndex);
            BOARD[x][y] = 0;
          } else {
            emptyIndex++;
            BOARD[x][emptyIndex] = BOARD[x][y];
            if (emptyIndex !== y) {
              BOARD[x][y] = 0;
            }
          }
        }
      }
    });
  } else if (direction === "right") {
    BOARD.forEach((line, x) => {
      let emptyIndex = BOARD_SIZE;
      const combinedIndices: number[] = [];
      for (let y = BOARD_SIZE - 1; y >= 0; --y) {
        if (BOARD[x][y] === 0) {
          continue;
        } else {
          if (combinedIndices.includes(emptyIndex)) {
            emptyIndex--;
            BOARD[x][emptyIndex] = BOARD[x][y];
            BOARD[x][y] = 0;
          } else if (BOARD[x][emptyIndex] === BOARD[x][y]) {
            BOARD[x][emptyIndex] = BOARD[x][y] * 2;
            combinedIndices.push(emptyIndex);
            BOARD[x][y] = 0;
          } else {
            emptyIndex--;
            BOARD[x][emptyIndex] = BOARD[x][y];
            if (emptyIndex !== y) {
              BOARD[x][y] = 0;
            }
          }
        }
      }
    });
  } else if (direction === "up") {
    for (let y = 0; y < BOARD_SIZE; ++y) {
      let emptyIndex = -1;
      const combinedIndices: number[] = [];
      for (let x = 0; x < BOARD_SIZE; ++x) {
        if (BOARD[x][y] === 0) {
          continue;
        } else if (emptyIndex === -1) {
          emptyIndex++;
          BOARD[emptyIndex][y] = BOARD[x][y];
          if (emptyIndex !== x) {
            BOARD[x][y] = 0;
          }
        } else if (combinedIndices.includes(emptyIndex)) {
          emptyIndex++;
          BOARD[emptyIndex][y] = BOARD[x][y];
          BOARD[x][y] = 0;
        } else if (BOARD[emptyIndex][x] === BOARD[x][y]) {
          BOARD[emptyIndex][y] = BOARD[x][y] * 2;
          if (BOARD[x][y] === Math.pow(2, highestPower)) {
            highestPower++;
          }
          combinedIndices.push(emptyIndex);
          BOARD[x][y] = 0;
        } else {
          emptyIndex++;
          BOARD[emptyIndex][y] = BOARD[x][y];
          if (emptyIndex !== x) {
            BOARD[x][y] = 0;
          }
        }
      }
    }
  } else {
    for (let y = 0; y < BOARD_SIZE; ++y) {
      let emptyIndex = BOARD_SIZE;
      const combinedIndices: number[] = [];
      for (let x = BOARD_SIZE - 1; x >= 0; --x) {
        if (BOARD[x][y] === 0) {
          continue;
        } else if (emptyIndex === BOARD_SIZE) {
          emptyIndex--;
          BOARD[emptyIndex][y] = BOARD[x][y];
          if (emptyIndex !== x) {
            BOARD[x][y] = 0;
          }
        } else if (combinedIndices.includes(emptyIndex)) {
          emptyIndex--;
          BOARD[emptyIndex][y] = BOARD[x][y];
          BOARD[x][y] = 0;
        } else if (BOARD[emptyIndex][x] === BOARD[x][y]) {
          BOARD[emptyIndex][y] = BOARD[x][y] * 2;
          if (BOARD[x][y] === Math.pow(2, highestPower)) {
            highestPower++;
          }
          combinedIndices.push(emptyIndex);
          BOARD[x][y] = 0;
        } else {
          emptyIndex--;
          BOARD[emptyIndex][y] = BOARD[x][y];
          if (emptyIndex !== x) {
            BOARD[x][y] = 0;
          }
        }
      }
    }
  }
  return;
};

export const useGame = () => {
  const forceRender = useForceRender();

  const memoizedMove = useCallback((direction: Direction) => {
    move(direction);
    spawnCell();
    forceRender();
  }, []);

  return {
    board: BOARD,
    move: memoizedMove,
    startGame,
    logBoard,
  };
};
