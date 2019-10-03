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
  disableWordPopover,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles();

  const handleOpen = event => { setAnchorEl(event.currentTarget); };

  const handleClose = () => { setAnchorEl(null); };

  const words = children.map((verseObject, index) =>
    <WordObject key={index} verseObject={verseObject} disableWordPopover={disableWordPopover} />
  );

  let component = words;

  if (!disableWordPopover) {
    const open = Boolean(anchorEl);
    const id = open ? 'popover' : undefined;
    const _originalWords = originalWords.map((verseObject, index) =>
      <OriginalWordObject key={index} verseObject={verseObject} />
    );
    component = (
      <>
        <span
          aria-describedby={id}
          aria-haspopup="true"
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          className={(open ? classes.open : classes.closed)}
        >
          {words}
        </span>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          className={classes.popover}
          classes={{
            paper: classes.paper,
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          disableRestoreFocus
        >
          <>
            {_originalWords}
          </>
        </Popover>
      </>
    );
  }

  return (
    <>
      {component}
    </>
  );
}

AlignedWordsObject.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  originalWords: PropTypes.arrayOf(PropTypes.object),
  /** disable popovers for aligned and original language words */
  disableWordPopover: PropTypes.bool,
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
