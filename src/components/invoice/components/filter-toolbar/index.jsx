import React from "react";
import { Grid } from "@material-ui/core";
import FilterDate from "./FilterDate";
import SearchData from "./SearchData";
import FilterMenu from "./FilterMenu";
export default function FilterToolbar() {
  return (
    <Grid container spacing={5}>
      <Grid item lg={3} sm={12}>
        <SearchData />
      </Grid>
      <Grid item lg={5} md={6} sm={6}>
        <FilterMenu />
      </Grid>
      <Grid item lg={4} md={6} sm={6}>
        <FilterDate />
      </Grid>
    </Grid>
  );
}
