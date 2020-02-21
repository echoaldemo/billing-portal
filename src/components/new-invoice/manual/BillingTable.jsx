/* eslint-disable */
import React, { useContext, useState, useEffect } from "react";
import { ManualInvoiceContext } from "context/ManualInvoiceContext";
import CampaignBilling from "./CampaignBilling";
const BillingTable = ({ duplicate }) => {
  const billingData = {
    billableHrsQty: "",
    billableHrsRate: "",
    billableHrsTotalAmount: "",
    billableHrsTaxed: true,

    didQty: "",
    didRate: "",
    didTotalAmount: "",
    didTaxed: true,

    performanceQty: "",
    performanceRate: "",
    performanceTotalAmount: "",
    performanceTaxed: true
  };
  const {
    selectedCampaign,
    state,
    campaignDetails,
    setCampaignDetails,
    additionalFee,
    setAdditionalFee,
    setTaxChecked,
    setTax
  } = useContext(ManualInvoiceContext);

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
    if (duplicate) {
      console.log(duplicate);
      const taxed = Boolean(duplicate.TxnTaxDetail);
      setTaxChecked(taxed);
      if (taxed) {
        setTax(duplicate.TxnTaxDetail.TaxLine[0].TaxLineDetail.TaxPercent);
      }

      setAdditionalFee({
        ...additionalFee,
        merchantQty: Boolean(
          duplicate.Line.slice(0, -1).filter(
            (l) => l.SalesItemLineDetail.ItemRef.value === "25"
          )[0]
        )
          ? duplicate.Line.slice(0, -1).filter(
              (l) => l.SalesItemLineDetail.ItemRef.value === "25"
            )[0].SalesItemLineDetail.Qty
          : "",
        merchantRate: Boolean(
          duplicate.Line.slice(0, -1).filter(
            (l) => l.SalesItemLineDetail.ItemRef.value === "25"
          )[0]
        )
          ? duplicate.Line.slice(0, -1).filter(
              (l) => l.SalesItemLineDetail.ItemRef.value === "25"
            )[0].SalesItemLineDetail.UnitPrice
          : "",
        scrubbingQty: Boolean(
          duplicate.Line.slice(0, -1).filter(
            (l) => l.SalesItemLineDetail.ItemRef.value === "24"
          )[0]
        )
          ? duplicate.Line.slice(0, -1).filter(
              (l) => l.SalesItemLineDetail.ItemRef.value === "24"
            )[0].SalesItemLineDetail.Qty
          : "",
        scrubbingRate: Boolean(
          duplicate.Line.slice(0, -1).filter(
            (l) => l.SalesItemLineDetail.ItemRef.value === "24"
          )[0]
        )
          ? duplicate.Line.slice(0, -1).filter(
              (l) => l.SalesItemLineDetail.ItemRef.value === "24"
            )[0].SalesItemLineDetail.UnitPrice
          : ""
      });
    }
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
