import React, { useContext } from "react";
import { BillingContext } from "context/BillingProfileContext";
import { Button } from "@material-ui/core";
import { post, patch } from "utils/api";
const EditButton = () => {
  const {
    state: { edit },
    dispatch,
    formState
  } = useContext(BillingContext);

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
              performance_rate: item.performance_rate,
              original_data: true
            });
          }
        });
      }
    });
  };

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default EditButton;
