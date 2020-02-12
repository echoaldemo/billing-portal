import React, { useContext, useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  Collapse,
  InputAdornment,
  MenuItem,
  Checkbox
} from '@material-ui/core'
import { ExpandMore, ExpandLess } from '@material-ui/icons'
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
const defaultLitigator = {
  amt: 0,
  qty: '',
  rate: ''
}
export default function ItemsTable({ formState }) {
  const { state, dispatch } = useContext(StateContext)
  const [billable, setBillable] = useState(defaultBillable)
  const [performance, setPerformance] = useState(defaultPerformance)
  const [did, setDid] = useState(defaultDid)
  const [litigator, setLitiGator] = useState(defaultLitigator)
  const [merchant, setMerchant] = useState(0)
  const [total, setTotal] = useState(0)
  const [qty, setQty] = useState(0)
  const [add, setAdd] = useState(false)
  const [editTax, setEditTax] = useState(false)
  const [tax, setTax] = useState({
    selected: 0,
    amt: 0
  })

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
      try {
        let temp = formState.Line.find(
          line => line.SalesItemLineDetail.ItemRef.value === '24'
        )
        setLitiGator({
          amt: temp.Amount,
          qty: temp.SalesItemLineDetail.Qty,
          rate: temp.SalesItemLineDetail.UnitPrice
        })
      } catch {
        setLitiGator(defaultLitigator)
      }
      try {
        let temp = formState.Line.find(
          line => line.SalesItemLineDetail.ItemRef.value === '24'
        )
        setMerchant(parseFloat(temp.Amount))
      } catch {
        setMerchant(defaultLitigator)
      }
      try {
        setTax({
          ...tax,
          selected: formState.TxnTaxDetail.TaxLine[0].TaxLineDetail.TaxPercent
        })
        setEditTax(true)
      } catch {
        setTax({ ...tax, selected: 0 })
      }
    }
    // eslint-disable-next-line
  }, [formState])

  useEffect(() => {
    let totalAmt
    if (tax.selected !== 0) {
      totalAmt =
        billable.amt + performance.amt + did.amt + litigator.amt + merchant
      let taxx = totalAmt * (tax.selected / 100) - tax.selected / 100
      totalAmt += taxx
      setTax({ ...tax, amt: taxx })
    } else {
      totalAmt =
        billable.amt + performance.amt + did.amt + litigator.amt + merchant
    }
    setTotal(totalAmt)
    dispatch({
      type: 'set-item-table',
      payload: { itemTable: { billable, performance, did } }
    })
    let billQty = billable.qty ? parseInt(billable.qty) : 0
    let perQty = performance.qty ? parseInt(performance.qty) : 0
    let didQty = did.qty ? parseInt(did.qty) : 0
    let litiQty = litigator.qty ? parseInt(litigator.qty) : 0
    setQty(billQty + perQty + didQty + litiQty)
    // eslint-disable-next-line
  }, [billable, performance, did, litigator, merchant, tax.selected])

  return (
    <React.Fragment>
      {Object.keys(formState).length > 0 ? (
        <>
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
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ width: '40%' }}
                  >
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
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ width: '20%' }}
                  >
                    {formatter.format(billable.amt)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ width: '40%' }}
                  >
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
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ width: '20%' }}
                  >
                    {formatter.format(performance.amt)}
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ width: '40%' }}
                  >
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
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ width: '20%' }}
                  >
                    {formatter.format(did.amt)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <b>Additional fees</b>
                      {add ? (
                        <ExpandLess
                          style={{ cursor: 'pointer' }}
                          onClick={() => setAdd(false)}
                        />
                      ) : (
                        <ExpandMore
                          style={{ cursor: 'pointer' }}
                          onClick={() => setAdd(true)}
                        />
                      )}
                    </div>
                  </TableCell>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                </TableRow>
              </TableBody>
            </Table>
            <Collapse in={add} unmountOnExit>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ width: '40%' }}>
                      Litigator Scrubbing
                    </TableCell>
                    <TableCell style={{ width: '20%' }}>
                      <InputField
                        fullWidth
                        type="number"
                        disabled={!state.editManageData}
                        value={litigator.qty}
                        onChange={e =>
                          setLitiGator({
                            ...litigator,
                            qty: e.target.value,
                            amt: e.target.value * litigator.rate
                          })
                        }
                      />
                    </TableCell>
                    <TableCell style={{ width: '20%' }}>
                      <InputField
                        fullWidth
                        type="number"
                        disabled={!state.editManageData}
                        value={litigator.rate}
                        onChange={e =>
                          setLitiGator({
                            ...litigator,
                            rate: e.target.value,
                            amt: e.target.value * litigator.qty
                          })
                        }
                      />
                    </TableCell>
                    <TableCell style={{ width: '20%' }}>
                      {formatter.format(litigator.amt)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ width: '40%' }}>
                      Merchant Fees
                    </TableCell>
                    <TableCell style={{ width: '20%' }}></TableCell>
                    <TableCell style={{ width: '20%' }}></TableCell>
                    <TableCell style={{ width: '20%' }}>
                      <InputField
                        fullWidth
                        type="number"
                        disabled={!state.editManageData}
                        value={merchant}
                        onChange={e => setMerchant(e.target.value)}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                          )
                        }}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Collapse>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell style={{ width: '40%' }}>Taxable</TableCell>
                  <TableCell style={{ width: '40%' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Checkbox
                        checked={editTax}
                        onChange={e => {
                          setEditTax(e.target.checked)
                          if (!e.target.checked) {
                            setTax({ ...tax, selected: 0 })
                          }
                        }}
                      />
                      <InputField
                        select
                        disabled={!editTax || !state.editManageData}
                        value={tax.selected}
                        onChange={e =>
                          setTax({ ...tax, selected: e.target.value })
                        }
                      >
                        <MenuItem value="0">Select taxation</MenuItem>
                        <MenuItem value="6.1">Utah (6.1%)</MenuItem>
                        <MenuItem value="8">California (8%)</MenuItem>
                        <MenuItem value="16">Mexico (16%)</MenuItem>
                      </InputField>
                    </div>
                  </TableCell>
                  <TableCell style={{ width: '20%' }}>
                    {formatter.format(tax.amt)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <Table>
              <TableBody>
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ width: '40%' }}
                  >
                    <b style={{ fontSize: 15 }}>Total</b>
                  </TableCell>

                  <TableCell
                    component="th"
                    scope="row"
                    style={{ width: '20%' }}
                  >
                    <b style={{ fontSize: 15 }}>{qty}</b>
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ width: '20%' }}
                  ></TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    style={{ width: '20%' }}
                  >
                    <b style={{ fontSize: 15 }}>{formatter.format(total)}</b>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : null}
    </React.Fragment>
  )
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
})
