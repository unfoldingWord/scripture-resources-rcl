import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

function TextObject ({
  verseObject
}) {
  const classes = useStyles();
  return (
    <span className={classes.root}>
      {verseObject.text}
    </span>
  );
};

TextObject.propTypes = {
  verseObject: PropTypes.shape({
    tag: PropTypes.string,
    type: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
};


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

export default TextObject;
