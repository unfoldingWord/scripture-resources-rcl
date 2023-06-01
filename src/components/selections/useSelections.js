import React, { useCallback } from "react";
import PropTypes from 'prop-types';
import deepFreeze from 'deep-freeze';
import { useDeepCompareEffectNoCheck }  from 'use-deep-compare-effect';
import { getQuoteMatchesInBookRef } from "uw-quote-helpers";
import * as helpers from './helpers';

function useSelections({
  selections,
  onSelections,
  occurrence: currentOccurrenceValue ,
  quote,
  onQuote,
  refString,
  bookObject,
}) {

  useDeepCompareEffectNoCheck(() => {
    const _selections = bookObject ? getQuoteMatchesInBookRef({
      quote,
      ref: refString,
      bookObject,
      occurrence: currentOccurrenceValue,
      isOrigLang: true
    }) : [];
    console.log({ _selections });
    update(_selections)
  }, [quote, currentOccurrenceValue, bookObject]);

  useDeepCompareEffectNoCheck(() => {
    if (bookObject && onQuote) {
      console.log({ selections });
      const _quote = helpers.quoteFromVerse({selections, bookObject});
      console.log({ _quote });
      onQuote(_quote);
    }
  }, [selections, onQuote, bookObject]);

  const update = useCallback((_selections) => {
    // the "parsify" function is expecting an array of stringified objects
    // it will return an array of the parsed objects
    // const parsify = (array) => array.map(string => JSON.parse(string));
    // However, at present, some of the array elements are objecs, 
    // not strings. This causes the parse to fail. At present, it is
    // unknown where the mixed bag of an array is created.
    // So let's deal with it here.
    let _selectionsParsified = new Map();
    _selections.forEach((verseObjectsArray, ref) => {
      const _verseObjectsArray = []
      for (let i=0; i < verseObjectsArray.length; i++) {
        try {
          let x = JSON.parse(verseObjectsArray[i]);
          _verseObjectsArray.push(x);
        } catch (error) {
          _verseObjectsArray.push(verseObjectsArray[i]);
        }
      }
      _selectionsParsified.set(ref, _verseObjectsArray)
    })
    //const __selections = _selections && deepFreeze(parsify(_selections));
    const __selections = _selections && deepFreeze(_selectionsParsified);
    onSelections(__selections);
  }, [onSelections]);

  const isSelected = (word, ref) => helpers.isSelected({word, selections, ref});

  const areSelected = (words, ref) => helpers.areSelected({words, selections, ref});

  const addSelection = (word, ref) => {
    let _selections = helpers.addSelection({word, selections, ref});
    update(_selections);
  };

  const addSelections = (words, ref) => {
    let _selections = helpers.addSelections({words, selections, ref});
    update(_selections);
  };

  const removeSelection = (word, ref) => {
    const _selections = helpers.removeSelection({word, selections, ref});
    update(_selections);
  };

  const removeSelections = (words, ref) => {
    let _selections = helpers.removeSelections({words, selections, ref});
    update(_selections);
  };

  return {
    state: selections,
    actions: {
      update,
      isSelected,
      areSelected,
      addSelection,
      addSelections,
      removeSelection,
      removeSelections,
    },
  };
};

useSelections.propTypes = {
  /** words in a selection */
  selections: PropTypes.instanceOf(Map),
  /** action taken after a selection is made */
  onSelections: PropTypes.func.isRequired,
  /** the quote to be selected */
  quote: PropTypes.string.isRequired,
  /** all chapter-verses where quote may be found */
  bookObject: PropTypes.object,
  /** string chapter-verse reference. i.e. 1:5-6 */
  refString: PropTypes.string,
  /** if quote occurs mulitple times, this is the occurence of the one selected */
  occurrence: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** action taken when quote is provided */
  onQuote: PropTypes.func,
};

export default useSelections;
