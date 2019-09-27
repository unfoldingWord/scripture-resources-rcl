import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import {
  Box,
  Typography,
} from '@material-ui/core';

import { Verses } from '../verses/Verses';

export const Chapter = ({
  chapterKey,
  chapter,
  inline,
}) => {
  const classes = useStyles();
  const [front, setFront] = useState();
  const [back, setBack] = useState();

  const verses = (
    <Verses
      verses={chapter}
      inline={inline}
      setFront={setFront}
      setBack={setBack}
    />
  );

  return (
    <div className={classes.chapter} dir='auto'>
      <Box className={classes.front} children={front} />
      <Typography variant='h3'>{chapterKey}</Typography>
      {verses}
      <Box className={classes.back} children={back} />
    </div>
  );
};

Chapter.propTypes = {
  chapterKey: PropTypes.string.isRequired,
  chapter: PropTypes.object.isRequired,
  inline: PropTypes.bool,
};

const useStyles = makeStyles(theme => ({
  chapter: {
  },
  front: {
  },
  back: {
  },
}));

export default Chapter;
