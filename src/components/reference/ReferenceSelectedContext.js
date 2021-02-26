import React from 'react';
import PropTypes from 'prop-types';

import useReferenceSelected from './useReferenceSelected';

export const ReferenceSelectedContext = React.createContext({});

export function ReferenceSelectedContextProvider({
  referenceSelected,
  onReferenceSelected,
  children,
}) {
    const val = useReferenceSelected({
      referenceSelected,
      onReferenceSelected,
    });

    return (
        <ReferenceSelectedContext.Provider value={val}>
          {children}
        </ReferenceSelectedContext.Provider>
    );
}

ReferenceSelectedContextProvider.propTypes = {
    reference: PropTypes.arrayOf(PropTypes.object),
};

export default ReferenceSelectedContextProvider;