import React from "react";

export default function DetailsContainer({ title, value }) {
  return (
    <div className="section-title-text">
      <b>{title}</b>
      <br />
      {value}
    </div>
  );
}
