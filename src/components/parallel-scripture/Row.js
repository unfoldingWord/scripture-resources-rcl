import React, {useState, useEffect, useContext} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {Skeleton} from '@material-ui/lab';
import {
  TableCell,
  TableRow,
} from '@material-ui/core';
import {Waypoint} from 'react-waypoint';

import {Verse} from '..';

//** DEBUG REMOVE LATER */
import SelectionsContext from '../selections/Selections.context';



function Row ({
  columns,
  referenceId,
  verses,
  renderOffscreen,
}) {


  //** DEBUG REMOVE LATER */
const _sc = useContext(SelectionsContext);
console.log("Row() _sc=",_sc)

  const classes = useStyles();

  const onVisibility = (isVisible) => {
    if (isVisible) {
      console.log('waypoint hit')
      setViewed(true);
    }
  };

  const skeleton = (
    <TableCell colSpan={columns.length} className={classes.cell}>
      <Waypoint onEnter={onVisibility}>
        <Skeleton height={110} width='100%' />
      </Waypoint>
    </TableCell>
  );

  const [cells, setCells] = useState(skeleton);
  const [viewed, setViewed] = useState(renderOffscreen);

  useEffect(() => {
    if (viewed) {
      const _cells = columns.filter(col => !col.hidden).map(column => {
        const verse = verses[column.id];
        const verseObjects = verse ? verse.verseObjects : [];
        return (
          <TableCell key={column.id} className={classes.cell} dir='auto'>
            <Verse
              verseObjects={verseObjects}
              verseKey={referenceId}
              direction='auto'
              renderOffscreen
              disableWordPopover
            />
          </TableCell>
        );
      });
      setCells(_cells);
    }
  }, [classes, columns, verses, referenceId, viewed]);

  return (
    <TableRow
      className={classes.row}
      key={referenceId}
      id={referenceId}
      data-test={'verse-' + referenceId.replace(':', '-')}
      tabIndex={-1}
      role="checkbox"
      hover
    >
      {cells}
    </TableRow>
      
  );
}

Row.propTypes = {
    /** bypass rendering only when visible */
    renderOffscreen: PropTypes.bool,
};

const useStyles = makeStyles(theme => ({
  row: {
  },
  cell: {
    padding: theme.spacing(1),
    paddingRight: 0,
    verticalAlign: 'top',
    minWidth: '15rem',
    border: 'none',
    textAlign: 'auto',
  },
}));

export default Row