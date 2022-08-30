import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
} from '@material-ui/core';

function OriginalWordObject ({
  verseObject,
  verseObject: {
    content,
    text,
    strong,
    lemma,
    morph,
  }
}) {

  const _text = text || content;
  const _lemma = lemma ? <><br/><em>lemma:</em> {lemma}</> : '';
  const _strong = strong ? <><br/><em>strong:</em> {strong}</> : '';
  const _morph = morph ? <><br/><em>morph:</em> {morph}</> : '';
  return (
    <Typography>
      <strong>{_text}</strong>
      {_lemma}
      {_strong}
      {_morph}
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
    occurrence: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    occurrences: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }).isRequired,
};

export default OriginalWordObject;
