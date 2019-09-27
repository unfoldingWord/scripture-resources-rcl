import React from 'react';
import PropTypes from 'prop-types';

import {
  MilestoneObject,
  TextObject,
  WordObject,
  AlignedWordsObject,
  SectionObject,
} from '.';

function VerseObject({
  verseObject,
  originalWords=[],
  inline,
}) {
  const {type} = verseObject;
  let component;

  switch (type) {
    case 'text':
      component = <TextObject verseObject={verseObject} inline={inline} />;
      break;
    case 'quote':
      component = <TextObject verseObject={verseObject} />;
      break;
    case 'milestone':
      component = (
        <MilestoneObject
          verseObject={verseObject}
          originalWords={originalWords}
        />
      );
      break;
    case 'word':
      if (verseObject.strong) {
        component = (
          <AlignedWordsObject
            children={[verseObject]}
            originalWords={[verseObject]}
          />
        );
      } else {
        component = <WordObject verseObject={verseObject} />;
      }
      break;
    case 'section':
      component = <SectionObject verseObject={verseObject} />;
      break;
    case 'paragraph':
      component = <div/>;
      break;
    case 'footnote':
      component = <sup>f</sup>;
      break;
    default:
      debugger
      component = (
        <span>
          <sup>*</sup>
          <TextObject verseObject={verseObject} />
          <sup>*</sup>
        </span>
      );
      break;
  };

  const verseObjectJSON = JSON.stringify(verseObject);

  return (
    <span data-verse-object={verseObjectJSON}>
      {component}
      {verseObject.nextChar}
    </span>
  );
};

VerseObject.propTypes = {
  verseObject: PropTypes.shape({
    tag: PropTypes.string,
    type: PropTypes.string,
    content: PropTypes.string,
    children: PropTypes.arrayOf(PropTypes.object),
    strong: PropTypes.string,
    lemma: PropTypes.string,
    morph: PropTypes.string,
    occurrence: PropTypes.number,
    occurrences: PropTypes.number,
  }).isRequired,
  originalWords: PropTypes.array,
  inline: PropTypes.bool,
};

export default VerseObject;
