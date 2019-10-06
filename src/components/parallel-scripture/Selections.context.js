import React, {
  createContext,
  useState
} from 'react';
import deepFreeze from 'deep-freeze';

export const SelectionsContext = createContext();

export function SelectionsContextProvider({children}) {
  const [selections, setSelections] = useState(new Set([]));

  const isSelected = (words) => {
    let selected = false;
    const _selections = words.map(word => selectionFromWord(word));
    _selections.forEach(selection => {
      if (selections.has(selection)) selected = true;
    });
    return selected;
  };

  const selectionFromWord = (word) => {
    const {content, text} = word;
    const selection = JSON.stringify({text: content || text});
    return selection;
  };

  const addSelection = (word) => {
    const selection = selectionFromWord(word);
    let _selections = new Set(selections);
    _selections.add(selection);
    setSelections(_selections);
  };

  const addSelections = (words) => {
    words.forEach(word => addSelection(word));
  };

  const removeSelection = (word) => {
    const selection = selectionFromWord(word);
    const _selections = new Set(selections);
    _selections.delete(selection);
    setSelections(_selections);
  };

  const removeSelections = (words) => {
    words.forEach(selection => removeSelection(selection));
  };

  const _selections = deepFreeze(selections);

  const value = {
    selections: _selections,
    isSelected,
    addSelection,
    addSelections,
    removeSelection,
    removeSelections,
  };

  return (
    <SelectionsContext.Provider value={value}>
      {children}
    </SelectionsContext.Provider>
  );
};
