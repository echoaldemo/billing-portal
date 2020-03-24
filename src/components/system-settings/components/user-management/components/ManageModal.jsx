import React, { useContext } from 'react'
import {
  Dialog,
  InputAdornment,
  MenuItem,
  Switch,
  Tooltip
} from '@material-ui/core'
import { Close, FileCopyOutlined } from '@material-ui/icons'
import { withStyles } from '@material-ui/core/styles'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { InputField, LoadingModal } from 'common-components'
import { store } from 'context/UserManagementContext'
import { patch, get } from 'utils/api'

const LightTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11
  }
}))(Tooltip)

const ManageModal = () => {
  const {
    state: { openManage, selectedUser, editLoading, copy },
    dispatch
  } = useContext(store)

  const handleChange = e => {
    dispatch({
      type: 'SET_SELECTED_USER',
      payload: {
        selectedUser: { ...selectedUser, [e.target.name]: e.target.value }
      }
    })
  }

  const handleSwitch = e => {
    dispatch({
      type: 'SET_SELECTED_USER',
      payload: {
        selectedUser: {
          ...selectedUser,
          status: e.target.checked ? 'active' : 'inactive'
        }
      }
    })
  }

  const handleSave = () => {
    const { id, ...rest } = selectedUser
    dispatch({ type: 'EDIT_LOAD_OPEN' })
    patch(`/api/users/edit/${id}`, rest).then(() => {
      dispatch({ type: 'EDIT_LOAD_CLOSE' })
      dispatch({ type: 'CLOSE_MANAGE' })
      dispatch({ type: 'LOADING_ON' })
      get('/api/users/list').then(res => {
        dispatch({ type: 'SET_USERS', payload: { users: res.data } })
        dispatch({ type: 'LOADING_OFF' })
      })
    })
  }

  return (
    <>
      <LoadingModal open={editLoading} text='Updating user...' />
      <Dialog open={openManage}>
        <div className='user-manage-modal-header'>
          <span></span>
          <span>{selectedUser.name}</span>
          <Close onClick={() => dispatch({ type: 'CLOSE_MANAGE' })} />
        </div>
        <div className='user-manage-modal-body'>
          <InputField
            label='Email'
            disabled
            margin='normal'
            value={selectedUser.email}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <CopyToClipboard
                    text={selectedUser.email}
                    onCopy={() => dispatch({ type: 'SET_COPY_ON' })}
                    onPointerLeave={() => dispatch({ type: 'SET_COPY_OFF' })}
                  >
                    {copy ? (
                      <LightTooltip title='UUID Copied!' placement='top'>
                        <FileCopyOutlined
                          style={{ fontSize: 18, cursor: 'pointer' }}
                        />
                      </LightTooltip>
                    ) : (
                      <LightTooltip title='Copy UUID' placement='top'>
                        <FileCopyOutlined
                          style={{ fontSize: 18, cursor: 'pointer' }}
                        />
                      </LightTooltip>
                    )}
                  </CopyToClipboard>
                </InputAdornment>
              )
            }}
          />
          <InputField
            label='User type'
            fullWidth
            value={selectedUser.type}
            margin='normal'
            select
            name='type'
            onChange={handleChange}
          >
            <MenuItem value='admin'>admin</MenuItem>
            <MenuItem value='user'>user</MenuItem>
          </InputField>
          <InputField
            label='Status'
            disabled
            margin='normal'
            value={selectedUser.status}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Switch
                    checked={selectedUser.status === 'active' ? true : false}
                    onChange={handleSwitch}
                    color='primary'
                  />
                </InputAdornment>
              )
            }}
          />

          <div className='modal-button-container'>
            <button
              className='modal-button'
              onClick={() => dispatch({ type: 'CLOSE_MANAGE' })}
            >
              CANCEL
            </button>
            <button className='modal-button button-save' onClick={handleSave}>
              SAVE
            </button>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default ManageModal
