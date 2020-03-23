import React, { useReducer, useEffect } from 'react'
import { get } from 'utils/api'
const initialState = {
  logs: [],
  pending: [],
  logsLoading: true,
  manual: 1,
  automatic: 1,
  loading: true,
  all: 0,
  draft: 0,
  reviewed: 0,
  approved: 0
}
const OverviewContext = React.createContext()

const OverviewProvider = ({ children }) => {
  useEffect(() => {
    getPending()
    getLogs()
  }, [])

  const getLogs = () => {
    get('/api/logs/list').then(res => {
      dispatch({
        type: 'set-logs',
        payload: { logs: res.data }
      })
      dispatch({
        type: 'set-logs-loading',
        payload: { logs: false }
      })
    })
  }

  const getPending = () => {
    get('/api/pending/list').then(res => {
      dispatch({
        type: 'set-stats',
        payload: {
          pending: res.data,
          manual: res.data.filter(c => c.invoiceType === 'Manual').length,
          automatic: res.data.filter(c => c.invoiceType === 'Automatic').length,
          all: res.data.length,
          draft: res.data.filter(c => c.status === 0).length,
          reviewed: res.data.filter(c => c.status === 1).length,
          approved: res.data.filter(c => c.status === 2).length
        }
      })
    })
  }

  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'set-logs':
        return { ...state, logs: action.payload.logs }
      case 'set-logs-loading':
        return { ...state, logsLoading: action.payload.logsLoading }
      case 'set-stats':
        return {
          ...state,
          pending: action.payload.pending,
          loading: false,
          manual: action.payload.manual,
          automatic: action.payload.automatic,
          all: action.payload.all,
          draft: action.payload.draft,
          reviewed: action.payload.reviewed,
          approved: action.payload.approved
        }
      default:
        return null
    }
  }, initialState)
  return (
    <OverviewContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </OverviewContext.Provider>
  )
}

export { OverviewProvider, OverviewContext }
