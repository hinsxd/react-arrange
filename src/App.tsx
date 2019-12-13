import React, { useState, useEffect } from 'react';
import { useBoard } from './useBoard';
import { Box, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles({
  wrapper: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  board: {
    // width: '100%',
    // height: '100%',
    // marginLeft: 'auto',
    // marginRight: 'auto',
    position: 'relative'
  },
  tile: {
    height: 60,
    width: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#Fff',
    backgroundColor: '#963',
    transition: 'all 0.15s',
    borderTop: '2px solid #a96',
    borderLeft: '2px solid #a96',
    borderRight: '2px solid #630',
    borderBottom: '2px solid #630'
  }
});

const Tile: React.FC<{
  value: number;
  row: number;
  col: number;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}> = ({ value, row, col, onClick }) => {
  const styles = useStyles();
  return value !== 0 ? (
    <div
      className={styles.tile}
      onClick={onClick}
      style={{
        position: 'absolute',
        top: 60 * row,
        left: 60 * col
      }}
    >
      {value}
    </div>
  ) : null;
};

const App: React.FC = () => {
  const styles = useStyles();
  const [size, setSize] = useState(4);

  const { board, onTilePress } = useBoard({ size });

  const [positions, setPositions] = useState<{ row: number; col: number }[]>(
    []
  );

  useEffect(() => {
    let newPos = Array(size * size);
    board.forEach((rowTiles, row) =>
      rowTiles.forEach((value, col) => {
        newPos[value] = { row, col };
      })
    );
    setPositions(newPos);
  }, [board, size]);
  console.log(positions);
  console.log(board);
  return (
    <div className={styles.wrapper}>
      <input
        type="number"
        value={size}
        onChange={e => setSize(parseInt(e.target.value))}
      />
      <div
        className={styles.board}
        style={{ width: size * 60, height: size * 60 }}
      >
        {positions.map(({ row, col }, value) => (
          <Tile
            value={value}
            row={row}
            col={col}
            key={`tile-${value}`}
            onClick={() => onTilePress(row, col)}
          ></Tile>
        ))}
        {/* {board.map((rowTiles, row) =>
          rowTiles.map((cell, col) => (
            <Tile
              value={cell}
              row={row}
              col={col}
              key={`tile-${cell}`}
              onClick={() => onTilePress(row, col)}
            ></Tile>
          ))
        )} */}
      </div>
    </div>
  );
};

export default App;
