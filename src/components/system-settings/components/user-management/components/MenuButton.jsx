import React, { useContext } from 'react'
import { Menu, MenuItem } from '@material-ui/core'
import { Edit, Delete } from '@material-ui/icons'
import { store } from 'context/UserManagementContext'

const MenuButton = () => {
  const {
    state: { anchorEl },
    dispatch
  } = useContext(store)

  const openModal = () => {
    dispatch({ type: 'OPEN_MANAGE' })
    dispatch({ type: 'MENU_CLOSE' })
  }

  const handleClose = () => {
    dispatch({ type: 'MENU_CLOSE' })
  }

  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <MenuItem className="menu-manage-user" onClick={openModal}>
        <Edit /> Manage
      </MenuItem>
      <MenuItem className="menu-manage-user" onClick={handleClose}>
        <Delete /> Delete
      </MenuItem>
    </Menu>
  )
}

export default MenuButton
