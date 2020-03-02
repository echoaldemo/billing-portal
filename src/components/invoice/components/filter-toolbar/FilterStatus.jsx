import React, { useContext, useState, useEffect } from "react";
import { Grid, MenuItem } from "@material-ui/core";
import { InputField } from "common-components";
import { StateContext } from "context/StateContext";

const FilterStatus = () => {
  const { setData, originalData, filterStatus, setFilterStatus } = useContext(
    StateContext
  );

  const [menuVal, setMenuVal] = useState(filterStatus);
  useEffect(() => {
    setMenuVal(filterStatus);
    filterStatusChange(filterStatus);
  }, [filterStatus]);

  const filterStatusChange = (val) => {
    setMenuVal(val);
    setFilterStatus(val);
    if (val === false) {
      setData(originalData);
    } else {
      const result = originalData.filter((item) => {
        return item.status == val;
      });
      setData(result);
    }
  };

  return (
    <InputField
      onChange={(e) => {
        filterStatusChange(e.target.value);
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
