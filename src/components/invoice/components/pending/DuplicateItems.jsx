import React, { useState, useContext } from 'react'
import { Dialog } from '@material-ui/core'
import { Error } from '@material-ui/icons'
import { LoadingModal, WarningModal } from 'common-components'
import { StateContext } from 'context/StateContext'
import { post } from 'utils/api'
import { postLog, formatArray } from 'utils/time'

const DuplicateItems = () => {
  const {
    confirmModal,
    selectedItems,
    getPendingInvoicesData,
    setSelectedItems,
    setConfirmModal,
    state
  } = useContext(StateContext)
  const [duplicateLoading, setDuplicateLoading] = useState(false)
  const [duplicateCount, setDuplicateCount] = useState(0)

  const duplicateSelectedItems = async () => {
    setDuplicateLoading(true)
    setConfirmModal({ ...confirmModal, duplicate: false })
    let nameArr = []
    for (let i = 0; i < selectedItems.length; i++) {
      let { id, ...rest } = selectedItems[i]
      await post(`/api/create_pending`, { ...rest, status: 0 }).then(() => {
        setDuplicateCount(i + 1)
      })
      nameArr.push(`#${selectedItems[i].id}`)
    }
    postLog({
      type: 'duplicate-invoice',
      description: `${state.userProfile.name} duplicated invoice ${formatArray(
        nameArr
      )}.`,
      invoiceId: null
    })
    setDuplicateLoading(false)
    getPendingInvoicesData()
    setSelectedItems([])
  }

  return (
    <>
      <Dialog open={confirmModal.duplicate}>
        <WarningModal
          text='CONFIRMATION'
          icon={<Error style={{ fontSize: 36, color: '#A6C556' }} />}
          content={`Are you sure to duplicate this ${selectedItems.length} ${
            selectedItems.length > 1 ? 'Invoices' : 'Invoice'
          }`}
          closeFn={() => setConfirmModal({ ...confirmModal, duplicate: false })}
          btnText='continue'
          secondaryFn={duplicateSelectedItems}
        />
      </Dialog>
      <LoadingModal
        open={duplicateLoading}
        text={`Duplicating ${duplicateCount} of ${selectedItems.length} selected items`}
        cancelFn={() => {
          setDuplicateLoading(false)
        }}
      />
    </>
  )
}

export default DuplicateItems
