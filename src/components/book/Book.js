import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';

import {
  BookHeaders,
  Chapters,
} from '..';

export const Book = ({
  book: {
    headers,
    chapters,
  },
  paragraphs,
  renderOffscreen,
  showUnsupported,
  direction,
  disableWordPopover,
}) => {
  const classes = useStyles();

  const bookHeaders = (
    <BookHeaders headers={headers} direction={direction} showUnsupported={showUnsupported} />
  );

  const _chapters = (
    <Chapters
      chapters={chapters}
      paragraphs={paragraphs}
      renderOffscreen={renderOffscreen}
      showUnsupported={showUnsupported}
      direction={direction}
      disableWordPopover={disableWordPopover}
    />
  );

  return (
    <div className={classes.book} dir={direction || 'auto'}>
      {bookHeaders}
      {_chapters}
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.shape({
    headers: PropTypes.array.isRequired,
    chapters: PropTypes.object.isRequired,
  }),
  /** render verses paragraphs, use explicit paragraphs */
  paragraphs: PropTypes.bool,
  /** bypass rendering only when visible */
  renderOffscreen: PropTypes.bool,
  /** render unsupported usfm markers */ 
  showUnsupported: PropTypes.bool,
  /** override text direction detection */
  direction: PropTypes.string,
  /** disable popovers for aligned and original language words */
  disableWordPopover: PropTypes.bool,
};

const useStyles = makeStyles(theme => ({
  book: {
  },
  bookName: {
  },
}));

export default Book;
