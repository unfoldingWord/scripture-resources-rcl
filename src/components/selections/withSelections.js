import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import deepFreeze from 'deep-freeze';

// const stringify = (array) => array.map(object => JSON.stringify(object));
const parsify = (array) => array.map(string => JSON.parse(string));

function withSelections(Component){
  return function SelectionsComponent({
    quote,
    onQuote,
    quoteVerseObjects,
    ...props
  }) {
    const [selections, setSelections] = useState([]);

    // const wordsFromMilestone = ({milestone, quotedWords=[]}) => {
    //   const _selections = selections.map(selection => selection.text);
    //   if (_selections.include(milestone.content)) {
    //     if (milestone.children[0].type === 'word') {
    //       const words = milestone.children;
    //       words.forEach(word => quotedWords.push(word.text));
    //     }
    //   }
    // };

    useEffect(() => {
      const quoteFromVerse = () => {
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

      if (quoteVerseObjects && onQuote) {
        const quote = quoteFromVerse();
        onQuote(quote);
      }
    }, [selections, onQuote, quoteVerseObjects]);

    const selectionFromWord = (word) => {
      const {content, text} = word;
      const selection = JSON.stringify({text: content || text});
      return selection;
    };

    const isSelected = (word) => {
      const selection = word => selectionFromWord(word);
      const selected = selections.includes(selection);
      return selected;
    };

    const areSelected = (words) => {
      let selected = false;
      const _selections = words.map(word => selectionFromWord(word));
      _selections.forEach(selection => {
        if (selections.includes(selection)) selected = true;
      });
      return selected;
    };

    const addSelection = (word) => {
      let _selections = new Set(selections);
      const selection = selectionFromWord(word);
      _selections.add(selection);
      setSelections([..._selections]);
    };

    const addSelections = (words) => {
      let _selections = new Set(selections);
      words.forEach(word => {
        const selection = selectionFromWord(word);
        _selections.add(selection);
      });
      setSelections([..._selections]);
    };

    const removeSelection = (word) => {
      const selection = selectionFromWord(word);
      const _selections = new Set(selections);
      _selections.delete(selection);
      setSelections([..._selections]);
    };

    const removeSelections = (words) => {
      let _selections = new Set(selections);
      words.forEach(word => {
        const selection = selectionFromWord(word);
        _selections.delete(selection);
      });
      setSelections([..._selections]);
    };

    const _selections = deepFreeze(parsify(selections));

    const value = {
      selections: _selections,
      isSelected,
      areSelected,
      addSelection,
      addSelections,
      removeSelection,
      removeSelections,
    };

    return (
      <Component value={value} {...props} />
    );
  }
}

withSelections.propTypes = {
  quoteVerseObjects: PropTypes.array,
  onQuote: PropTypes.func,
};

withSelections.defaultProps = {
  selections: [],
};

export default withSelections;
