import React from 'react';
import PropTypes from 'prop-types';

import {VerseObject} from '.';

export const VerseObjects = ({
  verseObjects,
  paragraphs,
  showUnsupported,
}) => {

  const verseObjectComponents = verseObjects.map((verseObject, index) =>
    <VerseObject
      key={index}
      verseObject={verseObject}
      paragraphs={paragraphs}
      showUnsupported={showUnsupported}
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
  /** render verses paragraphs, use explicit paragraphs */
  paragraphs: PropTypes.bool,
  /** render unsupported usfm markers */ 
  showUnsupported: PropTypes.bool,
};

export default VerseObjects;
