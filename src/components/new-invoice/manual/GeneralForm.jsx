import React, { useContext, useEffect } from "react";
import { InputField } from "common-components";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

import { ManualInvoiceContext } from "context/ManualInvoiceContext";
import { Grid, MenuItem, ListItemText, Checkbox } from "@material-ui/core";
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
          billingPeriod: {
            ...formState.billingPeriod,
            start: duplicate.startDate
          }
        });
        const campaignsDetails = duplicate.campaigns.map(uuid => {
          let filteredDetails = state.campaigns.filter(
            item => item.uuid === uuid
          );
          let billingData = {
            billableHrsQty: "",
            billableHrsRate: "",
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
  }, [state, duplicate]); // eslint-disable-line

  return (
    <div
      style={{
        display: "flex",
        padding: 15,
        justifyContent: "space-between",
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

      <Grid item xs={3}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridGap: 20
          }}
        >
          <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                TextFieldComponent={InputField}
                label="Start of Period"
                name="billingPeriod"
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                value={formState.billingPeriod.start}
                onChange={date => {
                  setFormState({
                    ...formState,
                    billingPeriod: { ...formState.billingPeriod, start: date }
                  });
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                minDate={formState.billingPeriod.start}
                TextFieldComponent={InputField}
                label="End of Period"
                name="billingPeriod"
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                minDateMessage="Date should not be before minimal date"
                value={formState.billingPeriod.end}
                onChange={date => {
                  setFormState({
                    ...formState,
                    billingPeriod: { ...formState.billingPeriod, end: date }
                  });
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
        </div>
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
