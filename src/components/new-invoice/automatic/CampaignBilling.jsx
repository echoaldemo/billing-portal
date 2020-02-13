import React, { useState } from "react";
import { RowHeader } from "common-components";
import RowForm from "./RowForm";

const rowHeaderData = [
  { label: "Campaign", size: 3 },
  { label: "Services", size: 2 },
  { label: "Quantity", size: 2, align_right: true },
  { label: "Rate", size: 2, align_right: true },
  { label: "Amount", size: 2, align_right: true },
  { label: " ", size: 1 }
];

const CampaignBilling = ({ campaignDetails }) => {
  const [rowCollapse, setRowCollapse] = useState([0]);

  return (
    <div style={{ border: "solid 1px #F1F1F1", borderBottom: 0 }}>
      <RowHeader rowHeaderData={rowHeaderData} />
      {campaignDetails.map((el, i) => {
        return (
          <RowForm
            campDetail={el}
            rowCollapse={rowCollapse}
            setRowCollapse={setRowCollapse}
            key={i}
            index={i}
          />
        );
      })}
    </div>
  );
};

export default CampaignBilling;
