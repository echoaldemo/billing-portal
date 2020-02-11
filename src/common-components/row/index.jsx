import React from "react";
import { Grid } from "@material-ui/core";
const Row = ({ rowData }) => {
  return (
    <Grid container>
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
