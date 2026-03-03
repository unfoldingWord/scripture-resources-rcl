import {tokenize} from 'string-punctuation-tokenizer';

/**
 * Tokenizes a given text input based on specified options.
 *
 * This function processes the provided text and breaks it down into tokens.
 * The behavior of the tokenization can be customized by passing additional options.
 *
 * @param {string} text - The input text to be tokenized.
 * @param {Object} [extraOptions={}] - Optional configuration object to modify the tokenization behavior.
 * @param {boolean} [extraOptions.includeWords=true] - Determines whether word tokens should be included.
 * @param {boolean} [extraOptions.includeNumbers=true] - Determines whether numeric tokens should be included.
 * @param {boolean} [extraOptions.includePunctuation=true] - Determines whether punctuation tokens should be included.
 * @param {boolean} [extraOptions.includeWhitespace=true] - Determines whether whitespace tokens should be included.
 * @param {boolean} [extraOptions.greedy=true] - Specifies whether to use greedy tokenization.
 * @param {boolean} [extraOptions.verbose=true] - Specifies whether the output should include detailed information.
 * @param {boolean} [extraOptions.occurrences=true] - Determines whether to include token occurrence counts.
 * @returns {Array} A list of tokens generated from the input text.  If verbose is left true, this will return an array
 *                   of token objects such as {"token": "נֶ֣גְבָּ⁠ה", "type": "word", "occurrence": 1, "occurrences": 1},
 *                   otherwise it will just return an array of strings representing the tokens.
 */
export const tokenizer = (text, extraOptions = {}) => {
  const options = {
    text,
    includeWords: true,
    includeNumbers: true,
    includePunctuation: true,
    includeWhitespace: true,
    greedy: true,
    verbose: true,
    occurrences: true,
    ...extraOptions,
  };
  const tokens = tokenize(options);
  return tokens;
};