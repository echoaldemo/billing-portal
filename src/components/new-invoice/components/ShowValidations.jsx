import React from "react";
import { Collapse } from "@material-ui/core";
import WarningIcon from "@material-ui/icons/Warning";
const ShowValidations = props => {
  const { errorList, ...rest } = props;

  return (
    <Collapse {...rest}>
      <ul style={{ listStyle: "none", paddingLeft: 15 }}>
        {errorList.map((item, i) => {
          if (item.error) {
            return (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <WarningIcon style={{ fontSize: 16, color: "ff504d" }} />
                &emsp;
                <span style={{ color: "#ff504d", fontSize: 16 }}>
                  {item.errorMsg}
                </span>
              </li>
            );
          }

          return null;
        })}
      </ul>
    </Collapse>
  );
};
export default ShowValidations;
