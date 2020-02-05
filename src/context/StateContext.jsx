import React, { useReducer, useState } from 'react'
import { get } from 'utils/api'
const initialState = {
  active_tab: 0,
  loading: false,
  data: [],
  openEdit: false,
  openManage: false,
  openDuplicate: false,
  selectedData: {},
  editManageData: false,
  updateLoading: false
}

const StateContext = React.createContext()

const StateProvider = ({ children }) => {
  const [modalLoading, setModalLoading] = useState(false)

  const setLoading = value => {
    dispatch({ type: 'set-loading', payload: { loading: value } })
  }
  const setData = value => {
    dispatch({ type: 'set-data', payload: { data: value } })
  }
  const setEditModal = value => {
    dispatch({ type: 'set-edit-modal', payload: { openEdit: value } })
  }
  const setTab = value => {
    dispatch({ type: 'set-tab', payload: { active_tab: value } })
  }

  const getPendingInvoicesData = () => {
    setLoading(true)
    get('/api/pending/list')
      .then(res => {
        setLoading(false)
        setData(res.data)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'set-tab':
        return { ...state, active_tab: action.payload.active_tab }
      case 'set-loading':
        return { ...state, loading: action.payload.loading }
      case 'set-data':
        return { ...state, data: action.payload.data }

      case 'set-edit-modal':
        return { ...state, openEdit: action.payload.openEdit }
      case 'set-manage-modal':
        return { ...state, openManage: action.payload.openManage }
      case 'set-duplicate-modal':
        return { ...state, openDuplicate: action.payload.openDuplicate }
      case 'set-selected-data':
        return { ...state, selectedData: action.payload.selectedData }
      case 'set-edit-manage-data':
        return { ...state, editManageData: action.payload.editManageData }
      case 'set-update-loading':
        return { ...state, updateLoading: action.payload.updateLoading }
      default:
        return null
    }
  }, initialState)

  return (
    <StateContext.Provider
      value={{
        state,
        dispatch,
        setLoading,
        setData,
        setEditModal,
        setTab,
        modalLoading,
        setModalLoading,
        getPendingInvoicesData
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export { StateProvider, StateContext }
