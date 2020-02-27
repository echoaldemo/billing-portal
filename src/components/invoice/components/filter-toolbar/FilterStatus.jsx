import React, { useContext, useState } from "react";
import { Grid, MenuItem } from "@material-ui/core";
import { InputField } from "common-components";
import { StateContext } from "context/StateContext";
const FilterStatus = () => {
  const { setData, originalData } = useContext(StateContext);

  const [menuVal, setMenuVal] = useState(false);

  const filterStatusChange = e => {
    setMenuVal(e.target.value);

    if (e.target.value === false) {
      setData(originalData);
    } else {
      const result = originalData.filter(item => {
        return item.status == e.target.value;
      });
      setData(result);
    }
  };

  return (
    <InputField
      onChange={e => {
        filterStatusChange(e);
      }}
      fullWidth
      value={menuVal}
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
