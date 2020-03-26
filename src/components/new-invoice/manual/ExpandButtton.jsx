import React from "react";
import { ExpandMore, ExpandLess } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
const ExpandButton = ({ collapse, setCollapse, disabled }) => {
  return (
    <div style={{ textAlign: "right" }}>
      <IconButton
        style={{ padding: 5 }}
        onClick={() => {
          setCollapse(!collapse);
        }}
        disabled={disabled || false}
      >
        {collapse ? <ExpandLess /> : <ExpandMore />}
      </IconButton>
    </div>
  );
};

export default ExpandButton;
