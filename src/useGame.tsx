import { Reducer, useReducer, useRef, useEffect, useCallback } from 'react';
import produce from 'immer';

export type Board = number[][];

type useGameProps = { size?: number };
type coord = { row: number; col: number };
type Action =
  | { type: 'INIT_BOARD'; payload: { size: number } }
  | { type: 'SWAP'; payload: { a: coord; b: coord } };

type GameState = {
  board: Board;
  // positions: coord[];
};

const generatePositions = (board: Board): coord[] => {
  const size = board.length;
  let newPos = Array(size * size);
  board.forEach((rowTiles, row) =>
    rowTiles.forEach((value, col) => {
      newPos[value] = { row, col };
    })
  );
  return newPos;
};

const isBeside = (a: coord, b: coord): boolean => {
  return (
    (Math.abs(a.row - b.row) === 1 && a.col - b.col === 0) ||
    (Math.abs(a.col - b.col) === 1 && a.row - b.row === 0)
  );
};

const gameReducer: Reducer<GameState, Action> = (state, action) => {
  switch (action.type) {
    case 'INIT_BOARD':
      return initGameState(action.payload.size);
    case 'SWAP':
      const { a, b } = action.payload;
      return produce(state, draft => {
        const temp = draft.board[a.row][a.col];
        draft.board[a.row][a.col] = draft.board[b.row][b.col];
        draft.board[b.row][b.col] = temp;
      });
    default:
      return state;
  }
};

const initGameState = (size: number): GameState => {
  let board: Board = [];
  let count = 1;
  for (let i = 0; i < size; i++) {
    board[i] = [];
    for (let j = 0; j < size; j++, count++) {
      if (count < size * size) {
        board[i][j] = count;
      } else {
        board[i][j] = 0;
      }
    }
  }

  let zeroPos = { row: size - 1, col: size - 1 };
  for (let i = 0; i < size * size * size * size; i++) {
    const avail = [
      { row: zeroPos.row - 1, col: zeroPos.col },
      { row: zeroPos.row + 1, col: zeroPos.col },
      { row: zeroPos.row, col: zeroPos.col - 1 },
      { row: zeroPos.row, col: zeroPos.col + 1 }
    ].filter(
      pos => pos.row < size && pos.col < size && pos.row >= 0 && pos.col >= 0
    );
    const chosen = avail[Math.floor(Math.random() * avail.length)];
    const temp = board[chosen.row][chosen.col];
    board[chosen.row][chosen.col] = board[zeroPos.row][zeroPos.col];
    board[zeroPos.row][zeroPos.col] = temp;
    zeroPos = chosen;
  }
  const positions = generatePositions(board);

  return {
    board
    // positions
  };
};

export const useGame = ({ size = 4 }: useGameProps) => {
  const [
    {
      board
      // positions
    },
    dispatch
  ] = useReducer(gameReducer, size, initGameState);
  const positions = generatePositions(board);
  const availMoves = positions.filter(pos => isBeside(pos, positions[0]));

  useEffect(() => {
    startGame();
  }, [size]);

  const startGame = useCallback(() => {
    dispatch({ type: 'INIT_BOARD', payload: { size } });
  }, [size]);

  const onTilePress = useCallback(
    (row: number, col: number) => {
      if (isBeside(positions[0], { row, col })) {
        dispatch({
          type: 'SWAP',
          payload: {
            a: { row, col },
            b: positions[0]
          }
        });
      }
    },
    [positions]
  );

  return { board, onTilePress, positions, availMoves, startGame };
};
