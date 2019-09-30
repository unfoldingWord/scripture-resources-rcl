import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {
  Typography,
} from '@material-ui/core';
import {
  Skeleton,
} from '@material-ui/lab';
import VisibilitySensor from 'react-visibility-sensor';

import { Verses } from '../verses/Verses';

export const Chapter = ({
  chapterKey,
  chapter,
  paragraphs,
  renderOffscreen,
  showUnsupported,
}) => {
  const classes = useStyles();
  const height = Object.keys(chapter).length * 20;
  const skeleton = <Skeleton height={height} width='100%' className={classes.skeleton} />;
  const [verses, setVerses] = useState(skeleton);
  const [viewed, setViewed] = useState(renderOffscreen);

  const onVisibility = (isVisible) => {
    if (isVisible) setViewed(true);
  }

  useEffect(() => {
    if (viewed) {
      const _verses = (
        <Verses
          verses={chapter}
          paragraphs={paragraphs}
          showUnsupported={showUnsupported}
        />
      );
      setVerses(_verses);
    }
  }, [chapterKey, chapter, paragraphs, viewed, showUnsupported]);

  return (
    <div className={classes.chapter} dir='auto'>
      <Typography variant='h3'>{chapterKey}</Typography>
      <VisibilitySensor onChange={onVisibility} partialVisibility={true}>
        <>
          {verses}
        </>
      </VisibilitySensor>
    </div>
  );
};

Chapter.propTypes = {
  chapterKey: PropTypes.string.isRequired,
  chapter: PropTypes.object.isRequired,
  /** render verses paragraphs, use explicit paragraphs */
  paragraphs: PropTypes.bool,
  /** bypass rendering only when visible */
  renderOffscreen: PropTypes.bool,
  /** render unsupported usfm markers */ 
  showUnsupported: PropTypes.bool,
};

const useStyles = makeStyles(theme => ({
  chapter: {
  },
}));

export default Chapter;
