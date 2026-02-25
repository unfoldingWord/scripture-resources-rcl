import {
  selectionsFromQuoteAndVerseObjects,
  normalizeString,
} from "../../core/selections/selections";
import { doesReferenceContain } from "bible-reference-range";

// const stringify = (array) => array.map(object => JSON.stringify(object));
//export const parsify = (array) => array.map(string => JSON.parse(string));

export const selectionsFromQuote = ({ quote, verseObjectsMap, occurrence }) => {
  let selections = new Map();

  if (quote && verseObjectsMap && occurrence) {
    selectionsFromQuoteAndVerseObjects({
      quote,
      verseObjectsMap,
      occurrence,
    }).forEach((verseObjects, ref) => {
      const newVerseObjects = verseObjects.map((selection) => JSON.stringify(selection));
      selections.set(ref, newVerseObjects)
    })
  }
  return selections;
};

export const quoteFromVerse = ({ selections, bookObject }) => {
  let quotedWords = new Array();
  const _selections = Array.from(selections, ([ref, refSelections]) => {
    return refSelections.map((selection) => {
      return selection?.text
    })
  }).flat(1)

  Object.values(bookObject).forEach((chapter) => {
    Object.values(chapter).forEach((verse) => {
      const _verseObjects = verse.verseObjects.flat(1);
      _verseObjects.forEach((verseObject, index) => {
      const { type, text } = verseObject;
      if (type === "word") {
        const match = _selections.includes(text);
        const quotedWord = match ? text : "&";
        quotedWords.push(quotedWord);
      }
    });
    })
  })
  const quote = quotedWords
    .join(" ")
    .replace(/( ?… ?)+/g, " & ")
    .replace(/(^[… ]+|[… ]+…)/g, "")
    .replace(/( ?& ?)+/g, " & ")
    .replace(/(^[& ]+|[& ]+$)/g, "");
  return quote;
};

// const wordsFromMilestone = ({milestone, quotedWords=[]}) => {
//   const _selections = selections.map(selection => selection.text);
//   if (_selections.include(milestone.content)) {
//     if (milestone.children[0].type === 'word') {
//       const words = milestone.children;
//       words.forEach(word => quotedWords.push(word.text));
//     }
//   }
// };

/**
 * Creates a JSON string representing a selection object from the provided word object.
 * The selection object includes the text content, occurrence index, and total occurrences.
 *
 * @param {Object} word - The input object containing properties related to a word.
 * @param {string} word.content - The content of the word. If unavailable, the `text` property will be used instead.
 * @param {string} word.text - The fallback text of the word if `content` is not defined.
 * @param {string|number} word.occurrence - The occurrence index of the word in string or numeric format.
 * @param {string|number} word.occurrences - The total number of occurrences of the word in string or numeric format.
 * @returns {string} A JSON string representing the selection object with the properties `text`, `occurrence`, and `occurrences`.
 */
export const selectionFromWord = (word) => {
  const { content, text, occurrence, occurrences } = word;
  const selectionObject = {
    text: content || text,
    occurrence: parseInt(occurrence),
    occurrences: parseInt(occurrences),
  };
  const selection = JSON.stringify(selectionObject);
  return selection;
};

export const isSelected = ({ word, selections, ref }) => {
  const selection = selectionFromWord(word);
  const selected = selections.get(ref).includes(selection);
  return selected;
};

/**
 * Determines whether words are selected based on a reference and selections.
 *
 * The function processes a list of words and checks their match against a set of
 * highlights determined by provided selections and references. It utilizes reference
 * containment logic and selection comparisons based on text and occurrence.
 *
 * @param {Object} params - The input parameters.
 * @param {Array} params.words - The array of words to be checked.
 * @param {Map} params.selections - A map where each key is a reference and the value is an array of selection objects.
 * @param {Object} params.ref - The reference object to be checked against the selections.
 * @returns {boolean} - Returns `true` if the words are selected; otherwise, `false`.
 */
export const areSelected = ({ words, selections, ref }) => {
  let highlights = [];

  for (let [currentRef, selection] of selections) { 
    const containsReference = doesReferenceContain(ref, currentRef);
    if (containsReference) highlights = highlights.concat(selection);
  }

  if (!highlights.length) return false;
  let selected = false;
  const _selections = words.map((word) => selectionFromWord(word));

  _selections.forEach((selection) => {
    //if (selections.includes(_s)) selected = true;
    const _selection = JSON.parse(selection);
    let _text = normalizeString(_selection.text);
    let _occ = _selection.occurrence;

    for (let i = 0; i < highlights.length; i++) {
      const text = normalizeString(highlights[i].text); //already normalized.
      const occ = highlights[i].occurrence;

      if (text === _text && occ === _occ) {
        selected = true;
        break;
      }
    }
  });
  return selected;
};

export const addSelection = ({ word, selections, ref}) => {
  const newSelections = new Map(selections);
  let _selections = new Set(newSelections.get(ref));
  const selection = selectionFromWord(word);
  _selections.add(selection);
  newSelections.set(ref, [..._selections]);
  return newSelections;
};

export const addSelections = ({ words, selections, ref }) => {
  const newSelections = new Map(selections);
  const _selections = new Set(newSelections.get(ref));
  words.forEach((word) => {
    const selection = selectionFromWord(word);
    _selections.add(selection);
  });
  newSelections.set(ref, [..._selections]);
  return newSelections;
};

export const removeSelection = ({ word, selections, ref }) => {
  const newSelections = new Map(selections);
  const selectionsArray = newSelections.get(ref);
  const selection = selectionFromWord(word);
  const selectionStringified = selectionsArray.map((_selection) =>
    selectionFromWord(_selection)
  );
  const _selections = new Set(selectionStringified);
  _selections.delete(selection);
  newSelections.set(ref, [..._selections]);
  return newSelections;
};

export const removeSelections = ({ words, selections, ref }) => {
  const newSelections = new Map(selections);
  const selectionsArray = newSelections.get(ref);
  const selectionStringified = selectionsArray.map((selection) =>
    selectionFromWord(selection)
  );
  const _selections = new Set(selectionStringified);

  words.forEach((word) => {
    const selection = selectionFromWord(word);
    _selections.delete(selection);
  });
  newSelections.set(ref, [..._selections]);
  return newSelections;
};

export default {
  selectionFromWord,
  isSelected,
  areSelected,
  addSelection,
  addSelections,
  removeSelection,
  removeSelections,
};
