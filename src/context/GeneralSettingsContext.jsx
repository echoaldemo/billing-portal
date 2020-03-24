import React, { createContext, useReducer } from 'react'

const initialState = {
  refresh: false
}

const store = createContext(initialState)
const { Provider } = store

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, { type, payload }) => {
    switch (type) {
      case 'SET_USERS':
        return { ...state, refresh: payload.refresh }
      default:
        return null
    }
  }, initialState)

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}
export { store, StateProvider }
