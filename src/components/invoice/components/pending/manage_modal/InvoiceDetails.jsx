import React from "react";
import { InputField } from "common-components";
import { Grid } from "@material-ui/core";
import ItemsTable from "./components/ItemsTable";
import { StateContext } from "context/StateContext";
import { truncate } from "utils/func";
export default function InvoiceDetails() {
  const { state } = React.useContext(StateContext);

  const [formState, setFormState] = React.useState(state.selectedData);

  return (
    <div className="modal-details-container">
      <Grid container spacing={3}>
        <Grid item lg={3} xs={3} md={3}>
          <InputField
            label="Company"
            value={formState.company}
            disabled={!state.editManageData}
          />
        </Grid>
        <Grid item lg={3} xs={3} md={3}>
          <InputField
            label="Campaigns"
            value={
              formState.campaigns
                ? truncate(formState.campaigns, 22, "...")
                : ""
            }
            disabled={!state.editManageData}
          />
        </Grid>
        <Grid item lg={3} xs={3} md={3}>
          <InputField
            label="Start Date"
            value="July 1, 2019"
            disabled={!state.editManageData}
          />
        </Grid>
        <Grid item lg={3} xs={3} md={3}>
          <InputField
            label="Due Date"
            value="July 30, 2020"
            disabled={!state.editManageData}
          />
        </Grid>
      </Grid>
      <br />
      <ItemsTable formState={formState} setFormState={setFormState} />
    </div>
  );
}
