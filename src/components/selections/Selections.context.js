import React, { createContext } from 'react';
import PropTypes from 'prop-types';

import { useSelections } from '..';

export const SelectionsContext = createContext();

export function SelectionsContextProvider({
  children,
  highlightOnlyCompleteQuotes,
  occurrence,
  onQuote,
  onSelections,
  originalBookObjects,
  quote,
  refString,
  selections,
  targetVersesForRef
}) {
  
  let {state, actions} = useSelections({
    highlightOnlyCompleteQuotes,
    occurrence: occurrence,
    onQuote: onQuote,
    onSelections: onSelections,
    originalBookObjects,
    quote: quote,
    refString,
    selections: selections,
    targetVersesForRef
  });
  
  return (
    <SelectionsContext.Provider value={{state, actions}}>
      {children}
    </SelectionsContext.Provider>
  );
};

SelectionsContextProvider.propTypes = {
  /** words in a selection */
  selections: PropTypes.instanceOf(Map),
  /** action taken after a selection is made */
  onSelections: PropTypes.func.isRequired,
  /** the quote to be selected */
  quote: PropTypes.string.isRequired,
  /** all chapter-verses where quote may be found */
  bookObject: PropTypes.object,
  /** string chapter-verse reference. i.e. 1:5-6 */
  refString: PropTypes.string,
  /** if quote occurs mulitple times, this is the occurence of the one selected */
  occurrence: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** action taken when quote is provided */
  onQuote: PropTypes.func,
};

export default SelectionsContextProvider;
