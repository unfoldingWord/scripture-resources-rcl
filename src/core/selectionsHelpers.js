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
    // TODO: for debug only
    console.log(`Word count different quoteWords.length=${quoteWords.length}: selectedWords.length=${selectedWords.length}`);
    _allQuoteWordsFound = false;
  } else {
    for (const word of quoteWords) {
      if (word.token !== selectedWords[selectedIndex]) {
        // TODO: for debug only
        console.log(`Word mismatch at index ${selectedIndex}: Expected '${word.token}', got '${selectedWords[selectedIndex]}'`);
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

export function findAlignmentForOriginal(verseObjects, originalWord, stats = null) {
  if (! verseObjects || !verseObjects.length) {
    return false;
  }

  for (let i = 0, l = verseObjects.length; i < l; i++) {
    const verseObject = verseObjects[i];

    try {
      if (verseObject.tag === 'zaln') {
        const tokenMatch = (originalWord.token == verseObject.content);
        if (tokenMatch) {
          if (++stats.occurrence == verseObject.occurrence) {
            const foundAlignment = findTargetWordInAlignment(verseObject.children);
            return foundAlignment;
          }
        }
      }
      
      if (verseObject.children) {
        const foundMatch = findAlignmentForOriginal(verseObject.children, stats);
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

export function areAllQuoteWordsFoundInTarget(quoteWords, targetVerseObjects) {
  let _allQuoteWordsFound = true;
  
  for (const word of quoteWords) {
    const stats = {
      foundMatch: false,
      occurrence: 0
    };
    let quoteWordFound = false;
    for (const verseData of targetVerseObjects) {
      const verseObjects = verseData && verseData.verseData && verseData.verseData.verseObjects;
      const found = findAlignmentForOriginal(verseObjects, word, stats);
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
 * @param {Map} _selections - A Map where keys are selection identifiers and values are arrays of objects.
 * Each object in the arrays should have a `text` property representing the selected text.
 * @return {Array<string>} An array of normalized and non-empty string values extracted from the selections.
 */
export function getSelectionsAsArray(_selections) {
  const selectedWords = Array.from(_selections.values())
    .flatMap(items => items.map(item => normalizeString(item.text)))
    .filter(Boolean); // removes undefined/null/empty strings if any
  return selectedWords;
}

/**
 * Processes a quote string and extracts an array of tokens representing words.
 *
 * @param {string} quote - The input string containing the quote to be tokenized.
 * @return {Array} An array of token objects, where each token represents a word from the input quote.
 */
export function getQuoteTokenArray(quote) {
  const quoteTokens = tokenizer(quote, extraOptions);
  const quoteWords = quoteTokens.filter(token => (token.type === 'word'));
  return quoteWords;
}

/**
 * Determines whether all words in the given quote are found within the selected words.
 *
 * @param {string} quote - The quote that contains words to check against the selected words.
 * @param {Map<any, Array<{ text: string }>>} _selections - A map where values are arrays of objects containing a `text` property representing selected words.
 * @return {boolean} - Returns `true` if all words in the quote are found within the selected words, otherwise returns `false`.
 */
export function areAllQuoteWordsFound(quote, _selections) {
  let _allQuoteWordsFound = true;
  if (quote) {
    const selectedWordsAsArray = getSelectionsAsArray(_selections);
    const quoteWords = getQuoteTokenArray(quote);
    _allQuoteWordsFound = areAllQuoteWordsFoundInOriginal(quoteWords, selectedWordsAsArray, _allQuoteWordsFound);
  }
  
  return _allQuoteWordsFound;
}
