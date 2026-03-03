import { useCallback, useState, useRef } from "react";
import PropTypes from 'prop-types';
import deepFreeze from 'deep-freeze';
import { useDeepCompareEffectNoCheck }  from 'use-deep-compare-effect';
import { getQuoteMatchesInBookRef } from "uw-quote-helpers";
import * as helpers from './helpers';
import { areAllQuoteWordsFound } from "../../core/selectionsHelpers";

/**
 * Manages word-level selections within a text reference, providing methods for retrieving, updating, and verifying selection state.
 *
 * @function
 * @name useSelections
 * @param {Object} options - Configuration object for handling selections.
 * @param {Map<string, Array>} options.selections - A map of references to the selected words or objects within those references.
 * @param {Function} options.onSelections - A callback function invoked to update the selection state with a deep-frozen map of selections.
 * @param {number} options.occurrence - The current occurrence value for locating specific matches within a text reference.
 * @param {string} options.quote - The quoted text to be used for matching within the book reference.
 * @param {Function} options.onQuote - A callback function to handle derived quotes based on the current selection and book content.
 * @param {string} options.refString - A string identifying the specific reference in the text (e.g., chapter and verse).
 * @param {Object} options.originalBookObjects - A structured representation of the book content used for matching and referencing selections.
 * @param {Object} options.targetBookObjects - A structured representation of the book content used for matching and referencing selections.
 * @returns {Object} - An object containing the state and actions for managing selections.
 * @returns {Object} returns.state - The state object.
 * @returns {boolean} returns.state.allQuoteWordsFound - A flag indicating whether all words from the quote are found within the current selections.
 * @returns {Map<string, Array>} returns.state.selections - A map of references to the selected words or verse objects.
 * @returns {Object} returns.actions - The actions object.
 * @returns {Function} returns.actions.update - Updates the current selections with the provided map of verse objects.
 * @returns {Function} returns.actions.isSelected - Determines if a specific word within a reference is selected.
 * @returns {Function} returns.actions.areSelected - Determines if multiple words within a reference are selected.
 * @returns {Function} returns.actions.addSelection - Adds a single word to the selections for a given reference.
 * @returns {Function} returns.actions.addSelections - Adds multiple words to the selections for a given reference.
 * @returns {Function} returns.actions.removeSelection - Removes a single word from the selections for a given reference.
 * @returns {Function} returns.actions.removeSelections - Removes multiple words from the selections for a given reference.
 */
function useSelections({
 originalBookObjects,
 highlightOnlyCompleteQuotes = false,
 occurrence: currentOccurrenceValue,
 onSelections,
 onQuote,
 quote,
 refString,
 selections,
 targetVersesForRef,
}) {
  const allQuoteWordsFound = useRef(false); // used to flag when all the selections are found in current verse
  const _targetVersesForRef = useRef(null); // used to save the latest target verses for reference
  const _currentSelections = useRef(null); // used to save the latest selections for reference

  useDeepCompareEffectNoCheck(() => {
    try {
      const _selections = quote && refString && originalBookObjects ? getQuoteMatchesInBookRef({
        quote,
        ref: refString,
        bookObject: originalBookObjects,
        occurrence: currentOccurrenceValue,
        isOrigLang: true
      }) : [];
      update(_selections);
      _currentSelections.current = _selections;
      _targetVersesForRef.current = targetVersesForRef;
      const _allQuoteWordsFound = areAllQuoteWordsFound(quote, _selections, targetVersesForRef);

      if (allQuoteWordsFound.current !== _allQuoteWordsFound) {
        allQuoteWordsFound.current = _allQuoteWordsFound;
      }
  
    } catch (error) {
      console.error(`Selections broken:\n`, error);
    }
  }, [quote, currentOccurrenceValue, originalBookObjects, refString, targetVersesForRef]);

  useDeepCompareEffectNoCheck(() => {
    if (originalBookObjects && onQuote) {
      const _quote = helpers.quoteFromVerse({selections, bookObject: originalBookObjects});
      onQuote(_quote);
    }
  }, [selections, onQuote, originalBookObjects]);

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

  /**
   * Determines whether specific words are selected within a given reference and selection context.
   *
   * @function
   * @name areSelected
   * @param {Array<string>} words - The list of words to check for selection.
   * @param {Object} ref - The reference context associated with the selection operation.
   * @returns {boolean} - Returns true if the specified words are selected, otherwise false.
   */
  const areSelected = (words, ref) => {
    const wordsAreSelected = helpers.areSelected({words, selections, ref});
    if (wordsAreSelected && highlightOnlyCompleteQuotes && !allQuoteWordsFound.current) {
      return false;
    }
    return wordsAreSelected;
  };

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
  
  const handleChangedVerse = (reference, verseObjects ) => {
    // console.log('handleChangedVerse - Changed Verse', reference, verseObjects);
    const targetVersesForRef_ = _targetVersesForRef.current || [];
    const newTarget = [
      ...targetVersesForRef_,
    ];
    
    for (let i=0; i < newTarget.length; i++) {
      const targetVerse = newTarget[i];
      // noinspection EqualityComparisonWithCoercionJS
      if (targetVerse && reference.chapter == targetVerse.chapter && reference.verse == targetVerse.verse) {
        const newTargetVerse = {
          ...targetVerse,
          verseData: {verseObjects},
        };
        newTarget[i] = newTargetVerse;

        const selections_ = _currentSelections.current;
        
        _targetVersesForRef.current = newTarget;
        const _allQuoteWordsFound = areAllQuoteWordsFound(quote, selections_, newTarget);

        if (allQuoteWordsFound.current !== _allQuoteWordsFound) {
          allQuoteWordsFound.current = _allQuoteWordsFound;
        }

        update(selections_);
      }
    }
  };

  return {
    state: {
      allQuoteWordsFound: allQuoteWordsFound.current,
      selections
    },
    actions: {
      addSelection,
      addSelections,
      areSelected,
      handleChangedVerse,
      isSelected,
      removeSelection,
      removeSelections,
      update,
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
  /** all chapter-verses where quote may be found - note this is either original language bible or aligned bible */
  bookObject: PropTypes.object,
  /** string chapter-verse reference. i.e. 1:5-6 */
  refString: PropTypes.string,
  /** if quote occurs mulitple times, this is the occurrence of the one selected */
  occurrence: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** action taken when quote is provided */
  onQuote: PropTypes.func,
};

export default useSelections;
