import React, { useContext } from "react";
import { RowHeader } from "common-components";
import { BillingContext } from "context/BillingProfileContext";
import RowHeaderData from "./rowHeaderData";
import CampaignRowDetails from "./CampaignRowsDetails";
const CampaignRows = () => {
  return (
    <div style={{ width: "100%", paddingTop: 15 }}>
      <RowHeader
        rowHeaderData={RowHeaderData}
        style={{ border: "solid 1px #F1f1f1" }}
      />
      <div className="row-body-container">
        <RowBody />
      </div>
    </div>
  );
};

const RowBody = () => {
  const { formState } = useContext(BillingContext);

  return (
    <React.Fragment>
      {formState.length > 0 && (
        <React.Fragment>
          {formState.map((item, i) => {
            return <CampaignRowDetails item={item} key={i} index={i} />;
          })}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default CampaignRows;
