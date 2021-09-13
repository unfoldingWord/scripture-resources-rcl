import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
} from '@material-ui/core';

function OriginalWordObject ({
  message,
  verseObject,
  verseObject: {
    content,
    text,
    strong,
    lemma,
    morph,
  },
}) {
  const _text = text || content;
  const _lemma = lemma ? <><br/><em>lemma:</em> {lemma}</> : '';
  const _strong = strong ? <><br/><em>strong:</em> {strong}</> : '';
  const _morph = morph ? <><br/><em>morph:</em> {morph}</> : '';
  const _message = message ? <><br/><br/><em>{message}</em></> : '';

  return (
    <Typography>
      <strong>{_text}</strong>
      {_lemma}
      {_strong}
      {_morph}
      {_message}
    </Typography>
  );
};

OriginalWordObject.propTypes = {
  verseObject: PropTypes.shape({
    tag: PropTypes.string,
    type: PropTypes.string,
    content: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.object),
    strong: PropTypes.string,
    lemma: PropTypes.string,
    morph: PropTypes.string,
    occurrence: PropTypes.string,
    occurrences: PropTypes.string,
  }).isRequired,
  // optional text message to add
  message: PropTypes.string,
};

export default OriginalWordObject;
