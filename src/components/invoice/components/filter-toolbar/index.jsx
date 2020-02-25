import React from "react";
import { Grid } from "@material-ui/core";
import FilterDate from "./FilterDate";
import FilterMenu from "./FilterMenu";
import FilterStatus from "./FilterStatus";
export default function FilterToolbar() {
  return (
    <Grid container spacing={5}>
      <Grid item lg={2} md={4} sm={4}>
        <FilterStatus />
      </Grid>
      <Grid item lg={4} md={4} sm={4}>
        <FilterMenu />
      </Grid>
      <Grid item lg={4} md={6} sm={6}>
        <FilterDate />
      </Grid>
    </Grid>
  );
}
