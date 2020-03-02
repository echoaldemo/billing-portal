import React, { useContext } from 'react'
import { Dialog, InputAdornment, MenuItem, Switch } from '@material-ui/core'
import { Close, FileCopyOutlined } from '@material-ui/icons'
import { InputField } from 'common-components'
import { store } from 'context/UserManagementContext'

const ManageModal = () => {
  const {
    state: { openManage, selectedUser },
    dispatch
  } = useContext(store)
  return (
    <Dialog open={openManage}>
      <div className="user-manage-modal-header">
        <span></span>
        <span>{selectedUser.name}</span>
        <Close onClick={() => dispatch({ type: 'CLOSE_MANAGE' })} />
      </div>
      <div className="user-manage-modal-body">
        <InputField
          label="Email"
          disabled
          margin="normal"
          value={selectedUser.email}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <FileCopyOutlined
                  onClick={() => alert('test')}
                  style={{ fontSize: 18, cursor: 'pointer' }}
                />
              </InputAdornment>
            )
          }}
        />
        <InputField
          label="User type"
          fullWidth
          value="admin"
          margin="normal"
          select
        >
          <MenuItem value="admin">ADMIN</MenuItem>
          <MenuItem value="user">USER</MenuItem>
        </InputField>
        <InputField
          label="Email"
          disabled
          margin="normal"
          value="Active"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Switch checked={true} onChange={() => {}} color="primary" />
              </InputAdornment>
            )
          }}
        />

        <div className="modal-button-container">
          <button className="modal-button">CANCEL</button>
          <button className="modal-button button-save">SAVE</button>
        </div>
      </div>
    </Dialog>
  )
}

export default ManageModal
