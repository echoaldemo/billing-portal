import React from "react";
import { InputField as TryField } from "common-components";
import "./style.css";
const InputField = ({ customWidth, ...rest }) => {
  return (
    <TryField
      type="number"
      inputProps={{
        style: { textAlign: "right" }
      }}
      style={{ width: customWidth || "60%", float: "right" }}
      {...rest}
    />
  );
};
export default InputField;
