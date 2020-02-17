import React from "react";
import img_pic from "assets/choose_picture.svg";

export default function NoCompanyResult() {
  return (
    <div
      style={{
        display: "grid",
        justifyItems: "center",
        gridGap: 40,
        border: "1px solid rgb(241, 241, 241)",
        background: "#4a4a4a05"
      }}
    >
      <div
        style={{
          backgroundColor: "rgb(220, 233, 241)",
          color: "rgb(76, 127, 158)",
          width: "100%",
          textAlign: "center"
        }}
      >
        <h3>Please select a company to create an invoice</h3>
      </div>
      <img src={img_pic} alt="choose_pic" style={{ width: "62vh" }} />
    </div>
  );
}
