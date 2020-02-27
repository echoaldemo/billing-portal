import React from "react";
import { Grid } from "@material-ui/core";
import { BillingProvider } from "context/BillingProfileContext";
import SelectCompanyField from "./SelectCompanyField";
import CampaignRows from "./CampaignRows";
const BillingProfile = () => {
  return (
    <div className="billing-profile-container">
      <Grid container>
        <Grid item xs={2} lg={4}>
          <SelectCompanyField />
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
