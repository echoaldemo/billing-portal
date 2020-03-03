import React, { useContext } from "react";
import { TrashBinProvider, TrashBinContext } from "context/TrashBinContext";
import TrashBinItems from "./TrashBinItems";
import { TableLoader } from "common-components";
import { Button } from "@material-ui/core";
const TrashBin = () => {
  const {
    state: { loading }
  } = useContext(TrashBinContext);
  return (
    <React.Fragment>
      <div
        style={{
          padding: 15,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center"
        }}
      >
        <Button variant="contained">Delete All</Button>
      </div>
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
