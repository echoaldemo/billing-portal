import React from "react";
import { InputField as TryField } from "common-components";
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
export default InputField;
