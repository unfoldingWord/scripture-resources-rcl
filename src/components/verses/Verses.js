import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';

import { Verse } from '.';

export const Verses = ({
  verses,
  inline,
}) => {
  const classes = useStyles();
  let [_verses, setVerses] = useState();
  let [_front, setFront] = useState();
  let [_back, setBack] = useState();

  useEffect(() => {
    let __verses = [];
    Object.keys(verses).forEach((verseKey, index) => {
      const {verseObjects} = verses[verseKey];
      const verse = (
        <Verse key={index} verseKey={verseKey} verseObjects={verseObjects} inline={inline} />
      );
      if (verseKey === 'front') setFront(verse);
      else if (verseKey === 'back') setBack(verse);
      else __verses.push(verse);
    });

    setVerses(__verses);
  }, [verses, inline]);

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
};

const useStyles = makeStyles(theme => ({
  verses: {
  },
}));

export default Verses;
