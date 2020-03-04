import React, { useContext } from "react";
import { TrashBinContext } from "context/TrashBinContext";
import { InputField } from "common-components";
import { MenuItem } from "@material-ui/core";

export default function SelectCompanyField() {
  const {
    state: { companies, selectedCompany, originalData },
    dispatch
  } = useContext(TrashBinContext);

  const filterByCompany = company_uuid => {
    return originalData.filter(item => item.company.uuid === company_uuid);
  };

  return (
    <InputField
      label="Select company"
      value={selectedCompany}
      onChange={e => {
        dispatch({
          type: "set-selected-company",
          payload: {
            selectedCompany: e.target.value
          }
        });
        dispatch({
          type: "set-data",
          payload: {
            loading: false,
            data: !e.target.value
              ? originalData
              : filterByCompany(e.target.value)
          }
        });
      }}
      fullWidth
      select
    >
      {console.log("origData", originalData)}
      <MenuItem value={false}>All</MenuItem>;
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
