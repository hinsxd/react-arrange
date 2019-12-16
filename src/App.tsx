import React, { useState, useEffect } from 'react';
import { useGame } from './useGame';
import { Button, makeStyles, IconButton, Typography } from '@material-ui/core';
import { Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons';

const useStyles = makeStyles({
  wrapper: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center'
  },
  topbar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  board: {
    flex: 0,
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

  const { onTilePress, positions, startGame } = useGame({ size });

  return (
    <div className={styles.wrapper}>
      <div className={styles.topbar}>
        <IconButton
          onClick={() => {
            if (size > 1) {
              setSize(size - 1);
            }
          }}
        >
          <RemoveIcon />
        </IconButton>
        <Typography component="span">{size}</Typography>
        <IconButton
          onClick={() => {
            setSize(size + 1);
          }}
        >
          <AddIcon />
        </IconButton>
        <Button onClick={startGame}>Restart</Button>
      </div>
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
      </div>
    </div>
  );
};

export default App;
