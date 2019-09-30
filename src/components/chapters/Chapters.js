import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';

import { Chapter } from './Chapter';

export const Chapters = ({
  chapters,
  ...props
}) => {
  const classes = useStyles();
  let front, back;
  const _chapters = [];
  Object.keys(chapters).forEach((chapterKey, index) => {
    const chapter = chapters[chapterKey];
    const _chapter = (
      <Chapter key={index} chapterKey={chapterKey} chapter={chapter} {...props} />
    );
    if (chapterKey === 'front') front = _chapter;
    else if (chapterKey === 'back') back = _chapter;
    else _chapters.push(_chapter);
  });
  return (
    <div className={classes.chapters} dir='auto'>
      {front}
      {_chapters}
      {back}
    </div>
  );
};

Chapters.propTypes = {
  chapters: PropTypes.object.isRequired,
};

const useStyles = makeStyles(theme => ({
  chapters: {
  },
}));

export default Chapters;
