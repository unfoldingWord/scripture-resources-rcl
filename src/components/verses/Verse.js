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
  paragraphs,
  showUnsupported,
  disableWordPopover,
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
        <VerseObjects
          verseObjects={verseObjects}
          paragraphs={paragraphs}
          showUnsupported={showUnsupported}
          disableWordPopover={disableWordPopover}
        />
      </>
    );
    setVerse(_verse);
  }, [verseKey, verseObjects, paragraphs, showUnsupported, disableWordPopover]);

  const style = {};
  if (paragraphs) style.display = 'inline';

  return (
    <div className={classes.verse} style={style} dir="auto">
      {verse}
    </div>
  );
};

Verse.propTypes = {
  verseKey: PropTypes.string.isRequired,
  verseObjects: PropTypes.array.isRequired,
  /** render verses paragraphs, use explicit paragraphs */
  paragraphs: PropTypes.bool,
  /** bypass rendering only when visible */
  renderOffscreen: PropTypes.bool,
  /** render unsupported usfm markers */ 
  showUnsupported: PropTypes.bool,
  /** disable popovers for aligned and original language words */
  disableWordPopover: PropTypes.bool,
};

const useStyles = makeStyles(theme => ({
  verse: {
  },
}));

export default Verse;
