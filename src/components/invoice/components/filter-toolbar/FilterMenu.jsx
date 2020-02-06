import React, { useContext } from "react";
import { Grid, MenuItem } from "@material-ui/core";
import { InputField } from "common-components";
import { StateContext } from "context/StateContext";
const FilterMenu = () => {
  const { state, setData, originalData } = useContext(StateContext);
  const [invoiceType, setInvoiceType] = React.useState(false);
  const [billingType, setBillingType] = React.useState(false);

  const invoiceTypeOptions = [
    { value: false, label: "All" },
    { value: "Automatic", label: "Automatic" },
    { value: "manual", label: "Manual" }
  ];
  const billingTypeOptions = [
    { value: false, label: "All" },
    { value: "monthly", label: "Monthly" },
    { value: "weekly", label: "Weekly" }
  ];

  const filterInvoiceType = e => {
    setInvoiceType(e.target.value);
    const filteredWithInvoiceType = originalData.filter(item => {
      return !e.target.value ? state.data : item.invoiceType === e.target.value;
    });
    setData(filteredWithInvoiceType);
  };

  return (
    <Grid container style={{ justifyContent: "flex-end" }} spacing={5}>
      <Grid
        item
        xs={4}
        md={4}
        lg={3}
        style={{
          justifyContent: "flex-end"
        }}
      >
        <InputField
          onChange={e => {
            filterInvoiceType(e);
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
        md={4}
        lg={3}
        style={{
          display: "flex",
          justifyContent: "flex-end"
        }}
      >
        <InputField
          onChange={e => {
            e.preventDefault();
            setBillingType(e.target.value);
            alert("Working in progress");
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
