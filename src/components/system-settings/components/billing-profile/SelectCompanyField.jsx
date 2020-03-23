import React, { useContext } from "react";
import { BillingContext } from "context/BillingProfileContext";
import { InputField } from "common-components";
import { MenuItem } from "@material-ui/core";

export default function SelectCompanyField() {
  const { state, dispatch } = useContext(BillingContext);
  return (
    <InputField
      label="Select company"
      value={state.selectedCompany}
      onChange={e => {
        dispatch({
          type: "set-selected-company",
          payload: {
            selectedCompany: e.target.value,
          }
        });
      }}
      disabled={false}
      fullWidth
      select
    >
      {state.companies.map(item => {
        return (
          <MenuItem key={item.uuid} value={item.uuid}>
            {item.name}
          </MenuItem>
        );
      })}
    </InputField>
  );
}
