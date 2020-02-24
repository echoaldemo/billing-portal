import React, { useState, useEffect } from 'react'
import { InputField } from 'common-components'
import {
  Grid,
  MenuItem,
  Checkbox,
  ListItemText,
  InputLabel
} from '@material-ui/core'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import moment from 'moment'
import ItemsTable from './components/ItemsTable'
import { StateContext } from 'context/StateContext'
import { mockCampaigns } from '../../../../new-invoice/mock'

export default function InvoiceDetails() {
  const { state, setFormState, formState } = React.useContext(StateContext)
  const [companyId, setCompanyId] = useState('')
  // const [companies, setCompanies] = useState([])
  const [campaigns, setCampaigns] = useState([])
  const [selectedCampaigns, setSelectedCampaigns] = useState([])

  useEffect(() => {
    // setCompanies(mockCompanies)
    setCampaigns(
      mockCampaigns.filter(
        camp => camp.company === state.selectedData.company.uuid
      )
    )
    setFormState(state.selectedData)
    setCompanyId(state.selectedData.company.uuid)
    setSelectedCampaigns(state.selectedData.campaigns.map(camp => camp.uuid))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setCampaigns(mockCampaigns.filter(camp => camp.company === companyId))
    // eslint-disable-next-line
  }, [companyId])

  const handleStartDate = date => {
    setFormState({
      ...formState,
      startDate: date,
      dueDate:
        formState.billingType === '1'
          ? moment(date).add(1, 'months')
          : moment(date).add(1, 'weeks')
    })
  }

  const handleBillingType = e => {
    setFormState({
      ...formState,
      billingType: e.target.value,
      dueDate:
        e.target.value === '1'
          ? moment(formState.startDate).add(1, 'months')
          : moment(formState.startDate).add(1, 'weeks')
    })
  }

  return (
    <div className="modal-details-container">
      <Grid container justify="space-between">
        <Grid item lg={2} xs={2} md={2}>
          <InputLabel>Company</InputLabel>
          <b style={{ position: 'relative', top: 10 }}>
            {formState.company ? formState.company.name : ''}
          </b>
        </Grid>
        <Grid item lg={2} xs={2} md={2}>
          <InputLabel>Campaign</InputLabel>
          <InputField
            fullWidth
            select
            value={selectedCampaigns}
            SelectProps={{
              multiple: true,
              displayEmpty: true,
              renderValue: selected =>
                selected.length === 0
                  ? 'Select campaign'
                  : selected.length === campaigns.length
                  ? 'All'
                  : selected
                      .map(s =>
                        campaigns
                          .filter(a => a.uuid === s)
                          .map(data => data.name)
                      )
                      .join(', ')
            }}
            onChange={e => {
              setSelectedCampaigns(e.target.value)
              setFormState({
                ...formState,
                campaigns: e.target.value.map(sel =>
                  campaigns.find(a => a.uuid === sel)
                )
              })
            }}
            disabled={!state.editManageData}
          >
            {campaigns.map((camp, i) => (
              <MenuItem key={i} value={camp.uuid}>
                <Checkbox checked={selectedCampaigns.indexOf(camp.uuid) > -1} />
                <ListItemText primary={camp.name} />
              </MenuItem>
            ))}
          </InputField>
        </Grid>
        <Grid item lg={2} xs={2} md={2}>
          <InputLabel>Billing Type</InputLabel>
          <InputField
            fullWidth
            value={formState.billingType || ' '}
            select
            disabled={!state.editManageData}
            onChange={handleBillingType}
          >
            <MenuItem value="1">Monthly</MenuItem>
            <MenuItem value="2">Weekly</MenuItem>
          </InputField>
        </Grid>
        <Grid item lg={2} xs={2} md={2}>
          <InputLabel id="label1">Start of Period</InputLabel>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              name="billingPeriod"
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              value={formState.startDate}
              onChange={date => handleStartDate(date)}
              disabled={!state.editManageData}
            />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item lg={2} xs={2} md={2}>
          <InputLabel id="label1">End of Period</InputLabel>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              name="billingPeriod"
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              value={formState.dueDate}
              onChange={date => setFormState({ ...formState, dueDate: date })}
              disabled={!state.editManageData}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
      <br />
      <ItemsTable campaigns={campaigns} selectedCampaigns={selectedCampaigns} />
    </div>
  )
}
