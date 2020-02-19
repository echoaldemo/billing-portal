import React from "react";
import { Checkbox } from "@material-ui/core";
const CustomCheckbox = ({ style, ...rest }) => {
  return <Checkbox {...rest} style={{ ...style, padding: 0 }} />;
};
export default CustomCheckbox;
