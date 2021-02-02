import React from 'react';
import PropTypes from 'prop-types';

import {
  MilestoneObject,
  TextObject,
  WordObject,
  AlignedWordsObject,
  SectionObject,
  FootnoteObject,
  UnsupportedObject,
} from '.';

function VerseObject({
  verseObject,
  originalWords = [],
  paragraphs,
  showUnsupported,
  disableWordPopover,
}) {
  const { type } = verseObject;
  let component;
  console.log('VerseObject', verseObject);
  console.log('type', type);

  switch (type) {
    case 'text':
      component = (
        <TextObject verseObject={verseObject} paragraphs={paragraphs} />
      );
      break;
    case 'quote':
      component = <TextObject verseObject={verseObject} />;
      break;
    case 'milestone':
      component = (
        <MilestoneObject
          verseObject={verseObject}
          originalWords={originalWords}
          disableWordPopover={disableWordPopover}
        />
      );
      break;
    case 'word':
      console.log('word', { verseObject });

      if (verseObject.strong) {
        console.log('NOT ELSE');

        component = (
          <AlignedWordsObject
            children={[verseObject]}
            originalWords={[verseObject]}
            disableWordPopover={disableWordPopover}
          />
        );
      } else {
        console.log('ELSE');
        component = (
          <WordObject
            verseObject={verseObject}
            disableWordPopover={disableWordPopover}
          />
        );
      }
      break;
    case 'section':
      component = <SectionObject verseObject={verseObject} />;
      break;
    case 'paragraph':
      component = <div />;
      break;
    case 'footnote':
      component = <FootnoteObject verseObject={verseObject} />;
      break;
    default:
      if (showUnsupported) {
        component = <UnsupportedObject verseObject={verseObject} />;
      }
      break;
  }

  return (
    <>
      {component}
      {verseObject.nextChar}
    </>
  );
}

VerseObject.propTypes = {
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
  originalWords: PropTypes.array,
  /** render verses paragraphs, use explicit paragraphs */
  paragraphs: PropTypes.bool,
  /** render unsupported usfm markers */
  showUnsupported: PropTypes.bool,
  /** disable popovers for aligned and original language words */
  disableWordPopover: PropTypes.bool,
};

export default VerseObject;
