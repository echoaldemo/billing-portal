import React, { useContext } from "react";
import { Grid, MenuItem } from "@material-ui/core";
import { InputField } from "common-components";
import { StateContext } from "context/StateContext";
const FilterMenu = () => {
  const { handleFilterChange, filterOpt } = useContext(StateContext);

  const invoiceTypeOptions = [
    { value: " ", label: "All" },
    { value: "Automatic", label: "Automatic" },
    { value: "Manual", label: "Manual" }
  ];
  const billingTypeOptions = [
    { value: " ", label: "All" },
    { value: "1", label: "Monthly" },
    { value: "2", label: "Weekly" }
  ];

  return (
    <Grid container style={{ justifyContent: "flex-end" }} spacing={5}>
      <Grid
        item
        xs={4}
        md={4}
        lg={6}
        style={{
          justifyContent: "flex-end"
        }}
      >
        <InputField
          onChange={e => {
            handleFilterChange(e, "invoiceType");
          }}
          fullWidth
          value={filterOpt.invoiceType}
          label="Invoice Type"
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
        lg={6}
        style={{
          display: "flex",
          justifyContent: "flex-end"
        }}
      >
        <InputField
          onChange={e => {
            handleFilterChange(e, "billingType");
          }}
          fullWidth
          value={filterOpt.billingType}
          label="Billing Type"
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
