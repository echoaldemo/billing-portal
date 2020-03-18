import React, { useContext } from "react";
import { BillingContext } from "context/BillingProfileContext";
import { InputField } from "common-components";
import { MenuItem } from "@material-ui/core";
function SelectBillingTypeField() {
  const {
    state: { selectedBillingType },
    dispatch
  } = useContext(BillingContext);

  return (
    <InputField
      label="Select Type"
      value={selectedBillingType || "1"}
      onChange={e => {
        dispatch({
          type: "set-billing-type",
          payload: {
            selectedBillingType: e.target.value
          }
        });
      }}
      disabled={false}
      fullWidth
      select
    >
      <MenuItem value="1">Monthly</MenuItem>
      <MenuItem value="2">Weekly</MenuItem>
    </InputField>
  );
}

export default SelectBillingTypeField;
