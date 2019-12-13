import { Reducer, useReducer, useRef, useEffect } from 'react';
import produce from 'immer';
export type Board = number[][];

type useBoardParam = { size?: number };
type coord = { row: number; col: number };
type Action =
  | { type: 'INIT_BOARD'; payload: { size: number } }
  | { type: 'SWAP'; payload: { a: coord; b: coord } };

const boardReducer: Reducer<Board, Action> = (state, action) => {
  switch (action.type) {
    case 'INIT_BOARD':
      return makeBoard(action.payload.size);
    case 'SWAP':
      const { a, b } = action.payload;
      return produce(state, board => {
        const temp = board[a.row][a.col];
        board[a.row][a.col] = board[b.row][b.col];
        board[b.row][b.col] = temp;
      });
    default:
      return state;
  }
};

const makeBoard = (size: number): Board => {
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
  return board;
};

export const useBoard = ({ size = 4 }: useBoardParam) => {
  const emptyTileCoord = useRef({ row: size - 1, col: size - 1 });
  const [board, dispatch] = useReducer(boardReducer, makeBoard(size));

  useEffect(() => {
    dispatch({ type: 'INIT_BOARD', payload: { size } });
  }, [size]);
  useEffect(() => {
    console.log(board);
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (board[i][j] === 0) {
          emptyTileCoord.current = { row: i, col: j };
          console.log({ row: i, col: j });
        }
      }
    }
  });

  const onTilePress = (row: number, col: number) => {
    const { current: zeroRowCol } = emptyTileCoord;
    const isBesideEmpty =
      (Math.abs(row - zeroRowCol.row) === 1 && col - zeroRowCol.col === 0) ||
      (Math.abs(col - zeroRowCol.col) === 1 && row - zeroRowCol.row === 0);
    if (isBesideEmpty) {
      dispatch({
        type: 'SWAP',
        payload: {
          a: { row, col },
          b: zeroRowCol
        }
      });
    }
  };

  return { board, onTilePress };
};
