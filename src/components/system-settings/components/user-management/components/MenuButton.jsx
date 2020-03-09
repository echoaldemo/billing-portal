import React, { useContext } from 'react'
import { Menu, MenuItem, Dialog } from '@material-ui/core'
import { Edit, Delete, Check } from '@material-ui/icons'
import { LoadingModal, WarningModal } from 'common-components'
import { store } from 'context/UserManagementContext'
import { remove, get, patch } from 'utils/api'

const MenuButton = () => {
  const {
    state: { anchorEl, delLoading, selectedUser, del },
    dispatch
  } = useContext(store)

  const openModal = () => {
    dispatch({ type: 'OPEN_MANAGE' })
    dispatch({ type: 'MENU_CLOSE' })
  }

  const handleDelete = () => {
    dispatch({ type: 'DELETE_LOAD_OPEN' })
    remove(`/api/users/delete/${selectedUser.id}`).then(() => {
      dispatch({ type: 'DELETE_LOAD_CLOSE' })
      dispatch({ type: 'LOADING_ON' })
      get('/api/users/list').then(res => {
        dispatch({ type: 'SET_USERS', payload: { users: res.data } })
        dispatch({ type: 'SET_DELETE_CLOSE' })
        dispatch({ type: 'LOADING_OFF' })
      })
    })
  }

  const handleAccept = () => {
    const { id, ...rest } = selectedUser
    rest.status = 'active'
    dispatch({ type: 'MENU_CLOSE' })
    dispatch({ type: 'EDIT_LOAD_OPEN' })
    patch(`/api/users/edit/${id}`, rest).then(() => {
      dispatch({ type: 'EDIT_LOAD_CLOSE' })
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
        {selectedUser.status === 'request' ? (
          <MenuItem className="menu-manage-user" onClick={handleAccept}>
            <Check /> Accept
          </MenuItem>
        ) : (
          <MenuItem className="menu-manage-user" onClick={openModal}>
            <Edit /> Manage
          </MenuItem>
        )}
        <MenuItem
          className="menu-manage-user"
          onClick={() => {
            dispatch({ type: 'MENU_CLOSE' })
            dispatch({ type: 'SET_DELETE_OPEN' })
          }}
        >
          <Delete /> Delete
        </MenuItem>
      </Menu>
      <LoadingModal
        open={delLoading}
        text="Deleting user..."
        cancelFn={() => {}}
      />
      <Dialog open={del}>
        <WarningModal
          text="Confirmation"
          content={`Are you sure want to remove ${selectedUser.name}?`}
          closeFn={() => dispatch({ type: 'SET_DELETE_CLOSE' })}
          secondaryFn={handleDelete}
          btnText="Continue"
        />
      </Dialog>
    </>
  )
}

export default MenuButton
