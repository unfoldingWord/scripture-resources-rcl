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
  ...props
}) => {
  const classes = useStyles();

  const bookHeaders = <VerseObjects verseObjects={headers} />;
  const bookName = headers.filter(header => header.tag === 'h')[0].content;

  const _chapters = (
    <Chapters
      chapters={chapters}
      {...props}
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
};

const useStyles = makeStyles(theme => ({
  book: {
  },
  bookName: {
  },
}));

export default Book;
