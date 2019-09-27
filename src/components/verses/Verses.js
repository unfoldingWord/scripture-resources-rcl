import React, {cloneElement, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';

import { Verse } from './Verse';

export const Verses = ({
  verses,
  inline,
  setFront,
  setBack,
}) => {
  const classes = useStyles();
  let [_verses, setVerses] = useState();
  let [_front, _setFront] = useState();
  let [_back, _setBack] = useState();

  useEffect(() => {
    let front, back;
    let __verses = [];
    Object.keys(verses).forEach((verseKey, index) => {
      const {verseObjects} = verses[verseKey];
      const verse = <Verse key={index} verseKey={verseKey} verseObjects={verseObjects} inline={inline} />;
      if (verseKey === 'front') front = verse;
      else if (verseKey === 'back') back = verse;
      else __verses.push(verse);
    });

    setVerses(__verses);
  
    if (setFront) setFront(front);
    else _setFront(front);
  
    if (setBack) cloneElement(setBack);
    else _setBack(back);
  }, [verses, inline, setFront, setBack]);



  return (
    <div className={classes.verses} dir='auto'>
      {_front}
      {_verses}
      {_back}
    </div>
  );
};

Verses.propTypes = {
  verses: PropTypes.object.isRequired,
  inline: PropTypes.bool,
  setFront: PropTypes.func,
  setBack: PropTypes.func,
};

const useStyles = makeStyles(theme => ({
  verses: {
  },
}));

export default Verses;
