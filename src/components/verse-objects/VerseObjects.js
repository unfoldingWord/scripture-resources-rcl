import React from 'react';
import PropTypes from 'prop-types';

import {VerseObject} from '.';

export const VerseObjects = ({
  verseObjects,
  inline,
}) => {

  const verseObjectComponents = verseObjects.map((verseObject, index) =>
    <VerseObject
      key={index}
      verseObject={verseObject}
      inline={inline}
    />
  );

  return (
    <>
      {verseObjectComponents}
    </>
  );
};

VerseObjects.propTypes = {
  verseObjects: PropTypes.array.isRequired,
  inline: PropTypes.bool,
};

export default VerseObjects;
