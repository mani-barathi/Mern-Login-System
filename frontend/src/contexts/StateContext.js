import { useContext, createContext, useReducer } from 'react'

const StateContext = createContext()

function StateProvider({ children, intialState, reducer }) {
    return (
        <StateContext.Provider value={useReducer(reducer, intialState)}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateValue = () => useContext(StateContext)

export default StateProvider
