import {getWordObjects} from "./lexiconHelpers";
import {tokenizer} from "./selections/tokenizer";

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
    const selectedWords = Array.from(_selections.values())
      .flatMap(items => items.map(item => item.text))
      .filter(Boolean); // removes undefined/null/empty strings if any

    let selectedIndex = 0;
    const quoteTokens = tokenizer(quote);
    const quoteWords = quoteTokens.filter(token => (token.type === 'word'));

    for (const word of quoteWords) {
      if (word.token !== selectedWords[selectedIndex]) {
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
