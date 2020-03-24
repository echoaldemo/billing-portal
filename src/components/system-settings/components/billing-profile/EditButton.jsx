import React, { useContext } from "react";
import { BillingContext } from "context/BillingProfileContext";
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
        original_data: false,
        rates: formState
      }).then(result => {
        console.log(result.data.rates)
        setFormState(result.data.rates)
      })

    }

    // formState.forEach(item => {
    //   if (item.profile_id && item.edited) {
    //     patch(`/api/rate/${item.profile_id}`, {
    //       billable_rate: item.billable_rate,
    //       did_rate: item.did_rate,
    //       performance_rate: item.performance_rate
    //     });
    //   } else {
    //     formState.forEach(item => {
    //       if (item.edited) {
    //         post("/api/rate", {
    //           company_uuid: item.company,
    //           campaign_uuid: item.uuid,
    //           billable_rate: item.billable_rate,
    //           did_rate: item.did_rate,
    //           performance_rate: item.performance_rate,
    //           original_data: true,
    //           billing_type: selectedBillingType
    //         });
    //       }
    //     });
    //   }
    // });
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
