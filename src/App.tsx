import React, { useState } from 'react';
import { useBoard } from './useBoard';
import { Box, makeStyles } from '@material-ui/core';

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
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column'
  },
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  tile: {
    height: 60,
    width: 60,
    border: '1px solid black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const App: React.FC = () => {
  const styles = useStyles();
  const [size, setSize] = useState(4);

  const { board, onTilePress } = useBoard({ size });

  console.log(board);
  return (
    <div className={styles.wrapper}>
      <input
        type="number"
        value={size}
        onChange={e => setSize(parseInt(e.target.value))}
      />
      <div className={styles.board}>
        {board.map((row, i) => (
          <div className={styles.row} key={`row-${i}`}>
            {row.map((cell, j) => (
              <div
                className={styles.tile}
                key={`col-${j}`}
                onClick={() => onTilePress(i, j)}
              >
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
