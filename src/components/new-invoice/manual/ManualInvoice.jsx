/* eslint-disable */
import React, { useState, useEffect } from 'react'
import {
  AppBar,
  IconButton,
  Button,
  Typography,
  Toolbar,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Divider,
  TextField,
  Collapse,
  Checkbox,
  ListItemText,
  Popover
} from '@material-ui/core'
import {
  Close,
  KeyboardArrowDown,
  KeyboardArrowUp,
  ArrowDropDown
} from '@material-ui/icons'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'

import { post, get } from 'utils/api'
import { StateContext } from 'context/StateContext'
import { mockCompanies, mockCampaigns } from '../mock'
import { useStyles, MenuProps } from '../styles'

const today = new Date()
const date =
  today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()

const defaultBillableHours = {
  name: 'Billable hours',
  qty: '',
  rate: '',
  amt: '',
  show: true
}
const defaultPerformance = {
  name: 'Performance',
  qty: '',
  rate: '',
  amt: '',
  show: true
}
const defaultDID = {
  name: 'DID',
  qty: '',
  rate: '',
  amt: '',
  show: true
}
const defaultLS = {
  name: 'Litigator Scrubbing',
  qty: '',
  rate: '',
  amt: ''
}
const defaultMerchantFees = {
  name: 'Merchant Fees',
  company: '',
  campaign: [],
  billingType: ' ',
  billingPeriod: date
}

const defaultSelectInputs = {
  company: '',
  campaign: [],
  billingType: ' ',
  billingPeriod: date,
  taxation: ' '
}
const mockTaxation = [
  { code: '5', taxrate: '7', name: 'Utah', percentage: 6.1 },
  { code: '6', taxrate: '8', name: 'California', percentage: 8 },
  { code: '7', taxrate: '11', name: 'Mexico', percentage: 16 }
]

