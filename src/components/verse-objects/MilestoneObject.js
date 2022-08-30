import React from 'react';
import PropTypes from 'prop-types';

import {
  VerseObject,
  AlignedWordsObject,
} from '.';

function MilestoneObject ({
  originalWords,
  verseObject: {
    tag,
    children,
    strong,
    lemma,
    morph,
    occurrence,
    occurrences,
    content,
  },
  disableWordPopover,
  getLexiconData,
  translate,
}) {
  let component;
  switch (tag) {
    case 'k':
      component = children.map((child, index) =>
        <VerseObject
          key={index}
          verseObject={child}
          disableWordPopover={disableWordPopover}
          getLexiconData={getLexiconData}
          translate={translate}
        />
      );
      break;
    case 'zaln':
      const originalWord = {
        strong,
        lemma,
        morph,
        occurrence,
        occurrences,
        content,
      };
      let _originalWords = originalWords || [];
      _originalWords.push(originalWord);
      if (children.length === 1 && children[0].type === 'milestone') {
        component = (
          <VerseObject
            verseObject={children[0]}
            originalWords={_originalWords}
            disableWordPopover={disableWordPopover}
            getLexiconData={getLexiconData}
            translate={translate}
          />
        );
      } else {
        component = (
          <AlignedWordsObject
            originalWords={_originalWords}
            children={children}
            disableWordPopover={disableWordPopover}
            getLexiconData={getLexiconData}
            translate={translate}
          />
        );
      }
      break;
    default:
      component = (<span/>);
      break;
  }

  return (
    <>
      {component}
    </>
  );
};

MilestoneObject.propTypes = {
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
  /** disable popovers for aligned and original language words */
  disableWordPopover: PropTypes.bool,
  /** optional function to lookup lexicon data */
  getLexiconData: PropTypes.func,
  /** optional function for localization */
  translate: PropTypes.func,
};

export default MilestoneObject;