/* eslint-disable */
import React, { useContext, useState, useEffect } from "react";
import { AutomaticInvoiceContext } from "context/AutomaticInvoiceContext";
import CampaignBilling from "./CampaignBilling";
import { TableLoader } from "common-components";
const BillingTable = () => {
  const { selectedCampaign, state, setFormLoading } = useContext(
    AutomaticInvoiceContext
  );
  const [campaignDetails, setCampaignDetails] = useState([]);
  const getAllCampaignDetails = () => {
    const campaignsDetails = selectedCampaign.map(uuid => {
      let filteredDetails = state.campaigns.filter(item => item.uuid === uuid);
      return filteredDetails[0];
    });
    setCampaignDetails(campaignsDetails);
  };
  useEffect(() => {
    getAllCampaignDetails();
  }, [selectedCampaign, state]);
  return (
    <div>
      <React.Fragment>
        <React.Fragment>
          <div style={{ paddingTop: 0 }}>
            <CampaignBilling campaignDetails={campaignDetails} />
          </div>
        </React.Fragment>
      </React.Fragment>
    </div>
  );
};

export default BillingTable;
