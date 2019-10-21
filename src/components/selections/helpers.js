// const stringify = (array) => array.map(object => JSON.stringify(object));
export const parsify = (array) => array.map(string => JSON.parse(string));

export const selectionsFromQuote = ({quote, quoteVerseObjects}) => {
  let selections = [];
  if (quote) {
    const words = (quote || '').replace(/[…\s]+/g, ' ').split(' ');
    selections = words.filter(word => word.length > 0)
    .map(text => JSON.stringify({text}));
  }
  return selections;
};

export const quoteFromVerse = ({selections, quoteVerseObjects}) => {
  let quotedWords = new Array(quoteVerseObjects.length);
  const _selections = selections.map(selection => JSON.parse(selection).text);
  quoteVerseObjects.forEach((verseObject, index) => {
    const {type, text} = verseObject;
    if (type === 'word') {
      const match = _selections.includes(text);
      const quotedWord = match ? text : '…';
      quotedWords.push(quotedWord);
    }
  });
  const quote = quotedWords.join(' ')
  .replace(/( ?… ?)+/g,' … ').replace(/(^[… ]+|[… ]+$)/g, '');
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
  const {content, text} = word;
  const selection = JSON.stringify({text: content || text});
  return selection;
};

export const isSelected = ({word, selections}) => {
  const selection = word => selectionFromWord(word);
  const selected = selections.includes(selection);
  return selected;
};

export const areSelected = ({words, selections}) => {
  let selected = false;
  const _selections = words.map(word => selectionFromWord(word));
  _selections.forEach(selection => {
    if (selections.includes(selection)) selected = true;
  });
  return selected;
};

export const addSelection = ({word, selections}) => {
  let _selections = new Set(selections);
  const selection = selectionFromWord(word);
  _selections.add(selection);
  return [..._selections];
};

export const addSelections = ({words, selections}) => {
  let _selections = new Set(selections);
  words.forEach(word => {
    const selection = selectionFromWord(word);
    _selections.add(selection);
  });
  return [..._selections];
};

export const removeSelection = ({word, selections}) => {
  const selection = selectionFromWord(word);
  const _selections = new Set(selections);
  _selections.delete(selection);
  return [..._selections];
};

export const removeSelections = ({words, selections}) => {
  let _selections = new Set(selections);
  words.forEach(word => {
    const selection = selectionFromWord(word);
    _selections.delete(selection);
  });
  return [..._selections];
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