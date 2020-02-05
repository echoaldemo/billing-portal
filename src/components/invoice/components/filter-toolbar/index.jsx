import React from "react";
import { Grid } from "@material-ui/core";
import SearchData from "./SearchData";
import FilterMenu from "./FilterMenu";
export default function FilterToolbar() {
  return (
    <Grid container spacing={5}>
      <Grid item lg={4} sm={12} style={{ alignItems: "center" }}>
        <SearchData />
      </Grid>
      <Grid item lg={8} md={12} sm={12}>
        <FilterMenu />
      </Grid>
    </Grid>
  );
}
