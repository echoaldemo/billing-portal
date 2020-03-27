import React, { useContext } from "react";
import { BillingContext } from "context/BillingProfileContext";
import { InputField } from "common-components";
import { MenuItem } from "@material-ui/core";
import { IdentityContext } from "context/IdentityContext"

export default function SelectCompanyField() {
  const { state, dispatch } = useContext(BillingContext);
  const { identityState: { companies } } = useContext(IdentityContext)
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
      <MenuItem value={false}>
        Select Company
      </MenuItem>
      {companies.map(item => {
        return (
          <MenuItem key={item.uuid} value={item.uuid}>
            {item.name}
          </MenuItem>
        );
      })}
    </InputField>
  );
}
