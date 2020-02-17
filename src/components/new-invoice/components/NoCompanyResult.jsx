import React from "react";
import img_pic from "assets/choose_picture.svg";

export default function NoCompanyResult() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 700,
        flexDirection: "column"
      }}
    >
      <h3>Please select a company to create a manual invoice</h3>
      <img src={img_pic} alt="choose_pic" width={400} />
    </div>
  );
}
