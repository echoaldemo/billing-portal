import React from 'react'
import { Button, IconButton, Tooltip } from '@material-ui/core'
import { Delete } from '@material-ui/icons'
import DeleteModal from './DeleteModal'
import ApproveModal from './ApproveModal'
import DuplicateItems from './DuplicateItems'
import { StateContext } from 'context/StateContext'
export default function PendingCheckboxToolbar() {
  const { confirmModal, setConfirmModal } = React.useContext(StateContext)

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Button
        style={{
          textTransform: 'none',
          border: 'solid 1px #F1F1F1',
          paddingLeft: 10,
          paddingRight: 10
        }}
        color='default'
        onClick={() => {
          setConfirmModal({ ...confirmModal, approve: true })
        }}
      >
        <b>Mark as Approved</b>
      </Button>
      &emsp;
      <Button
        style={{
          textTransform: 'none',
          border: 'solid 1px #F1F1F1',
          paddingLeft: 10,
          paddingRight: 10
        }}
        color='default'
        onClick={() => setConfirmModal({ ...confirmModal, duplicate: true })}
      >
        <b>Duplicate Items</b>
      </Button>
      &emsp;
      <Tooltip title='Delete Marked Invoices' placement='top'>
        <IconButton
          onClick={() => {
            setConfirmModal({ ...confirmModal, delete: true })
          }}
        >
          <Delete />
        </IconButton>
      </Tooltip>
      <DeleteModal />
      <ApproveModal />
      <DuplicateItems />
    </div>
  )
}
