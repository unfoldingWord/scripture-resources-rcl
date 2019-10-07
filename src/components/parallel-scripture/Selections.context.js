import React from 'react'

const SelectionsContext = React.createContext({})

export const SelectionsProvider = SelectionsContext.Provider
export const SelectionsConsumer = SelectionsContext.Consumer
export default SelectionsContext