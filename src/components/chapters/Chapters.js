import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';

import { Chapter } from './Chapter';

export const Chapters = ({
  chapters,
  inline,
  renderOffscreen,
}) => {
  const classes = useStyles();
  const [_chapters, setChapters] = useState([]);

  useEffect(() => {
    const __chapters = Object.keys(chapters).map(chapterKey => {
      const chapter = chapters[chapterKey];
      const _chapter = (
        <Chapter
          key={chapterKey}
          chapterKey={chapterKey}
          chapter={chapter}
          inline={inline}
          renderOffscreen={renderOffscreen}
        />
      );
      return _chapter
    });
    setChapters(__chapters);
  }, [chapters, inline, renderOffscreen]);

  return (
    <div className={classes.chapters} dir='auto'>
      {_chapters}
    </div>
  );
};

Chapters.propTypes = {
  chapters: PropTypes.object.isRequired,
  inline: PropTypes.bool,
  /** set to true to bypass rendering only when visible */
  renderOffscreen: PropTypes.bool, 
};

const useStyles = makeStyles(theme => ({
  chapters: {
  },
}));

export default Chapters;
