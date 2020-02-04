import React from "react";
import { Button } from "@material-ui/core";
export default function ManagePendingFooter() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: 15
      }}
    >
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
        >
          Complete Review
        </Button>
      </div>
    </div>
  );
}
