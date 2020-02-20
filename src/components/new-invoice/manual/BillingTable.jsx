/* eslint-disable */
import React, { useContext, useState, useEffect } from "react";
import { ManualInvoiceContext } from "context/ManualInvoiceContext";
import CampaignBilling from "./CampaignBilling";
const BillingTable = ({ duplicate }) => {
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
    const campaignsDetails = selectedCampaign.map((uuid, x) => {
      let filteredDetails = state.campaigns.filter(
        (item) => item.uuid === uuid
      );
      if (duplicate) {
        return {
          ...filteredDetails[0],
          billableHrsQty: Boolean(
            duplicate.Line.slice(0, -1).filter(
              (l) => l.SalesItemLineDetail.ItemRef.value === "21"
            )[x]
          )
            ? duplicate.Line.slice(0, -1).filter(
                (l) => l.SalesItemLineDetail.ItemRef.value === "21"
              )[x].SalesItemLineDetail.Qty
            : "",
          billableHrsRate: Boolean(
            duplicate.Line.slice(0, -1).filter(
              (l) => l.SalesItemLineDetail.ItemRef.value === "21"
            )[x]
          )
            ? duplicate.Line.slice(0, -1).filter(
                (l) => l.SalesItemLineDetail.ItemRef.value === "21"
              )[x].SalesItemLineDetail.UnitPrice
            : "",
          billableHrsTotalAmount: "",

          didQty: Boolean(
            duplicate.Line.slice(0, -1).filter(
              (l) => l.SalesItemLineDetail.ItemRef.value === "23"
            )[x]
          )
            ? duplicate.Line.slice(0, -1).filter(
                (l) => l.SalesItemLineDetail.ItemRef.value === "23"
              )[x].SalesItemLineDetail.Qty
            : "",
          didRate: Boolean(
            duplicate.Line.slice(0, -1).filter(
              (l) => l.SalesItemLineDetail.ItemRef.value === "23"
            )[x]
          )
            ? duplicate.Line.slice(0, -1).filter(
                (l) => l.SalesItemLineDetail.ItemRef.value === "23"
              )[x].SalesItemLineDetail.UnitPrice
            : "",
          didTotalAmount: "",

          performanceQty: Boolean(
            duplicate.Line.slice(0, -1).filter(
              (l) => l.SalesItemLineDetail.ItemRef.value === "22"
            )[x]
          )
            ? duplicate.Line.slice(0, -1).filter(
                (l) => l.SalesItemLineDetail.ItemRef.value === "22"
              )[x].SalesItemLineDetail.Qty
            : "",
          performanceRate: Boolean(
            duplicate.Line.slice(0, -1).filter(
              (l) => l.SalesItemLineDetail.ItemRef.value === "22"
            )[x]
          )
            ? duplicate.Line.slice(0, -1).filter(
                (l) => l.SalesItemLineDetail.ItemRef.value === "22"
              )[x].SalesItemLineDetail.UnitPrice
            : "",
          performanceTotalAmount: ""
        };
      }
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
