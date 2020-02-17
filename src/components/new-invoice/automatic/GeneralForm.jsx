import React, { useContext } from "react";
import { InputField } from "common-components";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { AutomaticInvoiceContext } from "context/AutomaticInvoiceContext";
import {
  Grid,
  MenuItem,
  ListItemText,
  Checkbox,
  InputLabel
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";

export default function GeneralForm() {
  const {
    state,
    formState,
    setFormState,
    selectedCampaign,
    setSelectedCampaign,
    handleBillingChange,
    getBalance
  } = useContext(AutomaticInvoiceContext);

  const filterCampaign = uuid => {
    console.log(uuid, state.campaigns);
    const filteredCampaign = state.campaigns.filter(
      camp => camp.company === uuid
    );

    setSelectedCampaign(filteredCampaign.map(item => item.uuid));
    return filteredCampaign;
  };
  return (
    <div
      style={{
        display: "flex",
        padding: 15,
        justifyContent: "space-between",
        alignItems: "center"
      }}
    >
      <Grid item xs={3}>
        <InputField
          label="Company"
          value={formState.company}
          onChange={e => {
            setFormState({
              ...formState,
              company: e.target.value,
              campaign: filterCampaign(e.target.value)
            });
          }}
          disabled={false}
          fullWidth
          select
        >
          <MenuItem value={false}>Select company</MenuItem>
          {state.companies.map(item => {
            return (
              <MenuItem key={item.uuid} value={item.uuid}>
                {item.name}
              </MenuItem>
            );
          })}
        </InputField>
      </Grid>
      <Grid item xs={2}>
        <InputField
          label="Campaigns"
          id="label1"
          name="campaign"
          select
          SelectProps={{
            multiple: true,
            renderValue: selected =>
              selected.length === 0
                ? "Select campaign"
                : selected.length === formState.campaign.length
                ? "All"
                : selected
                    .map(s =>
                      formState.campaign
                        .filter(a => a.uuid === s)
                        .map(data => data.name)
                    )
                    .join(", ")
          }}
          value={selectedCampaign}
          onChange={e => {
            setSelectedCampaign(e.target.value);
          }}
          disabled={!formState.company}
          fullWidth
        >
          {formState.campaign.map((name, i) => (
            <MenuItem key={i} value={name.uuid}>
              <Checkbox checked={selectedCampaign.indexOf(name.uuid) > -1} />
              <ListItemText primary={name.name} />
            </MenuItem>
          ))}
        </InputField>
      </Grid>
      <Grid item xs={2}>
        <InputField
          label="Billing Type"
          value={formState.billingType}
          onChange={e => {
            setFormState({
              ...formState,
              billingType: e.target.value
            });
            handleBillingChange();
          }}
          fullWidth
          select
        >
          <MenuItem value="1">Monthly</MenuItem>
          <MenuItem value="2">Weekly</MenuItem>
        </InputField>
      </Grid>
      <Grid item xs={2}>
        <InputLabel id="label1">Billing Period</InputLabel>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            name="billingPeriod"
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            value={formState.billingPeriod}
            onChange={date => {
              setFormState({ ...formState, billingPeriod: date });
            }}
          />
        </MuiPickersUtilsProvider>
      </Grid>

      <Grid item xs={2}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            marginRight: 20
          }}
        >
          <span
            style={{
              fontSize: 14,
              color: "#444851"
            }}
          >
            BALANCE DUE
          </span>
          <span
            style={{
              fontWeight: 600,
              fontSize: 32,
              color: "#444851"
            }}
          >
            {formatter.format(parseFloat(getBalance()))}
          </span>
        </div>
      </Grid>
    </div>
  );
}

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2
});
