import React from "react";
import { Grid } from "@material-ui/core";
const RowHeader = ({ rowHeaderData }) => {
  return (
    <Grid
      container
      style={{
        borderBottom: "solid 1px #F1F1f1"
      }}
    >
      {rowHeaderData.map((item, i) => {
        return (
          <Grid
            item
            key={i}
            xs={item.size}
            className="row-header-item p-normal"
          >
            <b>{item.label}</b>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default RowHeader;
