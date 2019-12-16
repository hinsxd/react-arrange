import { coord, Board } from './types';

export const getAvailM0ves = (zeroPos: coord, size: number): coord[] =>
  [
    { row: zeroPos.row - 1, col: zeroPos.col },
    { row: zeroPos.row + 1, col: zeroPos.col },
    { row: zeroPos.row, col: zeroPos.col - 1 },
    { row: zeroPos.row, col: zeroPos.col + 1 }
  ].filter(
    pos => pos.row < size && pos.col < size && pos.row >= 0 && pos.col >= 0
  );

export const generatePositions = (board: Board): coord[] => {
  const size = board.length;
  let newPos = Array(size * size);
  board.forEach((rowTiles, row) =>
    rowTiles.forEach((value, col) => {
      newPos[value] = { row, col };
    })
  );
  return newPos;
};

export const isBeside = (a: coord, b: coord): boolean =>
  (Math.abs(a.row - b.row) === 1 && a.col - b.col === 0) ||
  (Math.abs(a.col - b.col) === 1 && a.row - b.row === 0);
