import React, { useCallback } from "react";
import PropTypes from 'prop-types';
import deepFreeze from 'deep-freeze';
import useEffect  from 'use-deep-compare-effect';

import * as helpers from './helpers';

function useSelections({
  selections,
  onSelections,
  occurrence: currentOccurrenceValue ,
  quote,
  onQuote,
  hasSingleVerse,
  verseObjectsMap,
}) {

  // const verseObjects = (verseObjectsMap && verseObjectsMap.length > 1) ? verseObjectsMap[1] : (verseObjectsMap && verseObjectsMap.length > 0) ? verseObjectsMap[0] : []

  useEffect(() => {
    const _selections =  helpers.selectionsFromQuote({
        quote,
        verseObjectsMap,
        occurrence: currentOccurrenceValue,
      })
    update(_selections)
  }, [quote, currentOccurrenceValue, verseObjectsMap]);

  useEffect(() => {
    if (verseObjectsMap && onQuote) {
      const _quote = helpers.quoteFromVerse({selections, verseObjectsMap});
      onQuote(_quote);
    }
  }, [selections, onQuote, verseObjectsMap]);

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
  selections: PropTypes.array,
  /** action taken after a selection is made */
  onSelections: PropTypes.func.isRequired,
  /** the quote to be selected */
  quote: PropTypes.string.isRequired,
  /** indicate single verse in verseObjectsMap (or else multiple verses) **/
  hasSingleVerse: PropTypes.bool,
  /** all verses where quote may be found */
  verseObjectsMap: PropTypes.array,
  /** if quote occurs mulitple times, this is the occurence of the one selected */
  occurrence: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** action taken when quote is provided */
  onQuote: PropTypes.func,
};

export default useSelections;
