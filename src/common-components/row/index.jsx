import React from "react";
import { Grid } from "@material-ui/core";
const Row = ({ rowData, style }) => {
  return (
    <Grid container style={{ ...style }}>
      {rowData.map((item, i) => {
        return (
          <Grid item xs={item.size} key={i} className="row-item p-normal">
            {item.label}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Row;
