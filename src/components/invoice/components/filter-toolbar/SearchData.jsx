import React, { useState } from "react";
import { Search } from "@material-ui/icons";
import { InputField } from "common-components";
import { StateContext } from "context/StateContext";

const matchThis = (item, searchValue) => {
  return (
    item.company.name.match(new RegExp(searchValue, "i")) ||
    item.docNumber.match(new RegExp(searchValue), "i")
  );
};

export default function SearchData() {
  const { state, originalData, setData } = React.useContext(StateContext);
  const [search, setSearch] = useState("");
  const searchFunc = searchValue => {
    setSearch(searchValue);
    var filteredData = state.data.filter(item => {
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
        label="Search for invoice"
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
