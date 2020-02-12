import React from "react";
import { SelectField } from "./styles";

const InputField = ({ children, ...rest }) => {
  return (
    <SelectField data-cy="text-field" {...rest} autoComplete="off">
      {children}
    </SelectField>
  );
};

export default InputField;
