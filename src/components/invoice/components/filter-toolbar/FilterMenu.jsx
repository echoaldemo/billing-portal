import React from "react";
import { Grid, MenuItem } from "@material-ui/core";
import { InputField } from "common-components";
const FilterMenu = () => {
  const [invoiceType, setInvoiceType] = React.useState(false);
  const [billingType, setBillingType] = React.useState(false);

  const invoiceTypeOptions = [
    { value: false, label: "All" },
    { value: "automatic", label: "Automatic" },
    { value: "manual", label: "Manual" }
  ];
  const billingTypeOptions = [
    { value: false, label: "All" },
    { value: "monthly", label: "Monthly" },
    { value: "weekly", label: "Weekly" }
  ];

  return (
    <Grid container style={{ justifyContent: "flex-end" }} spacing={5}>
      <Grid
        item
        xs={4}
        lg={3}
        style={{
          display: "flex",
          justifyContent: "flex-end"
        }}
      >
        <InputField
          onChange={e => {
            setInvoiceType(e.target.value);
          }}
          fullWidth
          value={invoiceType}
          label="Select Invoice Type"
          select
        >
          {invoiceTypeOptions.map(item => {
            return (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            );
          })}
        </InputField>
      </Grid>
      <Grid
        item
        xs={4}
        lg={3}
        style={{
          display: "flex",
          justifyContent: "flex-end"
        }}
      >
        <InputField
          onChange={e => {
            setBillingType(e.target.value);
          }}
          fullWidth
          value={billingType}
          label="Select Billing Type"
          select
        >
          {billingTypeOptions.map(item => {
            return (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            );
          })}
        </InputField>
      </Grid>
    </Grid>
  );
};

export default FilterMenu;
