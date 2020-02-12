import React, { useState, useEffect } from "react";
import RowForm from "./RowForm";
import { RowHeader } from "common-components";

import { ManualInvoiceContext } from "context/ManualInvoiceContext";
const rowHeaderData = [
  { label: "Campaign", size: 3 },
  { label: "Services", size: 2 },
  { label: "Quantity", size: 2 },
  { label: "Rate", size: 2 },
  { label: "Total Amount", size: 2 },
  { label: " ", size: 1 }
];
const CampaignBilling = ({ campaignDetails }) => {
  const [rowCollapse, setRowCollapse] = useState([0, 1]);
  const { setBillingFormState } = React.useContext(ManualInvoiceContext);
  useEffect(() => {
    setBillingFormState(campaignDetails);
  }, []);
  return (
    <div
      style={{
        border: "solid 1px #F1F1F1",
        borderBottom: 0
      }}
    >
      <RowHeader rowHeaderData={rowHeaderData} />
      <div
        style={{
          height: 600,
          overflow: "auto",
          borderBottom: "solid 1px #F1F1F1"
        }}
      >
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
    </div>
  );
};

export default CampaignBilling;
