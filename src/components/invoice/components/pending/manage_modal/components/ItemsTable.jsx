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
import {
  defaultBillable,
  defaultPerformance,
  defaultDid,
  defaultLitigator,
  formatter,
  handleQty,
  handleRate,
  handleAmt
} from '../constVar'

export default function ItemsTable({ campaigns, selectedCampaigns }) {
  const { state, dispatch, formState } = useContext(StateContext)
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
  const [collapsed, setCollapsed] = useState([])
  const [services, setServices] = useState({})

  const gatherData = async () => {
    let array = [],
      temp = {}
    formState.campaigns.forEach((camp, i) => {
      let obj = {}
      let result = formState.Line.filter(line => line.Description === camp.name)
      try {
        temp = result.find(
          res => res.SalesItemLineDetail.ItemRef.value === '21'
        )
        obj.billable = {
          amt: temp.Amount,
          qty: temp.SalesItemLineDetail.Qty,
          rate: temp.SalesItemLineDetail.UnitPrice
        }
      } catch {
        obj.billable = defaultBillable
      }
      try {
        temp = result.find(
          res => res.SalesItemLineDetail.ItemRef.value === '22'
        )
        obj.performance = {
          amt: temp.Amount,
          qty: temp.SalesItemLineDetail.Qty,
          rate: temp.SalesItemLineDetail.UnitPrice
        }
      } catch {
        obj.performance = defaultPerformance
      }
      try {
        temp = result.find(
          res => res.SalesItemLineDetail.ItemRef.value === '23'
        )
        obj.did = {
          amt: temp.Amount,
          qty: temp.SalesItemLineDetail.Qty,
          rate: temp.SalesItemLineDetail.UnitPrice
        }
      } catch {
        obj.did = defaultDid
      }
      array.push(obj)
    })
    try {
      temp = formState.Line.find(
        res => res.SalesItemLineDetail.ItemRef.value === '24'
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
      temp = formState.Line.find(
        res => res.SalesItemLineDetail.ItemRef.value === '25'
      )
      setMerchant(temp.Amount)
    } catch {
      setMerchant(0)
    }
    setServices({ ...array })
  }

  useEffect(() => {
    if (Object.keys(formState).length > 0) {
      setTotal(formState.Line[formState.Line.length - 1].Amount)
      gatherData()
    }
    // eslint-disable-next-line
  }, [formState])

  useEffect(() => {
    let totalAmt = 0,
      totalQty = 0
    if (Object.keys(services).length !== 0) {
      for (let i = 0; i < Object.keys(services).length; i++) {
        totalAmt += handleAmt(services[i])
        totalQty += handleQty(services[i])
      }
      totalAmt += parseFloat(litigator.amt) + parseFloat(merchant)
      totalQty += parseFloat(litigator.qty ? litigator.qty : 0)
      if (tax.selected !== 0) {
        let taxx = totalAmt * (tax.selected / 100) - tax.selected / 100
        totalAmt += taxx
        setTax({ ...tax, amt: taxx })
      }
      dispatch({
        type: 'set-item-table',
        payload: { itemTable: { services, litigator, merchant } }
      })
      setTotal(totalAmt)
      setQty(totalQty)
    }
    // eslint-disable-next-line
  }, [services, litigator, merchant, tax.selected])

  const handleChange = (e, i, change, unchange) => {
    setServices({
      ...services,
      [i]: {
        ...services[i],
        [e.target.name]: {
          ...services[i][e.target.name],
          [change]: e.target.value,
          amt: e.target.value * services[i][e.target.name][unchange]
        }
      }
    })
  }

  return (
    <React.Fragment>
      {Object.keys(formState).length > 0 ? (
        <>
          <TableContainer style={{ border: 'solid 1px #F1f1f1' }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: '35%' }}>
                    <b>Item Description</b>
                  </TableCell>
                  <TableCell style={{ width: '20%' }}>
                    <b>Quantity</b>
                  </TableCell>
                  <TableCell style={{ width: '20%' }}>
                    <b>Rate</b>
                  </TableCell>
                  <TableCell style={{ width: '20%' }}>
                    <b>Amount</b>
                  </TableCell>
                  <TableCell style={{ width: '5%' }} />
                </TableRow>
              </TableHead>
            </Table>
            {formState.campaigns.map((camp, i) => {
              return (
                <div key={camp.uuid}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell style={{ width: '35%' }}>
                          <div
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <b>{camp.name}</b>
                          </div>
                        </TableCell>
                        <TableCell style={{ width: '20%' }}>
                          {services[i] && !collapsed.includes(i)
                            ? handleQty(services[i])
                            : ''}
                        </TableCell>
                        <TableCell style={{ width: '20%' }}>
                          {services[i] && !collapsed.includes(i)
                            ? handleRate(services[i])
                            : ''}
                        </TableCell>
                        <TableCell style={{ width: '20%' }}>
                          {services[i] && !collapsed.includes(i)
                            ? formatter.format(handleAmt(services[i]))
                            : ''}
                        </TableCell>
                        <TableCell style={{ width: '5%' }}>
                          {collapsed.includes(i) ? (
                            <ExpandLess
                              style={{ cursor: 'pointer' }}
                              onClick={() =>
                                setCollapsed(collapsed.filter(c => c !== i))
                              }
                            />
                          ) : (
                            <ExpandMore
                              style={{ cursor: 'pointer' }}
                              onClick={() => setCollapsed([...collapsed, i])}
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  <Collapse in={collapsed.includes(i)} unmountOnExit>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell style={{ width: '35%' }}>
                            <span style={{ marginLeft: 8 }} />
                            Billable hours
                          </TableCell>
                          <TableCell style={{ width: '20%' }}>
                            <InputField
                              fullWidth
                              type="number"
                              inputProps={{
                                min: 0
                              }}
                              name="billable"
                              disabled={!state.editManageData}
                              value={
                                services[i] ? services[i].billable.qty : ''
                              }
                              onChange={e => handleChange(e, i, 'qty', 'rate')}
                            />
                          </TableCell>
                          <TableCell style={{ width: '20%' }}>
                            <InputField
                              fullWidth
                              type="number"
                              inputProps={{
                                min: 0
                              }}
                              name="billable"
                              disabled={!state.editManageData}
                              value={
                                services[i] ? services[i].billable.rate : ''
                              }
                              onChange={e => handleChange(e, i, 'rate', 'qty')}
                            />
                          </TableCell>
                          <TableCell style={{ width: '20%' }}>
                            {formatter.format(
                              services[i] ? services[i].billable.amt : ''
                            )}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ width: '35%' }}>
                            <span style={{ marginLeft: 8 }} />
                            Performance
                          </TableCell>
                          <TableCell style={{ width: '20%' }}>
                            <InputField
                              fullWidth
                              type="number"
                              inputProps={{
                                min: 0
                              }}
                              name="performance"
                              disabled={!state.editManageData}
                              value={
                                services[i] ? services[i].performance.qty : ''
                              }
                              onChange={e => handleChange(e, i, 'qty', 'rate')}
                            />
                          </TableCell>
                          <TableCell style={{ width: '20%' }}>
                            <InputField
                              fullWidth
                              type="number"
                              inputProps={{
                                min: 0
                              }}
                              name="performance"
                              disabled={!state.editManageData}
                              value={
                                services[i] ? services[i].performance.rate : ''
                              }
                              onChange={e => handleChange(e, i, 'rate', 'qty')}
                            />
                          </TableCell>
                          <TableCell style={{ width: '20%' }}>
                            {formatter.format(
                              services[i] ? services[i].performance.amt : ''
                            )}
                          </TableCell>
                          <TableCell />
                        </TableRow>
                        <TableRow>
                          <TableCell style={{ width: '35%' }}>
                            <span style={{ marginLeft: 8 }} />
                            Did
                          </TableCell>
                          <TableCell style={{ width: '20%' }}>
                            <InputField
                              fullWidth
                              type="number"
                              inputProps={{
                                min: 0
                              }}
                              name="did"
                              disabled={!state.editManageData}
                              value={services[i] ? services[i].did.qty : ''}
                              onChange={e => handleChange(e, i, 'qty', 'rate')}
                            />
                          </TableCell>
                          <TableCell style={{ width: '20%' }}>
                            <InputField
                              fullWidth
                              type="number"
                              inputProps={{
                                min: 0
                              }}
                              name="did"
                              disabled={!state.editManageData}
                              value={services[i] ? services[i].did.rate : ''}
                              onChange={e => handleChange(e, i, 'rate', 'qty')}
                            />
                          </TableCell>
                          <TableCell>
                            {formatter.format(
                              services[i] ? services[i].did.amt : ''
                            )}
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Collapse>
                </div>
              )
            })}
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell style={{ width: '35%' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <b>Additional fees</b>
                    </div>
                  </TableCell>
                  <TableCell style={{ width: '20%' }}>
                    {!add ? litigator.qty || 0 : ''}
                  </TableCell>
                  <TableCell style={{ width: '20%' }}>
                    {!add ? litigator.rate || 0 : ''}
                  </TableCell>
                  <TableCell style={{ width: '20%' }}>
                    {!add ? formatter.format(litigator.amt + merchant) : ''}
                  </TableCell>
                  <TableCell style={{ width: '5%' }}>
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
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Collapse in={add} unmountOnExit>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell style={{ width: '35%' }}>
                      Litigator Scrubbing
                    </TableCell>
                    <TableCell style={{ width: '20%' }}>
                      <InputField
                        fullWidth
                        type="number"
                        inputProps={{
                          min: 0
                        }}
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
                        inputProps={{
                          min: 0
                        }}
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
                    <TableCell />
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ width: '35%' }}>
                      Merchant Fees
                    </TableCell>
                    <TableCell style={{ width: '20%' }}></TableCell>
                    <TableCell style={{ width: '20%' }}></TableCell>
                    <TableCell style={{ width: '20%' }}>
                      <InputField
                        fullWidth
                        type="number"
                        inputProps={{
                          min: 0
                        }}
                        disabled={!state.editManageData}
                        value={merchant || ''}
                        onChange={e =>
                          setMerchant(parseFloat(e.target.value) || 0)
                        }
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">$</InputAdornment>
                          )
                        }}
                      />
                    </TableCell>
                    <TableCell />
                  </TableRow>
                </TableBody>
              </Table>
            </Collapse>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell style={{ width: '35%' }}>Taxable</TableCell>
                  <TableCell style={{ width: '40%' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Checkbox
                        checked={editTax}
                        onChange={e => {
                          setEditTax(e.target.checked)
                          if (!e.target.checked) {
                            setTax({ selected: 0, amt: 0 })
                          }
                        }}
                        disabled={!state.editManageData}
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
                  <TableCell />
                </TableRow>
              </TableBody>
            </Table>

            <Table>
              <TableBody>
                <TableRow>
                  <TableCell style={{ width: '35%' }}>
                    <b style={{ fontSize: 15 }}>Total</b>
                  </TableCell>

                  <TableCell style={{ width: '20%' }}>
                    <b style={{ fontSize: 15 }}>{qty}</b>
                  </TableCell>
                  <TableCell style={{ width: '20%' }}></TableCell>
                  <TableCell style={{ width: '20%' }}>
                    <b style={{ fontSize: 15 }}>{formatter.format(total)}</b>
                  </TableCell>
                  <TableCell style={{ width: '5%' }} />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : null}
    </React.Fragment>
  )
}