const NewInvoice = ({ handleClose, renderLoading, duplicate }) => {
  const classes = useStyles()
  const { setLoading, setData } = React.useContext(StateContext)
  const [selectInputs, setSelectInputs] = useState(defaultSelectInputs)
  const [billableHours, setBillableHours] = useState(defaultBillableHours)
  const [performance, setPerformance] = useState(defaultPerformance)
  const [did, setDID] = useState(defaultDID)
  const [ls, setLS] = useState(defaultLS)
  const [merchantFees, setMerchantFees] = useState(defaultMerchantFees)
  const [total, setTotal] = useState(0)
  const [itemsTotal, setItemsTotal] = useState(0)
  const [extraItemsTotal, setExtraItemsTotal] = useState(0)
  const [collapse, setCollapse] = useState(false)
  const [activeCompanies, setActiveCompanies] = useState([])
  const [activeCompaniesLoading, setActiveCompaniesLoading] = useState(true)
  const [activeCampaigns, setActiveCampaigns] = useState([])
  const [activeCampaignsLoading, setActiveCampaignsLoading] = useState(true)
  const [state, setState] = useState({
    anchorEl: null,
    tax: false,
    taxValue: ''
  })

  useEffect(() => {
    getItemsTotal()
    getExtraItemsTotal()
  })

  useEffect(() => {
    if (typeof duplicate !== 'undefined') {
      getActiveCampaigns(duplicate.company.uuid)
    }
  }, [activeCompanies])

  useEffect(() => {
    if (typeof duplicate !== 'undefined') {
      setSelectInputs({
        ...defaultSelectInputs,
        company: duplicate.company.uuid,
        billingType: duplicate.billingType,
        campaign: duplicate.campaigns.map(camp => camp.uuid)
      })
    }
  }, [activeCampaigns])

  useEffect(() => {
    getActiveCompainies()
    if (typeof duplicate !== 'undefined') {
      if (
        typeof duplicate.Line[0] !== 'undefined' &&
        typeof duplicate.Line[0].SubTotalLineDetail === 'undefined'
      ) {
        setBillableHours({
          ...defaultBillableHours,
          qty: duplicate.Line[0].SalesItemLineDetail.Qty,
          rate: duplicate.Line[0].SalesItemLineDetail.ItemRef.value,
          amt: duplicate.Line[0].Amount
        })
      }
      if (
        typeof duplicate.Line[1] !== 'undefined' &&
        typeof duplicate.Line[1].SubTotalLineDetail === 'undefined'
      ) {
        setPerformance({
          ...defaultPerformance,
          qty: duplicate.Line[1].SalesItemLineDetail.Qty,
          rate: duplicate.Line[1].SalesItemLineDetail.ItemRef.value,
          amt: duplicate.Line[1].Amount
        })
      }
      if (
        typeof duplicate.Line[2] !== 'undefined' &&
        typeof duplicate.Line[2].SubTotalLineDetail === 'undefined'
      ) {
        setDID({
          ...defaultDID,
          qty: duplicate.Line[2].SalesItemLineDetail.Qty,
          rate: duplicate.Line[2].SalesItemLineDetail.ItemRef.value,
          amt: duplicate.Line[2].Amount
        })
      }
    }
  }, [])

  const getActiveCompainies = () => {
    setTimeout(() => {
      setActiveCompanies(mockCompanies)
      setActiveCompaniesLoading(false)
    }, 1000)
  }
  const getActiveCampaigns = uuid => {
    if (uuid === '') {
      setActiveCampaignsLoading(true)
      setSelectInputs({ ...selectInputs, company: uuid, campaign: [] })
      return
    }
    setTimeout(() => {
      const campaigns = mockCampaigns.filter(c => c.company === uuid)
      console.log(campaigns)
      setSelectInputs({
        ...selectInputs,
        campaign: campaigns.map(d => d.uuid),
        company: uuid
      })
      setActiveCampaigns(campaigns)
      setActiveCampaignsLoading(false)
    }, 1000)
  }
  const handleSelectChange = event => {
    if (event.target.name === 'company') {
      getActiveCampaigns(event.target.value)
    } else {
      setSelectInputs({
        ...selectInputs,
        [event.target.name]: event.target.value
      })
    }
  }
  const handleDateChange = date => {
    setSelectInputs({ ...selectInputs, billingPeriod: date })
  }
  const handleBillableHoursChange = (e, label) => {
    setBillableHours({
      ...billableHours,
      [label]: e.target.value,
      qty: billableHours.qty || 1
    })
  }
  const handlePerformanceChange = (e, label) => {
    setPerformance({
      ...performance,
      [label]: e.target.value,
      qty: performance.qty || 1
    })
  }
  const handleDIDsChange = (e, label) => {
    setDID({ ...did, [label]: e.target.value, qty: did.qty || 1 })
  }
  const handleLSChange = (e, label) => {
    setLS({ ...ls, [label]: e.target.value, qty: ls.qty || 1 })
  }
  const handleMerchantFees = (e, label) => {
    setMerchantFees({ ...merchantFees, [label]: e.target.value })
  }

  const getItemsTotal = () => {
    let arr = []
    arr.push((billableHours.qty || 1) * (billableHours.rate || 0))
    arr.push((performance.qty || 1) * (performance.rate || 0))
    arr.push((did.qty || 1) * (did.rate || 0))
    const it = arr.reduce((total, value) => total + value)
    const total1 = parseFloat(it) + parseFloat(extraItemsTotal)
    const tax =
      selectInputs.taxation !== ' '
        ? Math.round((parseFloat(selectInputs.taxation) / 100) * total * 100) /
          100
        : 0
    setTotal(total1 + tax)
    setItemsTotal(it)
  }
  const getExtraItemsTotal = () => {
    let arr = []
    arr.push((ls.qty || 1) * (ls.rate || 0))
    arr.push(merchantFees.amt ? parseFloat(merchantFees.amt) : 0)
    const et = arr.reduce((total, value) => total + value)
    const total2 = parseFloat(et) + parseFloat(itemsTotal)
    const tax =
      selectInputs.taxation !== ' '
        ? Math.round((parseFloat(selectInputs.taxation) / 100) * total * 100) /
          100
        : 0
    setTotal(total2 + tax)
    setExtraItemsTotal(et)
  }
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })
  const formatter2 = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2
  })
  const handleShowMore = e => {
    setState({
      ...state,
      anchorEl: e.currentTarget
    })
  }
  const handleCloseMore = () => {
    setState({
      ...state,
      anchorEl: null
    })
  }

  const appendLeadingZeroes = n => {
    if (n <= 9) {
      return '0' + n
    }
    return n
  }
  const handleSave = () => {
    if (
      !total ||
      !Boolean(selectInputs.company) ||
      !Boolean(selectInputs.campaign.length) ||
      selectInputs.billingType === ' '
    ) {
      return
    }
    setLoading(true)
    renderLoading()
    let line = []
    let dt = new Date(selectInputs.billingPeriod)

    let startDate =
      dt.getFullYear() +
      '-' +
      appendLeadingZeroes(dt.getMonth() + 1) +
      '-' +
      appendLeadingZeroes(dt.getDate())

    if (selectInputs.billingType === '1') dt.setMonth(dt.getMonth() + 1)
    else dt.setDate(dt.getDate() + 7)

    const dueDate =
      dt.getFullYear() +
      '-' +
      appendLeadingZeroes(dt.getMonth() + 1) +
      '-' +
      appendLeadingZeroes(dt.getDate())

    ;(billableHours.qty || 1) * (billableHours.rate || 0) &&
      line.push({
        DetailType: 'SalesItemLineDetail',
        Amount: (billableHours.qty || 1) * (billableHours.rate || 0),
        SalesItemLineDetail: {
          ItemRef: {
            value: '21',
            name: 'Billable hours'
          },
          TaxCodeRef: {
            value: state.tax ? 'TAX' : 'NON'
          },
          Qty: billableHours.qty || 1,
          UnitPrice: billableHours.rate || 0
        }
      })
    ;(performance.qty || 1) * (performance.rate || 0) &&
      line.push({
        DetailType: 'SalesItemLineDetail',
        Amount: (performance.qty || 1) * (performance.rate || 0),
        SalesItemLineDetail: {
          ItemRef: {
            value: '22',
            name: 'Performance'
          },
          TaxCodeRef: {
            value: state.tax ? 'TAX' : 'NON'
          },
          Qty: performance.qty || 1,
          UnitPrice: performance.rate || 0
        }
      })
    ;(did.qty || 1) * (did.rate || 0) &&
      line.push({
        DetailType: 'SalesItemLineDetail',
        Amount: (did.qty || 1) * (did.rate || 0),
        SalesItemLineDetail: {
          ItemRef: {
            value: '23',
            name: 'DID'
          },
          TaxCodeRef: {
            value: state.tax ? 'TAX' : 'NON'
          },
          Qty: did.qty || 1,
          UnitPrice: did.rate || 0
        }
      })
    ;(ls.qty || 1) * (ls.rate || 0) &&
      line.push({
        DetailType: 'SalesItemLineDetail',
        Amount: (ls.qty || 1) * (ls.rate || 0),
        SalesItemLineDetail: {
          ItemRef: {
            value: '24',
            name: 'Litigator scrubbing'
          },
          TaxCodeRef: {
            value: state.tax ? 'TAX' : 'NON'
          },
          Qty: ls.qty || 1,
          UnitPrice: ls.rate || 0
        }
      })
    ;(merchantFees.amt || 0) &&
      line.push({
        DetailType: 'SalesItemLineDetail',
        Amount: merchantFees.amt || 0,
        SalesItemLineDetail: {
          ItemRef: {
            value: '25',
            name: 'Merchant fees'
          },
          TaxCodeRef: {
            value: state.tax ? 'TAX' : 'NON'
          }
        }
      })
    line.push({
      DetailType: 'SubTotalLineDetail',
      Amount: total,
      SubTotalLineDetail: {}
    })
    if (line.length > 1) {
      const company = activeCompanies.filter(
        i => i.uuid === selectInputs.company
      )
      const campaigns = activeCampaigns.filter(
        item => selectInputs.campaign.indexOf(item.uuid) !== -1
      )
      const taxPercent = parseFloat(selectInputs.taxation)
      const tax =
        selectInputs.taxation !== ' '
          ? Math.round(
              (parseFloat(selectInputs.taxation) / 100) * total * 100
            ) / 100
          : 0
      const taxType = mockTaxation.filter(
        item => item.percentage === taxPercent
      )[0]
      let data = {
        docNumber: Math.floor(Math.random() * 9999),
        Line: line,
        total,
        invoiceType: 'Manual',
        company: company[0],
        campaigns: campaigns,
        billingType: selectInputs.billingType,
        startDate,
        dueDate,
        total,
        CustomerMemo: {
          value: `Wire/ACH Instructions:\nRouting 124301025\nAccount: 4134870\nBIC: AMFOUS51\nPeople's Intermountain Bank\n712 E Main St\nLehi, UT, 84043\nIf paying by wire, please include your\ncompany name in the memo.\n\nIf you have any questions or concerns about current or past invoices,\ncontact Tanner Purser directly at 801-805-4602`
        }
      }
      if (state.tax) {
        data['TxnTaxDetail'] = {
          TxnTaxCodeRef: {
            value: taxType.code
          },
          TotalTax: tax,
          TaxLine: [
            {
              DetailType: 'TaxLineDetail',
              Amount: tax,
              TaxLineDetail: {
                NetAmountTaxable:
                  parseFloat(itemsTotal) + parseFloat(extraItemsTotal),
                TaxPercent: taxType.percentage,
                TaxRateRef: {
                  value: taxType.taxrate
                },
                PercentBased: true
              }
            }
          ]
        }
      }
      saveReq(data)
    }
  }
  const saveReq = data => {
    post(`/api/create_pending`, data).then(res => {
      get('/api/pending/list')
        .then(res => {
          setLoading(false)
          setData(res.data)
        })
        .catch(err => {
          console.log(err)
        })
      setBillableHours(defaultBillableHours)
      setPerformance(defaultPerformance)
      setDID(defaultDID)
      setLS(defaultLS)
      setMerchantFees(defaultMerchantFees)
      setSelectInputs(defaultSelectInputs)
    })
  }
  const handleSaveAndApprove = () => {
    if (
      !total ||
      !Boolean(selectInputs.company) ||
      !Boolean(selectInputs.campaign.length)
    ) {
      return
    }
    renderLoading()
    let line = []

    ;(billableHours.qty || 1) * (billableHours.rate || 0) &&
      line.push({
        DetailType: 'SalesItemLineDetail',
        Amount: (billableHours.qty || 1) * (billableHours.rate || 0),
        SalesItemLineDetail: {
          ItemRef: {
            value: '21',
            name: 'Billable hours'
          },
          TaxCodeRef: {
            value: state.tax ? 'TAX' : 'NON'
          },
          Qty: billableHours.qty || 1,
          UnitPrice: billableHours.rate || 0
        }
      })
    ;(performance.qty || 1) * (performance.rate || 0) &&
      line.push({
        DetailType: 'SalesItemLineDetail',
        Amount: (performance.qty || 1) * (performance.rate || 0),
        SalesItemLineDetail: {
          ItemRef: {
            value: '22',
            name: 'Performance'
          },
          TaxCodeRef: {
            value: state.tax ? 'TAX' : 'NON'
          },
          Qty: performance.qty || 1,
          UnitPrice: performance.rate || 0
        }
      })
    ;(did.qty || 1) * (did.rate || 0) &&
      line.push({
        DetailType: 'SalesItemLineDetail',
        Amount: (did.qty || 1) * (did.rate || 0),
        SalesItemLineDetail: {
          ItemRef: {
            value: '23',
            name: 'DID'
          },
          TaxCodeRef: {
            value: state.tax ? 'TAX' : 'NON'
          },
          Qty: did.qty || 1,
          UnitPrice: did.rate || 0
        }
      })
    ;(ls.qty || 1) * (ls.rate || 0) &&
      line.push({
        DetailType: 'SalesItemLineDetail',
        Amount: (ls.qty || 1) * (ls.rate || 0),
        SalesItemLineDetail: {
          ItemRef: {
            value: '24',
            name: 'Litigator scrubbing'
          },
          TaxCodeRef: {
            value: state.tax ? 'TAX' : 'NON'
          },
          Qty: ls.qty || 1,
          UnitPrice: ls.rate || 0
        }
      })
    ;(merchantFees.amt || 0) &&
      line.push({
        DetailType: 'SalesItemLineDetail',
        Amount: merchantFees.amt || 0,
        SalesItemLineDetail: {
          ItemRef: {
            value: '25',
            name: 'Merchant fees'
          },
          TaxCodeRef: {
            value: state.tax ? 'TAX' : 'NON'
          }
        }
      })
    line.push({
      DetailType: 'SubTotalLineDetail',
      Amount: total,
      SubTotalLineDetail: {}
    })
    if (line.length > 1) {
      const company = activeCompanies.filter(
        i => i.uuid === selectInputs.company
      )
      const taxPercent = parseFloat(selectInputs.taxation)
      const tax =
        selectInputs.taxation !== ' '
          ? Math.round(
              (parseFloat(selectInputs.taxation) / 100) * total * 100
            ) / 100
          : 0
      const taxType = mockTaxation.filter(
        item => item.percentage === taxPercent
      )[0]
      let data = {
        Line: line,
        CustomerRef: {
          value: company[0].qb_id
        },
        CustomerMemo: {
          value: `Wire/ACH Instructions:\nRouting 124301025\nAccount: 4134870\nBIC: AMFOUS51\nPeople's Intermountain Bank\n712 E Main St\nLehi, UT, 84043\nIf paying by wire, please include your\ncompany name in the memo.\n\nIf you have any questions or concerns about current or past invoices,\ncontact Tanner Purser directly at 801-805-4602`
        }
      }
      if (state.tax) {
        data['TxnTaxDetail'] = {
          TxnTaxCodeRef: {
            value: taxType.code
          },
          TotalTax: tax,
          TaxLine: [
            {
              DetailType: 'TaxLineDetail',
              Amount: tax,
              TaxLineDetail: {
                NetAmountTaxable:
                  parseFloat(itemsTotal) + parseFloat(extraItemsTotal),
                TaxPercent: taxType.percentage,
                TaxRateRef: {
                  value: taxType.taxrate
                },
                PercentBased: true
              }
            }
          ]
        }
      }
      saveAndApproveReq(data)
    }
  }
  const saveAndApproveReq = data => {
    post(`/api/invoice`, data).then(res => {
      setBillableHours(defaultBillableHours)
      setPerformance(defaultPerformance)
      setDID(defaultDID)
      setLS(defaultLS)
      setMerchantFees(defaultMerchantFees)
      setSelectInputs(defaultSelectInputs)
    })
  }

  const handleTax = event => {
    if (event.target.checked === false) {
      setSelectInputs({ ...selectInputs, taxation: ' ' })
    }
    setState({
      ...state,
      tax: event.target.checked
    })
  }

  const getBalanceDue = () => {
    const tax =
      selectInputs.taxation !== ' '
        ? Math.round((parseFloat(selectInputs.taxation) / 100) * total * 100) /
          100
        : 0
    if (total) return parseFloat(total) + tax
    else return '0.00'
  }

  const renderTax = () => {
    return (
      <div
        style={{
          marginTop: 20,
          display: 'grid',
          gridTemplateColumns: '30px 300px 200px 235px',
          justifyContent: 'end',
          gridGap: 25
        }}
      >
        <Checkbox
          checked={state.tax}
          disableRipple
          disableTouchRipple
          disableFocusRipple
          style={{ backgroundColor: 'transparent' }}
          onChange={handleTax}
          value="secondary"
        />
        <div>
          <TextField
            select
            disabled={!state.tax}
            label="Taxable"
            name="taxation"
            variant="outlined"
            value={selectInputs.taxation}
            onChange={e => handleSelectChange(e)}
            fullWidth
          >
            <MenuItem value=" ">Select taxation</MenuItem>
            <MenuItem value="6.1">Utah (6.1%)</MenuItem>
            <MenuItem value="8">California (8%)</MenuItem>
            <MenuItem value="16">Mexico (16%)</MenuItem>
          </TextField>
        </div>
        <TextField
          disabled={!state.tax}
          variant="outlined"
          inputProps={{
            value:
              selectInputs.taxation !== ' ' && getBalanceDue() !== 0
                ? Math.round(
                    (parseFloat(selectInputs.taxation) / 100) * total * 100
                  ) / 100
                : ' ',
            style: { textAlign: 'right' },
            readOnly: true
          }}
          fullWidth
        />

        <div>
          <span
            style={{
              display: 'grid',
              gridTemplateColumns: '3fr 1fr',
              marginTop: 15,
              gridGap: 24,
              alignItems: 'center',
              justifyItems: 'end'
            }}
          >
            BALANCE DUE
            <span
              style={{
                fontWeight: 600,
                fontSize: 20
              }}
            >
              {formatter.format(total)}
            </span>
          </span>
        </div>
      </div>
    )
  }

  return (
    <>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <Close />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            New Manual Invoice
          </Typography>
          <Button
            classes={{ root: classes.save, disabled: classes.save_disabled }}
            onClick={() => handleSave()}
            color="inherit"
          >
            save
          </Button>
          <Button
            classes={{ root: classes.more }}
            color="inherit"
            onClick={handleShowMore}
          >
            <ArrowDropDown />
          </Button>
          <Popover
            anchorEl={state.anchorEl}
            open={Boolean(state.anchorEl)}
            onClose={handleCloseMore}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
          >
            <MenuItem style={{ padding: '15px 20px' }}>Save and send</MenuItem>
            <MenuItem
              style={{ padding: '15px 20px' }}
              onClick={() => handleSaveAndApprove()}
            >
              Save and approve
            </MenuItem>
          </Popover>
        </Toolbar>
      </AppBar>

      <form className={classes.form}>
        <Grid container spacing={2} style={{ marginBottom: 30 }}>
          <Grid item xs={3}>
            <InputLabel id="label">Company</InputLabel>
            <Select
              labelId="label"
              name="company"
              value={selectInputs.company}
              variant="outlined"
              onChange={e => handleSelectChange(e)}
              disabled={activeCompaniesLoading}
              MenuProps={MenuProps}
              displayEmpty
              fullWidth
            >
              <MenuItem value="">Select company</MenuItem>
              {!activeCompaniesLoading &&
                activeCompanies.map((c, i) => (
                  <MenuItem value={c.uuid} key={i}>
                    {c.name}
                  </MenuItem>
                ))}
            </Select>
          </Grid>

          <Grid item xs={3}>
            <InputLabel id="label1">Campaign</InputLabel>
            <Select
              labelId="label1"
              id="label1"
              variant="outlined"
              name="campaign"
              multiple
              value={selectInputs.campaign}
              onChange={e => {
                handleSelectChange(e)
              }}
              renderValue={selected =>
                selected.length === 0
                  ? 'Select campaign'
                  : selected.length === activeCampaigns.length
                  ? 'All'
                  : selected
                      .map(s =>
                        activeCampaigns
                          .filter(a => a.uuid === s)
                          .map(data => data.name)
                      )
                      .join(', ')
              }
              disabled={activeCampaignsLoading}
              displayEmpty
              fullWidth
            >
              {!activeCampaignsLoading &&
                activeCampaigns.map((name, i) => (
                  <MenuItem key={i} value={name.uuid}>
                    <Checkbox
                      checked={selectInputs.campaign.indexOf(name.uuid) > -1}
                    />
                    <ListItemText primary={name.name} />
                  </MenuItem>
                ))}
            </Select>
          </Grid>

          <Grid item xs={2}>
            <InputLabel id="label1">Billing Period</InputLabel>
            <Select
              labelId="label1"
              name="billingType"
              variant="outlined"
              value={selectInputs.billingType}
              onChange={e => handleSelectChange(e)}
              fullWidth
            >
              <MenuItem value=" ">Select billing type</MenuItem>
              <MenuItem value="1">Monthly</MenuItem>
              <MenuItem value="2">Weekly</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={2}>
            <InputLabel id="label1">Billing Period</InputLabel>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                name="billingPeriod"
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                value={selectInputs.billingPeriod}
                onChange={handleDateChange}
                inputVariant="outlined"
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item xs={2}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                justifyContent: 'center'
              }}
            >
              <span
                style={{
                  fontWeight: 500,
                  fontSize: 28
                }}
              >
                BALANCE DUE
              </span>
              <span
                style={{
                  fontWeight: 600,
                  fontSize: 32
                }}
              >
                {formatter.format(parseFloat(total))}
              </span>
            </div>
          </Grid>
        </Grid>
        <Divider />
        <div style={{ padding: '30px 0' }}>
          <Typography variant="h5">Items</Typography>
        </div>
        <Grid
          container
          spacing={1}
          style={{ marginBottom: 30, boxSizing: 'border-box' }}
        >
          <Grid item xs={6} className={classes.head}>
            Name
          </Grid>
          <Grid item xs={2} className={classes.head}>
            Quantity
          </Grid>
          <Grid item xs={2} className={classes.head}>
            Rate
          </Grid>
          <Grid item xs={2} className={classes.head}>
            Amount
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          xs={12}
          style={{ marginBottom: 30, boxSizing: 'border-box' }}
        >
          <Grid item xs={6}>
            <TextField
              placeholder="Item name"
              value={billableHours.name}
              inputProps={{
                readOnly: true
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              placeholder="number of hours"
              inputProps={{
                value: billableHours.qty,
                style: { textAlign: 'right' }
              }}
              onChange={e => handleBillableHoursChange(e, 'qty')}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              placeholder="cost per hour"
              inputProps={{
                value: billableHours.rate,
                style: { textAlign: 'right' }
              }}
              onChange={e => handleBillableHoursChange(e, 'rate')}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              placeholder="Amount"
              inputProps={{
                value: formatter2.format(
                  parseFloat(
                    (billableHours.qty || 1) * (billableHours.rate || 0)
                  ).toFixed(2)
                ),
                readOnly: true,
                style: { textAlign: 'right' }
              }}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          xs={12}
          style={{ marginBottom: 30, boxSizing: 'border-box' }}
        >
          <Grid item xs={6}>
            <TextField
              placeholder="Item name"
              value={performance.name}
              inputProps={{
                readOnly: true
              }}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              placeholder="number of interactions"
              inputProps={{
                value: performance.qty,
                style: { textAlign: 'right' }
              }}
              onChange={e => handlePerformanceChange(e, 'qty')}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              placeholder="cost per interactions"
              inputProps={{
                value: performance.rate,
                style: { textAlign: 'right' }
              }}
              onChange={e => handlePerformanceChange(e, 'rate')}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              placeholder="Amount"
              inputProps={{
                value: formatter2.format(
                  parseFloat(
                    (performance.qty || 1) * (performance.rate || 0)
                  ).toFixed(2)
                ),
                style: { textAlign: 'right' },
                readOnly: true
              }}
              fullWidth
            />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={1}
          xs={12}
          style={{ marginBottom: 30, boxSizing: 'border-box' }}
        >
          <Grid item xs={6}>
            <TextField
              placeholder="Item name"
              inputProps={{
                readOnly: true
              }}
              value={did.name}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              placeholder="total DID"
              inputProps={{
                value: did.qty,
                style: { textAlign: 'right' }
              }}
              onChange={e => handleDIDsChange(e, 'qty')}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              placeholder="cost per DID"
              inputProps={{
                value: did.rate,
                style: { textAlign: 'right' }
              }}
              onChange={e => handleDIDsChange(e, 'rate')}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              placeholder="Amount"
              inputProps={{
                value: formatter2.format(
                  parseFloat((did.qty || 1) * (did.rate || 0)).toFixed(2)
                ),
                readOnly: true,
                style: { textAlign: 'right' }
              }}
              fullWidth
            />
          </Grid>
        </Grid>
        <Divider />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end'
          }}
        >
          <span>SUBTOTAL</span>
          <span
            style={{
              fontWeight: 600,
              fontSize: 20
            }}
          >
            {formatter.format(itemsTotal)}
          </span>
        </div>
        {!collapse ? renderTax() : <Divider />}
        <div
          style={{ padding: '30px 0', display: 'flex', alignItems: 'center' }}
        >
          <Typography variant="h5">Additional fees</Typography>
          {collapse ? (
            <KeyboardArrowUp onClick={() => setCollapse(false)} />
          ) : (
            <KeyboardArrowDown onClick={() => setCollapse(true)} />
          )}
        </div>
        <Collapse in={collapse}>
          <Grid
            container
            spacing={1}
            xs={12}
            style={{ marginBottom: 30, boxSizing: 'border-box' }}
          >
            <Grid item xs={6} className={classes.head}>
              Name
            </Grid>
            <Grid item xs={2} className={classes.head}>
              Quantity
            </Grid>
            <Grid item xs={2} className={classes.head}>
              Rate
            </Grid>
            <Grid item xs={2} className={classes.head}>
              Amount
            </Grid>
          </Grid>

          <Grid
            container
            spacing={1}
            xs={12}
            style={{ marginBottom: 30, boxSizing: 'border-box' }}
          >
            <Grid item xs={6}>
              <TextField
                placeholder="Item name"
                value={ls.name + '(optional)'}
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                placeholder="number of hours"
                inputProps={{
                  value: ls.qty,
                  style: { textAlign: 'right' }
                }}
                onChange={e => handleLSChange(e, 'qty')}
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                placeholder="cost per hour"
                inputProps={{
                  value: ls.rate,
                  style: { textAlign: 'right' }
                }}
                onChange={e => handleLSChange(e, 'rate')}
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                placeholder="Amount"
                inputProps={{
                  value: formatter2.format(
                    parseFloat((ls.qty || 1) * (ls.rate || 0)).toFixed(2)
                  ),
                  readOnly: true,
                  style: { textAlign: 'right' }
                }}
                onChange={e => handleLSChange(e, 'amt')}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={1}
            xs={12}
            style={{ marginBottom: 30, boxSizing: 'border-box' }}
          >
            <Grid item xs={6}>
              <TextField
                placeholder="Item name"
                value="Merchant fees"
                fullWidth
              />
            </Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}></Grid>
            <Grid item xs={2}>
              <TextField
                placeholder="Amount"
                inputProps={{
                  value: merchantFees.amt,
                  style: { textAlign: 'right' }
                }}
                onChange={e => handleMerchantFees(e, 'amt')}
                fullWidth
              />
            </Grid>
          </Grid>
          <Divider />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end'
            }}
          >
            <span>SUBTOTAL</span>
            <span
              style={{
                fontWeight: 600,
                fontSize: 20
              }}
            >
              {formatter.format(extraItemsTotal)}
            </span>
          </div>
        </Collapse>
        {collapse && renderTax()}
      </form>
    </>
  )
}

export default NewInvoice
