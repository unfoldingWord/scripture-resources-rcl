import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Popover } from '@material-ui/core';

import { SelectionsContext } from '../selections/Selections.context';

import { WordObject, OriginalWordObject } from '.';

function AlignedWordsObject({ children, originalWords, disableWordPopover }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    console.log("AlignedWordsObject() handleOpen()")
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    console.log("AlignedWordsObject() handleClose()")
    setAnchorEl(null);
  };

  let onClick = () => {};

  let selected;

  const _selectionsContext = useContext(SelectionsContext);

  if (_selectionsContext) {
    const {
      state: selections,
      actions: { areSelected, addSelections, removeSelections },
    } = _selectionsContext;
    selected = areSelected(originalWords);
    onClick = () => {
      /*
      if (selected) {
        console.log("AlignedWordsObject(), onClick(), removeSelections() originalWords, selected:", originalWords, selected);
        removeSelections(originalWords);
      } else {
        console.log("AlignedWordsObject(), onClick(), addSelections() originalWords, selected:", originalWords, selected);
        addSelections(originalWords);
      }
      */
    };
  }

  const words = children.map((verseObject, index) => (
    <span
      data-test="aligned-word-object"
      data-testselected={selected}
      onClick={onClick}
      key={index}
      className={selected ? classes.selected : undefined}
    >
      <WordObject
        verseObject={verseObject}
        disableWordPopover={disableWordPopover}
      />
    </span>
  ));

  let component = words;

  if (!disableWordPopover) {
    const open = Boolean(anchorEl);
    const id = open ? 'popover' : undefined;
    const _originalWords = originalWords.map((verseObject, index) => (
      <OriginalWordObject key={index} verseObject={verseObject} />
    ));

    component = (
      <>
        <span
          aria-describedby={id}
          aria-haspopup="true"
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          className={open ? classes.open : classes.closed}
        >
          {words}
        </span>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          className={classes.popover}
          classes={{ paper: classes.paper }}
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
          <>{_originalWords}</>
        </Popover>
      </>
    );
  }

  return <>{component}</>;
}

AlignedWordsObject.propTypes = {
  children: PropTypes.arrayOf(PropTypes.object).isRequired,
  originalWords: PropTypes.arrayOf(PropTypes.object),
  /** disable popovers for aligned and original language words */
  disableWordPopover: PropTypes.bool,
};

const useStyles = makeStyles((theme) => ({
  open: { backgroundColor: 'lightgoldenrodyellow' },
  closed: {},
  popover: { pointerEvents: 'none' },
  paper: { padding: theme.spacing(1) },
  selected: { backgroundColor: 'yellow' },
}));

export default AlignedWordsObject;
