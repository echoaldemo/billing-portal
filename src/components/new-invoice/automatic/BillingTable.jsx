/* eslint-disable */
import React, { useContext, useState, useEffect } from "react";
import { AutomaticInvoiceContext } from "context/AutomaticInvoiceContext";
import CampaignBilling from "./CampaignBilling";
import { TableLoader } from "common-components";
const BillingTable = () => {
  const { selectedCampaign, state } = useContext(AutomaticInvoiceContext);
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
  }, [selectedCampaign]);
  return (
    <div>
      {campaignDetails.length > 0 ? (
        <React.Fragment>
          {
            console.log("LOADING =>>", state.formLoading)
          }
          <div style={{ paddingTop: 0 }}>
            {
              state.formLoading ?
                <TableLoader />

                : <CampaignBilling campaignDetails={campaignDetails} />
            }
          </div>
        </React.Fragment>
      ) : (
          <h3>Please select a campaign</h3>
        )}
    </div>
  );
};

export default BillingTable;
