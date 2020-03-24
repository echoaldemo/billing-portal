import React, { useState } from 'react'
import { Button, Popover, Typography, Dialog } from '@material-ui/core'
import { Drafts, Visibility, ThumbUp, Error } from '@material-ui/icons'
import { LoadingModal, WarningModal } from 'common-components'
import { StateContext } from 'context/StateContext'
import { patch, post } from 'utils/api'
import { postLog } from 'utils/time'
const statusToString = status => {
  switch (status) {
    case 0:
      return (
        <div className='display-align-center draft-color'>
          <Drafts fontSize='small' /> &nbsp; <b>Draft</b>
        </div>
      )
    case 1:
      return (
        <div className='display-align-center review-color'>
          <Visibility fontSize='small' /> &nbsp; <b>Reviewed</b>
        </div>
      )
    case 2:
      return (
        <div className='display-align-center approve-color'>
          <ThumbUp fontSize='small' /> &nbsp; <b>Approved</b>
        </div>
      )
    default:
      return ''
  }
}

const StatusButton = ({ item }) => {
  const { dispatch, getPendingInvoicesData, state } = React.useContext(
    StateContext
  )
  const [load, setLoad] = useState(false)
  const [invoice, setInvoice] = useState({ open: false, text: '', status: '' })

  const sendToQB = async () => {
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
      getPendingInvoicesData()
    })
  }

  const handleStatus = status => {
    setInvoice({
      open: true,
      status: status
    })
  }

  const updateStateStatus = async status => {
    setLoad(true)
    if (status === 2) {
      await sendToQB()
    }
    await patch(`/api/pending/edit/${item.id}`, { status: status }).then(
      res => {
        dispatch({
          type: 'set-selected-data',
          payload: { selectedData: res.data }
        })
        let logData,
          name = state.userProfile.name
        if (status === 0) {
          logData = {
            type: 'mark-draft',
            description: `${name} marked invoice #${item.id} as a draft.`
          }
        } else if (status === 1) {
          logData = {
            type: 'mark-review',
            description: `${name} marked invoice #${item.id} as reviewed.`
          }
        } else {
          logData = {
            type: 'approve-invoice',
            description: `${name} approved invoice #${item.id}.`
          }
        }
        logData.invoiceId = item.id
        postLog(logData)
      }
    )
    getPendingInvoicesData()
  }
  const [anchorEl, setAnchorEl] = React.useState(null)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined
  return (
    <React.Fragment>
      <LoadingModal open={load} text='Please wait...' />
      <Dialog open={invoice.open}>
        <WarningModal
          text='CONFIRMATION'
          icon={<Error style={{ fontSize: 36, color: '#A6C556' }} />}
          content='Approve this invoice and send to quickbooks?'
          closeFn={() => setInvoice({ open: false, text: '', status: '' })}
          btnText='continue'
          secondaryFn={() => updateStateStatus(invoice.status)}
        />
      </Dialog>
      <Button
        style={{
          textTransform: 'none'
        }}
        onClick={handleClick}
      >
        {statusToString(item.status)}
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left'
        }}
        PaperProps={{
          square: true
        }}
      >
        <Typography className='menu-button-container'>
          {item.status !== 0 ? (
            <span
              className='menu-item'
              onClick={() => {
                updateStateStatus(0)
                handleClose()
              }}
            >
              <b> Mark as Draft</b>
            </span>
          ) : null}

          {item.status !== 1 ? (
            <span
              className='menu-item'
              onClick={() => {
                updateStateStatus(1)
                handleClose()
              }}
            >
              <b>Review</b>
            </span>
          ) : null}

          {item.status !== 2 && (
            <span
              className='menu-item'
              onClick={() => {
                handleStatus(2)
                handleClose()
              }}
            >
              <b>Approve</b>
            </span>
          )}
        </Typography>
      </Popover>
    </React.Fragment>
  )
}

export default StatusButton
