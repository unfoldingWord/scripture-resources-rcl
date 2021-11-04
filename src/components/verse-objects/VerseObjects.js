import React from 'react';
import PropTypes from 'prop-types';

import { VerseObject } from '.';

export const VerseObjects = ({
  verseObjects,
  paragraphs,
  showUnsupported,
  disableWordPopover,
}) => {
  const verseObjectComponents = verseObjects.map((verseObject, index) =>
    <VerseObject
      key={index}
      verseObject={verseObject}
      paragraphs={paragraphs}
      showUnsupported={showUnsupported}
      disableWordPopover={disableWordPopover}
    />,
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
  /** disable popovers for aligned and original language words */
  disableWordPopover: PropTypes.bool,
};

export default VerseObjects;
