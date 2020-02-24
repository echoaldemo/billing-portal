import React from 'react'
import { StateContext } from 'context/StateContext'
import { Modal, TableLoader, LoadingModal } from 'common-components'
import { TableStepper } from 'common-components'
import { Divider, Button } from '@material-ui/core'
import InvoiceDetails from './InvoiceDetails'
import ManagePendingFooter from './components/ManagePendingFooter'
import { patch } from 'utils/api'
import { handleAmt, handleTaxAmt } from './constVar'
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

  const handleSave = () => {
    dispatch({
      type: 'set-edit-manage-data',
      payload: { editManageData: !state.editManageData }
    })
    dispatch({
      type: 'set-update-loading',
      payload: { updateLoading: true }
    })
    const { id, ...rest } = formState
    const { services, litigator, merchant, tax } = state.itemTable
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

      if (handleAmt(services[i]) === 0) {
        rest.campaigns.splice(i, 1)
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
        Amount: parseFloat(merchant.amt) || 0,
        SalesItemLineDetail: {
          ItemRef: {
            value: '25',
            name: 'Merchant fees'
          },
          TaxCodeRef: {
            value: merchant.taxed ? 'TAX' : 'NON'
          },
          Qty: parseFloat(merchant.qty) || 1,
          UnitPrice: parseFloat(merchant.rate) || 0
        }
      })
      if (merchant.taxed) {
        totalAmt += handleTaxAmt(merchant.amt, tax.percentage)
      }
    }
    totalAmt += parseFloat(litigator.amt) + parseFloat(merchant.amt)
    // if (tax.percentage !== 0) {
    //   totalAmt += totalAmt * (tax.percentage / 100) - tax.percentage / 100
    // }
    if (tax.code) {
      rest.TxnTaxDetail = {
        TxnTaxCodeRef: {
          value: tax.code
        },
        TotalTax: totalAmt * (tax.percentage / 100) - tax.percentage / 100,
        TaxLine: [
          {
            DetailType: 'TaxLineDetail',
            Amount: tax,
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
    // setModalLoading(true)
    patch(`/api/pending/edit/${id}`, rest).then(res => {
      dispatch({
        type: 'set-update-loading',
        payload: { updateLoading: false }
      })
      dispatch({
        type: 'set-selected-data',
        payload: { selectedData: res.data }
      })
      getPendingInvoicesData()
      // setModalLoading(false)
    })
  }

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
            onClick={handleSave}
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
      onClose={() => {
        dispatch({ type: 'set-manage-modal', payload: { openManage: false } })
        dispatch({
          type: 'set-edit-manage-data',
          payload: { editManageData: false }
        })
        setFormState({})
      }}
      title={<b>Manage Pending Invoice</b>}
      width="80%"
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
