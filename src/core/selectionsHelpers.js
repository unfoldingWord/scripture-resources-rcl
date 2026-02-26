import {getWordObjects} from "./lexiconHelpers";
import {tokenizer} from "./selections/tokenizer";
import {normalizeString} from "./selections/selections";
import targetVerseObject from "../../__tests__/fixtures/highlighting/php/2-1";

const extraOptions = {
  includePunctuation: false,
  normalize: true,
  verbose: true,
};

/**
 * Checks if all words from the `quoteWords` array are found in the `selectedWords` array in the same order.
 *
 * @param {Object[]} quoteWords - An array of objects representing quote words, where each object contains a `token` property.
 * @param {string[]} selectedWords - An array of strings representing the selected words to be compared against.
 * @param {boolean} _allQuoteWordsFound - A boolean flag initially indicating whether all quote words are considered found.
 * @return {boolean} - Returns true if all quote words are found in the selected words in order; otherwise, false.
 */
export function areAllQuoteWordsFoundInOriginal(quoteWords, selectedWords) {
  let selectedIndex = 0;
  let _allQuoteWordsFound = true;

  if ((quoteWords.length != selectedWords.length) || !selectedWords.length) {
    // NOTE: for debug only
    // console.log(`Word count different quoteWords.length=${quoteWords.length}: selectedWords.length=${selectedWords.length}`);
    _allQuoteWordsFound = false;
  } else {
    for (const word of quoteWords) {
      const selectedWord = selectedWords[selectedIndex];
      if (word.token !== selectedWord) {
        // NOTE: for debug only
        // console.log(`Word mismatch at index ${selectedIndex}: Expected '${word.token}', got '${selectedWord}'`);
        _allQuoteWordsFound = false;
      }

      if (!_allQuoteWordsFound) {
        break;
      }

      selectedIndex++;
    }
  }
  return _allQuoteWordsFound;
}

/**
 * Recursively searches for any target word object within the alignment structure.
 *
 * @param {Array} children - The array of objects representing the alignment structure.
 *                            Each object may contain a `type` property and/or a nested `children` array.
 * @return {boolean} Returns `true` if a word object with a `type` property of 'word' is found, otherwise returns `false`.
 */
export function findTargetWordInAlignment(children) {
  if (children && children.length) {
    for (let i = 0, l = children.length; i < l; i++) {
      const verseObject = children[i];
      if (verseObject.type === 'word') {
        return true;
      } else if (verseObject.children) {
        let found = findTargetWordInAlignment(verseObject.children);
        if (found) {
          return true;
        }
      }
    }
  }

  return false;
}

/**
 * Finds the alignment for a given original word within a set of verse objects.
 *
 * @param {Array} verseObjects - The array of verse objects to search through. Each object may contain tags, content, and nested children.
 * @param {Object} selectedWord - The original word to match in the verse objects. Must have a `token` property.
 * @param {Object|null} stats - Optional statistics object containing an `occurrence` property. Tracks the current word occurrence count.
 * @return {boolean|*} Returns the alignment found within the verse objects, or `false` if no alignment is found.
 */
export function findAlignmentForOriginal(verseObjects, selectedWord) {
  if (! verseObjects || !verseObjects.length) {
    return false;
  }

  for (let i = 0, l = verseObjects.length; i < l; i++) {
    const verseObject = verseObjects[i];

    try {
      if (verseObject.tag === 'zaln') {
        const tokenMatch = (selectedWord.text == verseObject.content);
        if (tokenMatch) {
          if (selectedWord.occurrence == verseObject.occurrence) {
            const foundAlignment = findTargetWordInAlignment(verseObject.children);
            return foundAlignment;
          }
        }
      }
      
      if (verseObject.children) {
        const foundMatch = findAlignmentForOriginal(verseObject.children, selectedWord);
        if (foundMatch) {
          return true;
        }
      }
      
    } catch (e) {
      console.warn(`findAlignmentForOriginal - error in content: ${verseObjects}`, e);
    }
  }

  return false;
}

