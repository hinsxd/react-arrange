import { Reducer, useReducer, useEffect, useCallback } from 'react';
import produce from 'immer';

import { Board, Action, GameState, coord, useGameProps } from './types';
import { generatePositions, isBeside, getAvailM0ves } from './utils';

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
        draft.moves++;
        draft.started = true;

        const flatBoard = draft.board.flat();
        draft.won =
          flatBoard.findIndex((val, i) => val !== i + 1) ===
          flatBoard.length - 1;
      });
    case 'TICK':
      return produce(state, draft => {
        draft.timer = draft.timer + 0.1;
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

  for (let i = 0; i < size * size * size * size * size; i++) {
    const avail = getAvailM0ves(zeroPos, size);
    const chosen = avail[Math.floor(Math.random() * avail.length)];
    const temp = board[chosen.row][chosen.col];
    board[chosen.row][chosen.col] = board[zeroPos.row][zeroPos.col];
    board[zeroPos.row][zeroPos.col] = temp;
    zeroPos = chosen;
  }

  return { board, moves: 0, started: false, timer: 0, won: false };
};

export const useGame = ({ size = 4 }: useGameProps) => {
  const [{ board, moves, started, timer, won }, dispatch] = useReducer(
    gameReducer,
    size,
    initGameState
  );

  // const won =
  //   board.flat().findIndex((val, i) => val !== i + 1) === size * size - 1;

  const positions = generatePositions(board);
  const availMoves = getAvailM0ves(positions[0], size);

  const startGame = useCallback(() => {
    dispatch({ type: 'INIT_BOARD', payload: { size } });
  }, [size]);

  useEffect(() => {
    startGame();
  }, [startGame]);

  useEffect(() => {
    let interval: any = null;
    if (started && !won) {
      interval = setInterval(() => {
        dispatch({ type: 'TICK' });
      }, 100);
    } else if ((!started && timer !== 0) || won) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [started, timer, won]);
  const onTilePress = useCallback(
    (row: number, col: number) => {
      if (!won && isBeside(positions[0], { row, col })) {
        dispatch({
          type: 'SWAP',
          payload: {
            a: { row, col },
            b: positions[0]
          }
        });
      }
    },
    [positions, won]
  );

  return {
    board,
    moves,
    onTilePress,
    positions,
    availMoves,
    startGame,
    won,
    timer
  };
};
