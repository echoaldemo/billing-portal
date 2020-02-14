import React from "react";
import { InputAdornment } from "@material-ui/core";
import { InputField as TryField } from "common-components";
import styled from "styled-components";
const BillDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: end;
`;
const InputField = ({ customWidth, ...rest }) => {
  return (
    <TryField
      inputProps={{
        style: { textAlign: "right" }
      }}
      style={{ width: customWidth || "60%", float: "right" }}
      {...rest}
    />
  );
};
const TimeInput = ({ state, handleChange }) => {
  return (
    <BillDiv>
      <InputField
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              hr{state.hour > 1 ? "s" : ""}
            </InputAdornment>
          )
        }}
        customWidth="80%"
        onChange={e => handleChange(e.target.value, "hour")}
        value={state.hour}
      />
      <InputField
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              min{state.min > 1 ? "s" : ""}
            </InputAdornment>
          )
        }}
        customWidth="80%"
        onChange={e => handleChange(e.target.value, "min")}
        value={state.min}
      />
    </BillDiv>
  );
};

export default TimeInput;
