import React from 'react';
import PropTypes from 'prop-types';

export const WordObject = ({
  verseObject,
}) => {
  return (
    <span>
      {verseObject.text || verseObject.content}
    </span>
  );
};

WordObject.propTypes = {
  verseObject: PropTypes.shape({
    tag: PropTypes.string,
    type: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
};

export default WordObject;
