import React, { useContext } from 'react'
import PropTypes, { func } from 'prop-types';

import { useSelections } from '..';

export const SelectionsContext = React.createContext({})

export function SelectionsContextProvider({
    selections,
    onSelections,
    occurrence,
    quote,
    onQuote,
    verseObjects,
    children,
  }) {
    const val = useSelections({     
        selections,
        onSelections,
        occurrence,
        quote,
        onQuote,
        verseObjects,
    });
  
    return (
      <SelectionsContext.Provider value={val}>
        {children}
      </SelectionsContext.Provider>
    );
  };
  
  SelectionsContextProvider.propTypes = {
    /** words in a selection */
    selections: PropTypes.array,
    /** action taken after a selection is made */
    onSelections: PropTypes.func.isRequired,
    /** the quote to be selected */
    quote: PropTypes.string.isRequired,
    /** the verses where quote may be found */
    verseObjects: PropTypes.array,
    /** if quote occurs mulitple times, this is the occurence of the one selected */
    occurrence: PropTypes.number,
    /** action taken when quote is provided */
    onQuote: PropTypes.func,
  };
  
  export default SelectionsContextProvider;
