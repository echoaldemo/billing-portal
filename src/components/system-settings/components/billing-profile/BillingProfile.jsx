import React from "react";
import { Grid, Button } from "@material-ui/core";
import { BillingProvider, BillingContext } from "context/BillingProfileContext";
import SelectCompanyField from "./SelectCompanyField";
import CampaignRows from "./CampaignRows";
const BillingProfile = () => {
  const { state, dispatch } = React.useContext(BillingContext);
  const { edit } = state;
  return (
    <div className="billing-profile-container">
      <Grid container className="header-container">
        <Grid item xs={2} lg={4}>
          <SelectCompanyField />
        </Grid>
        <Grid
          item
          xs={2}
          lg={2}
          className="edit-btn-container"
          onClick={() => {
            dispatch({ type: "set-edit", payload: { edit: !edit } });
          }}
        >
          <Button>{!edit ? "Edit items" : "Save"}</Button>
        </Grid>
      </Grid>

      <Grid container>
        <CampaignRows />
      </Grid>
    </div>
  );
};

const BillingProfileWrapper = props => {
  return (
    <BillingProvider {...props}>
      <BillingProfile {...props} />
    </BillingProvider>
  );
};

export default BillingProfileWrapper;
