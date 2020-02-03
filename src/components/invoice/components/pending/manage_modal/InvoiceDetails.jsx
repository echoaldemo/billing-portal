import React from "react";
import { InputField } from "common-components";
import { Grid } from "@material-ui/core";
import ItemsTable from "./components/ItemsTable";
export default function InvoiceDetails({ data }) {
  return (
    <div className="modal-details-container">
      <Grid container spacing={3}>
        <Grid item lg={3} xs={3} md={3}>
          <InputField label="Company" value="Sample Company" disabled />
        </Grid>
        <Grid item lg={3} xs={3} md={3}>
          <InputField label="Company" value="Sample Company" disabled />
        </Grid>
        <Grid item lg={3} xs={3} md={3}>
          <InputField label="Company" value="Sample Company" disabled />
        </Grid>
        <Grid item lg={3} xs={3} md={3}>
          <InputField label="Company" value="Sample Company" disabled />
        </Grid>
      </Grid>
      <br />
      <ItemsTable />
      <br />
      <br />
    </div>
  );
}
