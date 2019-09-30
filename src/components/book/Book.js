import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {
  Typography,
} from '@material-ui/core';

import {
  Chapters,
  VerseObjects,
} from '..';

export const Book = ({
  headers,
  chapters,
  paragraphs,
  renderOffscreen,
  showUnsupported,
}) => {
  const classes = useStyles();

  const bookHeaders = <VerseObjects verseObjects={headers} showUnsupported={showUnsupported} />;
  const bookName = headers.filter(header => header.tag === 'h')[0].content;

  const _chapters = (
    <Chapters
      chapters={chapters}
      paragraphs={paragraphs}
      renderOffscreen={renderOffscreen}
      showUnsupported={showUnsupported}
    />
  );

  return (
    <div className={classes.book} dir='auto'>
      <Typography variant='h2' className={classes.bookName}>{bookName}</Typography>
      {bookHeaders}
      {_chapters}
    </div>
  );
};

Book.propTypes = {
  headers: PropTypes.array.isRequired,
  chapters: PropTypes.object.isRequired,
  /** render verses paragraphs, use explicit paragraphs */
  paragraphs: PropTypes.bool,
  /** bypass rendering only when visible */
  renderOffscreen: PropTypes.bool,
  /** render unsupported usfm markers */ 
  showUnsupported: PropTypes.bool,
};

const useStyles = makeStyles(theme => ({
  book: {
  },
  bookName: {
  },
}));

export default Book;
