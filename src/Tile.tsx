import React from 'react';
import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles({
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
export default Tile;
