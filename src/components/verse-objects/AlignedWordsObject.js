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
  const [anchorEl, setAnchorEl] = useState();
  const classes = useStyles();

  const handlePopoverOpen = event => { setAnchorEl(event.currentTarget); };

  const handlePopoverClose = () => { setAnchorEl(null); };

  const words = children.map((verseObject, index) =>
    <WordObject key={index} verseObject={verseObject} disableWordPopover={disableWordPopover} />
  );

  let component = words;

  if (!disableWordPopover) {
    const open = Boolean(anchorEl);
    const _originalWords = originalWords.map((verseObject, index) =>
      <OriginalWordObject key={index} verseObject={verseObject} />
    );
    component = (
      <>
        <span
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup="true"
          onMouseEnter={handlePopoverOpen}
          onMouseLeave={handlePopoverClose}
          className={(open ? classes.open : classes.closed)}
        >
          {words}
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
        {_originalWords}
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
