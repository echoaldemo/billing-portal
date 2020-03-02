import React, { createContext, useReducer } from 'react'

const initialState = {
  users: [],
  page: 0,
  rowsPerPage: 10,
  loading: true,
  anchorEl: null,
  selectedUser: {},
  openManage: false
}

const store = createContext(initialState)
const { Provider } = store

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, { type, payload }) => {
    switch (type) {
      case 'SET_USERS':
        return { ...state, users: payload.users }
      case 'SET_PAGE':
        return { ...state, page: payload.page }
      case 'HANDLE_ROWS_PER_PAGE':
        return {
          ...state,
          page: 0,
          rowsPerPage: parseInt(payload.rowsPerPage, 10)
        }
      case 'LOADING_ON':
        return { ...state, loading: true }
      case 'LOADING_OFF':
        return { ...state, loading: false }
      case 'MENU_OPEN':
        return {
          ...state,
          anchorEl: payload.anchorEl,
          selectedUser: payload.selectedUser
        }
      case 'MENU_CLOSE':
        return { ...state, anchorEl: null }
      case 'OPEN_MANAGE':
        return { ...state, openManage: true }
      case 'CLOSE_MANAGE':
        return { ...state, openManage: false }
      default:
        return null
    }
  }, initialState)

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}
export { store, StateProvider }
