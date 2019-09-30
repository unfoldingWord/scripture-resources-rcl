import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {
  Skeleton,
} from '@material-ui/lab';

import {VerseObjects} from '../verse-objects';

export const Verse = ({
  verseKey,
  verseObjects,
  inline,
}) => {
  const classes = useStyles();
  const width = `${((Math.random() +1)/2 * 100).toFixed(0)}%`;
  const skeleton = <Skeleton height={6} width={width} />;
  const [verse, setVerse] = useState(skeleton);

  useEffect(() => {
    let verseNumber;
    if (!['front','back'].includes(verseKey)) {
      verseNumber = <sup>{verseKey} </sup>;
    }
    const _verse = (
      <>
        {verseNumber}
        <VerseObjects verseObjects={verseObjects} inline={inline} />
      </>
    );
    setVerse(_verse);
  }, [verseKey, verseObjects, inline]);

  return (
    <span className={classes.verse} dir='auto'>
      {verse}
    </span>
  );
};

Verse.propTypes = {
  verseKey: PropTypes.string.isRequired,
  verseObjects: PropTypes.array.isRequired,
  inline: PropTypes.bool,
};

const useStyles = makeStyles(theme => ({
  verse: {
  },
}));

export default Verse;
