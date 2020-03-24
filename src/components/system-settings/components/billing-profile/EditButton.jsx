import React, { useContext } from "react";
import { BillingContext } from "context/BillingProfileContext";
import { StateContext } from "context/StateContext";
import { Button } from "@material-ui/core";
import { post, patch } from "utils/api";
const EditButton = () => {
  const {
    state: { edit, selectedBillingType, companyDetails },
    dispatch,
    formState,
    rateProfile,
    setFormState
  } = useContext(BillingContext);
  const {
    state: { applyPrevious }
  } = useContext(StateContext);
  const updateProfile = () => {
    console.log(selectedBillingType);
    dispatch({ type: "set-edit", payload: { edit: false } });
    console.log(rateProfile, "rateProfile")
    if (rateProfile) {
      patch(`/api/rate/${rateProfile}`, {
        rates: formState
      })
    } else {
      console.log(companyDetails, "compansadas")
      post(`/api/rate`, {
        company_uuid: companyDetails.uuid,
        company_name: companyDetails.name,
        company_slug: companyDetails.slug,
        billing_type: selectedBillingType,
        original_data: applyPrevious ? false : true,
        rates: formState
      }).then(result => {
        console.log(result.data.rates)
        setFormState(result.data.rates)
      })
    }
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
