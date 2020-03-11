import React, { createContext, useReducer } from 'react'

const initialState = {
  users: [],
  page: 0,
  rowsPerPage: 8,
  loading: true,
  anchorEl: null,
  selectedUser: {},
  openManage: false,
  editLoading: false,
  delLoading: false,
  del: false,
  search: '',
  copy: false,
  count: 0,
  filter: {
    status: 'all',
    type: 'all'
  }
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
      case 'EDIT_LOAD_OPEN':
        return { ...state, editLoading: true }
      case 'EDIT_LOAD_CLOSE':
        return { ...state, editLoading: false }
      case 'SET_DELETE_OPEN':
        return { ...state, del: true }
      case 'SET_DELETE_CLOSE':
        return { ...state, del: false }
      case 'DELETE_LOAD_OPEN':
        return { ...state, delLoading: true }
      case 'DELETE_LOAD_CLOSE':
        return { ...state, delLoading: false }
      case 'SET_COPY_ON':
        return { ...state, copy: true }
      case 'SET_COPY_OFF':
        return { ...state, copy: false }
      case 'SET_SELECTED_USER':
        return { ...state, selectedUser: payload.selectedUser }
      case 'HANDLE_SEARCH':
        return { ...state, search: payload.search }
      case 'SET_COUNT':
        return { ...state, count: payload.count }
      case 'SET_FILTER':
        return { ...state, filter: payload.filter }
      case 'RESET_FILTER':
        return {
          ...state,
          filter: {
            status: 'all',
            type: 'all'
          },
          search: ''
        }
      default:
        return null
    }
  }, initialState)

  return <Provider value={{ state, dispatch }}>{children}</Provider>
}
export { store, StateProvider }