/**
 * Checks if all selected words are aligned in the target verse objects structure.
 *
 * @param {Array} selectedWords - An array of selected words that need to be checked for alignment in the target.
 * @param {Array} targetVerseObjects - An array of objects representing the target verse structure,
 * containing verse data and alignment information.
 * @return {boolean} Returns true if all selected words are aligned in the target verse objects; otherwise, false.
 */
export function areAllSelectedWordsAlignedInTarget(selectedWords, targetVerseObjects) {
  let _allQuoteWordsFound = true;
  
  for (const word of selectedWords) {
    const stats = {
      foundMatch: false,
      occurrence: 0
    };
    let quoteWordFound = false;
    for (const verseData of targetVerseObjects || []) {
      const verseObjects = verseData && verseData.verseData && verseData.verseData.verseObjects;
      const found = findAlignmentForOriginal(verseObjects, word);
      if (found) {
        quoteWordFound = true;
        break;
      }
    }

    if (!quoteWordFound) {
      _allQuoteWordsFound = false;
      break;
    }
  }
  
  return _allQuoteWordsFound;
}

/**
 * Converts a given collection of selections into a flat array of normalized string values.
 *
 * @param {Map} selections - A Map where keys are selection identifiers and values are arrays of objects.
 * Each object in the arrays should have a `text` property representing the selected text.
 * @return {Array<string>} An array of normalized and non-empty string values extracted from the selections.
 */
export function getSelectionsAsWordArray(selections) {
  if (selections) {
    const selectedWords = Array.from(selections.values())
      .flatMap(items => items.map(item => normalizeString(item.text)))
      .filter(Boolean); // removes undefined/null/empty strings if any
    return selectedWords;
  }
  return [];
}

/**
 * Transforms and normalizes a collection of selected items into an array of token objects.
 *
 * @param {Map} selections - A Map where each key corresponds to a group and each value is
 * an array of selected items. Each item in the array is expected to have a `text` property.
 * @return {Array} - Returns an array of normalized token objects
 */
export function getSelectionsAsTokenArray(selections) {
  if (selections) {
    const selectedWords = Array.from(selections.values())
      .flatMap(items => items.map(item => {
        const newItem = {
          ...item,
          text: normalizeString(item.text)
        };
        return newItem;
      }));
    return selectedWords;
  }
  return [];
}

/**
 * Processes a quote string and extracts an array of tokens representing words.
 *
 * @param {string} quote - The input string containing the quote to be tokenized.
 * @return {Array} An array of token objects, where each token represents a word from the input quote.
 */
export function getQuoteTokenArray(quote) {
  const quoteTokens = tokenizer(quote || '', extraOptions);
  const quoteWords = quoteTokens.filter(token => (token.type === 'word'));
  return quoteWords;
}

/**
 * Determines whether all words in the given quote are found within the selected words.
 *
 * @param {string} quote - The quote that contains words to check against the selected words.
 * @param {Map<any, Array<{ text: string }>>} selections - A map where values are arrays of objects containing a `text` property representing selected words.
 * @return {boolean} - Returns `true` if all words in the quote are found within the selected words, otherwise returns `false`.
 */
export function areAllQuoteWordsFound(quote, selections, targetVerseObjects) {
  let _allQuoteWordsFound = true;

  if (quote) {
    const selectedWordsAsArray = getSelectionsAsWordArray(selections);
    const quoteWords = getQuoteTokenArray(quote);
    _allQuoteWordsFound = areAllQuoteWordsFoundInOriginal(quoteWords, selectedWordsAsArray, _allQuoteWordsFound);
  }
  
  if (quote && _allQuoteWordsFound) { // now double check that target words are aligned
    const selectionsAsArray = getSelectionsAsTokenArray(selections);
    _allQuoteWordsFound = areAllSelectedWordsAlignedInTarget(selectionsAsArray, targetVerseObjects);
  }
  
  return _allQuoteWordsFound;
}
