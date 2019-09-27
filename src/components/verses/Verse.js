import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';

import { VerseObjects } from '../verse-objects';

export const Verse = ({
  verseKey,
  verseObjects,
  inline,
}) => {
  const classes = useStyles();

  let verseNumber;
  if (!['front','back'].includes(verseKey)) {
    verseNumber = <sup>{verseKey} </sup>;
  }

  return (
    <span className={classes.verse} dir='auto'>
      {verseNumber}
      <VerseObjects verseObjects={verseObjects} inline={inline} />
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
    // margin: 0,
  },
}));

export default Verse;
