
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