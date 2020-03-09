import React from "react";
import { Row } from "common-components";

const Services = props => {
  return (
    <div {...props}>
      <h4 className="section-title">Global Taxes</h4>
      <Row
        rowData={[
          { size: 6, label: "Mexico" },
          { size: 6, label: "6.1" }
        ]}
      />
    </div>
  );
};

export default Services;
