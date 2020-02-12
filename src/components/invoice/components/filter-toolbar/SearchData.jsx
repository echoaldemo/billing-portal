/* eslint-disable */
import React, { useState } from "react";
import { Search } from "@material-ui/icons";
import { InputField } from "common-components";
import { StateContext } from "context/StateContext";

const matchThis = (item, searchValue) => {
  return (
    item.company.name.match(new RegExp(searchValue, "ig")) ||
    item.id.toString().match(new RegExp(searchValue.toString()), "ig")
  );
};

export default function SearchData() {
  const { originalData, setData } = React.useContext(StateContext);
  const [search, setSearch] = useState("");
  const searchFunc = searchValue => {
    setSearch(searchValue);
    var filteredData = originalData.filter(item => {
      if (matchThis(item, searchValue)) {
        return item;
      }
    });
    const searchedData = searchValue.length > 0 ? filteredData : originalData;
    setData(searchedData);
  };

  return (
    <React.Fragment>
      <InputField
        fullWidth
        label="Search by Invoice number or Company name"
        InputProps={{
          endAdornment: <Search style={{ color: "#CCC" }} />
        }}
        value={search}
        onChange={e => {
          searchFunc(e.target.value);
        }}
      />
    </React.Fragment>
  );
}
