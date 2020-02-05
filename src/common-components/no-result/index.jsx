import React from "react";
import NoDataImg from "assets/no_data.svg";
export default function NoResult() {
  return (
    <div
      style={{
        minHeight: 400,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#444851",
        flexDirection: "column"
      }}
    >
      <img src={NoDataImg} width={150} />
      <h4>No Data Found</h4>
    </div>
  );
}
