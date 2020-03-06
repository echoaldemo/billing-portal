import React, { useContext } from "react";
import { MenuItem } from "@material-ui/core";
import { InputField } from "common-components";
import { StateContext } from "context/StateContext";

const FilterStatus = () => {
  const { filterOpt, handleFilterChange } = useContext(StateContext);

  return (
    <InputField
      onChange={e => {
        handleFilterChange(e, "status");
      }}
      fullWidth
      value={filterOpt.status}
      label="Status"
      select
    >
      <MenuItem value={false}>All</MenuItem>
      <MenuItem value={0}>Draft</MenuItem>
      <MenuItem value={1}>Reviewed</MenuItem>
      <MenuItem value={2}>Approved</MenuItem>
    </InputField>
  );
};

export default FilterStatus;
