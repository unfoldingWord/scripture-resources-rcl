import React, { useState } from "react";
import PropTypes from 'prop-types';
import deepFreeze from 'deep-freeze';

const stringify = (array) => array.map(object => JSON.stringify(object));
const parsify = (array) => array.map(string => JSON.parse(string));

function withSelections(Component){
  return function SelectionsComponent({
    selections,
    onSelection,
    ...props
  }) {
    const [selects, setSelects] = useState(stringify(selections));

    const updateSelections = (_selections) => {
      if (onSelection) onSelection(parsify(_selections));
      setSelects(_selections);
    };

    const selectionFromWord = (word) => {
      const {content, text} = word;
      const selection = JSON.stringify({text: content || text});
      return selection;
    };

    const isSelected = (word) => {
      const selection = word => selectionFromWord(word);
      const selected = selects.includes(selection);
      return selected;
    };

    const areSelected = (words) => {
      let selected = false;
      const _selections = words.map(word => selectionFromWord(word));
      _selections.forEach(selection => {
        if (selects.includes(selection)) selected = true;
      });
      return selected;
    };

    const addSelection = (word) => {
      let _selections = new Set(selects);
      const selection = selectionFromWord(word);
      _selections.add(selection);
      updateSelections([..._selections]);
    };

    const addSelections = (words) => {
      let _selections = new Set(selects);
      words.forEach(word => {
        const selection = selectionFromWord(word);
        _selections.add(selection);
      });
      updateSelections([..._selections]);
    };

    const removeSelection = (word) => {
      const selection = selectionFromWord(word);
      const _selections = new Set(selects);
      _selections.delete(selection);
      updateSelections([..._selections]);
    };

    const removeSelections = (words) => {
      let _selections = new Set(selects);
      words.forEach(word => {
        const selection = selectionFromWord(word);
        _selections.delete(selection);
      });
      updateSelections([..._selections]);
    };

    const _selections = deepFreeze(parsify(selects));

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
  selections: PropTypes.array,
  onSelections: PropTypes.func,
};

withSelections.defaultProps = {
  selections: [],
};

export default withSelections;
