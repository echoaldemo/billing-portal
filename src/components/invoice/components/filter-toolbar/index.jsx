import React from "react";
import { Grid, Button } from "@material-ui/core";
import FilterDate from "./FilterDate";
import FilterMenu from "./FilterMenu";
import FilterStatus from "./FilterStatus";
import { StateContext } from "context/StateContext";

export default function FilterToolbar() {
  const { resetFilter } = React.useContext(StateContext);
  return (
    <>
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
        <Grid item style={{ display: "flex", alignItems: "flex-end" }}>
          <Button onClick={() => resetFilter()} className="add-btn">
            Reset Filter
          </Button>
        </Grid>
      </Grid>
      <Grid container></Grid>
    </>
  );
}
