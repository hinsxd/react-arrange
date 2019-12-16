export type Board = number[][];

export type useGameProps = { size?: number };

export type coord = { row: number; col: number };

export type Action =
  | { type: 'INIT_BOARD'; payload: { size: number } }
  | { type: 'SWAP'; payload: { a: coord; b: coord } }
  | { type: 'TICK' };

export type GameState = {
  board: Board;
  moves: number;
  started: boolean;
  timer: number;
  won: boolean;
};
