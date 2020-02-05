import React, { useContext, useState } from 'react'
import Manual from 'components/new-invoice/manual/ManualInvoice'
import Automatic from 'components/new-invoice/automatic/AutomaticInvoice'
import { LoadingNoDialog } from 'common-components'
import { Dialog } from '@material-ui/core'
import { StateContext } from 'context/StateContext'

const DuplicateModal = () => {
  const { state, dispatch } = useContext(StateContext)
  const [loading, setLoading] = useState(false)

  const handleClose = () => {
    setLoading(false)
    dispatch({
      type: 'set-duplicate-modal',
      payload: { openDuplicate: false }
    })
  }

  const renderLoading = () => {
    setLoading(true)
    dispatch({
      type: 'set-duplicate-modal',
      payload: { openDuplicate: false }
    })
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }
  return (
    <>
      <Dialog open={state.openDuplicate} maxWidth={false}>
        <div style={{ minWidth: '80vw' }}>
          {typeof state.selectedData.invoiceType ===
          'undefined' ? null : state.selectedData.invoiceType.match(
              /manual/i
            ) ? (
            <Manual
              handleClose={handleClose}
              duplicate={state.selectedData}
              renderLoading={renderLoading}
            />
          ) : state.selectedData.invoiceType.match(/auto/i) ? (
            <Automatic
              handleClose={handleClose}
              renderLoading={renderLoading}
            />
          ) : null}
        </div>
      </Dialog>
      {loading ? <LoadingNoDialog text="Saving invoice..." /> : null}
    </>
  )
}

export default DuplicateModal
