import React, { useContext } from 'react'
import Manual from 'components/new-invoice/manual/ManualInvoice'
import Automatic from 'components/new-invoice/automatic/AutomaticInvoice'
import { Dialog } from '@material-ui/core'
import { StateContext } from 'context/StateContext'

const DuplicateModal = () => {
  const { state, dispatch } = useContext(StateContext)

  const handleClose = () => {
    dispatch({
      type: 'set-duplicate-modal',
      payload: { openDuplicate: false }
    })
  }

  const renderLoading = () => {
    dispatch({
      type: 'set-duplicate-modal',
      payload: { openDuplicate: false }
    })
  }
  return (
    <Dialog open={state.openDuplicate} maxWidth={false}>
      <div style={{ minWidth: '80vw' }}>
        {typeof state.selectedData.invoiceType ===
        'undefined' ? null : state.selectedData.invoiceType.match(/manual/i) ? (
          <Manual
            handleClose={handleClose}
            duplicate={state.selectedData}
            renderLoading={renderLoading}
          />
        ) : state.selectedData.invoiceType.match(/auto/i) ? (
          <Automatic handleClose={handleClose} renderLoading={renderLoading} />
        ) : null}
      </div>
    </Dialog>
  )
}

export default DuplicateModal
