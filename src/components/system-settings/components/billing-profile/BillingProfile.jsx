import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import { BillingProvider } from "context/BillingProfileContext";
import SelectCompanyField from "./SelectCompanyField";
import CampaignRows from "./CampaignRows";
import { CustomCheckbox } from "common-components";
import SEO from "utils/seo";
import { StateContext } from "context/StateContext";
import EditButton from "./EditButton";
import SelectBillingTypeField from "./SelectBillingTypeField";
import { IdentityContext } from "context/IdentityContext"
const BillingProfile = () => {
  const {
    state: { applyPrevious },
    dispatch: stateDispatch
  } = useContext(StateContext);

  const {
    identityState
  } = useContext(IdentityContext)
  return (
    <div className="billing-profile-container">
      {console.log(identityState)}
      <SEO title="Billing Profile" />
      <Grid container className="billing-header-container">
        <Grid item xs={10}>
          <Grid container spacing={2}>
            <Grid item xs={2} lg={4}>
              <SelectCompanyField />
            </Grid>
            <Grid item xs={2}>
              <SelectBillingTypeField />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={2} lg={2} className="edit-btn-container">
          <EditButton />
        </Grid>
      </Grid>

      <Grid container>
        <CampaignRows />
        <h5>
          <CustomCheckbox
            checked={applyPrevious}
            onClick={e => {
              stateDispatch({
                type: "set-apply-prev",
                payload: {
                  applyPrevious: e.target.checked
                }
              });
            }}
          />
          &nbsp;
          <span>Apply previous invoice data for campaign's rate values.</span>
        </h5>
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
