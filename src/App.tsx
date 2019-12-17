import React, { useState, useEffect } from 'react';
import { useGame } from './useGame';
import { Button, makeStyles, IconButton, Typography } from '@material-ui/core';
import { Add as AddIcon, Remove as RemoveIcon } from '@material-ui/icons';
import { Helmet } from 'react-helmet';
import Tile from './Tile';
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
  }
});

const App: React.FC = () => {
  const styles = useStyles();
  const [size, setSize] = useState(4);

  const { onTilePress, moves, positions, startGame, won, timer } = useGame({
    size
  });

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Arrange Game</title>
      </Helmet>
      <div className={styles.wrapper}>
        <div className={styles.topbar}>
          <IconButton
            onClick={() => {
              if (size > 3) {
                setSize(size - 1);
              }
            }}
            disabled={size <= 3}
          >
            <RemoveIcon />
          </IconButton>
          <Typography component="span">{size}</Typography>
          <IconButton
            onClick={() => {
              if (size < 8) {
                setSize(size + 1);
              }
            }}
            disabled={size >= 8}
          >
            <AddIcon />
          </IconButton>
          <Button onClick={startGame}>Restart</Button>
          <Typography>
            Moves: {moves} | Time: {timer.toFixed(1)}s
          </Typography>
        </div>
        <div
          className={styles.board}
          style={{ flex: 0, flexBasis: size * 60, width: size * 60 }}
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
        {won && <div>You won</div>}
      </div>
    </>
  );
};

export default App;
