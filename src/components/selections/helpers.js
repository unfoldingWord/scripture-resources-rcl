import {
  selectionsFromQuoteAndVerseObjects,
  normalizeString,
} from "../../core/selections/selections";

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



export const quoteFromVerse = ({ selections, verseObjectsMap }) => {
  let quotedWords = new Array();
  const _selections = Array.from(selections, ([ref, refSelections]) => {
    return refSelections.map((selection) => {
      return selection?.text
    })
  }).flat(1)

  verseObjectsMap.forEach((verseObjects, ref) => {
    const _verseObjects = verseObjects.flat(1);
    _verseObjects.forEach((verseObject, index) => {
      const { type, text } = verseObject;
      if (type === "word") {
        const match = _selections.includes(text);
        const quotedWord = match ? text : "&";
        quotedWords.push(quotedWord);
      }
    });
  });
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

export const areSelected = ({ words, selections, ref }) => {
  const highlights = selections.get(ref)
  if (!highlights) return false;
  let selected = false;
  const _selections = words.map((word) => selectionFromWord(word));

  _selections.forEach((selection) => {
    //if (selections.includes(_s)) selected = true;
    const _selection = JSON.parse(selection);
    let _text = normalizeString(_selection.text);
    let _occ = _selection.occurrence;
    let _occs = _selection.occurrences;

    for (let i = 0; i < highlights.length; i++) {
      const text = highlights[i].text; //already normalized.
      const occ = highlights[i].occurrence;
      const occs = highlights[i].occurrences;

      if (text === _text && occ === _occ && occs === _occs) {
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
