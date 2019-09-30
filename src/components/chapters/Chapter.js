import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {
  Typography,
} from '@material-ui/core';

import { Verses } from '../verses/Verses';

export const Chapter = ({
  chapterKey,
  chapter,
  ...props
}) => {
  const classes = useStyles();

  const verses = (
    <Verses
      {...props}
      verses={chapter}
    />
  );

  return (
    <div className={classes.chapter} dir='auto'>
      <Typography variant='h3'>{chapterKey}</Typography>
      {verses}
    </div>
  );
};

Chapter.propTypes = {
  chapterKey: PropTypes.string.isRequired,
  chapter: PropTypes.object.isRequired,
};

const useStyles = makeStyles(theme => ({
  chapter: {
  },
}));

export default Chapter;
