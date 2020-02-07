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
import ItemsTable from './components/ItemsTable'
import { StateContext } from 'context/StateContext'
import { truncate } from 'utils/func'
import { mockCompanies, mockCampaigns } from '../../../../new-invoice/mock'

export default function InvoiceDetails() {
  const { state, setFormState, formState } = React.useContext(StateContext)
  const [companyId, setCompanyId] = useState('')
  const [companies, setCompanies] = useState([])
  const [campaigns, setCampaigns] = useState([])
  const [selectedCampaigns, setSelectedCampaigns] = useState([])

  useEffect(() => {
    setCompanies(mockCompanies)
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
  return (
    <div className="modal-details-container">
      <Grid container spacing={3}>
        <Grid item lg={3} xs={3} md={3}>
          <InputLabel>Company</InputLabel>
          <InputField
            select
            value={formState.company ? companyId : ''}
            disabled={!state.editManageData}
            fullWidth
            onChange={e => {
              setFormState({
                ...formState,
                company: mockCompanies.find(
                  comp => comp.uuid === e.target.value
                ),
                campaigns: []
              })
              setCompanyId(e.target.value)
              setSelectedCampaigns(
                mockCampaigns
                  .filter(camp => camp.company === e.target.value)
                  .map(camp => camp.uuid)
              )
            }}
          >
            {companies.map((comp, i) => (
              <MenuItem key={i} value={comp.uuid}>
                {comp.name}
              </MenuItem>
            ))}
          </InputField>
        </Grid>
        <Grid item lg={3} xs={3} md={3}>
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
        <Grid item lg={3} xs={3} md={3}>
          <InputLabel>Billing Type</InputLabel>
          <InputField
            fullWidth
            value={formState.billingType || ' '}
            select
            disabled={!state.editManageData}
            onChange={e =>
              setFormState({ ...formState, billingType: e.target.value })
            }
          >
            <MenuItem value=" ">Select billing type</MenuItem>
            <MenuItem value="1">Monthly</MenuItem>
            <MenuItem value="2">Weekly</MenuItem>
          </InputField>
        </Grid>
        <Grid item lg={3} xs={3} md={3}>
          <InputLabel id="label1">Billing Period</InputLabel>
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
      <ItemsTable formState={formState} setFormState={setFormState} />
    </div>
  )
}
