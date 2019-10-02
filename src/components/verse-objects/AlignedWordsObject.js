import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Popover,
} from '@material-ui/core';

import {
  WordObject,
  OriginalWordObject,
} from '.';

function AlignedWordsObject ({
  children,
  originalWords,
}) {
  const [anchorEl, setAnchorEl] = useState();
  const classes = useStyles();

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  
  const open = Boolean(anchorEl);
  return (
    <>
      <span
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        className={(open ? classes.open : classes.closed)}
      >
        {
          children.map((verseObject, index) =>
            <WordObject key={index} verseObject={verseObject} />
          )
        }
      </span>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
      {
        originalWords.map((verseObject, index) =>
          <OriginalWordObject key={index} verseObject={verseObject} />
        )
      }
      </Popover>
    </>
  );
}

AlignedWordsObject.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  originalWords: PropTypes.arrayOf(PropTypes.object),
};

const useStyles = makeStyles(theme => ({
  open: {
    backgroundColor: 'lightgoldenrodyellow',
  },
  closed: {
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

export default AlignedWordsObject;
