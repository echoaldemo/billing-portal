import React from 'react'
import { Button } from '@material-ui/core'
import { StateContext } from 'context/StateContext'
import { patch, post } from 'utils/api'
import { handleAmt, handleTaxAmt } from '../constVar'
import { postLog } from 'utils/time'

export default function ManagePendingFooter() {
  const {
    state,
    dispatch,
    formState,
    getPendingInvoicesData,
    deletePendingStatus,
    setFormState
  } = React.useContext(StateContext)

  const updateStateStatus = status => {
    dispatch({
      type: 'set-update-loading',
      payload: { updateLoading: true }
    })
    let logData,
      name = state.userProfile.name
    switch (status) {
      case 0:
        logData = {
          type: 'mark-draft',
          description: `${name} marked invoice #${formState.id} as a draft.`
        }
        break
      case 1:
        logData = {
          type: 'mark-review',
          description: `${name} marked invoice #${formState.id} as reviewed.`
        }
        break
      case 2:
        logData = {
          type: 'approve-invoice',
          description: `${name} approved invoice #${formState.id}.`
        }
        break
      default:
        return null
    }
    logData['invoiceId'] = formState.id
    patch(`/api/pending/edit/${formState.id}`, { status: status })
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
    postLog(logData)
  }

  const sendToQB = () => {
    const { id, ...rest } = formState
    const { services, litigator, merchant, tax, customerRef } = state.itemTable
    const last = rest.Line[rest.Line.length - 1]
    rest.Line = []
    let totalAmt = 0
    for (let i = 0; i < Object.keys(services).length; i++) {
      const { billable, performance, did, name } = services[i]
      if (billable.amt !== 0) {
        rest.Line.push({
          DetailType: 'SalesItemLineDetail',
          Amount: (billable.qty || 1) * (billable.rate || 0),
          SalesItemLineDetail: {
            ItemRef: {
              value: '21',
              name: 'Billable hours'
            },
            TaxCodeRef: {
              value: billable.taxed ? 'TAX' : 'NON'
            },
            Qty: parseFloat(billable.qty) || 1,
            UnitPrice: parseFloat(billable.rate) || 0
          },
          Description: name
        })
        if (billable.taxed) {
          totalAmt += handleTaxAmt(billable.amt, tax.percentage)
        }
      }
      if (performance.amt !== 0) {
        rest.Line.push({
          DetailType: 'SalesItemLineDetail',
          Amount: (performance.qty || 1) * (performance.rate || 0),
          SalesItemLineDetail: {
            ItemRef: {
              value: '22',
              name: 'Performance'
            },
            TaxCodeRef: {
              value: performance.taxed ? 'TAX' : 'NON'
            },
            Qty: parseFloat(performance.qty) || 1,
            UnitPrice: parseFloat(performance.rate) || 0
          },
          Description: name
        })
        if (performance.taxed) {
          totalAmt += handleTaxAmt(performance.amt, tax.percentage)
        }
      }
      if (did.amt !== 0) {
        rest.Line.push({
          DetailType: 'SalesItemLineDetail',
          Amount: (did.qty || 1) * (did.rate || 0),
          SalesItemLineDetail: {
            ItemRef: {
              value: '23',
              name: 'Did'
            },
            TaxCodeRef: {
              value: did.taxed ? 'TAX' : 'NON'
            },
            Qty: parseFloat(did.qty) || 1,
            UnitPrice: parseFloat(did.rate) || 0
          },
          Description: name
        })
        if (did.taxed) {
          totalAmt += handleTaxAmt(did.amt, tax.percentage)
        }
      }

      totalAmt += handleAmt(services[i])
    }
    if (litigator.amt !== 0) {
      rest.Line.push({
        DetailType: 'SalesItemLineDetail',
        Amount: (litigator.qty || 1) * (litigator.rate || 0),
        SalesItemLineDetail: {
          ItemRef: {
            value: '24',
            name: 'Litigator scrubbing'
          },
          TaxCodeRef: {
            value: litigator.taxed ? 'TAX' : 'NON'
          },
          Qty: parseFloat(litigator.qty) || 1,
          UnitPrice: parseFloat(litigator.rate) || 0
        }
      })
      if (litigator.taxed) {
        totalAmt += handleTaxAmt(litigator.amt, tax.percentage)
      }
    }
    if (merchant.amt !== 0) {
      rest.Line.push({
        DetailType: 'SalesItemLineDetail',
        Amount: parseFloat(merchant.amt),
        SalesItemLineDetail: {
          ItemRef: {
            value: '25',
            name: 'Merchant fees'
          },
          TaxCodeRef: {
            value: merchant.taxed ? 'TAX' : 'NON'
          },
          Qty: 1,
          UnitPrice: parseFloat(merchant.amt)
        },
        Description: `Merchant Fees ${merchant.rate} %`
      })
      if (merchant.taxed) {
        totalAmt += handleTaxAmt(merchant.amt, tax.percentage)
      }
    }
    totalAmt += parseFloat(litigator.amt) + parseFloat(merchant)
    if (tax.percentage !== 0) {
      totalAmt += totalAmt * (tax.percentage / 100) - tax.percentage / 100
    }

    if (tax.code) {
      rest.TxnTaxDetail = {
        TxnTaxCodeRef: {
          value: tax.code
        },
        TotalTax: totalAmt * (tax.percentage / 100) - tax.percentage / 100,
        TaxLine: [
          {
            DetailType: 'TaxLineDetail',
            Amount: tax.amt,
            TaxLineDetail: {
              NetAmountTaxable: totalAmt,
              TaxPercent: tax.percentage,
              TaxRateRef: {
                value: tax.taxRef
              },
              PercentBased: true
            }
          }
        ]
      }
    } else {
      rest.TxnTaxDetail = null
    }
    last.Amount = totalAmt
    rest.total = totalAmt
    rest.Line.push(last)
    rest.CustomerRef = { value: customerRef }
    rest.TxnDate = rest.startDate
    rest.DueDate = rest.dueDate
    rest.CustomerMemo = {
      value: `Wire/ACH Instructions:\nRouting 124301025\nAccount: 4134870\nBIC: AMFOUS51\nPeople's Intermountain Bank\n712 E Main St\nLehi, UT, 84043\nIf paying by wire, please include your\ncompany name in the memo.\n\nIf you have any questions or concerns about current or past invoices,\ncontact Tanner Purser directly at 801-805-4602`
    }
    ;[
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

    post('/api/invoice', rest)
      .then(() => {
        dispatch({
          type: 'set-update-loading',
          payload: { updateLoading: false }
        })
        dispatch({
          type: 'set-manage-modal',
          payload: { openManage: false }
        })
        dispatch({
          type: 'set-edit-manage-data',
          payload: { editManageData: false }
        })
        setFormState({})
      })
      .then(() => {
        getPendingInvoicesData()
      })
  }

  const renderStageButton = item => {
    switch (item) {
      case 0:
        return (
          <Button
            variant='contained'
            color='primary'
            style={{
              fontWeight: 'bold',
              backgroundColor: '#f89222',
              textDecoration: 'none'
            }}
            onClick={() => {
              updateStateStatus(1)
            }}
          >
            Complete Review
          </Button>
        )
      case 1:
        return (
          <Button
            variant='contained'
            color='primary'
            style={{
              fontWeight: 'bold',
              backgroundColor: '#2ca01d',
              textDecoration: 'none'
            }}
            onClick={() => {
              sendToQB()
              updateStateStatus(2)
            }}
          >
            Approve Invoice
          </Button>
        )
      default:
        return null
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 15
      }}
    >
      <div>
        <Button
          variant='contained'
          color='secondary'
          style={{ fontWeight: 'bold', textDecoration: 'none' }}
          onClick={() => {
            deletePendingStatus(state.selectedData.id)
          }}
        >
          Delete
        </Button>
        {/* &emsp;
        <h5 style={{ display: 'inline-block', color: '#444851' }}>
          Enim nostrud ipsum cupidatat ad elit officia velit deserunt laboris.
        </h5> */}
      </div>
      <div>
        {state.selectedData.status === 0 ? (
          <Button
            variant='contained'
            style={{ fontWeight: 'bold', textDecoration: 'none' }}
            onClick={() => {
              updateStateStatus(2)
            }}
          >
            Skip
          </Button>
        ) : (
          <Button
            variant='contained'
            style={{ fontWeight: 'bold', textDecoration: 'none' }}
            onClick={() => {
              updateStateStatus(state.selectedData.status - 1, 'revert')
            }}
          >
            Revert
          </Button>
        )}
        &emsp;
        {renderStageButton(state.selectedData.status)}
      </div>
    </div>
  )
}
