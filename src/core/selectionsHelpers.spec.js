import {areAllQuoteWordsFound} from "./selectionsHelpers";

const selections_jos_17_11 = {
  '17:11': [
    {text: 'וּ֠⁠בְנוֹתֶי⁠הָ', occurrence: 1},
    {text: 'וּ⁠בְנוֹתֶ֜י⁠הָ', occurrence: 1},
    {text: 'וּ⁠בְנוֹתֶ֗י⁠הָ', occurrence: 1},
    {text: 'וּ⁠בְנֹתֶ֔י⁠הָ', occurrence: 1},
    {text: 'וּ⁠בְנֹתֶ֔י⁠הָ', occurrence: 2},
    {text: 'וּ⁠בְנוֹתֶ֑י⁠הָ', occurrence: 1}
  ]
};

const selections_jos_17_11_longer = {
  '17:11': [
    {text: 'וּ֠⁠בְנוֹתֶי⁠הָ', occurrence: 1},
    {text: 'וּ⁠בְנוֹתֶ֜י⁠הָ', occurrence: 1},
    {text: 'וּ⁠בְנוֹתֶ֗י⁠הָ', occurrence: 1},
    {text: 'וּ⁠בְנֹתֶ֔י⁠הָ', occurrence: 1},
    {text: 'וּ⁠בְנֹתֶ֔י⁠הָ', occurrence: 2},
    {text: 'וּ⁠בְנוֹתֶ֑י⁠הָ', occurrence: 1},
    {text: 'וּ⁠בְנוֹתֶ֑י⁠הָ', occurrence: 2}
  ]
};

const selections_jos_17_11_shorter = {
  '17:11': [
    {text: 'וּ⁠בְנוֹתֶ֜י⁠הָ', occurrence: 1},
    {text: 'וּ⁠בְנוֹתֶ֗י⁠הָ', occurrence: 1},
    {text: 'וּ⁠בְנֹתֶ֔י⁠הָ', occurrence: 1},
    {text: 'וּ⁠בְנֹתֶ֔י⁠הָ', occurrence: 2},
    {text: 'וּ⁠בְנוֹתֶ֑י⁠הָ', occurrence: 1}
  ]
};

const quote_jos_17_12 = "וּ֠⁠בְנוֹתֶי⁠הָ & וּ⁠בְנוֹתֶ֜י⁠הָ & וּ⁠בְנוֹתֶ֗י⁠הָ & וּ⁠בְנֹתֶ֔י⁠הָ & וּ⁠בְנֹתֶ֔י⁠הָ & וּ⁠בְנוֹתֶ֑י⁠הָ";

const quote_jos_17_12_mismatch = "וּ֠⁠בְנוֹתֶי⁠הָ & וּ⁠בְנוֹתֶ֜י⁠הָ & וּ⁠בְנוֹתֶ֗י⁠הָ & וּ⁠בְנֹתֶ֔י⁠הָ & וּ⁠בְנֹתֶ֔י⁠הָ & וּ⁠בְנֹתֶ֔י⁠ה";

describe('Testing areAllQuoteWordsFound', () => {
  it('test single part quote with empty selection', () => {
    generateTest('tit/1-1', {}, false);
  });
  it('test multipart quote with empty selection', () => {
    generateTest(quote_jos_17_12, {}, false);
  });
  it('test multipart quote with perfect selection', () => {
    generateTest(quote_jos_17_12, selections_jos_17_11, true);
  });
  it('test multipart quote with shorter selection word count', () => {
    generateTest(quote_jos_17_12, selections_jos_17_11_shorter, false);
  });
  it('test multipart quote with longer selection word count', () => {
    generateTest(quote_jos_17_12, selections_jos_17_11_longer, false);
  });
  it('test multipart impertect quote with selection', () => {
    generateTest(quote_jos_17_12_mismatch, selections_jos_17_11, false);
  });
});

/**
 * Generates and evaluates a test based on the provided quote, selections, and expected outcome.
 *
 * @param {string} quote - The text to be evaluated to check if all its words are found.
 * @param {Object|Map} selections - A collection of verse objects mapped by references, provided either as a plain object or a Map.
 * @param {boolean} expected - The expected result of the evaluation, indicating whether all words in the quote are found in the selections.
 * @return {void} This method does not return any value; it validates the test result internally.
 */
function generateTest(quote, selections, expected) {
  // Convert selections object to Map
  const selectionsMap = new Map();

  // If selections is a plain object
  if (selections && typeof selections === 'object' && !(selections instanceof Map)) {
    Object.entries(selections).forEach(([ref, verseObjectsArray]) => {
      selectionsMap.set(ref, verseObjectsArray);
    });
  } else if (selections instanceof Map) {
    // If it's already a Map, just copy it
    selections.forEach((value, key) => {
      selectionsMap.set(key, value);
    });
  }

  const found = areAllQuoteWordsFound(quote, selectionsMap);

  const matchedExpected = found == expected;
  if (!matchedExpected) {
    console.error(`Test failed for quote: ${quote}, expected: ${expected}, found: ${found}`, selections);
  }
  expect(matchedExpected).toBeTruthy();
}