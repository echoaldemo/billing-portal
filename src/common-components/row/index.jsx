import React from "react";
import { Grid } from "@material-ui/core";
const Row = ({ rowData }) => {
  return (
    <Grid container>
      {rowData.map((item, i) => {
        const classTitle = item.border
          ? "row-item p-normal border"
          : "row-tem p-normal";
        return (
          <Grid item xs={item.size} key={i} className={classTitle}>
            {item.label}
          </Grid>
        );
      })}
    </Grid>
  );
};

export default Row;
