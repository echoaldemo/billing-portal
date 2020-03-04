import React, { useContext } from "react";
import { TrashBinProvider, TrashBinContext } from "context/TrashBinContext";
import TrashBinItems from "./TrashBinItems";
import { TableLoader } from "common-components";
import { Button, Grid } from "@material-ui/core";
import SelectCompanyField from "./SelectCompanyField";
const TrashBin = () => {
  const {
    state: { loading }
  } = useContext(TrashBinContext);
  return (
    <React.Fragment>
      <Grid
        container
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          padding: 15,
          paddingLeft: 0,
          paddingRight: 0
        }}
      >
        <Grid item xs={4}>
          <SelectCompanyField />
        </Grid>
        <Grid item xs={2} style={{ textAlign: "right" }}>
          <Button variant="contained">Delete All</Button>
        </Grid>
      </Grid>

      <div style={{ border: "solid 1px #F1F1F1", minHeight: 600 }}>
        {loading ? <TableLoader /> : <TrashBinItems />}
      </div>
    </React.Fragment>
  );
};

const TrashBinWrapper = props => {
  return (
    <TrashBinProvider {...props}>
      <TrashBin {...props} />
    </TrashBinProvider>
  );
};

export default TrashBinWrapper;
