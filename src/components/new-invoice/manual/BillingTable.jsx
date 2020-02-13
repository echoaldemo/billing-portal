/* eslint-disable */
import React, { useContext, useState, useEffect } from "react";
import { ManualInvoiceContext } from "context/ManualInvoiceContext";
import CampaignBilling from "./CampaignBilling";
const BillingTable = () => {
  const billingData = {
    billableHrsQty: "",
    billableHrsRate: "",
    billableHrsTotalAmount: "",

    didQty: "",
    didRate: "",
    didTotalAmount: "",

    performanceQty: "",
    performanceRate: "",
    performanceTotalAmount: ""
  };
  const { selectedCampaign, state } = useContext(ManualInvoiceContext);
  const [campaignDetails, setCampaignDetails] = useState([]);
  const getAllCampaignDetails = () => {
    const campaignsDetails = selectedCampaign.map(uuid => {
      let filteredDetails = state.campaigns.filter(item => item.uuid === uuid);

      return { ...filteredDetails[0], ...billingData };
    });
    setCampaignDetails(campaignsDetails);
  };
  useEffect(() => {
    getAllCampaignDetails();
  }, [selectedCampaign]);

  return (
    <div>
      {campaignDetails.length > 0 ? (
        <React.Fragment>
          <h3>Items</h3>
          <div style={{ paddingTop: 0 }}>
            <CampaignBilling campaignDetails={campaignDetails} />
          </div>
        </React.Fragment>
      ) : (
        <h3>Please select a campaign</h3>
      )}
    </div>
  );
};

export default BillingTable;
