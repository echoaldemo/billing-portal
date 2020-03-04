import React, { Profiler } from "react";
import { Grid, Button } from "@material-ui/core";
import { BillingProvider, BillingContext } from "context/BillingProfileContext";
import SelectCompanyField from "./SelectCompanyField";
import CampaignRows from "./CampaignRows";
import { CustomCheckbox } from "common-components";
import SEO from "utils/seo";
import { patch } from "utils/api";
import { post } from "utils/api";
const BillingProfile = () => {
  const {
    state: { edit },
    dispatch,
    formState
  } = React.useContext(BillingContext);

  const updateProfile = () => {
    dispatch({ type: "set-edit", payload: { edit: false } });
    formState.forEach(item => {
      if (item.profile_id && item.edited) {
        patch(`/api/rate/${item.profile_id}`, {
          billable_rate: item.billable_rate,
          did_rate: item.did_rate,
          performance_rate: item.performance_rate
        });
      } else {
        formState.forEach(item => {
          if (item.edited) {
            post("/api/rate", {
              company_uuid: item.company,
              campaign_uuid: item.uuid,
              billable_rate: item.billable_rate,
              did_rate: item.did_rate,
              performance_rate: item.performance_rate
            });
          }
        });
      }
    });
  };
  return (
    <div className="billing-profile-container">
      <SEO title="Billing Profile" />
      <Grid container className="header-container">
        <Grid item xs={2} lg={4}>
          <SelectCompanyField />
        </Grid>
        <Grid item xs={2} lg={2} className="edit-btn-container">
          {!edit ? (
            <Button
              onClick={() => {
                dispatch({ type: "set-edit", payload: { edit: true } });
              }}
            >
              Edit Items
            </Button>
          ) : (
            <Button
              onClick={() => {
                updateProfile();
              }}
            >
              Save Items
            </Button>
          )}
        </Grid>
      </Grid>

      <Grid container>
        <CampaignRows />
        <h5>
          <CustomCheckbox checked={true} />
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
