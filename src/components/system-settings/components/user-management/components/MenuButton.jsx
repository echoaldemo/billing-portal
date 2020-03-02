import React, { useContext } from 'react'
import { Menu, MenuItem } from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'
import { LoadingModal } from 'common-components'
import { store } from 'context/UserManagementContext'
import { remove, get } from 'utils/api'

const MenuButton = () => {
  const {
    state: { anchorEl, delLoading, selectedUser },
    dispatch
  } = useContext(store)

  const openModal = () => {
    dispatch({ type: 'OPEN_MANAGE' })
    dispatch({ type: 'MENU_CLOSE' })
  }

  const handleDelete = () => {
    dispatch({ type: 'DELETE_LOAD_OPEN' })
    dispatch({ type: 'MENU_CLOSE' })
    remove(`/api/users/delete/${selectedUser.id}`).then(() => {
      dispatch({ type: 'DELETE_LOAD_CLOSE' })
      dispatch({ type: 'LOADING_ON' })
      get('/api/users/list').then(res => {
        dispatch({ type: 'SET_USERS', payload: { users: res.data } })
        dispatch({ type: 'LOADING_OFF' })
      })
    })
  }

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => dispatch({ type: 'MENU_CLOSE' })}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <MenuItem className="menu-manage-user" onClick={openModal}>
          <Edit /> Manage
        </MenuItem>
        <MenuItem className="menu-manage-user" onClick={handleDelete}>
          <Delete /> Delete
        </MenuItem>
      </Menu>
      <LoadingModal
        open={delLoading}
        text="Deleting user..."
        cancelFn={() => {}}
      />
    </>
  )
}

export default MenuButton
