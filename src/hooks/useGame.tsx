import { useCallback, useState } from "react";
import { BOARD_SIZE } from "../constants";
import { useForceRender } from "./useForceRender";

export type Direction = "up" | "down" | "left" | "right";

type BoardCell = {
  id: string;
  value: number;
  x: number;
  y: number;
};

class BoardFilled extends Error {
  constructor() {
    super();
    this.name = "BoardFilled";
    this.message = "Board has maxmimum number of cells possible";
  }
}

const Board: BoardCell[] = [];

const getCellsWithX = (x: number) =>
  Board.filter((cell) => cell.x === x).sort((a, b) => a.y - b.y);
const getCellsWithY = (y: number) =>
  Board.filter((cell) => cell.y === y).sort((a, b) => a.x - b.x);
const getCellWithXY = (x: number, y: number) =>
  Board.find((cell) => cell.x === x && cell.y === y);

const generateId = () => Math.floor(Math.random() * 1000000).toString();

const getRandomPosition = () => ({
  x: Math.floor(Math.random() * BOARD_SIZE),
  y: Math.floor(Math.random() * BOARD_SIZE),
});

const spawnCell = (): void => {
  if (Board.length === BOARD_SIZE * BOARD_SIZE) {
    throw new BoardFilled();
  }
  const { x, y } = getRandomPosition();

  const cellWithPosition = getCellWithXY(x, y);

  if (cellWithPosition) {
    return spawnCell();
  } else {
    Board.push({
      id: generateId(),
      x,
      y,
      value: 2,
    });
  }
};

const removeCell = (cell: BoardCell) => {
  for (let i = 0; i < Board.length; ++i) {
    if (Board[i] === cell) {
      Board.splice(i, 1);
    }
  }
};

const resetBoard = () => {
  Board.length = 0;
};

const startGame = () => {
  console.log("START");
  resetBoard();
  spawnCell();
  spawnCell();
};

const logBoard = () => {
  console.log("=== LOG ===");
  for (let x = 0; x < BOARD_SIZE; ++x) {
    const line = getCellsWithX(x);
    const arr = new Array(BOARD_SIZE).fill(0);
    line.forEach(({ y, value }) => (arr[y] = value));

    console.log(`${x + 1} |${arr.join("|")}|`);
  }
};

const move = (direction: Direction) => {
  switch (direction) {
    case "left": {
      for (let x = 0; x < BOARD_SIZE; ++x) {
        const line = getCellsWithX(x);
        let y = 0;
        const doubledCells: BoardCell[] = [];
        const removedCells: BoardCell[] = [];
        line.forEach((cell, index) => {
          if (index === 0) {
            cell.y = y;
            y++;

            return;
          }
          const prevCell = line[index - 1];
          if (
            prevCell.value === cell.value &&
            !removedCells.includes(prevCell) &&
            !doubledCells.includes(prevCell)
          ) {
            prevCell.value = prevCell.value * 2;
            removedCells.push(cell);
            doubledCells.push(prevCell);
          } else {
            cell.y = y;
            y++;
          }
        });
        removedCells.forEach((cell) => removeCell(cell));
      }
      break;
    }
    case "right": {
      for (let x = 0; x < BOARD_SIZE; ++x) {
        const line = getCellsWithX(x).reverse();
        let y = BOARD_SIZE - 1;
        const doubledCells: BoardCell[] = [];
        const removedCells: BoardCell[] = [];
        line.forEach((cell, index) => {
          if (index === 0) {
            cell.y = y;
            y--;

            return;
          }
          const prevCell = line[index - 1];
          if (
            prevCell.value === cell.value &&
            !removedCells.includes(prevCell) &&
            !doubledCells.includes(prevCell)
          ) {
            prevCell.value = prevCell.value * 2;
            removedCells.push(cell);
            doubledCells.push(prevCell);
          } else {
            cell.y = y;
            y--;
          }
        });
        removedCells.forEach((cell) => removeCell(cell));
      }
      break;
    }
    case "up": {
      for (let y = 0; y < BOARD_SIZE; ++y) {
        const line = getCellsWithY(y);
        let x = 0;
        const doubledCells: BoardCell[] = [];
        const removedCells: BoardCell[] = [];
        line.forEach((cell, index) => {
          if (index === 0) {
            cell.x = x;
            x++;

            return;
          }
          const prevCell = line[index - 1];
          if (
            prevCell.value === cell.value &&
            !removedCells.includes(prevCell) &&
            !doubledCells.includes(prevCell)
          ) {
            prevCell.value = prevCell.value * 2;
            removedCells.push(cell);
            doubledCells.push(prevCell);
          } else {
            cell.x = x;
            x++;
          }
        });
        removedCells.forEach((cell) => removeCell(cell));
      }
      break;
    }
    case "down": {
      for (let y = 0; y < BOARD_SIZE; ++y) {
        const line = getCellsWithY(y).reverse();
        let x = BOARD_SIZE - 1;
        const doubledCells: BoardCell[] = [];
        const removedCells: BoardCell[] = [];
        line.forEach((cell, index) => {
          if (index === 0) {
            cell.x = x;
            x--;

            return;
          }
          const prevCell = line[index - 1];
          if (
            prevCell.value === cell.value &&
            !removedCells.includes(prevCell) &&
            !doubledCells.includes(prevCell)
          ) {
            prevCell.value = prevCell.value * 2;
            removedCells.push(cell);
            doubledCells.push(prevCell);
          } else {
            cell.x = x;
            x--;
          }
        });
        removedCells.forEach((cell) => removeCell(cell));
      }
      break;
    }
  }
  spawnCell();
};

export const useGame = () => {
  const forceRender = useForceRender();
  const [gameOver, setGameOver] = useState(false);

  const memoizedMove = useCallback((direction: Direction) => {
    try {
      move(direction);
    } catch (err) {
      if (err instanceof BoardFilled) {
        setGameOver(true);
      } else {
        console.error(err);
        throw err;
      }
    }
    forceRender();
  }, []);

  const memoizedStartGame = useCallback(() => {
    startGame();
    setGameOver(false);
  }, []);

  return {
    board: Board,
    move: memoizedMove,
    startGame: memoizedStartGame,
    logBoard,
    gameOver,
  };
};
