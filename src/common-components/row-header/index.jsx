import React from "react";
import { Grid } from "@material-ui/core";
const RowHeader = ({ rowHeaderData, style }) => {
  return (
    <Grid
      container
      style={{
        borderBottom: "solid 1px #F1F1f1",
        ...style
      }}
    >
      {rowHeaderData.map((item, i) => {
        return (
          <Grid
            item
            key={i}
            xs={item.size}
            className={
              item.align_right
                ? "row-header-item p-normal p-align-right"
                : "row-header-item p-normal"
            }
            style={{
              ...item.style
            }}
          >
            <b>{item.label}</b>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default RowHeader;
