import React, { useContext } from "react";
import { Row, RowHeader } from "common-components";
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
  const {
    companyCampaigns,
    state: { campaignRates }
  } = useContext(BillingContext);

  const getCampaignRate = uuid => {
    const result = campaignRates.find(item => {
      return item.campaign_uuid === uuid;
    });
    return result
      ? result
      : {
          billable_rate: "not set",
          did_rate: "not set",
          performance_rate: "not set"
        };
  };

  return (
    <React.Fragment>
      {companyCampaigns.length > 0 && (
        <React.Fragment>
          {companyCampaigns.map((item, i) => {
            console.log(item);
            return (
              <CampaignRowDetails
                item={item}
                key={i}
                index={i}
                campaignRate={getCampaignRate(item.uuid)}
              />
            );
          })}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default CampaignRows;
