import React, { useContext, useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableRow,
  Collapse,
  MenuItem,
  Checkbox
} from '@material-ui/core'
import { ExpandMore, ExpandLess } from '@material-ui/icons'
import { InputField, TimeInput } from 'common-components'
import { StateContext } from 'context/StateContext'
import {
  defaultBillable,
  defaultPerformance,
  defaultDid,
  defaultLitigator,
  defaultMerchant,
  formatter,
  handleAmt,
  handleServices,
  handleAdditional,
  useStyles,
  mockTaxation,
  handleTaxAmt
} from '../constVar'
import TableHeader from './TableHeader'

export default function ItemsTable() {
  const classes = useStyles()
  const { state, dispatch, formState } = useContext(StateContext)
  const [litigator, setLitiGator] = useState(defaultLitigator)
  const [merchant, setMerchant] = useState(defaultMerchant)
  const [total, setTotal] = useState(0)
  const [add, setAdd] = useState(false)
  const [tax, setTax] = useState({
    percentage: 0,
    amt: 0,
    code: '',
    taxRef: ''
  })
  const [collapsed, setCollapsed] = useState([])
  const [customerRef, setCustomer] = useState('')
  const [services, setServices] = useState({})
  const [billableTime, setBillableTime] = useState({})

  const convertToHM = decimalTime => {
    decimalTime = decimalTime * 60 * 60
    const hours = Math.floor(decimalTime / (60 * 60))
    decimalTime = decimalTime - hours * 60 * 60
    const minutes = Math.floor(decimalTime / 60)
    return { hours, minutes }
  }
  const gatherData = () => {
    let array = [],
      temp = {},
      timeArray = [],
      checkTax = null
    checkTax = formState.TxnTaxDetail
    setCustomer(formState.company.qb_id)

    formState.campaigns.forEach(camp => {
      let obj = {}
      let result = formState.Line.filter(line => line.Description === camp.name)
      try {
        temp = result.find(
          res => res.SalesItemLineDetail.ItemRef.value === '21'
        )
        obj.billable = {
          amt: temp.Amount,
          qty: temp.SalesItemLineDetail.Qty,
          rate: temp.SalesItemLineDetail.UnitPrice,
          taxed:
            temp.SalesItemLineDetail.TaxCodeRef.value === 'TAX' ? true : false
        }
        const time = convertToHM(temp.SalesItemLineDetail.Qty)
        timeArray.push({
          hour: time.hours,
          min: time.minutes
        })
      } catch {
        if (checkTax === null) {
          defaultBillable.taxed = false
        }
        obj.billable = defaultBillable
        timeArray.push({
          hour: 0,
          min: 0
        })
      }
      try {
        temp = result.find(
          res => res.SalesItemLineDetail.ItemRef.value === '22'
        )
        obj.performance = {
          amt: temp.Amount,
          qty: temp.SalesItemLineDetail.Qty,
          rate: temp.SalesItemLineDetail.UnitPrice,
          taxed:
            temp.SalesItemLineDetail.TaxCodeRef.value === 'TAX' ? true : false
        }
      } catch {
        if (checkTax === null) {
          defaultPerformance.taxed = false
        }
        obj.performance = defaultPerformance
      }
      try {
        temp = result.find(
          res => res.SalesItemLineDetail.ItemRef.value === '23'
        )
        obj.did = {
          amt: temp.Amount,
          qty: temp.SalesItemLineDetail.Qty,
          rate: temp.SalesItemLineDetail.UnitPrice,
          taxed:
            temp.SalesItemLineDetail.TaxCodeRef.value === 'TAX' ? true : false
        }
      } catch {
        if (checkTax === null) {
          defaultDid.taxed = false
        }
        obj.did = defaultDid
      }
      obj.name = camp.name
      array.push(obj)
    })
    setBillableTime({ ...timeArray })
    try {
      temp = formState.Line.find(
        res => res.SalesItemLineDetail.ItemRef.value === '24'
      )
      setLitiGator({
        amt: temp.Amount,
        qty: temp.SalesItemLineDetail.Qty,
        rate: temp.SalesItemLineDetail.UnitPrice,
        taxed:
          temp.SalesItemLineDetail.TaxCodeRef.value === 'TAX' ? true : false
      })
    } catch {
      if (checkTax === null) {
        defaultLitigator.taxed = false
      }
      setLitiGator(defaultLitigator)
    }
    try {
      temp = formState.Line.find(
        res => res.SalesItemLineDetail.ItemRef.value === '25'
      )
      setMerchant({
        amt: temp.Amount,
        qty: temp.SalesItemLineDetail.Qty,
        rate: temp.SalesItemLineDetail.UnitPrice,
        taxed:
          temp.SalesItemLineDetail.TaxCodeRef.value === 'TAX' ? true : false
      })
    } catch {
      if (checkTax === null) {
        defaultMerchant.taxed = false
      }
      setMerchant(defaultMerchant)
    }
    try {
      setTax({
        ...tax,
        percentage: formState.TxnTaxDetail.TaxLine[0].TaxLineDetail.TaxPercent,
        code: formState.TxnTaxDetail.TxnTaxCodeRef.value,
        taxRef:
          formState.TxnTaxDetail.TaxLine[0].TaxLineDetail.TaxRateRef.value,
        edit: true
      })
    } catch {
      setTax({ ...tax, percentage: 0, code: '', edit: false })
    }
    setServices({ ...array })
  }

  useEffect(() => {
    if (Object.keys(formState).length > 0) {
      setTotal(formState.Line[formState.Line.length - 1].Amount)
      // if (formState.campaigns.length === 1) {
      //   setCollapsed([...collapsed, 0])
      // }
      gatherData()
    }
    return () => {
      setCollapsed([])
      setTax({
        percentage: 0,
        amt: 0,
        code: '',
        taxRef: ''
      })
    }
    // eslint-disable-next-line
  }, [formState])

  useEffect(() => {
    let totalAmt = 0,
      taxx = 0
    if (Object.keys(services).length !== 0) {
      for (let i = 0; i < Object.keys(services).length; i++) {
        totalAmt += handleAmt(services[i])
        if (services[i].billable.taxed) {
          taxx += handleTaxAmt(services[i].billable.amt, tax.percentage)
        }
        if (services[i].performance.taxed) {
          taxx += handleTaxAmt(services[i].performance.amt, tax.percentage)
        }
        if (services[i].did.taxed) {
          taxx += handleTaxAmt(services[i].did.amt, tax.percentage)
        }
      }
      if (litigator.taxed) {
        taxx += handleTaxAmt(litigator.amt, tax.percentage)
      }
      if (merchant.taxed) {
        taxx += handleTaxAmt(merchant.amt, tax.percentage)
      }
      totalAmt += parseFloat(litigator.amt) + parseFloat(merchant.amt)
      if (tax.percentage !== 0) {
        totalAmt += taxx
      }
      setTax({ ...tax, amt: taxx })
      dispatch({
        type: 'set-item-table',
        payload: {
          itemTable: { services, litigator, merchant, tax, customerRef }
        }
      })
      setTotal(totalAmt)
    }
    // eslint-disable-next-line
  }, [services, litigator, merchant, tax.percentage])

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

  const handleChangeTax = e => {
    let obj = services
    if (e.target.value === 0) {
      setTax({ amt: 0, percentage: 0, code: '', edit: false })
      for (let i = 0; i < Object.keys(obj).length; i++) {
        obj[i].billable.taxed = false
        obj[i].performance.taxed = false
        obj[i].did.taxed = false
      }
      setLitiGator({ ...litigator, taxed: false })
      setMerchant({ ...merchant, taxed: false })
    } else {
      setTax({
        ...tax,
        ...mockTaxation.find(mt => mt.code === e.target.value),
        edit: true
      })
      for (let i = 0; i < Object.keys(obj).length; i++) {
        obj[i].billable.taxed = true
        obj[i].performance.taxed = true
        obj[i].did.taxed = true
      }
      setLitiGator({ ...litigator, taxed: true })
      setMerchant({ ...merchant, taxed: true })
    }

    setServices(obj)
  }

  const handleTax = (e, type, i) => {
    if (type === 'litigator') {
      setLitiGator({ ...litigator, taxed: e.target.checked })
    } else if (type === 'merchant') {
      setMerchant({ ...merchant, taxed: e.target.checked })
    } else {
      setServices({
        ...services,
        [i]: {
          ...services[i],
          [type]: {
            ...services[i][type],
            taxed: e.target.checked
          }
        }
      })
    }
  }

  const handleBillableTime = (value, type, index) => {
    let temp = 0

    if (type === 'hour') {
      temp = `${value}:${billableTime[index].min}`
      setBillableTime({
        ...billableTime,
        [index]: { ...billableTime[index], [type]: value }
      })
    } else {
      temp = `${billableTime[index].hour}:${value < 59 ? value : 59}`
      setBillableTime({
        ...billableTime,
        [index]: {
          ...billableTime[index],
          [type]: value < 59 ? value : 59
        }
      })
    }
    const arr = temp.split(':')
    const dec = parseInt((arr[1] / 6) * 10, 10)
    const final =
      parseFloat(parseInt(arr[0], 10) + '.' + (dec < 10 ? '0' : '') + dec) || 0

    const obj = { target: { name: 'billable', value: final } }

    handleChange(obj, index, 'qty', 'rate')
  }

  const handleCollapse = index => {
    if (collapsed.includes(index)) {
      setCollapsed(collapsed.filter(c => c !== index))
    } else {
      setCollapsed([...collapsed, index])
    }
  }
  return (
    <React.Fragment>
      {Object.keys(formState).length > 0 ? (
        <>
          <TableContainer style={{ border: 'solid 1px #F1f1f1' }}>
            <TableHeader />
            {formState.campaigns.map((camp, i) => {
              return (
                <div key={camp.uuid}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className={classes.tab1}>
                          <div
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            <b>{camp.name}</b>
                          </div>
                        </TableCell>
                        <TableCell className={classes.tab5}>
                          {services[i] && !collapsed.includes(i) ? null : (
                            <Checkbox
                              disabled={!state.editManageData || !tax.edit}
                              checked={
                                !!(services[i] && services[i].billable.taxed)
                              }
                              onChange={e => handleTax(e, 'billable', i)}
                            />
                          )}
                        </TableCell>
                        <TableCell className={classes.tab4}>
                          {services[i] && !collapsed.includes(i)
                            ? handleServices(services[i])
                            : 'Billable hours'}
                        </TableCell>
                        <TableCell align="right" className={classes.tab2}>
                          {services[i] && !collapsed.includes(i)
                            ? ''
                            : billableTime[i] && (
                                <TimeInput
                                  state={billableTime[i]}
                                  handleChange={handleBillableTime}
                                  index={i}
                                  disabled={!state.editManageData}
                                />
                              )}
                        </TableCell>
                        <TableCell align="right" className={classes.tab2}>
                          {services[i] && !collapsed.includes(i) ? (
                            ''
                          ) : (
                            <InputField
                              fullWidth
                              type="number"
                              placeholder="billing rate"
                              inputProps={{
                                min: 0,
                                style: { textAlign: 'right' }
                              }}
                              name="billable"
                              disabled={!state.editManageData}
                              value={
                                services[i] ? services[i].billable.rate : ''
                              }
                              onChange={e => handleChange(e, i, 'rate', 'qty')}
                            />
                          )}
                        </TableCell>
                        <TableCell align="right" className={classes.tab2}>
                          {services[i] && !collapsed.includes(i)
                            ? formatter.format(handleAmt(services[i]))
                            : formatter.format(
                                services[i] ? services[i].billable.amt : ''
                              )}
                        </TableCell>
                        <TableCell className={classes.tab3}>
                          {collapsed.includes(i) ? (
                            <ExpandLess
                              onClick={() => handleCollapse(i)}
                              style={{ cursor: 'pointer' }}
                            />
                          ) : (
                            <ExpandMore
                              onClick={() => handleCollapse(i)}
                              style={{ cursor: 'pointer' }}
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
                          <TableCell className={classes.tab1} />
                          <TableCell className={classes.tab5}>
                            <Checkbox
                              disabled={!state.editManageData || !tax.edit}
                              checked={
                                services[i] && services[i].performance.taxed
                              }
                              onChange={e => handleTax(e, 'performance', i)}
                            />
                          </TableCell>
                          <TableCell className={classes.tab4}>
                            Performance
                          </TableCell>
                          <TableCell className={classes.tab2}>
                            <InputField
                              fullWidth
                              type="number"
                              placeholder="performance quantity"
                              inputProps={{
                                min: 0,
                                style: { textAlign: 'right' }
                              }}
                              name="performance"
                              disabled={!state.editManageData}
                              value={
                                services[i] ? services[i].performance.qty : ''
                              }
                              onChange={e => handleChange(e, i, 'qty', 'rate')}
                            />
                          </TableCell>
                          <TableCell className={classes.tab2}>
                            <InputField
                              fullWidth
                              type="number"
                              placeholder="performance rate"
                              inputProps={{
                                min: 0,
                                style: { textAlign: 'right' }
                              }}
                              name="performance"
                              disabled={!state.editManageData}
                              value={
                                services[i] ? services[i].performance.rate : ''
                              }
                              onChange={e => handleChange(e, i, 'rate', 'qty')}
                            />
                          </TableCell>
                          <TableCell className={classes.tab2}>
                            {formatter.format(
                              services[i] ? services[i].performance.amt : ''
                            )}
                          </TableCell>
                          <TableCell />
                        </TableRow>
                        <TableRow>
                          <TableCell className={classes.tab1} />
                          <TableCell className={classes.tab5}>
                            <Checkbox
                              disabled={!state.editManageData || !tax.edit}
                              checked={services[i] && services[i].did.taxed}
                              onChange={e => handleTax(e, 'did', i)}
                            />
                          </TableCell>
                          <TableCell className={classes.tab4}>Did</TableCell>
                          <TableCell className={classes.tab2}>
                            <InputField
                              fullWidth
                              type="number"
                              placeholder="DIDs used"
                              inputProps={{
                                min: 0,
                                style: { textAlign: 'right' }
                              }}
                              name="did"
                              disabled={!state.editManageData}
                              value={services[i] ? services[i].did.qty : ''}
                              onChange={e => handleChange(e, i, 'qty', 'rate')}
                            />
                          </TableCell>
                          <TableCell className={classes.tab2}>
                            <InputField
                              fullWidth
                              type="number"
                              placeholder="DID rate"
                              inputProps={{
                                min: 0,
                                style: { textAlign: 'right' }
                              }}
                              name="did"
                              disabled={!state.editManageData}
                              value={services[i] ? services[i].did.rate : ''}
                              onChange={e => handleChange(e, i, 'rate', 'qty')}
                            />
                          </TableCell>
                          <TableCell className={classes.tab2}>
                            {formatter.format(
                              services[i] ? services[i].did.amt : ''
                            )}
                          </TableCell>
                          <TableCell className={classes.tab3} />
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
                  <TableCell className={classes.tab1}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <b>Additional fees</b>
                    </div>
                  </TableCell>
                  <TableCell className={classes.tab5}>
                    {add && (
                      <Checkbox
                        disabled={!state.editManageData || !tax.edit}
                        checked={litigator.taxed}
                        onChange={e => handleTax(e, 'litigator')}
                      />
                    )}
                  </TableCell>
                  <TableCell className={classes.tab4}>
                    {add
                      ? 'Litigator Scrubbing'
                      : handleAdditional(litigator.amt, merchant.amt)}
                  </TableCell>
                  <TableCell className={classes.tab2}>
                    {!add ? (
                      ''
                    ) : (
                      <InputField
                        fullWidth
                        type="number"
                        placeholder="Scrubbing quantity"
                        inputProps={{
                          min: 0,
                          style: { textAlign: 'right' }
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
                    )}
                  </TableCell>
                  <TableCell className={classes.tab2}>
                    {!add ? (
                      ''
                    ) : (
                      <InputField
                        fullWidth
                        type="number"
                        placeholder="Scrubbing rate value"
                        inputProps={{
                          min: 0,
                          style: { textAlign: 'right' }
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
                    )}
                  </TableCell>
                  <TableCell className={classes.tab2}>
                    {!add
                      ? formatter.format(litigator.amt + merchant.amt)
                      : formatter.format(litigator.amt)}
                  </TableCell>
                  <TableCell className={classes.tab3}>
                    {add ? (
                      <ExpandLess
                        onClick={() => setAdd(!add)}
                        style={{ cursor: 'pointer' }}
                      />
                    ) : (
                      <ExpandMore
                        onClick={() => setAdd(!add)}
                        style={{ cursor: 'pointer' }}
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
                    <TableCell className={classes.tab1} />
                    <TableCell className={classes.tab5}>
                      <Checkbox
                        disabled={!state.editManageData || !tax.edit}
                        checked={merchant.taxed}
                        onChange={e => handleTax(e, 'merchant')}
                      />
                    </TableCell>
                    <TableCell className={classes.tab4}>
                      Merchant Fees
                    </TableCell>
                    <TableCell className={classes.tab2}>
                      <InputField
                        fullWidth
                        type="number"
                        placeholder="Merchant quantity"
                        inputProps={{
                          min: 0,
                          style: { textAlign: 'right' }
                        }}
                        disabled={!state.editManageData}
                        value={merchant.qty}
                        onChange={e =>
                          setMerchant({
                            ...merchant,
                            qty: e.target.value,
                            amt: e.target.value * merchant.rate
                          })
                        }
                      />
                    </TableCell>
                    <TableCell className={classes.tab2}>
                      <InputField
                        fullWidth
                        type="number"
                        placeholder="Rate value"
                        inputProps={{
                          min: 0,
                          style: { textAlign: 'right' }
                        }}
                        disabled={!state.editManageData}
                        value={merchant.rate}
                        onChange={e =>
                          setMerchant({
                            ...merchant,
                            rate: e.target.value,
                            amt: e.target.value * merchant.qty
                          })
                        }
                      />
                    </TableCell>
                    <TableCell className={classes.tab2}>
                      {formatter.format(merchant.amt)}
                    </TableCell>
                    <TableCell className={classes.tab3} />
                  </TableRow>
                </TableBody>
              </Table>
            </Collapse>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.tab1}>Taxable</TableCell>
                  <TableCell className={classes.tab4} />
                  <TableCell className={classes.tab2}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end'
                      }}
                    >
                      {/* <Checkbox
                        checked={editTax}
                        onChange={e => {
                          setEditTax(e.target.checked)
                          if (!e.target.checked) {
                            setTax({ percentage: 0, amt: 0, code: '' })
                          }
                        }}
                        disabled={!state.editManageData}
                      /> */}
                      <InputField
                        select
                        disabled={!state.editManageData}
                        value={tax.code || 0}
                        onChange={handleChangeTax}
                      >
                        <MenuItem value={0}>Select taxation</MenuItem>
                        {mockTaxation.map((mt, i) => (
                          <MenuItem key={i} value={mt.code}>
                            {mt.name} ({mt.percentage}%)
                          </MenuItem>
                        ))}
                      </InputField>
                    </div>
                  </TableCell>
                  <TableCell className={classes.tab2} />
                  <TableCell className={classes.tab2}>
                    {formatter.format(tax.amt)}
                  </TableCell>
                  <TableCell className={classes.tab3} />
                </TableRow>
              </TableBody>
            </Table>

            <Table>
              <TableBody>
                <TableRow>
                  <TableCell className={classes.tab1}>
                    <b style={{ fontSize: 15 }}>Total</b>
                  </TableCell>
                  <TableCell className={classes.tab4} />
                  <TableCell className={classes.tab2} />
                  <TableCell className={classes.tab2}></TableCell>
                  <TableCell className={classes.tab2}>
                    <b style={{ fontSize: 15 }}>{formatter.format(total)}</b>
                  </TableCell>
                  <TableCell className={classes.tab3} />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : null}
    </React.Fragment>
  )
}
