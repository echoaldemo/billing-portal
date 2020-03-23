import React, { useContext } from "react";
import { InputField } from "common-components";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { AutomaticInvoiceContext } from "context/AutomaticInvoiceContext";
import { Grid, MenuItem, ListItemText, Checkbox } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";

export default function GeneralForm() {
  const {
    state,
    formState,
    setFormState,
    selectedCampaign,
    setSelectedCampaign,
    handleBillingChange,
    handleCompanyChange,
    getBalance,
    handleDomo
  } = useContext(AutomaticInvoiceContext);
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
          onChange={e => handleCompanyChange(e)}
          disabled={false}
          fullWidth
          select
        >
          <MenuItem value={false} disabled>
            Select company
          </MenuItem>
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
            handleBillingChange(e);
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
                  handleDomo("start", date)
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
          <div>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                TextFieldComponent={InputField}
                label="End of Period"
                name="billingPeriod"
                minDate={formState.billingPeriod.start}
                minDateMessage="Date should not be before the start of the period"
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                value={formState.billingPeriod.end}
                onChange={date => {
                  setFormState({
                    ...formState,
                    billingPeriod: { ...formState.billingPeriod, end: date }
                  });
                  handleDomo("end", date)
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
        </div>
      </Grid>

      {/* <Grid item xs={2}>
        
      </Grid> */}

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
