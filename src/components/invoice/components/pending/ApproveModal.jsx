import React from 'react'
import { Dialog } from '@material-ui/core'
import { Error } from '@material-ui/icons'
import { LoadingModal, WarningModal } from 'common-components'
import { StateContext } from 'context/StateContext'
import { patch, post } from 'utils/api'
import { postLog } from 'utils/time'

const ApproveModal = () => {
  const {
    confirmModal,
    setConfirmModal,
    selectedItems,
    getPendingInvoicesData,
    setSelectedItems,
    state
  } = React.useContext(StateContext)

  const [loading, setLoading] = React.useState(false)
  const [approveCount, setApproveCount] = React.useState(0)

  const handleModalClose = () => {
    setConfirmModal({ ...confirmModal, approve: false })
  }

  const sendToQB = async item => {
    const rest = JSON.parse(JSON.stringify(item))
    rest.CustomerRef = { value: rest.company.qb_id }
    rest.CustomerMemo = {
      value: `Wire/ACH Instructions:\nRouting 124301025\nAccount: 4134870\nBIC: AMFOUS51\nPeople's Intermountain Bank\n712 E Main St\nLehi, UT, 84043\nIf paying by wire, please include your\ncompany name in the memo.\n\nIf you have any questions or concerns about current or past invoices,\ncontact Tanner Purser directly at 801-805-4602`
    }
    ;[
      'id',
      'campaigns',
      'company',
      'startDate',
      'dueDate',
      'total',
      'invoiceType',
      'billingType',
      'docNumber',
      'status'
    ].map(label => delete rest[label])
    await post('/api/invoice', rest).catch(err => {
      console.log(err)
    })
  }

  const approveSelectedItems = async () => {
    setLoading(true)
    handleModalClose()
    for (let i = 0; i < selectedItems.length; i++) {
      if (selectedItems[i].status !== 2) {
        await sendToQB(selectedItems[i])
        await patch(`/api/pending/edit/${selectedItems[i].id}`, {
          status: 2
        }).then(() => {
          setApproveCount(i + 1)
        })
      }
    }
    let desc
    if (selectedItems.length > 1)
      desc = `${state.userProfile.name} approved ${selectedItems.length} invoices.`
    else
      desc = `${state.userProfile.name} approved invoice #${selectedItems[0].id}.`
    postLog({
      type: 'approve-invoice',
      description: desc,
      invoiceId: null
    })
    setLoading(false)
    getPendingInvoicesData()
    setSelectedItems([])
  }

  return (
    <React.Fragment>
      <Dialog open={confirmModal.approve}>
        <WarningModal
          text='CONFIRMATION'
          icon={<Error style={{ fontSize: 36, color: '#A6C556' }} />}
          content={`Are you sure to approve this ${selectedItems.length} ${
            selectedItems.length > 1 ? 'Invoices' : 'Invoice'
          }`}
          closeFn={handleModalClose}
          btnText='continue'
          secondaryFn={approveSelectedItems}
        />
      </Dialog>
      <LoadingModal
        open={loading}
        text={`Approving ${approveCount} of ${selectedItems.length}`}
        cancelFn={() => {
          setLoading(false)
        }}
      />
    </React.Fragment>
  )
}

export default ApproveModal
