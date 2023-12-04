import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Popover } from '@material-ui/core';

// TRICKY - importing from direct path gets around exported css styles which crashes nextjs
import { lookupStrongsNumbers } from 'tc-ui-toolkit/lib/ScripturePane/helpers/lexiconHelpers';
import { default as WordLexiconDetails } from 'tc-ui-toolkit/lib/WordLexiconDetails/index';

import { SelectionsContext } from '../selections/Selections.context';
import { WordObject, OriginalWordObject } from '.';

const intervalBeforePopup = 500;  // delay 1/2 sec. before showing popup

function AlignedWordsObject({
  children,
  verseKey,
  originalWords,
  disableWordPopover,
  getLexiconData,
  translate,
}) {
  const classes = useStyles();
  const [popupPosition, setPopupPosition] = useState(null);
  const [readyToShow, setReadyToShow] = useState(false);

  const handleOpen = (event) => {
    setReadyToShow(false); // make sure cleared

    if (!event.buttons) { // only show popup if buttons not depressed (i.e. not selection text)
      setPopupPosition(event.currentTarget); // save the anchor element for positioning

      delay(intervalBeforePopup).then(() => {
        setReadyToShow(true);
      });
    } else { // if dragging make position for popup is cleared
      setPopupPosition(null);
    }
  };

  const handleClose = () => {
    setPopupPosition(null);
    setReadyToShow(false);
  };

  let selected;
  const _selectionsContext = useContext(SelectionsContext);

  if (_selectionsContext) {
    const {
      state: selections,
      actions: { areSelected, addSelections, removeSelections },
    } = _selectionsContext;
    selected = areSelected(originalWords, verseKey);
  }

  const words = children.map((verseObject, index) => (
    <span
      data-test="aligned-word-object"
      data-testselected={selected}
      key={index}
      className={selected ? classes.selected : undefined}
    >
      <WordObject
        verseObject={verseObject}
        disableWordPopover={disableWordPopover}
        getLexiconData={getLexiconData}
      />
    </span>
  ));

  let component = words;

  function getOriginalWordObject(index, wordObject) {
    let message = null;
    const strong = wordObject?.strong || wordObject?.strongs;

    if (getLexiconData) {
      if (strong) {
        const lexiconData = lookupStrongsNumbers(strong, getLexiconData);

        if (lexiconData) {
          const isHebrew = lexiconData['uhl'];
          return (
            <WordLexiconDetails
              key={index}
              lexiconData={lexiconData}
              wordObject={wordObject}
              translate={translate || translate_}
              isHebrew={!!isHebrew}
            />
          );
        }
      }
      message = `Lexicon Data not found !`;
    }

    // show basic word data if getLexiconData not defined
    return <OriginalWordObject key={index} verseObject={wordObject} message={message}/>;
  }

  if (!disableWordPopover) {
    const openPopup = readyToShow && Boolean(popupPosition);
    const id = openPopup ? 'popover' : undefined;
    const _originalWords = originalWords.map((verseObject, index) => getOriginalWordObject(index, verseObject));

    component = (
      <>
        <span
          aria-describedby={id}
          aria-haspopup="true"
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          className={openPopup ? classes.open : classes.closed}
        >
          {words}
        </span>
        <Popover
          id={id}
          open={openPopup}
          anchorEl={popupPosition}
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
  /** optional function to lookup lexicon data */
  getLexiconData: PropTypes.func,
  /** optional function for localization */
  translate: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  open: { backgroundColor: 'lightgoldenrodyellow' },
  closed: {},
  popover: { pointerEvents: 'none' },
  paper: { padding: theme.spacing(1) },
  selected: { backgroundColor: 'yellow' },
}));

// fallback translate function
function translate_(key) {
  return key;
}

function delay(ms) {
  return new Promise((resolve) =>
      setTimeout(resolve, ms),
  )
}

export default AlignedWordsObject;
