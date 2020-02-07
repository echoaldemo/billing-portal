import React, { useEffect } from 'react'
import { StateContext } from 'context/StateContext'
import { Modal, TableLoader, LoadingModal } from 'common-components'
import { TableStepper } from 'common-components'
import { Divider, Button } from '@material-ui/core'
import InvoiceDetails from './InvoiceDetails'
import ManagePendingFooter from './components/ManagePendingFooter'
import { patch } from 'utils/api'

export default function ManagePendingInvoice() {
  const {
    state,
    dispatch,
    formState,
    modalLoading,
    setModalLoading,
    setFormState,
    getPendingInvoicesData
  } = React.useContext(StateContext)

  const EditButton = () => {
    return (
      <>
        {state.editManageData ? (
          <Button
            style={{
              textTransform: 'none',
              fontWeight: 'bold',
              color: '#FFF'
            }}
            onClick={() => {
              dispatch({
                type: 'set-edit-manage-data',
                payload: { editManageData: !state.editManageData }
              })
              setFormState(state.selectedData)
              setModalLoading(true)
              setTimeout(() => {
                setModalLoading(false)
              }, 500)
            }}
          >
            Cancel
          </Button>
        ) : null}
        {state.editManageData ? (
          <Button
            style={{
              textTransform: 'none',
              fontWeight: 'bold',
              color: '#FFF'
            }}
            onClick={() => {
              dispatch({
                type: 'set-edit-manage-data',
                payload: { editManageData: !state.editManageData }
              })
              dispatch({
                type: 'set-update-loading',
                payload: { updateLoading: true }
              })
              const { id, ...rest } = formState
              patch(`/api/pending/edit/${id}`, rest)
                .then(res => {
                  dispatch({
                    type: 'set-update-loading',
                    payload: { updateLoading: false }
                  })
                  dispatch({
                    type: 'set-selected-data',
                    payload: { selectedData: res.data }
                  })
                })
                .then(() => {
                  getPendingInvoicesData()
                })
            }}
          >
            Save
          </Button>
        ) : (
          <Button
            style={{
              textTransform: 'none',
              fontWeight: 'bold',
              color: '#FFF'
            }}
            onClick={() => {
              dispatch({
                type: 'set-edit-manage-data',
                payload: { editManageData: !state.editManageData }
              })
            }}
          >
            Edit
          </Button>
        )}
      </>
    )
  }

  return (
    <Modal
      square={true}
      open={state.openManage}
      // open={true}
      onClose={() => {
        dispatch({ type: 'set-manage-modal', payload: { openManage: false } })
      }}
      title={<b>Manage Pending Invoice</b>}
      width={930}
      renderEditButton={EditButton}
    >
      {modalLoading ? (
        <TableLoader />
      ) : (
        <React.Fragment>
          <TableStepper activeStep={state.selectedData.status + 1} />
          <Divider />
          <InvoiceDetails />
          <LoadingModal
            open={state.updateLoading}
            text={`One moment. We're updating stage status…`}
            cancelFn={() => {
              dispatch({
                type: 'set-update-loading',
                payload: { updateLoading: false }
              })
            }}
          />
          <ManagePendingFooter />
        </React.Fragment>
      )}
    </Modal>
  )
}
