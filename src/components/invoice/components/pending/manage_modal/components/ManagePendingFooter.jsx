import React from "react";
import { Button } from "@material-ui/core";
import { StateContext } from "context/StateContext";
import { patch } from "utils/api";
export default function ManagePendingFooter() {
  const { state, dispatch, getPendingInvoicesData } = React.useContext(
    StateContext
  );

  const updateStateStatus = () => {
    dispatch({
      type: "set-update-loading",
      payload: { updateLoading: true }
    });

    patch(`/api/pending/edit/${state.selectedData.id}`, { status: 1 })
      .then(res => {
        console.log("Res", res[0]);
        dispatch({
          type: "set-update-loading",
          payload: { updateLoading: false }
        });
        dispatch({
          type: "set-selected-data",
          payload: { selectedData: res.data[0] }
        });
      })
      .then(() => {
        getPendingInvoicesData();
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 15
      }}
    >
      {console.log(state)}
      <div>
        <Button
          variant="contained"
          color="secondary"
          style={{ fontWeight: "bold", textDecoration: "none" }}
        >
          Delete
        </Button>
        &emsp;
        <h5 style={{ display: "inline-block", color: "#444851" }}>
          Enim nostrud ipsum cupidatat ad elit officia velit deserunt laboris.
        </h5>
      </div>
      <div>
        <Button
          variant="contained"
          style={{ fontWeight: "bold", textDecoration: "none" }}
        >
          Skip
        </Button>
        &emsp;
        <Button
          variant="contained"
          color="primary"
          style={{
            fontWeight: "bold",
            backgroundColor: "#0f97fc",
            textDecoration: "none"
          }}
          onClick={updateStateStatus}
        >
          Complete Review
        </Button>
      </div>
    </div>
  );
}
