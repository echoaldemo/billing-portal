import React, { useContext, useState, useEffect } from 'react'
import {
  Table,
  TableFooter,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core'
import { InputField } from 'common-components'
import { StateContext } from 'context/StateContext'

const defaultBillable = {
  amt: 0,
  qty: 0,
  rate: ''
}
const defaultPerformance = {
  amt: 0,
  qty: '',
  rate: ''
}
const defaultDid = {
  amt: 0,
  qty: '',
  rate: ''
}
export default function ItemsTable({ formState }) {
  const { state, dispatch } = useContext(StateContext)
  const [billable, setBillable] = useState(defaultBillable)
  const [performance, setPerformance] = useState(defaultPerformance)
  const [did, setDid] = useState(defaultDid)
  const [total, setTotal] = useState(0)
  const [qty, setQty] = useState(0)

  const getTotalQty = () => {
    let totalQty = 0
    formState.Line.forEach(item => {
      if (item.SalesItemLineDetail) {
        totalQty += item.SalesItemLineDetail.Qty
      }
    })
    return totalQty
  }

  useEffect(() => {
    if (Object.keys(formState).length > 0) {
      setTotal(formState.Line[formState.Line.length - 1].Amount)
      try {
        let temp = formState.Line.find(
          line => line.SalesItemLineDetail.ItemRef.value === '21'
        )
        setBillable({
          amt: temp.Amount,
          qty: temp.SalesItemLineDetail.Qty,
          rate: temp.SalesItemLineDetail.UnitPrice
        })
      } catch {
        setBillable(defaultBillable)
      }
      try {
        let temp = formState.Line.find(
          line => line.SalesItemLineDetail.ItemRef.value === '22'
        )
        setPerformance({
          amt: temp.Amount,
          qty: temp.SalesItemLineDetail.Qty,
          rate: temp.SalesItemLineDetail.UnitPrice
        })
      } catch {
        setPerformance(defaultPerformance)
      }
      try {
        let temp = formState.Line.find(
          line => line.SalesItemLineDetail.ItemRef.value === '23'
        )
        setDid({
          amt: temp.Amount,
          qty: temp.SalesItemLineDetail.Qty,
          rate: temp.SalesItemLineDetail.UnitPrice
        })
      } catch {
        setDid(defaultDid)
      }
    }
  }, [formState])

  useEffect(() => {
    setTotal(billable.amt + performance.amt + did.amt)
    dispatch({
      type: 'set-item-table',
      payload: { itemTable: { billable, performance, did } }
    })
    let billQty = billable.qty ? parseInt(billable.qty) : 0
    let perQty = performance.qty ? parseInt(performance.qty) : 0
    let didQty = did.qty ? parseInt(did.qty) : 0
    setQty(billQty + perQty + didQty)
    // eslint-disable-next-line
  }, [billable, performance, did])

  return (
    <React.Fragment>
      {Object.keys(formState).length > 0 ? (
        <TableContainer style={{ border: 'solid 1px #F1f1f1' }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Item Description</b>
                </TableCell>
                <TableCell>
                  <b>Quantity</b>
                </TableCell>
                <TableCell>
                  <b>Rate</b>
                </TableCell>
                <TableCell>
                  <b>Amount</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component="th" scope="row" style={{ width: '50%' }}>
                  Billable hours
                </TableCell>
                <TableCell component="th" scope="row">
                  <InputField
                    fullWidth
                    type="number"
                    disabled={!state.editManageData}
                    value={billable.qty}
                    onChange={e =>
                      setBillable({
                        ...billable,
                        qty: e.target.value,
                        amt: e.target.value * billable.rate
                      })
                    }
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <InputField
                    fullWidth
                    type="number"
                    disabled={!state.editManageData}
                    value={billable.rate}
                    onChange={e =>
                      setBillable({
                        ...billable,
                        rate: e.target.value,
                        amt: e.target.value * billable.qty
                      })
                    }
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {formatter.format(billable.amt)}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell component="th" scope="row" style={{ width: '50%' }}>
                  Performance
                </TableCell>
                <TableCell component="th" scope="row">
                  <InputField
                    fullWidth
                    type="number"
                    disabled={!state.editManageData}
                    value={performance.qty}
                    onChange={e =>
                      setPerformance({
                        ...performance,
                        qty: e.target.value,
                        amt: e.target.value * performance.rate
                      })
                    }
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <InputField
                    fullWidth
                    type="number"
                    disabled={!state.editManageData}
                    value={performance.rate}
                    onChange={e =>
                      setPerformance({
                        ...performance,
                        rate: e.target.value,
                        amt: e.target.value * performance.qty
                      })
                    }
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {formatter.format(performance.amt)}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell component="th" scope="row" style={{ width: '50%' }}>
                  DID
                </TableCell>
                <TableCell component="th" scope="row">
                  <InputField
                    fullWidth
                    type="number"
                    disabled={!state.editManageData}
                    value={did.qty}
                    onChange={e =>
                      setDid({
                        ...did,
                        qty: e.target.value,
                        amt: e.target.value * did.rate
                      })
                    }
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  <InputField
                    fullWidth
                    type="number"
                    disabled={!state.editManageData}
                    value={did.rate}
                    onChange={e =>
                      setDid({
                        ...did,
                        rate: e.target.value,
                        amt: e.target.value * did.qty
                      })
                    }
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {formatter.format(did.amt)}
                </TableCell>
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell component="th" scope="row">
                  <b style={{ fontSize: 15 }}>Total</b>
                </TableCell>

                <TableCell component="th" scope="row">
                  <b style={{ fontSize: 15 }}>{qty}</b>
                </TableCell>
                <TableCell component="th" scope="row"></TableCell>
                <TableCell component="th" scope="row">
                  <b style={{ fontSize: 15 }}>{formatter.format(total)}</b>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      ) : null}
    </React.Fragment>
  )
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})
