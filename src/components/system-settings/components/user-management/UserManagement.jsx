import React, { useEffect, useContext } from 'react'
import UserTable from './components/UserTable'
import Loading from './components/Loading'
import { store, StateProvider } from 'context/UserManagementContext'
import { get } from 'utils/api'
import './style/index.scss'

const ManageUser = () => {
  const {
    state: { loading },
    dispatch
  } = useContext(store)

  useEffect(() => {
    get('/api/users/list').then(res => {
      dispatch({ type: 'SET_USERS', payload: { users: res.data } })
      dispatch({ type: 'LOADING_OFF' })
    })
  }, [dispatch])

  return <>{loading ? <Loading /> : <UserTable />}</>
}

const UserManagement = () => {
  return (
    <StateProvider>
      <ManageUser />
    </StateProvider>
  )
}

export default UserManagement
