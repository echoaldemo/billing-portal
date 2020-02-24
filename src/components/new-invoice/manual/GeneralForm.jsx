import React, { useContext, useEffect } from "react";
import { InputField } from "common-components";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

import { ManualInvoiceContext } from "context/ManualInvoiceContext";
import {
  Grid,
  MenuItem,
  ListItemText,
  Checkbox,
  InputLabel
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";

export default function GeneralForm({ duplicate }) {
  const {
    state,
    formState,
    setFormState,
    selectedCampaign,
    setSelectedCampaign,
    computeBalanceDue,
    setBillingFormState
  } = useContext(ManualInvoiceContext);
  const filterCampaign = uuid => {
    const filteredCampaign = state.campaigns.filter(
      camp => camp.company === uuid
    );
    setSelectedCampaign(filteredCampaign.map(item => item.uuid));
    return filteredCampaign;
  };

  useEffect(() => {
    if (duplicate) {
      if (!state.loading) {
        setFormState({
          ...formState,
          company: duplicate.company.uuid,
          campaign: filterCampaign(duplicate.company.uuid),
          billingType: duplicate.billingType,
          billingPeriod: duplicate.startDate
        });
        const campaignsDetails = duplicate.campaigns.map(uuid => {
          let filteredDetails = state.campaigns.filter(
            item => item.uuid === uuid
          );
          let billingData = {
            billableHrsQty: "9",
            billableHrsRate: "9",
            billableHrsTotalAmount: "",

            didQty: "",
            didRate: "",
            didTotalAmount: "",

            performanceQty: "",
            performanceRate: "",
            performanceTotalAmount: ""
          };
          return { ...filteredDetails[0], ...billingData };
        });
        setBillingFormState(campaignsDetails);
      }
    }
  }, [state, duplicate]);

  return (
    <div
      style={{
        display: "flex",
        padding: 15,
        justifyContent: "space-evenly",
        alignItems: "center"
      }}
    >
      <Grid item xs={2}>
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
          }}
          fullWidth
          select
        >
          <MenuItem value="1">Monthly</MenuItem>
          <MenuItem value="2">Weekly</MenuItem>
        </InputField>
      </Grid>

      <Grid item xs={2}>
        <InputLabel id="label1">Start Date</InputLabel>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            value={formState.startDate}
            onChange={date => {
              setFormState({ ...formState, startDate: date });
            }}
          />
        </MuiPickersUtilsProvider>
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

      <Grid item xs={1}>
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
            {formatter.format(parseFloat(computeBalanceDue()))}
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
